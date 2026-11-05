import React, { useState } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  ExternalLink, 
  Copy, 
  Check, 
  BookOpen, 
  Info, 
  Sparkles,
  MapPin,
  Tag,
  Share2
} from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils/youtube';

export default function VideoPlayer({ 
  currentSong, 
  onNext, 
  onPrev, 
  onShuffle,
  totalSongs,
  currentIndex 
}) {
  const [theaterMode, setTheaterMode] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState('lyrics'); // 'lyrics' | 'about' | 'vocab'
  const [copied, setCopied] = useState(false);

  if (!currentSong) {
    return (
      <div className="player-empty-card">
        <p>No song selected. Choose a song from the library below.</p>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(currentSong.youtubeId, false);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${currentSong.youtubeId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(youtubeWatchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={`player-section ${theaterMode ? 'theater-mode' : ''}`} id="player-view">
      <div className="player-container">
        {/* Main Video Screen */}
        <div className="video-viewport-wrapper">
          <div className="video-viewport">
            <iframe
              src={embedUrl}
              title={`${currentSong.title} - Ibani Music Player`}
              className="youtube-iframe"
              width="1280"
              height="720"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="player-quick-bar">
            <div className="player-nav-controls">
              <button
                type="button"
                className="btn btn-icon"
                onClick={onPrev}
                title="Previous track"
                aria-label="Previous track"
              >
                <SkipBack size={19} />
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={onNext}
                title="Next track"
                aria-label="Next track"
              >
                <SkipForward size={19} />
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={onShuffle}
                title="Shuffle track"
                aria-label="Shuffle track"
              >
                <Shuffle size={18} />
              </button>

              <span className="track-counter">
                {currentIndex + 1} / {totalSongs}
              </span>
            </div>

            <div className="player-view-controls">
              <button
                type="button"
                className="btn btn-icon"
                onClick={() => setTheaterMode(!theaterMode)}
                title={theaterMode ? 'Exit theater mode' : 'Theater mode'}
                aria-label={theaterMode ? 'Exit theater mode' : 'Theater mode'}
              >
                {theaterMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={handleCopyLink}
                title="Copy YouTube Link"
                aria-label="Copy YouTube Link"
              >
                {copied ? <Check size={18} className="text-success" /> : <Share2 size={18} />}
              </button>

              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                title="Watch directly on YouTube"
                aria-label="Watch directly on YouTube"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Video Info Header */}
        <div className="player-meta-box">
          <div className="meta-header">
            <div className="meta-badges">
              <span className="badge badge-category">
                <Tag size={12} />
                {currentSong.category}
              </span>
              <span className="badge badge-kingdom">
                <MapPin size={12} />
                {currentSong.kingdom}
              </span>
              {currentSong.sourceChannel && (
                <span className="badge badge-accent">
                  <Sparkles size={12} />
                  @{currentSong.sourceChannel}
                </span>
              )}
              {currentSong.year && (
                <span className="badge badge-year">{currentSong.year}</span>
              )}
            </div>

            <h2 className="meta-song-title">{currentSong.title}</h2>
            <h3 className="meta-artist-name">{currentSong.artist}</h3>
          </div>

          {/* Interactive Lyrics & Info Tabs */}
          <div className="player-drawer">
            <div className="drawer-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeDrawerTab === 'lyrics'}
                className={`drawer-tab-btn ${activeDrawerTab === 'lyrics' ? 'active' : ''}`}
                onClick={() => setActiveDrawerTab('lyrics')}
              >
                <BookOpen size={16} />
                <span>Ibani Lyrics & Meaning</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeDrawerTab === 'about'}
                className={`drawer-tab-btn ${activeDrawerTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveDrawerTab('about')}
              >
                <Info size={16} />
                <span>Cultural Background</span>
              </button>

              {currentSong.vocabHighlight && currentSong.vocabHighlight.length > 0 && (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeDrawerTab === 'vocab'}
                  className={`drawer-tab-btn ${activeDrawerTab === 'vocab' ? 'active' : ''}`}
                  onClick={() => setActiveDrawerTab('vocab')}
                >
                  <Sparkles size={16} />
                  <span>Key Vocabulary</span>
                </button>
              )}
            </div>

            <div className="drawer-content">
              {activeDrawerTab === 'lyrics' && (
                <div className="lyrics-panel">
                  {currentSong.lyrics && currentSong.lyrics.length > 0 ? (
                    <div className="lyrics-lines">
                      <p className="lyrics-hint">
                        💡 Sing along! Notice the Ibani vowels with sub-dots (ẹ, ị, ọ, ụ) for proper pronunciation.
                      </p>
                      {currentSong.lyrics.map((line, idx) => (
                        <div key={idx} className="lyric-row">
                          <span className="lyric-ibani">{line.ibani}</span>
                          <span className="lyric-english">{line.english}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-lyrics-notice">
                      <p>Full transcription for this song is being compiled by community members.</p>
                      <p className="sub-notice">Know the words or translation? Use the "Add YouTube Song" button to contribute or submit revisions!</p>
                    </div>
                  )}
                </div>
              )}

              {activeDrawerTab === 'about' && (
                <div className="about-panel">
                  <p className="about-text">{currentSong.description}</p>
                  <div className="about-origin-pill">
                    <strong>Cultural Origin:</strong> {currentSong.kingdom} &bull; Rivers State, Niger Delta
                  </div>
                </div>
              )}

              {activeDrawerTab === 'vocab' && currentSong.vocabHighlight && (
                <div className="vocab-panel">
                  <div className="vocab-chips-grid">
                    {currentSong.vocabHighlight.map((item, idx) => (
                      <div key={idx} className="vocab-chip-card">
                        <span className="vocab-word">{item.word}</span>
                        <span className="vocab-meaning">{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

