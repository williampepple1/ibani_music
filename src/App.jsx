import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoPlayer from './components/VideoPlayer';
import VideoGrid from './components/VideoGrid';
import AddVideoModal from './components/AddVideoModal';
import LanguageCorner from './components/LanguageCorner';
import AboutIbani from './components/AboutIbani';
import Footer from './components/Footer';
import { INITIAL_IBANI_SONGS } from './data/ibaniSongs';
import './App.css';

const STORAGE_KEY_CUSTOM_SONGS = 'ibani_custom_songs_v1';
const STORAGE_KEY_THEME = 'ibani_theme_v2';

export default function App() {
  // Theme state: 'minimal' (Clean Light) | 'studio' (Spotify Dark) | 'warm' (Terracotta & Sand) | 'royal' (Navy)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'minimal';
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'language' | 'about'

  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Songs list (curated presets + custom user-added)
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

  // Current playing song
  const [currentSongId, setCurrentSongId] = useState(() => {
    return INITIAL_IBANI_SONGS[0]?.id || '';
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentSong = songs.find(s => s.id === currentSongId) || songs[0];
  const currentIndex = songs.findIndex(s => s.id === currentSongId);

  const handleSelectSong = (song) => {
    setCurrentSongId(song.id);
    setActiveTab('player');
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
    setActiveTab('player');

    // Update custom items in localStorage
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
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      <main className="main-content" id="home">
        {activeTab === 'player' && (
          <>
            <Hero
              onStartListening={() => {
                const playerEl = document.getElementById('player-view');
                if (playerEl) {
                  playerEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onExploreLanguage={() => setActiveTab('language')}
              songCount={songs.length}
            />

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
          </>
        )}

        {activeTab === 'language' && (
          <LanguageCorner />
        )}

        {activeTab === 'about' && (
          <AboutIbani />
        )}
      </main>

      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSong={handleAddSong}
      />

      <Footer
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onSelectTab={setActiveTab}
      />
    </div>
  );
}
