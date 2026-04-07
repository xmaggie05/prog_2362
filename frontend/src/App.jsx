import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LeaveRequest from "./pages/employee/LeaveRequest";
import LeaveApprovals from "./pages/admin/LeaveApprovals";
import EmployeeManagement from "./pages/admin/EmployeeManagement";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Employee routes */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/leave"
        element={
          <ProtectedRoute role="employee">
            <LeaveRequest />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leave-approvals"
        element={
          <ProtectedRoute role="admin">
            <LeaveApprovals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute role="admin">
            <EmployeeManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;