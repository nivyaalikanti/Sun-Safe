import logo from "../assets/logo.png";
import './Navbar.css';
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/* Logo → Home */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="SunSafe Logo" className="logo-img" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/map" className="map-link">
  <FaMapMarkerAlt className="map-icon" />
  Map
</Link>



    <button className="history-btn" onClick={() => navigate("/history")}>
      <FaHistory className="history-icon"/>
  View UV History
</button>
        {/* Dashboard */}
        <Link to="/dashboard" className="dashboard-btn">
          Dashboard
        </Link>
        
        {/* Get Alerts */}
        <Link to="/subscribe" className="alert-btn">
          Get Alerts
        </Link>



      </div>
    </div>
  );
}