from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models import LeaveRequest, User

leave_bp = Blueprint("leave", __name__)

@leave_bp.route("/", methods=["POST"])
def create_leave_request():
    data = request.get_json()

    employee_id = data.get("employee_id")
    leave_type = data.get("leave_type")
    custom_leave_type = data.get("custom_leave_type")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    reason = data.get("reason")

    if not all([employee_id, leave_type, start_date, end_date, reason]):
        return jsonify({"error": "All required fields must be filled"}), 400

    leave_request = LeaveRequest(
        employee_id=employee_id,
        leave_type=leave_type,
        custom_leave_type=custom_leave_type,
        start_date=start_date,
        end_date=end_date,
        reason=reason,
        status="pending",
    )

    db.session.add(leave_request)
    db.session.commit()

    return jsonify({
        "message": "Leave request submitted successfully",
        "leave_request": leave_request.to_dict()
    }), 201


@leave_bp.route("/employee/<int:employee_id>", methods=["GET"])
def get_employee_leave_requests(employee_id):
    requests = LeaveRequest.query.filter_by(employee_id=employee_id).all()
    return jsonify([req.to_dict() for req in requests]), 200


@leave_bp.route("/", methods=["GET"])
def get_all_leave_requests():
    requests = LeaveRequest.query.all()

    result = []
    for req in requests:
        employee = User.query.get(req.employee_id)
        item = req.to_dict()
        item["employee_name"] = employee.full_name if employee else "Unknown"
        result.append(item)

    return jsonify(result), 200


@leave_bp.route("/<int:leave_id>/status", methods=["PUT"])
def update_leave_status(leave_id):
    data = request.get_json()
    status = data.get("status")

    if status not in ["pending", "approved", "rejected"]:
        return jsonify({"error": "Invalid status"}), 400

    leave_request = LeaveRequest.query.get(leave_id)

    if not leave_request:
        return jsonify({"error": "Leave request not found"}), 404

    leave_request.status = status
    db.session.commit()

    return jsonify({
        "message": f"Leave request updated to {status}",
        "leave_request": leave_request.to_dict()
    }), 200