from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Table, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

# Junction table for the many-to-many relationship between users and their friends
friends_association = Table(
    'friends', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('friend_id', Integer, ForeignKey('users.id'), primary_key=True)
)

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
    is_online = Column(Boolean, default=False)
    posts = relationship('Post', back_populates='user')
    comments = relationship('Comment', back_populates='user')
    likes = relationship('Like', back_populates='user')
    friends = relationship(
        'User',
        secondary=friends_association,
        primaryjoin=id==friends_association.c.user_id,
        secondaryjoin=id==friends_association.c.friend_id,
        backref='user_friends'
    )

    def to_dict(self, include_friends=True, depth=1):
        if depth < 0:
            return {'id': self.id}
        
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'avatar': self.avatar,
            'bio': self.bio,
            'location': self.location,
            'joined_at': self.joined_at.isoformat(),
            'is_online': self.is_online,
            'friends': [friend.to_dict(include_friends=False, depth=depth-1) for friend in self.friends] if include_friends else []  # Include friends in the dictionary
        }