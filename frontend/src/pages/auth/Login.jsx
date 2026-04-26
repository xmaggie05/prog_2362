import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", loginData, {
        withCredentials: true
      });
      
      const user = res.data.user;
      localStorage.setItem("user_name", user.full_name);
      localStorage.setItem("user_role", user.role);
      localStorage.setItem("user_id", user.id);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your HR portal account</p>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <button type="submit" className="primary-btn">Log In</button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
