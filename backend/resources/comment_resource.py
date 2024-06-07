from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from db import session
from models.comment import Comment

comment_bp = Blueprint('comment_bp', __name__)

@comment_bp.route('/', methods=['POST'])
@jwt_required()
def create_comment():
    data = request.json
    user_id = get_jwt_identity()
    post_id = data.get('post_id')
    content = data.get('content')
    
    if not post_id or not content:
        return jsonify({'message': 'Post ID and content are required.'}), 400
    try:
        comment = Comment(user_id=user_id, post_id=post_id, content=content)
        session.add(comment)
        session.commit()
        return jsonify({'message': 'Comment created successfully.', 'comment': comment.to_dict()}), 201
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({'message': 'Creating comment failed.', 'error': str(e)}), 500

@comment_bp.route('/<int:comment_id>', methods=['GET'])
@jwt_required()
def get_comment(comment_id):
    try:
        comment = session.query(Comment).get(comment_id)
        if comment:
            return jsonify(comment.to_dict()), 200
        return jsonify({'message': 'Comment not found.'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting comment failed.', 'error': str(e)}), 500

@comment_bp.route('/<int:comment_id>', methods=['PUT'])
@jwt_required()
def update_comment(comment_id):
    data = request.json
    try:
        comment = session.query(Comment).get(comment_id)
        if comment:
            comment.content = data.get('content', comment.content)
            session.commit()
            return jsonify({'message': 'Comment successfully updated.', 'comment': comment.to_dict()}), 200
        return jsonify({'message': 'Comment not found.'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Updating comment failed.', 'error': str(e)}), 500

@comment_bp.route('/<int:comment_id>', methods=['DELETE'])
@jwt_required()
def delete_comment(comment_id):
    try:
        comment = session.query(Comment).get(comment_id)
        if comment:
            session.delete(comment)
            session.commit()
            return jsonify({'message': 'Comment successfully deleted.'}), 200
        return jsonify({'message': 'Comment not found.'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Deleting comment failed.', 'error': str(e)}), 500

