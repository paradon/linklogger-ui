import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CapturePage from './pages/CapturePage';
import Navbar from './components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar
          title="Capture"
          items={[
            { label: 'Home', to: '/' },
            { label: 'Capture', to: '/capture' },
          ]}
        />
        <div className={styles.content}>
          <Routes>
            <Route path="/capture" element={<CapturePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
