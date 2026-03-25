import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./History.css";

export default function History() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/map/uv-history");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching history", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <div className="history-card">
        <h2>UV Index History (Today)</h2>
        <p className="history-subtitle">Last recorded values across your selected location.</p>

        {loading ? (
          <p className="history-loading">Loading graph...</p>
        ) : data.length === 0 ? (
          <p className="history-empty">No history data available yet.</p>
        ) : (
          <div className="history-chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 10, right: 25, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fill: "#334155", fontSize: 12 }} />
                <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
                <Tooltip wrapperStyle={{ borderRadius: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#fb8500" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}