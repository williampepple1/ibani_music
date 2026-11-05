import React from 'react';
import { Music, PlusCircle, Palette } from 'lucide-react';

export default function Navbar({ onOpenAddModal, theme, onChangeTheme }) {
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
          {/* Theme Selector */}
          <div className="theme-select-box" title="Change theme">
            <Palette size={15} />
            <select
              className="theme-dropdown"
              value={theme}
              onChange={(e) => onChangeTheme(e.target.value)}
              aria-label="Theme selector"
            >
              <option value="minimal">Clean Minimal (Light)</option>
              <option value="studio">Midnight Studio (Dark)</option>
              <option value="warm">Warm Earth & Sand</option>
              <option value="royal">Royal Riverine (Navy)</option>
            </select>
          </div>

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
