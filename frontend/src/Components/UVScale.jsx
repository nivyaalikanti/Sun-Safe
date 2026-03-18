export default function UVScale() {
  return (
    <div className="uv-card">
      <h3>UV Risk Scale</h3>

      <div className="scale">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="labels">
        <div>Low<br />0–2</div>
        <div>Moderate<br />3–5</div>
        <div>High<br />6–7</div>
        <div>Very High<br />8–10</div>
        <div>Extreme<br />11+</div>
      </div>
    </div>
  );
}
