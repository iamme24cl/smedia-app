from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = create_engine('sqlite:///smedia.db')
Session = sessionmaker(bind=engine)
session = Session()

def init_db():
    import models.user
    import models.post
    import models.comment
    import models.like
    import models.message
    Base.metadata.create_all(engine)
