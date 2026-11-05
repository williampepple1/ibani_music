import React from 'react';
import { Music } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-bottom-container">
        <div className="footer-brand">
          <Music size={16} />
          <span>Ibani Music</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Ibani Indigenous Music Videos</p>
      </div>
    </footer>
  );
}
