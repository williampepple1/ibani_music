import React from 'react';
import { Music, PlusCircle, BookOpen, Sun, Moon, Info, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAddModal, theme, onToggleTheme, activeTab, onSelectTab }) {
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
            <span className="badge-glow"></span>
            <Music className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Ịbạnị Nume</span>
            <span className="brand-subtitle">Ibani Language Music & Heritage</span>
          </div>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <button
            type="button"
            className={`nav-btn ${activeTab === 'player' ? 'active' : ''}`}
            onClick={() => onSelectTab('player')}
          >
            <Music size={17} />
            <span>Music Vault</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${activeTab === 'language' ? 'active' : ''}`}
            onClick={() => onSelectTab('language')}
          >
            <BookOpen size={17} />
            <span>Learn Ibani</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => onSelectTab('about')}
          >
            <Info size={17} />
            <span>Kingdom & History</span>
          </button>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-secondary theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="btn btn-primary add-video-nav-btn"
            onClick={onOpenAddModal}
          >
            <PlusCircle size={18} />
            <span>Add YouTube Song</span>
          </button>
        </div>
      </div>
    </header>
  );
}
