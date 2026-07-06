from jose import jwt
from datetime import datetime, timedelta
import hashlib

SECRET_KEY = "coffeemanagersecret"
ALGORITHM = "HS256"


def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain, hashed):
    return hashlib.sha256(plain.encode()).hexdigest() == hashed


def create_token(data: dict, expires_minutes=60):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(minutes=expires_minutes)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)