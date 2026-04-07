import { useNavigate } from "react-router-dom";

function Topbar({ title }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <h2>{title}</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Topbar;