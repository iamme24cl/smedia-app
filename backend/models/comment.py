from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime, timezone

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey('posts.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    post = relationship('Post', back_populates='comments')
    user = relationship('User', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat()
        }
