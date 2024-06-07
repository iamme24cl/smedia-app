from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime, timezone

class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    content = Column(Text, nullable=False)
    image = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    user = relationship('User', back_populates='posts')
    comments = relationship('Comment', back_populates='post', cascade='all, delete-orphan')
    likes = relationship('Like', back_populates='post', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'content': self.content,
            'image': self.image,
            'timestamp': self.timestamp.isoformat(),
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [like.to_dict() for like in self.likes]
        }
