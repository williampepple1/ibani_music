import React, { useState, useMemo } from 'react';
import { Search, Play, Volume2, Tag } from 'lucide-react';
import { getYouTubeThumbnail } from '../utils/youtube';

export default function VideoGrid({ 
  songs, 
  currentSongId, 
  onSelectSong 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 
    'Eremina Ogbo', 
    'Ejesilem Movement', 
    'Ikia Mina Ogbo', 
    'Masquerade'
  ];

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q);

      let matchesCategory = true;
      if (selectedCategory === 'Eremina Ogbo') {
        matchesCategory = song.artist.toLowerCase().includes('eremina');
      } else if (selectedCategory === 'Ejesilem Movement') {
        matchesCategory = song.artist.toLowerCase().includes('ejesilem');
      } else if (selectedCategory === 'Ikia Mina Ogbo') {
        matchesCategory = song.artist.toLowerCase().includes('ikia');
      } else if (selectedCategory === 'Masquerade') {
        matchesCategory = song.category === 'Masquerade & Folk' || song.title.toLowerCase().includes('nwaotam');
      }

      return matchesSearch && matchesCategory;
    });
  }, [songs, searchQuery, selectedCategory]);

  return (
    <section className="catalog-section" id="catalog">
      <div className="container">
        <div className="catalog-header">
          <h2 className="section-title">Music Library ({filteredSongs.length})</h2>
        </div>

        {/* Search & Filter Bar */}
        <div className="filter-controls-card">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or artist..."
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

          <div className="category-chips">
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
                          <Volume2 size={20} />
                        ) : (
                          <Play size={20} fill="currentColor" />
                        )}
                      </div>
                    </div>

                    {song.duration && (
                      <span className="card-duration-badge">{song.duration}</span>
                    )}

                    {isPlaying && (
                      <span className="card-now-playing-badge">
                        Playing
                      </span>
                    )}
                  </div>

                  <div className="card-info">
                    <h3 className="card-title" title={song.title}>
                      {song.title}
                    </h3>
                    
                    <p className="card-artist" title={song.artist}>
                      {song.artist}
                    </p>

                    <div className="card-footer">
                      <span className="badge badge-category-sm">
                        <Tag size={10} />
                        {song.category}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <p>No videos found matching your filter.</p>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
