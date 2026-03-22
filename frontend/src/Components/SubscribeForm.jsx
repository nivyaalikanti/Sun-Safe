import { useState } from "react";
import axios from "axios";
import "./SubscribeForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState(6);
  const [frequency, setFrequency] = useState("daily");
  const [peakAlert, setPeakAlert] = useState(true);
  const [loading, setLoading] = useState(false);

  const subscribe = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        await axios.post("http://localhost:5000/api/subscribe", {
          name,
          phone,
          email,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          uvThreshold: Number(threshold),
          frequency,
          peakAlert,
        });

        toast.success("Subscribed successfully!");

        // Reset form
        setName("");
        setPhone("");
        setEmail("");
        setThreshold(6);
        setFrequency("daily");
        setPeakAlert(true);

      } catch (err) {
        toast.error("Subscription failed");
      } finally {
        setLoading(false);
      }
    },

    () => {
      toast.error("Location permission denied");
      setLoading(false);
    },

    {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 60000,
    }
  );
};

  return (
    <div className="form-container">
      <div className="forms">
      <div className="card">
        <h2>📩 Contact Information</h2>
        <p className="subtitle">Where should we send your UV alerts?</p>

        <label>Name *</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Phone Number *</label>
        <input
          type="text"
          placeholder="+911234567890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <small>For SMS alerts during extreme UV conditions</small>

        <label>Email *</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>For email notifications</small>
      </div>

      <div className="card">
        <h2>✨ Alert Settings</h2>
        <p className="subtitle">Customize when and how you receive alerts</p>

        <div className="slider-section">
          <div className="slider-label">
            <span>Alert when UV exceeds</span>
            <span className="uv-value">{threshold}</span>
          </div>

          <input
            type="range"
            min="0"
            max="11"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            style={{
    background: `linear-gradient(to right, #ff8a00 0%, #ff8a00 ${(threshold / 11) * 100}%, #e2e8f0 ${(threshold / 11) * 100}%, #e2e8f0 100%)`
  }}
          />

          <small>
            You'll be notified when UV index reaches <span>High level ({threshold})</span>
          </small>
        </div>

        <label>Alert Frequency</label>

        <div className="frequency-buttons">
          <button
            className={frequency === "daily" ? "active" : ""}
            onClick={() => setFrequency("daily")}
          >
            Daily Digest
          </button>

          <button
            className={frequency === "realtime" ? "active" : ""}
            onClick={() => setFrequency("realtime")}
          >
            Real-Time
          </button>
        </div>

        <div className="toggle-box">
          <div>
            <strong>Peak UV Hours Alert</strong>
            <p>Extra warning during 10am - 4pm</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={peakAlert}
              onChange={() => setPeakAlert(!peakAlert)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      </div>
      <button className="subscribe-btn" onClick={subscribe} disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe to Alerts"}
      </button>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}