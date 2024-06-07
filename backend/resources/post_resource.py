from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from db import session
from models.post import Post
from models.like import Like

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/', methods=['POST'], endpoint='create_post')
@jwt_required()
def create_post():
    data = request.json
    user_id = get_jwt_identity()
    content = data.get('content')
    image = data.get('image')
    
    if not content:
        return jsonify({'message': 'Content is required.'}), 400
    try:
        post = Post(user_id=user_id, content=content, image=image)
        session.add(post)
        session.commit()
        return jsonify({'message': 'Post successfully created.', 'post': post.to_dict()}), 201
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Creating post failed.','error': str(e)}), 500

@post_bp.route('/', methods=['GET'], endpoint='get_posts')
@jwt_required()
def get_posts():
    try:
        posts = session.query(Post).all()
        if posts:
            return jsonify([post.to_dict() for post in posts]), 200
        return jsonify({'message': 'No posts found.'}), 200
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting posts failed.', 'error': str(e)}), 500

@post_bp.route('/<int:post_id>', methods=['GET'], endpoint='get_post')
@jwt_required()
def get_post(post_id):
    try:
        post = session.query(Post).get(post_id)
        if post:
            return jsonify(post.to_dict()), 200
        return jsonify({'message': 'Post not found.'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting post failed.', 'error': str(e)}), 500

@post_bp.route('/<int:post_id>', methods=['PUT'], endpoint='update_post')
@jwt_required()
def update_post(post_id):
    data = request.json
    try:
        post = session.query(Post).get(post_id)
        if post:
            post.content = data.get('content', post.content)
            post.image = data.get('image', post.image)
            session.commit()
            return jsonify({'message': 'Post successfully updated.', 'post': post.to_dict()}), 200
        return jsonify({'message': 'Post not found.'}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Updating post failed.', 'error': str(e)}), 500
    
@post_bp.route('/<int:post_id>', methods=['DELETE'], endpoint='delete_post')
@jwt_required()
def delete_post(post_id):
    try:
        post = session.query(Post).get(post_id)
        if post:
            session.delete(post)
            session.commit()
            return jsonify({'message': 'Post successfully deleted.'}), 200
        return jsonify({'message': 'Post not found.'}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Deleting post failed.', 'error': str(e)}), 500
    
@post_bp.route('/<int:post_id>/like', methods=['POST'], endpoint='add_post_like')
@jwt_required()
def add_post_like(post_id):
    user_id = get_jwt_identity()
    try:
        existing_like = session.query(Like).filter_by(post_id=post_id, user_id=user_id).first()
        if existing_like:
            return jsonify({'message': 'Post already liked.'}), 400
        
        like = Like(user_id=user_id, post_id=post_id)
        session.add(like)
        session.commit()
        return jsonify({'message': 'Successfully liked post.'}), 200
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Cannot add like.', 'error': str(e)}), 500
    
@post_bp.route('/<int:post_id>/like', methods=['DELETE'], endpoint='delete_post_like')
@jwt_required()
def delete_post_like(post_id):
    user_id = get_jwt_identity()
    try:
        like = session.query(Like).filter_by(post_id=post_id, user_id=user_id).first()
        if like:
            session.delete(like)
            session.commit()
            return jsonify({'message': 'Like successfully deleted.'}), 200
        return jsonify({'message': 'Like not found.'}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Deleting like failed.', 'error': str(e)}), 500
