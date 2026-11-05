import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer';
import VideoGrid from './components/VideoGrid';
import AddVideoModal from './components/AddVideoModal';
import Footer from './components/Footer';
import { INITIAL_IBANI_SONGS } from './data/ibaniSongs';
import './App.css';

const STORAGE_KEY_CUSTOM_SONGS = 'ibani_custom_songs_v1';
const STORAGE_KEY_THEME = 'ibani_theme_v2';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'minimal';
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [songs, setSongs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_SONGS);
      if (stored) {
        const customParsed = JSON.parse(stored);
        return [...customParsed, ...INITIAL_IBANI_SONGS];
      }
    } catch (err) {
      console.error('Error loading custom songs from storage', err);
    }
    return INITIAL_IBANI_SONGS;
  });

  // Pick a random song to automatically play on initial site load
  const [currentSongId, setCurrentSongId] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_SONGS);
      const all = stored ? [...JSON.parse(stored), ...INITIAL_IBANI_SONGS] : INITIAL_IBANI_SONGS;
      if (all.length > 0) {
        const randIdx = Math.floor(Math.random() * all.length);
        return all[randIdx]?.id || all[0]?.id;
      }
    } catch (err) {
      console.error(err);
    }
    return INITIAL_IBANI_SONGS[0]?.id || '';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const currentSong = songs.find(s => s.id === currentSongId) || songs[0];
  const currentIndex = songs.findIndex(s => s.id === currentSongId);

  const handleSelectSong = (song) => {
    setCurrentSongId(song.id);
    const playerEl = document.getElementById('player-view');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNext = () => {
    if (songs.length <= 1) return;
    const nextIdx = (currentIndex + 1) % songs.length;
    setCurrentSongId(songs[nextIdx].id);
  };

  const handlePrev = () => {
    if (songs.length <= 1) return;
    const prevIdx = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSongId(songs[prevIdx].id);
  };

  const handleShuffle = () => {
    if (songs.length <= 1) return;
    let randIdx = Math.floor(Math.random() * songs.length);
    if (randIdx === currentIndex) {
      randIdx = (randIdx + 1) % songs.length;
    }
    setCurrentSongId(songs[randIdx].id);
  };

  const handleAddSong = (newSong) => {
    const updatedSongs = [newSong, ...songs];
    setSongs(updatedSongs);
    setCurrentSongId(newSong.id);

    try {
      const customOnly = updatedSongs.filter(s => s.isCustom);
      localStorage.setItem(STORAGE_KEY_CUSTOM_SONGS, JSON.stringify(customOnly));
    } catch (err) {
      console.error('Error saving custom song', err);
    }

    setTimeout(() => {
      const playerEl = document.getElementById('player-view');
      if (playerEl) {
        playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleDeleteCustomSong = (id) => {
    const updated = songs.filter(s => s.id !== id);
    setSongs(updated);
    if (currentSongId === id) {
      setCurrentSongId(updated[0]?.id || '');
    }

    try {
      const customOnly = updated.filter(s => s.isCustom);
      localStorage.setItem(STORAGE_KEY_CUSTOM_SONGS, JSON.stringify(customOnly));
    } catch (err) {
      console.error('Error updating storage after delete', err);
    }
  };

  return (
    <div className="app-layout">
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        theme={theme}
        onChangeTheme={setTheme}
      />

      <main className="main-content" id="home">
        <header className="simple-intro-header">
          <div className="container">
            <h1 className="simple-intro-title">Ịbạnị Nume &mdash; Ibani Songs</h1>
            <p className="simple-intro-desc">
              <em>Nume</em> means <strong>song</strong> in the indigenous Ibani language. 
              Explore traditional folk recordings, rhythms, and cultural music from the Niger Delta.
            </p>
          </div>
        </header>

        <VideoPlayer
          currentSong={currentSong}
          currentIndex={currentIndex >= 0 ? currentIndex : 0}
          totalSongs={songs.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onShuffle={handleShuffle}
        />

        <VideoGrid
          songs={songs}
          currentSongId={currentSongId}
          onSelectSong={handleSelectSong}
          onDeleteCustomSong={handleDeleteCustomSong}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      </main>

      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSong={handleAddSong}
      />

      <Footer />
    </div>
  );
}
