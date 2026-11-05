'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';
import VideoGrid from '../components/VideoGrid';
import Footer from '../components/Footer';
import { INITIAL_IBANI_SONGS } from '../data/ibaniSongs';

export default function IbaniMusicApp({ initialSongParam }) {
  const songs = INITIAL_IBANI_SONGS;
  const [hasStarted, setHasStarted] = useState(false);

  // Match initial song if passed via URL parameter (?v=... or ?song=...)
  const initialSong = initialSongParam
    ? songs.find(s => s.youtubeId === initialSongParam || s.id === initialSongParam)
    : null;

  const [currentSongId, setCurrentSongId] = useState(() => {
    return initialSong ? initialSong.id : (INITIAL_IBANI_SONGS[0]?.id || '');
  });

  // If no specific song was requested in URL, pick a random song upon initial load
  useEffect(() => {
    if (!initialSongParam && INITIAL_IBANI_SONGS.length > 0) {
      const randIdx = Math.floor(Math.random() * INITIAL_IBANI_SONGS.length);
      setCurrentSongId(INITIAL_IBANI_SONGS[randIdx]?.id || INITIAL_IBANI_SONGS[0]?.id);
    }
  }, [initialSongParam]);

  const currentSong = songs.find(s => s.id === currentSongId) || songs[0];
  const currentIndex = songs.findIndex(s => s.id === currentSongId);

  // Keep browser address bar URL updated with the current song for easy sharing
  const updateBrowserUrl = (song) => {
    if (typeof window !== 'undefined' && song?.youtubeId) {
      const newUrl = `${window.location.pathname}?v=${song.youtubeId}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  };

  const handleStartPlayback = () => {
    setHasStarted(true);
    if (currentSong) {
      updateBrowserUrl(currentSong);
    }
  };

  const handleSelectSong = (song) => {
    setHasStarted(true);
    setCurrentSongId(song.id);
    updateBrowserUrl(song);
    const playerEl = document.getElementById('player-view');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    const nextSong = songs[nextIdx];
    setCurrentSongId(nextSong.id);
    updateBrowserUrl(nextSong);
  };

  const handlePrev = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    const prevSong = songs[prevIdx];
    setCurrentSongId(prevSong.id);
    updateBrowserUrl(prevSong);
  };

  const handleShuffle = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    let randIdx = Math.floor(Math.random() * songs.length);
    if (randIdx === currentIndex) {
      randIdx = (randIdx + 1) % songs.length;
    }
    const randSong = songs[randIdx];
    setCurrentSongId(randSong.id);
    updateBrowserUrl(randSong);
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content" id="home">
        <header className="simple-intro-header">
          <div className="container">
            <h1 className="simple-intro-title">Ịbạnị Nume &mdash; Ibani Songs</h1>
            <p className="simple-intro-desc">
              Enjoy Ibani nume, traditional folklore, rhythms, and cultural music of the Ibani people from the Niger Delta.
            </p>
          </div>
        </header>

        <VideoPlayer
          currentSong={currentSong}
          currentIndex={currentIndex >= 0 ? currentIndex : 0}
          totalSongs={songs.length}
          hasStarted={hasStarted}
          onStartPlayback={handleStartPlayback}
          onNext={handleNext}
          onPrev={handlePrev}
          onShuffle={handleShuffle}
        />

        <VideoGrid
          songs={songs}
          currentSongId={currentSongId}
          onSelectSong={handleSelectSong}
        />
      </main>

      <Footer />
    </div>
  );
}

