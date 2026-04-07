import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ role, title, children }) {
  return (
    <div className="dashboard-shell">
      <Sidebar role={role} />
      <div className="dashboard-main">
        <Topbar title={title} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;