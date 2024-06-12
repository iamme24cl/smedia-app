from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError
from db import session
from datetime import datetime
from models.user import User
from models.post import Post
from models.message import Message

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.json
    try:
        user = User(
            name=data['name'],
            username=data['username'],
            email=data['email'],
            password=data['password'],  # Add password handling
            avatar=data['avatar'],
            bio=data['bio'],
            location=data['location'],
            joined_at=datetime.now()
        )
        session.add(user)
        session.commit()
        return jsonify({'message': 'User created successfully.'}), 201
    except SQLAlchemyError as e:
        return jsonify

@user_bp.route('/', methods=['GET'])
@jwt_required()
def get_users():
    try:
        users = session.query(User).all()
        return jsonify([user.to_dict() for user in users]), 200
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting users failed.', 'error': str(e)}), 500

@user_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    try:
        user = session.query(User).get(user_id)
        if user:
            return jsonify(user.to_dict())
        return jsonify({'message': 'User not found'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting user failed.', 'error': str(e)}), 500

@user_bp.route('/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    data = request.json
    try:
        user = session.query(User).get(user_id)
        if user:
            user.name = data.get('name', user.name)
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.avatar = data.get('avatar', user.avatar)
            user.bio = data.get('bio', user.bio)
            user.location = data.get('location', user.location)
            session.commit()
            return jsonify({'message': 'User updated successfully.'}), 200
        return jsonify({'message': 'User not found'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Updating user failed.', 'error': str(e)}), 500

@user_bp.route('/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    try:
        user = session.query(User).get(user_id)
        if user:
            session.delete(user)
            session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        return jsonify({'message': 'User not found'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Deleting user failed.', 'error': str(e)}), 500
    
@user_bp.route('/online-users', methods=['GET'])
def get_online_users():
    try:
        online_users = session.query(User).filter(User.is_online == True).all()
        if online_users:
            return jsonify([user.to_dict() for user in online_users])
        return jsonify({'message': 'Users not found'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting users failed.', 'error': str(e)}), 500
    
@user_bp.route('/<int:user_id>/friends', methods=['GET'])
def get_user_friends(user_id):
    try:
        user = session.query(User).get(user_id)
        if user:
            return jsonify([friend.to_dict() for friend in user.friends]), 200
        return jsonify({"error": "User not found"}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting user friends failed.', 'error': str(e)}), 500
        

@user_bp.route('/latest-photos', methods=['GET'])
def get_latest_photos():
    try:
        photos = session.query(Post).filter(Post.image != None).order_by(Post.timestamp.desc()).limit(8).all()
        return jsonify([{'src': photo.image, 'alt': photo.content} for photo in photos]), 200
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting photos failed.', 'error': str(e)}), 500

@user_bp.route('/<int:user_id>/latest-conversations', methods=['GET'])
def get_latest_conversations(user_id):
    try:
        user = session.query(User).get(user_id)
        if user:
            conversations = session.query(Message).filter((Message.sender_id == user_id) | (Message.recipient_id == user_id)).order_by(Message.timestamp.desc()).limit(5).all()
            return jsonify([{
                'name': conv.sender.name if conv.sender_id == user_id else conv.recipient.name,
                'avatar': conv.sender.avatar if conv.sender_id == user_id else conv.recipient.avatar,
                'title': conv.content[:20] + '...' if len(conv.content) > 20 else conv.content,
                'sender': conv.sender.username,
                'message': conv.content[:50] + '...' if len(conv.content) > 50 else conv.content
            } for conv in conversations]), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting conversations failed.', 'error': str(e)}), 500