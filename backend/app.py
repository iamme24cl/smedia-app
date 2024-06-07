import os
from flask import Flask
from flask_cors import CORS
from db import init_db
from config import config
from extensions import socketio, jwt

def create_app():
    app = Flask(__name__)

    # Set the configuration based on the environment
    env = os.environ.get('FLASK_ENV', 'default')
    app.config.from_object(config[env])

    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "https://smedia-74l.pages.dev"}}, supports_credentials=True)
    jwt.init_app(app)
    socketio.init_app(app)  # Initialize SocketIO

    # Initialize the database
    init_db()

    # Import and Register blueprints
    from resources.user_resource import user_bp
    from resources.post_resource import post_bp
    from resources.comment_resource import comment_bp
    from resources.like_resource import like_bp
    from resources.auth_resource import auth_bp
    from resources.message_resource import message_bp

    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(post_bp, url_prefix='/api/posts')
    app.register_blueprint(comment_bp, url_prefix='/api/comments')
    app.register_blueprint(like_bp, url_prefix='/api/likes')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(message_bp, url_prefix='/api/messages')  
    
    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, debug=True)  # Run with SocketIO
