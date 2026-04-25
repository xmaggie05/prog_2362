import os

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///hr_portal.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "some-secret-string"
    
    # Don't forget this one! auth.py needs it for the RBAC tokens.
    JWT_SECRET_KEY = "another-secret-string"