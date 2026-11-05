'use client';

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
  Play,
  MessageCircle
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

  const getShareableUrl = () => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return `${window.location.origin}/?v=${currentSong.youtubeId}`;
    }
    return youtubeWatchUrl;
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareableUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed:', e);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const shareUrl = getShareableUrl();
    const text = `🎵 Listen to "${currentSong.title}" (${currentSong.artist}) on Ibani Music: ${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
                aria-label="Play video"
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
                    aria-label="Play song"
                  >
                    <Play size={36} fill="currentColor" />
                  </button>
                  <h2 className="video-overlay-song-title">{currentSong.title}</h2>
                </div>
              </div>
            )}
          </div>

          <div className="player-quick-bar">
            <div className="player-nav-controls">
              <div className="nav-btn-cluster">
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
              </div>

              <span className="track-counter">
                {currentIndex + 1} of {totalSongs}
              </span>
            </div>

            <div className="player-view-controls">
              <div className="view-tools-cluster">
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

                {/* Theater Mode */}
                <button
                  type="button"
                  className="btn btn-icon"
                  onClick={() => setTheaterMode(!theaterMode)}
                  title={theaterMode ? 'Exit theater mode' : 'Theater mode'}
                  aria-label={theaterMode ? 'Exit theater mode' : 'Theater mode'}
                >
                  {theaterMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </button>

                {/* WhatsApp Share */}
                <button
                  type="button"
                  className="btn btn-icon btn-whatsapp"
                  onClick={handleShareWhatsApp}
                  title="Share on WhatsApp with preview"
                  aria-label="Share on WhatsApp with preview"
                >
                  <MessageCircle size={16} />
                </button>

                {/* Lyrics Button */}
                {hasLyrics && (
                  <button
                    type="button"
                    className={`btn btn-secondary btn-sm ${showLyrics ? 'active' : ''}`}
                    onClick={() => setShowLyrics(!showLyrics)}
                  >
                    <Music size={14} />
                    <span>{showLyrics ? 'Hide' : 'Lyrics'}</span>
                  </button>
                )}
              </div>

              <div className="view-actions-cluster">
                {/* Copy Link */}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm btn-action-pill"
                  onClick={handleCopyLink}
                  title="Copy shareable link"
                  aria-label="Copy shareable link"
                >
                  {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>

                {/* Visit YouTube Page */}
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm btn-action-pill"
                  title="Visit YouTube page"
                  aria-label="Visit YouTube page"
                >
                  <ExternalLink size={14} />
                  <span>Visit Page</span>
                </a>
              </div>
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
