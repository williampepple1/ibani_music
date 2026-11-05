import React from 'react';
import { Play, Sparkles, Volume2, Shield, Compass, Heart } from 'lucide-react';

export default function Hero({ onStartListening, onExploreLanguage, songCount }) {
  return (
    <section className="hero-section">
      <div className="hero-backdrop-pattern" aria-hidden="true"></div>
      
      <div className="container hero-content">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Indigenous Language Preservation &bull; Rivers State, Nigeria</span>
        </div>

        <h1 className="hero-title">
          Celebrate the Soul of <span className="text-gradient">Ịbạnị Language</span> Through Music
        </h1>

        <p className="hero-description">
          Welcome to the digital sanctuary of the Ibani people of Grand Bonny and Opobo Kingdoms. 
          Stream authentic traditional masquerade beats, age-grade folklore, archival vinyl, 
          and sacred choral hymns while learning the lyrics, phonetics, and idioms of our ancestral tongue.
        </p>

        <div className="hero-cta-group">
          <button 
            type="button" 
            className="btn btn-primary btn-lg"
            onClick={onStartListening}
          >
            <Play size={18} fill="currentColor" />
            <span>Play Featured Songs</span>
          </button>

          <button 
            type="button" 
            className="btn btn-secondary btn-lg"
            onClick={onExploreLanguage}
          >
            <Volume2 size={18} />
            <span>Explore Ibani Words</span>
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">{songCount}+</span>
            <span className="stat-label">Archived Songs</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Historic Kingdoms (Bonny & Opobo)</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Indigenous & Community Driven</span>
          </div>
        </div>
      </div>
    </section>
  );
}
