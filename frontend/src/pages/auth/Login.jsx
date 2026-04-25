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
    const res = await API.post("/auth/login", loginData);
    
    // DEBUG: Look at your browser console (F12 -> Console) to see the actual shape
    console.log("Full Backend Response:", res.data);

    // Destructure the new secure fields
    const { user, access_token } = res.data;

    if (!user || !access_token) {
       throw new Error("Backend response missing user or token");
    }

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", access_token);

    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/employee/dashboard");
    }
  } catch (err) {
    console.error("Caught error:", err);
    alert(err.response?.data?.error || "Login failed - Check console");
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