from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import User, Post, Comment, Like, Message
from faker import Faker
from db import Base
import random

# Create a new engine instance
engine = create_engine('sqlite:///smedia.db')

# Create a configured "Session" class
Session = sessionmaker(bind=engine)

# Create a session
session = Session()

fake = Faker()

def generate_fake_data():
    # Generate users
    users = []
    for _ in range(10):
        user = User(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password(),
            avatar=fake.image_url(),
            bio=fake.text(),
            location=fake.city(),
            joined_at=fake.date_time_this_decade(),
            is_online=fake.boolean()
        )
        session.add(user)
        session.commit()  # Commit after adding each user to get user.id
        users.append(user)

    # Generate friends relationships
    for user in users:
        # Select 2-5 random friends for each user
        friends = random.sample(users, random.randint(2, 5))
        for friend in friends:
            if friend != user:
                user.friends.append(friend)
        session.commit()

    # Generate posts
    for _ in range(30):
        post = Post(
            user_id=fake.random_int(min=1, max=10),
            content=fake.text(),
            image=fake.image_url(),
            timestamp=fake.date_time_this_year()
        )
        session.add(post)
        session.commit()  # Commit after adding each post to get post.id

    # Generate comments
    for _ in range(50):
        comment = Comment(
            post_id=fake.random_int(min=1, max=30),
            user_id=fake.random_int(min=1, max=10),
            content=fake.text(),
            timestamp=fake.date_time_this_year()
        )
        session.add(comment)
        session.commit()

    # Generate likes
    for _ in range(100):
        like = Like(
            post_id=fake.random_int(min=1, max=30),
            user_id=fake.random_int(min=1, max=10),
            timestamp=fake.date_time_this_year()
        )
        session.add(like)
        session.commit()

    # Generate messages
    for _ in range(20):
        message = Message(
            sender_id=fake.random_int(min=1, max=10),
            recipient_id=fake.random_int(min=1, max=10),
            content=fake.text(),
            timestamp=fake.date_time_this_year(),
            read=fake.boolean()
        )
        session.add(message)
        session.commit()

if __name__ == "__main__":
    # Drop all tables
    Base.metadata.drop_all(engine)
    
    # Create all tables
    Base.metadata.create_all(engine)
    
    generate_fake_data()

    # Close the session
    session.close()
