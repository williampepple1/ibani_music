import React, { useState, useRef, useEffect } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  ExternalLink, 
  Check, 
  Share2, 
  Tag, 
  Music,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '../utils/youtube';

export default function VideoPlayer({ 
  currentSong, 
  onNext, 
  onPrev, 
  onShuffle, 
  totalSongs, 
  currentIndex,
  hasStarted = false,
  onStartPlayback
}) {
  const [theaterMode, setTheaterMode] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Unmuted by default: mute=0
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef(null);

  // Allow any click anywhere on the page to trigger unmuted playback
  useEffect(() => {
    if (hasStarted) return;

    const handleGlobalFirstClick = () => {
      if (onStartPlayback) {
        onStartPlayback();
      }
    };

    window.addEventListener('click', handleGlobalFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleGlobalFirstClick);
    };
  }, [hasStarted, onStartPlayback]);

  if (!currentSong) return null;

  const sendYouTubeCommand = (func, args = '') => {
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      }
    } catch (e) {
      console.warn('YouTube postMessage error:', e);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      sendYouTubeCommand('unMute');
      sendYouTubeCommand('setVolume', [100]);
    } else {
      setIsMuted(true);
      sendYouTubeCommand('mute');
    }
  };

  const embedUrl = getYouTubeEmbedUrl(currentSong.youtubeId, true, isMuted);
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${currentSong.youtubeId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(youtubeWatchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasLyrics = currentSong.lyrics && currentSong.lyrics.length > 0;

  return (
    <section className={`player-section ${theaterMode ? 'theater-mode' : ''}`} id="player-view">
      <div className="container player-container">
        {/* Main Video Screen */}
        <div className="video-viewport-wrapper">
          <div className="video-viewport">
            {hasStarted ? (
              <iframe
                ref={iframeRef}
                key={currentSong.youtubeId}
                src={embedUrl}
                title={currentSong.title}
                className="youtube-iframe"
                width="1280"
                height="720"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div 
                className="video-start-overlay" 
                onClick={onStartPlayback}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onStartPlayback(); }}
                aria-label="Click anywhere to play video with sound"
              >
                <img 
                  src={getYouTubeThumbnail(currentSong.youtubeId)} 
                  alt={currentSong.title}
                  className="video-overlay-thumb" 
                />
                <div className="video-overlay-backdrop" />
                <div className="video-overlay-content">
                  <button 
                    type="button" 
                    className="video-overlay-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartPlayback) onStartPlayback();
                    }}
                    aria-label="Play song with sound"
                  >
                    <Play size={36} fill="currentColor" />
                  </button>
                  <span className="video-overlay-badge">Random Video Loaded</span>
                  <h2 className="video-overlay-song-title">{currentSong.title}</h2>
                  <p className="video-overlay-prompt">
                    <Volume2 size={16} />
                    <span>Click anywhere to play with sound</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="player-quick-bar">
            <div className="player-nav-controls">
              <button
                type="button"
                className="btn btn-icon"
                onClick={onPrev}
                title="Previous video"
                aria-label="Previous video"
              >
                <SkipBack size={18} />
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={onNext}
                title="Next video"
                aria-label="Next video"
              >
                <SkipForward size={18} />
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={onShuffle}
                title="Shuffle video"
                aria-label="Shuffle video"
              >
                <Shuffle size={17} />
              </button>

              <span className="track-counter">
                {currentIndex + 1} of {totalSongs}
              </span>
            </div>

            <div className="player-view-controls">
              {/* Volume Button */}
              <button
                type="button"
                className="btn btn-icon"
                onClick={toggleMute}
                title={isMuted ? "Unmute audio" : "Mute audio"}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>

              {hasLyrics && (
                <button
                  type="button"
                  className={`btn btn-secondary btn-sm ${showLyrics ? 'active' : ''}`}
                  onClick={() => setShowLyrics(!showLyrics)}
                >
                  <Music size={14} />
                  <span>{showLyrics ? 'Hide Lyrics' : 'Lyrics'}</span>
                </button>
              )}

              <button
                type="button"
                className="btn btn-icon"
                onClick={() => setTheaterMode(!theaterMode)}
                title={theaterMode ? 'Exit theater mode' : 'Theater mode'}
                aria-label={theaterMode ? 'Exit theater mode' : 'Theater mode'}
              >
                {theaterMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
              </button>

              <button
                type="button"
                className="btn btn-icon"
                onClick={handleCopyLink}
                title="Copy Link"
                aria-label="Copy Link"
              >
                {copied ? <Check size={17} className="text-success" /> : <Share2 size={17} />}
              </button>

              <a
                href={youtubeWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                title="Open on YouTube"
                aria-label="Open on YouTube"
              >
                <ExternalLink size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Video Info Header */}
        <div className="player-meta-box">
          <div className="meta-badges">
            <span className="badge badge-category">
              <Tag size={12} />
              {currentSong.category}
            </span>
            {currentSong.year && (
              <span className="badge badge-year">{currentSong.year}</span>
            )}
          </div>

          <h1 className="meta-song-title">{currentSong.title}</h1>
          <h2 className="meta-artist-name">{currentSong.artist}</h2>

          {/* Simple Lyrics Box */}
          {hasLyrics && showLyrics && (
            <div className="simple-lyrics-box">
              <div className="lyrics-lines">
                {currentSong.lyrics.map((line, idx) => (
                  <div key={idx} className="lyric-row">
                    <span className="lyric-ibani">{line.ibani}</span>
                    {line.english && (
                      <span className="lyric-english">{line.english}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
