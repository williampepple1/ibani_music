import React from 'react';
import { Music } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#home" className="brand">
          <div className="brand-badge">
            <Music size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Ibani Music</span>
            <span className="brand-subtitle">Indigenous Music Videos</span>
          </div>
        </a>
      </div>
    </header>
  );
}
