import { Link } from "react-router-dom";

function Sidebar({ role = "employee" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">HR Portal</div>

      <nav className="sidebar-nav">
        {role === "admin" ? (
          <>
            <Link to="/admin/dashboard" className="sidebar-link">Dashboard</Link>
            <Link to="/admin/employees" className="sidebar-link">Employees</Link>
            <Link to="/admin/leave-approvals" className="sidebar-link">Leave Approvals</Link>
            <a href="#" className="sidebar-link">Payroll</a>
          </>
        ) : (
          <>
            <Link to="/employee/dashboard" className="sidebar-link">Dashboard</Link>
            <a href="#" className="sidebar-link">Profile</a>
            <Link to="/employee/leave" className="sidebar-link">Leave Request</Link>
            <a href="#" className="sidebar-link">Attendance</a>
            <a href="#" className="sidebar-link">Payroll</a>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;