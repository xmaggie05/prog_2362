import DashboardLayout from "../../components/layout/DashboardLayout";

function AdminDashboard() {
  const userName = localStorage.getItem("user_name");

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="card-grid">
        <div className="info-card">
          <h3>Welcome</h3>
          <p>{userName || "Admin"}</p>
        </div>

        <div className="info-card">
          <h3>Role</h3>
          <p>admin</p>
        </div>

        <div className="info-card">
          <h3>Management</h3>
          <p>Employees, leave, and payroll</p>
        </div>
      </div>

      <div className="section-card">
        <h3>Admin Overview</h3>
        <p>This is your admin dashboard.</p>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
