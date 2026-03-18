import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="SunSafe Logo" className="logo-img" />

      </div>

      <div className="nav-links">
        <button>
          <Link to="/dashboard" className="dashboard-btn" >Dashboard</Link>
        </button>
        <button
          className="alert-btn"
          style={{ backgroundColor: "#fb8500" }}
        >
          Get Alerts
        </button>

      </div>
    </div>
  );
}
