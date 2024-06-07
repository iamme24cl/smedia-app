from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError
from db import session
from models.user import User
from datetime import datetime

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
        return jsonify([user.to_dict() for user in users])
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
            return jsonify({'message': 'User updated successfully.'})
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
            return jsonify({'message': 'User deleted successfully'})
        return jsonify({'message': 'User not found'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Deleting user failed.', 'error': str(e)}), 500
