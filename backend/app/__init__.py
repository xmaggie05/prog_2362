from flask import Flask
from flask_cors import CORS
from app.extensions import db

'''
def create_app():
    app = Flask(__name__)

    app.config["SECRET_KEY"] = "dev-secret-key"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///hr_portal.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    CORS(app)
    db.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.leave import leave_bp
    from app.routes.employees import employees_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(leave_bp, url_prefix="/api/leave")
    app.register_blueprint(employees_bp, url_prefix="/api/employees")

    with app.app_context():
        from app.models import User, LeaveRequest
        db.create_all()

    return app
'''

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager # <--- Add this
from app.extensions import db

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config") # Make sure your config is loaded!

    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app) # <--- Add this

    # Register Blueprints
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app