import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import API from "../../services/api";

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    department: "",
    job_title: "",
    role: "employee",
  });

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);

    try {
      const res = await API.get(`/employees/search?q=${value}`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      full_name: "",
      email: "",
      password: "",
      department: "",
      job_title: "",
      role: "employee",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/employees/${editingId}`, {
          full_name: form.full_name,
          email: form.email,
          department: form.department,
          job_title: form.job_title,
          role: form.role,
        });
        alert("Employee updated");
      } else {
        await API.post("/employees/", form);
        alert("Employee created");
      }

      resetForm();
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Operation failed");
    }
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setForm({
      full_name: employee.full_name,
      email: employee.email,
      password: "",
      department: employee.department,
      job_title: employee.job_title,
      role: employee.role,
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      alert("Employee deleted");
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Delete failed");
    }
  };

  return (
    <DashboardLayout role="admin" title="Employee Management">
      <div className="section-card">
        <h3>{editingId ? "Edit Employee" : "Create Employee"}</h3>

        <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: "1rem" }}>
          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          {!editingId && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          )}

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <input
            name="job_title"
            placeholder="Job Title"
            value={form.job_title}
            onChange={handleChange}
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button type="submit" className="primary-btn">
              {editingId ? "Update Employee" : "Create Employee"}
            </button>

            {editingId && (
              <button type="button" className="secondary-btn" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="section-card" style={{ marginTop: "1.5rem" }}>
        <h3>All Employees</h3>

        <input
          type="text"
          placeholder="Search by name, email, or department"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />

        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Job Title</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6">No employees found.</td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.full_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.job_title}</td>
                    <td>{employee.role}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button className="small-btn" onClick={() => handleEdit(employee)}>
                          Edit
                        </button>
                        <button className="small-danger-btn" onClick={() => handleDelete(employee.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeManagement;