import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [uv, setUv] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // 1️⃣ Reverse geocode (OpenStreetMap)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          setLocation(geoData.address.city || geoData.address.state);

          // 2️⃣ Fetch UV from backend
          const uvRes = await fetch(
            `http://localhost:5000/api/uv?lat=${latitude}&lng=${longitude}`
          );
          const uvData = await uvRes.json();
          setUv(uvData);

        } catch (err) {
          setError("Failed to load UV data");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
  return (
    <div className="dashboard-loading">
      <div className="spinner"></div>
      <p className="loading-text">Fetching UV data…</p>
    </div>
  );
}


  if (error) {
    return <div className="error">{error}</div>;
  }

  const uvValue = uv.uv.toFixed(1);

  return(
    <div className="dashboard">
  <div className="dashboard-header">
    <div>
      <h1>UV Dashboard</h1>
      <p className="dashboard-location">📍 {location}</p>
    </div>
  </div>

  <div className="uv-main-card">
    <div className="uv-circle">{uvValue}</div>

    <div className="uv-info">
      <h2>Low Risk Level</h2>
      <p>No protection needed.</p>

      <div className="uv-scale">
        <div className="uv-bar">
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
    </div>
  </div>

  <div className="dashboard-side">
    <div className="side-card">
      <h3>Calculate Safe Exposure</h3>
      <p>Personalized sun safety tips.</p>
    </div>
    <div className="side-card">
      <h3>Set Up Alerts</h3>
      <p>Get notified when UV is high.</p>
    </div>
    <div className="side-card">
      <h3>View History</h3>
      <p>Track UV exposure trends.</p>
    </div>
  </div>
</div>

  );
}
