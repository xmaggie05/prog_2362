from app import create_app
from app.extensions import db
from app.models import User

app = create_app()

fake_employees = [
    {
        "full_name": "Alice Johnson",
        "email": "alice@test.com",
        "password": "123456",
        "department": "HR",
        "job_title": "HR Coordinator",
        "role": "employee",
    },
    {
        "full_name": "Brian Lee",
        "email": "brian@test.com",
        "password": "123456",
        "department": "Finance",
        "job_title": "Payroll Assistant",
        "role": "employee",
    },
    {
        "full_name": "Cathy Nguyen",
        "email": "cathy@test.com",
        "password": "123456",
        "department": "IT",
        "job_title": "Support Specialist",
        "role": "employee",
    },
    {
        "full_name": "David Smith",
        "email": "david@test.com",
        "password": "123456",
        "department": "Operations",
        "job_title": "Operations Analyst",
        "role": "employee",
    },
    {
        "full_name": "Maggie Xiao",
        "email": "admin@test.com",
        "password": "123456",
        "department": "Management",
        "job_title": "HR Admin",
        "role": "admin",
    },
]

with app.app_context():

    db.create_all()
    
    for emp in fake_employees:
        existing_user = User.query.filter_by(email=emp["email"]).first()
        if not existing_user:
            user = User(
                full_name=emp["full_name"],
                email=emp["email"],
                password=emp["password"],
                department=emp["department"],
                job_title=emp["job_title"],
                role=emp["role"],
            )
            db.session.add(user)

    db.session.commit()
    print("Fake employee data inserted successfully.")