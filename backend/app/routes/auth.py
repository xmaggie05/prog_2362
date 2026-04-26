from flask import Blueprint, request, jsonify, session
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db
from app.models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Backend is working"})

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")
    department = data.get("department")
    job_title = data.get("job_title")

    if not all([full_name, email, password, confirm_password, department, job_title]):
        return jsonify({"error": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    
    user = User(
        full_name=full_name,
        email=email,
        password=hashed_password,
        role = "admin" if email == "admin@test.com" else "employee",
        department=department,
        job_title=job_title,
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully"
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401
    
    session['user_id'] = user.id 
    session['role'] = user.role

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "department": user.department,
            "job_title": user.job_title,
            "role": user.role
        }
    }), 200
