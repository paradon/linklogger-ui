import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CapturePage from './pages/CapturePage';
import Navbar from './components/Navbar';
import styles from './App.module.css';

function Home() {
  return <p>This is the home page.</p>;
}

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
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
