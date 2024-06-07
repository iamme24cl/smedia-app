from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime, timezone

class Like(Base):
    __tablename__ = 'likes'
    id = Column(Integer, primary_key=True)
    post_id = Column(Integer, ForeignKey('posts.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    post = relationship('Post', back_populates='likes')
    user = relationship('User', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user_id': self.user_id,
            'timestamp': self.timestamp.isoformat()
        }
