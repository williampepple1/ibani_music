import React from 'react';
import { Music, PlusCircle, BookOpen, Info, Palette } from 'lucide-react';

export default function Navbar({ onOpenAddModal, theme, onChangeTheme, activeTab, onSelectTab }) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a 
          href="#home" 
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            onSelectTab('player');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="brand-badge">
            <Music className="brand-icon" size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Ịbạnị Nume</span>
            <span className="brand-subtitle">Ibani Music & Language Archive</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <button
            type="button"
            className={`nav-btn ${activeTab === 'player' ? 'active' : ''}`}
            onClick={() => onSelectTab('player')}
          >
            <Music size={16} />
            <span>Music Vault</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${activeTab === 'language' ? 'active' : ''}`}
            onClick={() => onSelectTab('language')}
          >
            <BookOpen size={16} />
            <span>Learn Ibani</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => onSelectTab('about')}
          >
            <Info size={16} />
            <span>Kingdom & History</span>
          </button>
        </nav>

        <div className="nav-actions">
          {/* Theme Selector */}
          <div className="theme-select-box" title="Change site theme">
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
            <span>Add YouTube Song</span>
          </button>
        </div>
      </div>
    </header>
  );
}
