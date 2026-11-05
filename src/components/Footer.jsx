import React from 'react';
import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-bottom-container">
        <div className="footer-brand">
          <img 
            src="/logo.jpg" 
            alt="Ibani Music Logo" 
            className="footer-logo-img" 
          />
          <span>Ibani Music</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Ibani Indigenous Music Videos</p>
      </div>
    </footer>
  );
}
