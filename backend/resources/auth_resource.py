from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from db import session
from models.user import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = session.query(User).filter_by(username=username).first()
    
    if user and user.password == password:
        access_token = create_access_token(identity=user.id)
        return jsonify({"user": user.to_dict(), "access_token": access_token}), 200
    return jsonify({"msg": "Bad username or password"}), 401
