import React from 'react';

function level(uv) {
  if (uv >= 11) return { label: 'Extreme', color: '#8b0000' };
  if (uv >= 8)  return { label: 'Very High', color: '#d97706' };
  if (uv >= 6)  return { label: 'High', color: '#f59e0b' };
  if (uv >= 3)  return { label: 'Moderate', color: '#10b981' };
  return { label: 'Low', color: '#3b82f6' };
}

export default function UVResultCard({ uvData }) {
  if (!uvData) return null;
  const uv = uvData?.result?.uv ?? 0;
  const { label, color } = level(uv);
  return (
    <div className="card" >
      <h1>Current UV Index</h1>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginLeft:100 }}>
        <div style={{ fontSize: 100, fontWeight: 700, color }}>{uv.toFixed(1)}</div>
        <div>
          <div className="badge badge1" style={{ background: color, color:'#fff' }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 700, color}} className='data'>Ozone: {uvData?.result?.ozone?.toFixed?.(0) ?? '—'} DU</div>
          <div style={{ fontSize: 30, fontWeight: 700, color}} className='data'>Measured at: {uvData?.result?.uv_time ?? '—'}</div>
        </div>
      </div>
    </div>
  );
}
