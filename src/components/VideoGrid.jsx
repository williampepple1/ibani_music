import React, { useState, useMemo } from 'react';
import { Search, Play, Volume2, Trash2, Tag, MapPin, Plus, Sparkles, Filter } from 'lucide-react';
import { getYouTubeThumbnail } from '../utils/youtube';

export default function VideoGrid({ 
  songs, 
  currentSongId, 
  onSelectSong, 
  onDeleteCustomSong,
  onOpenAddModal 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedKingdom, setSelectedKingdom] = useState('All');

  // Categories list
  const categories = ['All', 'Ibanise Archive', 'Heritage Club', 'Traditional', 'Masquerade & Folk', 'Language & Lessons', 'Custom'];
  const kingdoms = ['All', 'Grand Bonny', 'Opobo Kingdom', 'Pan-Ibani'];

  // Filter songs
  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const matchesSearch = 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.lyrics?.some(l => l.ibani.toLowerCase().includes(searchQuery.toLowerCase()) || l.english.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'All' ? true :
        selectedCategory === 'Ibanise Archive' ? (song.sourceChannel === 'Ibanise') :
        selectedCategory === 'Custom' ? Boolean(song.isCustom) :
        song.category === selectedCategory;

      const matchesKingdom = 
        selectedKingdom === 'All' ? true :
        song.kingdom === selectedKingdom;

      return matchesSearch && matchesCategory && matchesKingdom;
    });
  }, [songs, searchQuery, selectedCategory, selectedKingdom]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="catalog-header">
          <div>
            <h2 className="section-title">Music & Audio Vault</h2>
            <p className="section-subtitle">
              Browse recorded performances, traditional songs, and spoken lessons from across the Ibani realm.
            </p>
          </div>

          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onOpenAddModal}
          >
            <Plus size={18} />
            <span>Add YouTube Song</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="filter-controls-card">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by song name, artist, kingdom, lyrics (e.g. Igirigi, Opobo, Bonny, Nwaotam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="category-chips" role="radiogroup" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="kingdom-filter-group">
              <label htmlFor="kingdom-select" className="filter-label">
                <MapPin size={14} />
                <span>Region:</span>
              </label>
              <select
                id="kingdom-select"
                className="kingdom-select"
                value={selectedKingdom}
                onChange={(e) => setSelectedKingdom(e.target.value)}
              >
                {kingdoms.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Video Cards Grid */}
        {filteredSongs.length > 0 ? (
          <div className="video-grid">
            {filteredSongs.map((song) => {
              const isPlaying = song.id === currentSongId;
              const thumbnail = getYouTubeThumbnail(song.youtubeId);

              return (
                <article 
                  key={song.id} 
                  className={`video-card ${isPlaying ? 'card-playing' : ''}`}
                  onClick={() => onSelectSong(song)}
                >
                  <div className="card-thumb-wrapper">
                    <img 
                      src={thumbnail} 
                      alt={song.title} 
                      className="card-thumb-img"
                      loading="lazy"
                    />
                    
                    <div className="card-play-overlay">
                      <div className="play-icon-circle">
                        {isPlaying ? (
                          <Volume2 size={24} className="playing-pulse-icon" />
                        ) : (
                          <Play size={24} fill="currentColor" />
                        )}
                      </div>
                    </div>

                    {song.duration && (
                      <span className="card-duration-badge">{song.duration}</span>
                    )}

                    {isPlaying && (
                      <span className="card-now-playing-badge">
                        <span className="sound-wave"></span>
                        Now Playing
                      </span>
                    )}
                  </div>

                  <div className="card-info">
                    <div className="card-meta-line">
                      <span className="badge badge-category-sm">
                        <Tag size={11} />
                        {song.category}
                      </span>
                      <span className="badge badge-kingdom-sm">
                        <MapPin size={11} />
                        {song.kingdom}
                      </span>
                      {song.sourceChannel && (
                        <span className="badge badge-accent-sm">
                          @{song.sourceChannel}
                        </span>
                      )}
                    </div>

                    <h3 className="card-title" title={song.title}>
                      {song.title}
                    </h3>
                    
                    <p className="card-artist" title={song.artist}>
                      {song.artist}
                    </p>

                    {song.lyrics && song.lyrics.length > 0 && (
                      <div className="card-lyric-preview">
                        <em>"{song.lyrics[0].ibani}"</em>
                      </div>
                    )}

                    <div className="card-footer">
                      <span className="play-prompt">
                        {isPlaying ? 'Currently Active' : 'Click to Play'}
                      </span>

                      {song.isCustom && (
                        <button
                          type="button"
                          className="btn-delete-card"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Remove "${song.title}" from your library?`)) {
                              onDeleteCustomSong(song.id);
                            }
                          }}
                          title="Remove custom song"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <Sparkles size={48} className="empty-icon" />
            <h3>No songs matched your search</h3>
            <p>Try clearing your search filters or add a new YouTube video link to the vault!</p>
            <div className="empty-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedKingdom('All');
                }}
              >
                Reset All Filters
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={onOpenAddModal}
              >
                <Plus size={16} />
                <span>Add YouTube Video</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

