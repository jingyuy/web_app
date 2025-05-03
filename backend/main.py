from fastapi import FastAPI, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from db import SessionLocal, init_db, User
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8081",
        "http://127.0.0.1:8081",
        "http://localhost:19006",
        "http://localhost",
    ],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Initialize the database
init_db()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
JWT_SECRET = "your-secret-key"  # In production, use a secure secret key
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1


def create_jwt_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Define the request body schema
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str


@app.post("/register")
async def register_user(request: RegisterRequest, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(request.password)
    user = User(email=request.email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "user_id": user.id}


@app.post("/login")
async def login_user(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not pwd_context.verify(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_jwt_token({"sub": user.email})
    return {"message": "Login successful", "token": token}


@app.get("/home")
async def get_home_data(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    token = authorization.split(" ")[1]
    payload = verify_token(token)
    return {"data": f"Welcome to the authenticated home page! User: {payload['sub']}"}
