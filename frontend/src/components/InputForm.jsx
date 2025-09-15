import React, { useState } from 'react';
import { fetchUV, subscribeSMS } from '../api/backendApi';

export default function InputForm({ onUV, onLocation }) {
  const [phone, setPhone] = useState('');
  const [latlng, setLatlng] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported.');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLatlng({ lat, lng });
        onLocation && onLocation({ lat, lng });
      },
      err => alert('Location permissions needed.')
    );
  };

  const checkUV = async () => {
    if (latlng.lat == null || latlng.lng == null) return alert('Click "Get Location" first.');
    setLoading(true);
    const res = await fetchUV(latlng.lat, latlng.lng);
    setLoading(false);
    if (res.ok) onUV(res.data);
    else alert(res.error || 'Failed to fetch UV');
  };

  const subscribe = async () => {
    if (!phone) return alert('Enter phone number.');
    if (latlng.lat == null || latlng.lng == null) return alert('Get location first.');
    const res = await subscribeSMS(phone, latlng.lat, latlng.lng);
    if (res.ok) alert('Subscribed to daily UV alerts ✅');
    else alert(res.error || 'Subscription failed');
  };

  return (
    <div className="card">
      <p className='entermobile'>One tap to Sun Safety: Add your number, allow location & get your daily UV alerts.</p>
      <div className="row" style={{ gridTemplateColumns: '1fr 160px' }}>
        <input className="input" placeholder="Mobile number (+91...)" value={phone}
               onChange={e => setPhone(e.target.value)} />
        <button className="btn" onClick={subscribe}>Subscribe SMS</button>
      </div>
      <div style={{ height: 12 }} />
      <div className="row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <button className="btn" onClick={getLocation}>📍 Get Location</button>
        <button className="btn" onClick={checkUV} disabled={loading}>{loading ? 'Loading...' : 'Get UV Index'}</button>
      </div>
      {latlng.lat && <p className="badge">Location: {latlng.lat.toFixed(3)}, {latlng.lng.toFixed(3)}</p>}
    </div>
  );
}
