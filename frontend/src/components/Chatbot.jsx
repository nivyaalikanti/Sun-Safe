import React, { useState } from 'react';
import { chat } from '../api/backendApi';

export default function Chatbot({ open, onClose, section, uvIndex, locationName }) {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  // Template questions by section
  const templates = {
    agriculture: [
      "How does UV affect my crop growth?",
      "What precautions should I take for crops during high UV?",
      "Can UV stress reduce yield for rice/wheat?",
      "Best irrigation practices under strong sunlight?",
      "What protective methods help plants in extreme UV?"
    ],
    health: [
      "What SPF sunscreen should I use today?",
      "Is it safe to stay outside at this UV level?",
      "What are the best timings to avoid UV exposure?",
      "Can UV cause long-term skin damage?",
      "What protective clothing works best against UV?"
    ],
    climate: [
      "What is today’s UV trend compared to average?",
      "How does UV affect climate change?",
      "Any link between UV and SDGs?",
      "How does UV radiation impact the environment?",
      "What role does UV monitoring play in sustainability?"
    ]
  };

  const send = async () => {
    const res = await chat(section, uvIndex, locationName, input);
    if (res.ok) setReply(res.text);
    else setReply('Error getting suggestions.');
  };

  if (!open) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="box" onClick={e => e.stopPropagation()}>
        <h3>{section[0].toUpperCase() + section.slice(1)} suggestions</h3>
        <p style={{ marginTop: 0, color: '#666' }}>
          UV Index context: <b>{uvIndex?.toFixed?.(1) ?? '—'}</b>
        </p>

        {/* Suggested questions list */}
        <div style={{ marginBottom: 10 }}>
          {(templates[section.toLowerCase()] || []).map((q, idx) => (
            <button
              key={idx}
              className="btn"
              style={{
                marginRight: 6,
                marginBottom: 6,
                background: '#eee',
                color: '#333',
                fontSize: '0.9em'
              }}
              onClick={() => setInput(q)}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Textarea for custom or selected question */}
        <textarea
          className="input"
          rows={4}
          placeholder="Ask a question or just click Send for tips..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div style={{ height: 10 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={send}>Send</button>
          <button className="btn" onClick={onClose} style={{ background: '#555' }}>Close</button>
        </div>
        <div style={{ height: 12 }} />
        {reply && (
          <div className="chat-result" style={{backgroundColor:blue}}>
            <pre style={{ whiteSpace: 'pre-wrap'}}>{reply}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
