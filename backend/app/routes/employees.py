from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import User

employees_bp = Blueprint("employees", __name__)

@employees_bp.route("/", methods=["GET"])
def get_all_employees():
    employees = User.query.all()
    return jsonify([employee.to_dict() for employee in employees]), 200


@employees_bp.route("/", methods=["POST"])
def create_employee():
    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    department = data.get("department")
    job_title = data.get("job_title")
    role = data.get("role", "employee")

    if not all([full_name, email, password, department, job_title]):
        return jsonify({"error": "All required fields must be filled"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    employee = User(
        full_name=full_name,
        email=email,
        password=password,
        department=department,
        job_title=job_title,
        role=role,
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created successfully",
        "employee": employee.to_dict()
    }), 201


@employees_bp.route("/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    employee = User.query.get(employee_id)

    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    data = request.get_json()

    employee.full_name = data.get("full_name", employee.full_name)
    employee.email = data.get("email", employee.email)
    employee.department = data.get("department", employee.department)
    employee.job_title = data.get("job_title", employee.job_title)
    employee.role = data.get("role", employee.role)

    db.session.commit()

    return jsonify({
        "message": "Employee updated successfully",
        "employee": employee.to_dict()
    }), 200


@employees_bp.route("/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    employee = User.query.get(employee_id)

    if not employee:
        return jsonify({"error": "Employee not found"}), 404

    db.session.delete(employee)
    db.session.commit()

    return jsonify({"message": "Employee deleted successfully"}), 200


@employees_bp.route("/search", methods=["GET"])
def search_employees():
    query = request.args.get("q", "").strip()

    if not query:
        employees = User.query.all()
    else:
        employees = User.query.filter(
            (User.full_name.ilike(f"%{query}%")) |
            (User.email.ilike(f"%{query}%")) |
            (User.department.ilike(f"%{query}%"))
        ).all()

    return jsonify([employee.to_dict() for employee in employees]), 200