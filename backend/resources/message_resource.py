from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from sqlalchemy.exc import SQLAlchemyError
from db import session
from models.message import Message
from flask_socketio import emit, join_room, leave_room
from extensions import socketio

message_bp = Blueprint('message_bp', __name__)

@message_bp.route('/', methods=['POST'])
@jwt_required()
def send_message():
    data = request.json
    sender_id = get_jwt_identity()
    recipient_id = data.get('recipient_id')
    content = data.get('content')
    
    if not recipient_id or not content:
        return jsonify({'message': 'Recipient ID and content are required.'}), 400

    try:
        message = Message(sender_id=sender_id, recipient_id=recipient_id, content=content)
        session.add(message)
        session.commit()
        
        # Emit the message to the recipient
        socketio.emit('new_message', message.to_dict(), room=str(recipient_id))
        
        return jsonify({'message': 'Message sent successfully.'}), 201
    except SQLAlchemyError as e:
        return jsonify({'message': 'Cannot send message.', 'error': str(e)}), 500

@message_bp.route('/received', methods=['GET'])
@jwt_required()
def get_received_messages():
    user_id = get_jwt_identity()
    try:
        messages = session.query(Message).filter_by(recipient_id=user_id).all()
        return jsonify([message.to_dict() for message in messages]), 200
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting messages failed.', 'error': str(e)}), 500

@message_bp.route('/sent', methods=['GET'])
@jwt_required()
def get_sent_messages():
    user_id = get_jwt_identity()
    try:
        messages = session.query(Message).filter_by(sender_id=user_id).all()
        return jsonify([message.to_dict() for message in messages]), 200
    except SQLAlchemyError as e:
        return jsonify({'message': 'Getting messages failed.', 'error': str(e)}), 500

@message_bp.route('/<int:message_id>', methods=['PUT'])
@jwt_required()
def mark_message_as_read(message_id):
    user_id = get_jwt_identity()
    try:
        message = session.query(Message).filter_by(id=message_id, recipient_id=user_id).first()
        if message:
            message.read = True
            session.commit()
            return jsonify({'message': 'Message marked as read'}), 200
        return jsonify({'message': 'Message not found or not authorized'}), 404
    except SQLAlchemyError as e:
        return jsonify({'message': 'Marking message as read failed.', 'error': str(e)}), 500

@socketio.on('connect')
def handle_connect():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        join_room(user_id)
        print(f"User {user_id} connected")
    except Exception as e:
        print(f"Connection failed: {e}")
        
@socketio.on('disconnect')
def handle_disconnect():
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()
        leave_room(user_id)
        print(f"User {user_id} disconnected")
    except Exception as e:
        print(f"Disconnection failed: {e}")