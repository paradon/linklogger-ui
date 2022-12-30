import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function Home() {
  return <p>This is the home page.</p>;
}

function Bookmark() {
  return <p>Bookmark page</p>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar
          title="Capture"
          items={[
            { label: 'Home', to: '/' },
            { label: 'Capture', to: '/capture' },
          ]}
        />
        <Routes>
          <Route path="/capture" element={<Bookmark />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
