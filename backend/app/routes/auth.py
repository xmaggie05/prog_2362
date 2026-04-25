from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from functools import wraps

auth_bp = Blueprint("auth", __name__)

# --- RBAC Decorator ---
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"error": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    # NOTE: You should be using password hashing (e.g., bcrypt), not plain text!
    if not user or user.password != password:
        return jsonify({"error": "Invalid email or password"}), 401

    # Create token and embed the role inside it (Identity + Additional Claims)
    access_token = create_access_token(
        identity=str(user.id), 
        additional_claims={"role": user.role}
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.to_dict() # For UI display only
    }), 200

# --- Protected Route Example ---
@auth_bp.route("/admin/delete-employee/<int:id>", methods=["DELETE"])
@admin_required
def delete_employee(id):
    # This code only runs if the JWT is valid AND the role is 'admin'
    return jsonify({"message": f"Employee {id} deleted successfully"}), 200