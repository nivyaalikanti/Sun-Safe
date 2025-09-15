// frontend/src/components/SectionPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Added for navigation
import { chat } from '../api/backendApi';

// Simple factual data
const facts = {
  health: {
    title: "Health & UV",
    stat: "Nearly 1.5 million people were diagnosed with skin cancer worldwide last year.",
    note: "UV safety and SPF guidance are crucial for prevention."
  },
  agriculture: {
    title: "Agriculture & UV",
    stat: "Excessive UV exposure can reduce crop yields by up to 20% in sensitive crops.",
    note: "Protecting plants from stress ensures better food security."
  },
  climate: {
    title: "Climate & UV",
    stat: "Rising UV levels contribute to environmental stress and hinder SDG progress.",
    note: "Monitoring UV trends is key for climate action."
  }
};

// Suggested questions per section
const questions = {
  health: [
    "What SPF sunscreen should I use today?",
    "How does UV affect skin health?",
    "Is it safe to stay outside in this UV index?",
    "What is the best timing to avoid UV exposure?",
    "How can I protect my skin from UV radiation?"
  ],
  agriculture: [
    "How does UV affect crop growth?",
    "What are the best farming practices to reduce UV stress on plants?",
    "Can UV exposure reduce crop yield?",
    "How do UV levels impact irrigation?",
    "What crops are most sensitive to UV radiation?"
  ],
  climate: [
    "How do UV levels affect the environment?",
    "What is the link between UV radiation and climate change?",
    "How does UV radiation impact global warming?",
    "What are the effects of UV radiation on ecosystems?",
    "How does UV radiation contribute to ozone depletion?"
  ]
};

export default function SectionPage({ section }) {
  const navigate = useNavigate();  // Hook to navigate
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  const send = async () => {
    const res = await chat(section, 5.0, "global", input); // Example UV index & location
    if (res.ok) setReply(res.text);
    else setReply('Error getting suggestions.');
  };

  const data = facts[section];
  const suggestedQuestions = questions[section];

  return (
    <div className="container" style={containerStyle}>
      <button 
        className="btn" 
        style={backButtonStyle} 
        onClick={() => navigate('/')}
      >
        Back to Main Page
      </button>

      <h2 style={titleStyle}>{data.title}</h2>
      <p style={factStyle}><b>Fact:</b> {data.stat}</p>
      <p style={noteStyle}><i>{data.note}</i></p>

      {/* Display Suggested Questions */}
      <h3 style={subtitleStyle}>Suggested Questions</h3>
      <div style={questionsWrapperStyle}>
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            className="btn"
            style={questionButtonStyle}
            onClick={() => setInput(question)} // Populate input field with question
          >
            {question}
          </button>
        ))}
      </div>

      <h3 style={subtitleStyle}>Ask for recommendations</h3>
      <textarea
        className="input"
        style={textareaStyle}
        rows={4}
        placeholder="Ask a question or click Send for tips..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={buttonContainerStyle}>
        <button className="btn" style={sendButtonStyle} onClick={send}>Send</button>
        <button 
          className="btn" 
          style={backButtonStyle} 
          onClick={() => navigate('/')}
        >
          Back to Main Page
        </button>
      </div>

      {reply && (
        <div className="card" style={cardStyle}>
          <pre style={preStyle}>{reply}</pre>
        </div>
      )}
    </div>
  );
}

// Inline Styles

const containerStyle = {
  padding: '20px 25px', // Reduced padding a little to make the container shorter
  maxWidth: '900px',
  maxHeight: '600px',
  margin: '50px auto',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  fontFamily: 'Roboto, sans-serif',
  color: '#333',
};

const titleStyle = {
  fontSize: '32px',
  fontWeight: '600',
  color: '#2980b9',
  marginBottom: '15px',
};

const factStyle = {
  fontSize: '18px',
  lineHeight: '1.5',
  color: '#555',
};

const noteStyle = {
  fontSize: '16px',
  fontStyle: 'italic',
  color: '#777',
  marginBottom: '20px',
};

const subtitleStyle = {
  fontSize: '22px',
  fontWeight: '500',
  color: '#2980b9',
  marginTop: '30px',
  marginBottom: '15px',
};

const backButtonStyle = {
  backgroundColor: '#2980b9',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '14px',
  position: 'absolute',
  top: '20px',
  right: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  transition: 'all 0.3s ease-in-out',
};

const questionsWrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
};

const questionButtonStyle = {
  background: '#2980b9',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '20px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'background-color 0.3s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const textareaStyle = {
  width: '97%',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  marginBottom: '20px',
  fontSize: '16px',
  fontWeight: '400',
  backgroundColor: '#f9f9f9',
  transition: 'border-color 0.3s ease',
  outline: 'none',
};

const sendButtonStyle = {
  backgroundColor: '#2980b9',
  color: '#fff',
  padding: '12px 18px',
  borderRadius: '8px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '16px',
  fontWeight: '600',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '15px',
  marginTop: '-12px',
  justifyContent: 'flex-start',
};

const cardStyle = {
  marginTop: '20px',
  backgroundColor: '#f2f2f2',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const preStyle = {
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  color: '#333',
  fontFamily: 'Roboto, sans-serif',
};
