import React from 'react';
import { Heart, Music, Globe, Shield } from 'lucide-react';

export default function Footer({ onOpenAddModal, onSelectTab }) {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <Music className="brand-icon" size={22} />
            <span className="brand-title">Ịbạnị Nume</span>
          </div>
          <p className="footer-tagline">
            Dedicated to documenting, transmitting, and celebrating the indigenous Ibani language 
            of Grand Bonny and Opobo Kingdoms through the universal harmony of music.
          </p>
          <p className="footer-blessing">
            <em>"Tọbạ da ye na-in"</em> &mdash; May God the Father remain with you.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Navigation</h4>
          <ul className="footer-links-list">
            <li>
              <button 
                type="button" 
                className="footer-link-btn" 
                onClick={() => {
                  onSelectTab('player');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Music Vault
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className="footer-link-btn" 
                onClick={() => {
                  onSelectTab('language');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Language Explorer & Orthography
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className="footer-link-btn" 
                onClick={() => {
                  onSelectTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Kingdom History & Lineage
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className="footer-link-btn highlight" 
                onClick={onOpenAddModal}
              >
                + Embed YouTube Video
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Dialects & Cultural Centers</h4>
          <ul className="footer-links-list static">
            <li>Grand Bonny Kingdom (Okoloma)</li>
            <li>Opobo Kingdom (Opubo)</li>
            <li>Finima Nature Park & Beach</li>
            <li>Peterside (Ayaminima)</li>
            <li>Queenstown & Oloma</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>
            &copy; {new Date().getFullYear()} Ịbạnị Nume Archive. Built for cultural preservation and education.
          </p>
          <div className="footer-badges">
            <span className="footer-badge-item">
              <Globe size={13} /> Eastern Ijo Language Family
            </span>
            <span className="footer-badge-item">
              <Shield size={13} /> Rivers State, Nigeria
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

