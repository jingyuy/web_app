from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# Check the environment (default to "development")
ENV = os.getenv("ENV", "development")

# Explicitly load the correct .env file
if ENV == "production":
    load_dotenv(".env.production")
else:
    load_dotenv(".env.development")  # Force .env.development for local development

# Database URL (replace with your actual database URL)
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the database engine
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


# Example User model
class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer, primary_key=True, index=True, autoincrement=True
    )  # Ensure id auto-increments
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)


# Create the database tables
def init_db():
    Base.metadata.create_all(bind=engine)
