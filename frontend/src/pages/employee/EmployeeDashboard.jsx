import DashboardLayout from "../../components/layout/DashboardLayout";

function EmployeeDashboard() {
  const userName = localStorage.getItem("user_name");

  return (
    <DashboardLayout role="employee" title="Employee Dashboard">
      <div className="card-grid">
        <div className="info-card">
          <h3>Welcome</h3>
          <p>{userName || "Employee"}</p>
        </div>

        <div className="info-card">
          <h3>Department</h3>
          <p>-</p>
        </div>

        <div className="info-card">
          <h3>Job Title</h3>
          <p>-</p>
        </div>
      </div>

      <div className="section-card">
        <h3>Quick Overview</h3>
        <p>This is your employee dashboard.</p>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeDashboard;
