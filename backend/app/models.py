from app.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="employee")
    department = db.Column(db.String(120), nullable=False)
    job_title = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "role": self.role,
            "department": self.department,
            "job_title": self.job_title,
        }


class LeaveRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    leave_type = db.Column(db.String(100), nullable=False)
    custom_leave_type = db.Column(db.String(100), nullable=True)
    start_date = db.Column(db.String(20), nullable=False)
    end_date = db.Column(db.String(20), nullable=False)
    reason = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="pending")

    def to_dict(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "leave_type": self.leave_type,
            "custom_leave_type": self.custom_leave_type,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "reason": self.reason,
            "status": self.status,
        }