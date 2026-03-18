export default function Features() {
  return (
    <section className="features-section">
      <h2>Everything You Need for Sun Safety</h2>

      <p className="features-subtitle">
        SunSafe provides comprehensive tools to help you make informed
        decisions about sun exposure.
      </p>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">☀️</div>
          <h3>Real-Time UV Index</h3>
          <p>
            Get accurate UV readings based on your exact location, updated in
            real-time.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Personalized Protection</h3>
          <p>
            Calculate safe exposure time based on your skin type and activity
            level.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Smart Alerts</h3>
          <p>
            Receive notifications when UV levels exceed your safety threshold.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Track Your Exposure</h3>
          <p>
            View your UV exposure history and identify patterns over time.
          </p>
        </div>
      </div>
    </section>
  );
}
