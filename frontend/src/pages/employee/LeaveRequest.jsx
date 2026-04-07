import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function LeaveRequest() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    leave_type: "",
    custom_leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/leave/employee/${user.id}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchRequests();
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leave/", {
        employee_id: user.id,
        ...form,
      });

      alert("Leave request submitted");
      setForm({
        leave_type: "",
        custom_leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
      fetchRequests();
    } catch (err) {
      console.error("Leave submit error:", err.response?.data || err);
      alert(err.response?.data?.error || "Failed to submit leave request");
    }
  };

  return (
    <DashboardLayout role="employee" title="Leave Request">
      <div className="section-card">
        <h3>Submit Leave Request</h3>

        <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: "1rem" }}>
          <select name="leave_type" value={form.leave_type} onChange={handleChange}>
            <option value="">Select Leave Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Vacation Leave">Vacation Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
            <option value="Other">Other</option>
          </select>

          {form.leave_type === "Other" && (
            <input
              name="custom_leave_type"
              placeholder="Enter custom leave type"
              value={form.custom_leave_type}
              onChange={handleChange}
            />
          )}

          <input
            name="start_date"
            type="date"
            value={form.start_date}
            onChange={handleChange}
          />

          <input
            name="end_date"
            type="date"
            value={form.end_date}
            onChange={handleChange}
          />

          <textarea
            name="reason"
            placeholder="Reason"
            value={form.reason}
            onChange={handleChange}
            rows="4"
            className="text-area"
          />

          <button type="submit" className="primary-btn">Submit Request</button>
        </form>
      </div>

      <div className="section-card" style={{ marginTop: "1.5rem" }}>
        <h3>My Leave Requests</h3>

        <div style={{ marginTop: "1rem" }}>
          {requests.length === 0 ? (
            <p>No leave requests submitted yet.</p>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="request-card">
                <p><strong>Type:</strong> {req.leave_type === "Other" ? req.custom_leave_type : req.leave_type}</p>
                <p><strong>Dates:</strong> {req.start_date} to {req.end_date}</p>
                <p><strong>Reason:</strong> {req.reason}</p>
                <p><strong>Status:</strong> {req.status}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LeaveRequest;