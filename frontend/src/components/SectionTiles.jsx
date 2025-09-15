// frontend/src/components/SectionTiles.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SectionTiles() {
  const navigate = useNavigate();

  const sections = [
    { key: 'health', title: 'Health', desc: 'Personal UV safety & SPF guidance' },
    { key: 'agriculture', title: 'Agriculture', desc: 'Crop stress & mitigation tips' },
    { key: 'climate', title: 'Climate', desc: 'Trends, environment & SDGs' }
  ];

  return (
    <div className='parts'>
      <h1>Explore</h1>
      <div style={{ display: 'flex', gap: 20 }} >
        {sections.map(sec => (
          <div 
            key={sec.key}
            style={{
              border: '5px solid #2980b9',
              padding: 30,
              borderRadius: 12,
              cursor: 'pointer',
              flex: 1,
              transition: 'background-color 0.3s, transform 0.2s ease',
              transform: 'scale(1)', // Initial state for scaling
            }}
            onClick={() => navigate(`/${sec.key}`)}  
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'} 
          >
            <h3>{sec.title}</h3>
            <p>{sec.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
