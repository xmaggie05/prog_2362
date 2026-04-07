import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function LeaveApprovals() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/leave/");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leave/${id}/status`, { status });
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update status");
    }
  };

  return (
    <DashboardLayout role="admin" title="Leave Approvals">
      <div className="section-card">
        <h3>All Leave Requests</h3>

        <div style={{ marginTop: "1rem" }}>
          {requests.length === 0 ? (
            <p>No leave requests found.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="request-card">
                <p><strong>Employee:</strong> {req.employee_name}</p>
                <p><strong>Type:</strong> {req.leave_type === "Other" ? req.custom_leave_type : req.leave_type}</p>
                <p><strong>Dates:</strong> {req.start_date} to {req.end_date}</p>
                <p><strong>Reason:</strong> {req.reason}</p>
                <p><strong>Current Status:</strong> {req.status}</p>

                <div style={{ marginTop: "0.75rem" }}>
                  <label><strong>Change Status:</strong></label>
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    style={{ marginLeft: "0.75rem" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LeaveApprovals;