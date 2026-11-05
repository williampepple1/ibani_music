import React, { useState, useEffect } from 'react';
import { X, Video, Plus, AlertCircle, Sparkles, Check, Film } from 'lucide-react';
import { extractYouTubeId, getYouTubeThumbnail } from '../utils/youtube';

export default function AddVideoModal({ isOpen, onClose, onAddSong }) {
  const [urlInput, setUrlInput] = useState('');
  const [extractedId, setExtractedId] = useState('');
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [category, setCategory] = useState('Heritage Club');
  const [kingdom, setKingdom] = useState('Grand Bonny');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [lyricsRaw, setLyricsRaw] = useState('');
  const [error, setError] = useState('');

  // Extract ID when URL input changes
  useEffect(() => {
    if (urlInput.trim()) {
      const id = extractYouTubeId(urlInput);
      if (id) {
        setExtractedId(id);
        setError('');
      } else {
        setExtractedId('');
        if (urlInput.length > 5) {
          setError('Could not recognize a valid YouTube video link or ID. Please check the format.');
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
      setError('Please provide a valid YouTube video URL or ID.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a title for the song or recording.');
      return;
    }

    // Parse lyrics (each line format: "Ibani line // English translation" or just lines)
    const parsedLyrics = lyricsRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        if (line.includes('//')) {
          const parts = line.split('//');
          return { ibani: parts[0].trim(), english: parts[1].trim() };
        }
        return { ibani: line, english: '' };
      });

    const newSong = {
      id: `custom-${Date.now()}`,
      youtubeId: extractedId,
      title: title.trim(),
      artist: artist.trim() || 'Ibani Cultural Artists',
      category,
      kingdom,
      year: year.trim() || new Date().getFullYear().toString(),
      description: description.trim() || 'A user-contributed Ibani cultural video and song.',
      lyrics: parsedLyrics,
      isCustom: true,
      duration: 'Live',
    };

    onAddSong(newSong);

    // Reset form
    setUrlInput('');
    setExtractedId('');
    setTitle('');
    setArtist('');
    setLyricsRaw('');
    setDescription('');
    setYear('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <Video className="text-accent" size={24} />
            <h3>Embed an Ibani YouTube Video</h3>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="form-alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="yt-url" className="form-label">
              YouTube Video URL or Video ID <span className="req">*</span>
            </label>
            <input
              id="yt-url"
              type="text"
              className="form-input"
              placeholder="e.g. https://www.youtube.com/watch?v=... or youtu.be/..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              required
            />
            <small className="form-hint">
              Supports standard YouTube links, Shorts, youtu.be, or raw 11-char IDs.
            </small>
          </div>

          {/* Live Preview if ID is extracted */}
          {extractedId && (
            <div className="preview-box">
              <img 
                src={getYouTubeThumbnail(extractedId)} 
                alt="Thumbnail preview" 
                className="preview-thumb"
              />
              <div className="preview-details">
                <span className="badge badge-success">
                  <Check size={12} /> Valid Video ID Detected
                </span>
                <p className="preview-id">ID: <code>{extractedId}</code></p>
              </div>
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="song-title" className="form-label">
                Song / Video Title <span className="req">*</span>
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

            <div className="form-group">
              <label htmlFor="song-artist" className="form-label">
                Artist / Cultural Group
              </label>
              <input
                id="song-artist"
                type="text"
                className="form-input"
                placeholder="e.g. Lily Club of Bonny / Ejesilem"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>
          </div>

          <div className="form-grid-3">
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
                <option value="Choral & Gospel">Choral & Gospel</option>
                <option value="Language & Lessons">Language & Lessons</option>
                <option value="Contemporary">Contemporary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="kingdom-select-modal" className="form-label">
                Origin / Kingdom
              </label>
              <select
                id="kingdom-select-modal"
                className="form-select"
                value={kingdom}
                onChange={(e) => setKingdom(e.target.value)}
              >
                <option value="Grand Bonny">Grand Bonny</option>
                <option value="Opobo Kingdom">Opobo Kingdom</option>
                <option value="Finima">Finima</option>
                <option value="Pan-Ibani">Pan-Ibani</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year-input" className="form-label">
                Year / Era
              </label>
              <input
                id="year-input"
                type="text"
                className="form-input"
                placeholder="e.g. 1985 / 2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="song-desc" className="form-label">
              Description / Cultural Background
            </label>
            <textarea
              id="song-desc"
              rows={2}
              className="form-textarea"
              placeholder="Explain the background of this recording, ceremonial context, or house association..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="song-lyrics" className="form-label">
              Ibani Lyrics & Translation (Optional)
            </label>
            <textarea
              id="song-lyrics"
              rows={3}
              className="form-textarea font-mono"
              placeholder="Format: Ibani line // English translation (one per line)&#10;Example:&#10;Alua wa bo // Welcome to all of you&#10;Tọbạ da ye na-in // God the Father be with you"
              value={lyricsRaw}
              onChange={(e) => setLyricsRaw(e.target.value)}
            />
            <small className="form-hint">
              Tip: Separate the Ibani verse from its English meaning with <code>//</code>.
            </small>
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
              <Plus size={18} />
              <span>Embed Song on Site</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
