export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + description */}
        <div className="footer-brand">
          <div className="footer-logo">
            ☀️ <span>SunSafe</span>
          </div>
          <p>
            Helping you stay safe under the sun with real-time UV insights and
            smart alerts.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Dashboard</a>
            <a href="#">Alerts</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div>
            <h4>Resources</h4>
            <a href="#">UV Index Guide</a>
            <a href="#">Skin Safety</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} SunSafe. All rights reserved.
      </div>
    </footer>
  );
}
