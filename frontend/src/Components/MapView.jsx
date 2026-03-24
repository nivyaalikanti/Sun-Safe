import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./MapView.css";

/* Fix marker icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ setCoords, coords, setPlace }) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng);
      setPlace("Loading location...");
    },
  });

  return coords ? (
    <Marker position={coords}>
      <Popup>
        <div>
          Selected Location<br />
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </div>
      </Popup>
    </Marker>
  ) : null;
}

export default function MapView() {
  const [coords, setCoords] = useState(null);
  const [place, setPlace] = useState("");
  const [uv, setUV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchPlace, setSearchPlace] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch UV Index from backend
  const getUV = async () => {
    if (!coords) {
      setErrorMsg("Please select a location on the map first");
      return;
    }

    try {
      setErrorMsg("");
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/map/uv?lat=${coords.lat}&lon=${coords.lng}`
      );

      const data = await res.json();
      setUV(data.uv);
      await getLocationName(coords.lat, coords.lng);
    } catch (err) {
      setErrorMsg("Failed to fetch UV data");
    } finally {
      setLoading(false);
    }
  };

  // Get Location Name - OpenStreetMap Nominatim API
  const getLocationName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
      );

      if (!res.ok) throw new Error("Reverse geocode failed");
      const data = await res.json();

      const name =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.state ||
        data.display_name ||
        "Unknown location";

      setPlace(name);
    } catch (err) {
      setPlace("Unknown location");
      console.warn("Reverse geocode failed", err);
    }
  };

  // Search location by name
  const searchLocation = async () => {
    if (!searchPlace) return;

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchPlace}&format=json&limit=1`
      );

      const data = await res.json();

      if (data.length === 0) {
        setErrorMsg("Location not found");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      const newCoords = { lat, lng: lon };

      setCoords(newCoords);
      setPlace(searchPlace);

    } catch (err) {
      setErrorMsg("Failed to search location");
    } finally {
      setLoading(false);
    }
  };

  //Helper function to change map view when coords change
  function ChangeMapView({ coords }) {
    const map = useMapEvents({});

    useEffect(() => {
      if (coords) {
        map.setView(coords, 10);
      }
    }, [coords, map]);

    return null;
  }

  useEffect(() => {
    if (!coords) {
      setPlace("");
      return;
    }
    getLocationName(coords.lat, coords.lng);
  }, [coords]);
  // UV Risk Assessment
  const getRisk = (uv) => {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  };

  // UV Safety Advice
  const getAdvice = (uv) => {
    if (uv <= 2) return "🟢 Safe to go outside. Enjoy your day!";
    if (uv <= 5) return "🟡 Moderate risk. Wear sunglasses and sunscreen.";
    if (uv <= 7) return "🟠 High risk. Stay in shade during noon hours.";
    if (uv <= 10) return "🔴 Very high risk. Avoid going out without protection.";
    return "🚨 Extreme risk. Stay indoors as much as possible!";
  };
  return (
    <div className="map-page">
      <div className="map-card">

        {/* LEFT SIDE */}
        <div className="map-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter location (e.g. Hyderabad)"
              value={searchPlace}
              onChange={(e) => setSearchPlace(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchLocation()}
            />
            <button onClick={searchLocation} disabled={loading}>
              Search
            </button>
          </div>
          <div className="map-wrapper">

            <MapContainer
              center={[17.385, 78.4867]}
              zoom={10}
              style={{ height: "420px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker setCoords={setCoords} setPlace={setPlace} coords={coords} />
              <ChangeMapView coords={coords} />
            </MapContainer>
          </div>

          {/* BUTTON BELOW MAP */}
          <div className="btn-container">
            <button className="uv-btn" onClick={getUV} disabled={loading}>
              {loading ? "Fetching..." : "Get UV Index"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE → RESULTS */}
        <div className="map-right">

          {errorMsg && (
            <div className="error-msg">{errorMsg}</div>
          )}

          {uv !== null && coords && (
            <div className="uv-result">

              <div className="result-item">
                <span>📍 Coordinates:</span>
                <p>{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
              </div>

              <div className="result-item">
                <span>📌 Location name:</span>
                <p>{place || "Loading location..."}</p>
              </div>

              <div className="result-item">
                <span>☀️ UV Index:</span>
                <p>{uv}</p>
              </div>

              <div className="result-item">
                <span>⚠️ Risk:</span>
                <p>{getRisk(uv)}</p>
              </div>

              <div className="result-msg">
                {getAdvice(uv)}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}