'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import VideoPlayer from '../components/VideoPlayer';
import VideoGrid from '../components/VideoGrid';
import Footer from '../components/Footer';
import { INITIAL_IBANI_SONGS } from '../data/ibaniSongs';

export default function Home() {
  const songs = INITIAL_IBANI_SONGS;
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(INITIAL_IBANI_SONGS[0]?.id || '');

  // Select a random song upon page load
  useEffect(() => {
    if (INITIAL_IBANI_SONGS.length > 0) {
      const randIdx = Math.floor(Math.random() * INITIAL_IBANI_SONGS.length);
      setCurrentSongId(INITIAL_IBANI_SONGS[randIdx]?.id || INITIAL_IBANI_SONGS[0]?.id);
    }
  }, []);

  const currentSong = songs.find(s => s.id === currentSongId) || songs[0];
  const currentIndex = songs.findIndex(s => s.id === currentSongId);

  const handleStartPlayback = () => {
    setHasStarted(true);
  };

  const handleSelectSong = (song) => {
    setHasStarted(true);
    setCurrentSongId(song.id);
    const playerEl = document.getElementById('player-view');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentSongId(songs[nextIdx].id);
  };

  const handlePrev = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSongId(songs[prevIdx].id);
  };

  const handleShuffle = () => {
    setHasStarted(true);
    if (songs.length <= 1) return;
    let randIdx = Math.floor(Math.random() * songs.length);
    if (randIdx === currentIndex) {
      randIdx = (randIdx + 1) % songs.length;
    }
    setCurrentSongId(songs[randIdx].id);
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

