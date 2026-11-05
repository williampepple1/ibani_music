import React from 'react';
import { Music, PlusCircle } from 'lucide-react';

export default function Navbar({ onOpenAddModal }) {
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

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-primary add-video-nav-btn"
            onClick={onOpenAddModal}
          >
            <PlusCircle size={17} />
            <span>Add Video</span>
          </button>
        </div>
      </div>
    </header>
  );
}
