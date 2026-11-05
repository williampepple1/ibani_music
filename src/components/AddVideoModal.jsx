import React, { useState, useEffect } from 'react';
import { X, Video, Plus, AlertCircle, Check } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

export default function AddVideoModal({ isOpen, onClose, onAddSong }) {
  const [urlInput, setUrlInput] = useState('');
  const [extractedId, setExtractedId] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState('Heritage Club');
  const [error, setError] = useState('');

  useEffect(() => {
    if (urlInput.trim()) {
      const id = extractYouTubeId(urlInput);
      if (id) {
        setExtractedId(id);
        setError('');
      } else {
        setExtractedId('');
        if (urlInput.length > 8) {
          setError('Invalid YouTube link or ID.');
        }
      }
    } else {
      setExtractedId('');
      setError('');
    }
  }, [urlInput]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!extractedId) {
      setError('Please provide a valid YouTube video link or ID.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a song title.');
      return;
    }

    const newSong = {
      id: `custom-${Date.now()}`,
      youtubeId: extractedId,
      title: title.trim(),
      artist: artist.trim() || 'Ibani Music Artist',
      category,
      isCustom: true,
      duration: 'Video',
    };

    onAddSong(newSong);

    setUrlInput('');
    setExtractedId('');
    setTitle('');
    setArtist('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <Video className="text-accent" size={20} />
            <h3>Add YouTube Music Video</h3>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="form-alert-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="yt-url" className="form-label">
              YouTube Video URL or ID <span className="req">*</span>
            </label>
            <input
              id="yt-url"
              type="text"
              className="form-input"
              placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              required
            />
          </div>

          {extractedId && (
            <div className="preview-box">
              <img 
                src={getYouTubeThumbnail(extractedId)} 
                alt="Thumbnail" 
                className="preview-thumb"
              />
              <div className="preview-details">
                <span className="badge badge-success">
                  <Check size={12} /> Valid Video ID
                </span>
                <p className="preview-id"><code>{extractedId}</code></p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="song-title" className="form-label">
              Song Title <span className="req">*</span>
            </label>
            <input
              id="song-title"
              type="text"
              className="form-input"
              placeholder="e.g. Eremina Ogbo - Igirigi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="song-artist" className="form-label">
                Artist / Group
              </label>
              <input
                id="song-artist"
                type="text"
                className="form-input"
                placeholder="e.g. Eremina Ogbo / Ejesilem"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category-select" className="form-label">
                Category
              </label>
              <select
                id="category-select"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Heritage Club">Heritage Club</option>
                <option value="Traditional">Traditional</option>
                <option value="Masquerade & Folk">Masquerade & Folk</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!extractedId || !title.trim()}
            >
              <Plus size={16} />
              <span>Add to Page</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
