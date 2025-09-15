// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SectionPage from './components/SectionPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/health" element={<SectionPage section="health" />} />
        <Route path="/agriculture" element={<SectionPage section="agriculture" />} />
        <Route path="/climate" element={<SectionPage section="climate" />} />
      </Routes>
    </Router>
  );
}
