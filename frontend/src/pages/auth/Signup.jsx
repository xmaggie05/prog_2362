import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    department: "",
    job_title: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Sign up as an employee</p>

        <form onSubmit={handleSignup} className="auth-form">
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
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
          />
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
          <button type="submit" className="primary-btn">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;