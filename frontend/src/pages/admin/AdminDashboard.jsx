import DashboardLayout from "../../components/layout/DashboardLayout";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
      <div className="card-grid">
        <div className="info-card">
          <h3>Welcome</h3>
          <p>{user?.full_name || "Admin"}</p>
        </div>

        <div className="info-card">
          <h3>Role</h3>
          <p>{user?.role || "admin"}</p>
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