from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from db import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    avatar = Column(String)
    bio = Column(Text)
    location = Column(String)
    joined_at = Column(DateTime)
    posts = relationship('Post', back_populates='user')
    comments = relationship('Comment', back_populates='user')
    likes = relationship('Like', back_populates='user')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
            'bio': self.bio,
            'location': self.location,
            'joined_at': self.joined_at.isoformat()
        }
