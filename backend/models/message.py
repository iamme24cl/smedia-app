from sqlalchemy import Boolean, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime, timezone

class Message(Base):
    __tablename__ = 'messages'
    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey('users.id'))
    recipient_id = Column(Integer, ForeignKey('users.id'))
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    read = Column(Boolean, default=False)
    sender = relationship('User', foreign_keys=[sender_id])
    recipient = relationship('User', foreign_keys=[recipient_id])

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat()
        }
