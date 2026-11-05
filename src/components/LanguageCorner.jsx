import React, { useState } from 'react';
import { BookOpen, Volume2, Search, Check, Copy, Sparkles, HelpCircle } from 'lucide-react';
import { IBANI_ORTHOGRAPHY, IBANI_PHRASES } from '../data/ibaniVocabulary';

export default function LanguageCorner() {
  const [copiedText, setCopiedText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <section className="language-section" id="language-corner">
      <div className="container">
        <div className="section-header-centered">
          <div className="badge badge-accent">
            <Sparkles size={14} />
            <span>Ibani Language Hub</span>
          </div>
          <h2 className="section-title">Learn to Speak & Sing in Ịbạnị</h2>
          <p className="section-subtitle">
            Ibani is a coastal Eastern Ijo language with rich tonal cadences, vowel harmony, 
            and proverbs immortalized in ancient songs.
          </p>
        </div>

        {/* Orthography & Pronunciation Guide */}
        <div className="orthography-card">
          <div className="orthography-header">
            <Volume2 className="text-accent" size={24} />
            <div>
              <h3>Ibani Alphabet & Vowel Harmony Guide</h3>
              <p className="orthography-note">{IBANI_ORTHOGRAPHY.notes}</p>
            </div>
          </div>

          <div className="vowel-grid">
            {IBANI_ORTHOGRAPHY.vowels.map((item, idx) => (
              <div key={idx} className="vowel-box">
                <span className="vowel-letter">{item.char}</span>
                <span className="vowel-desc">{item.sound}</span>
              </div>
            ))}
          </div>

          <div className="digraph-row">
            <h4>Distinct Consonant Blends (Labial-Velar Sounds):</h4>
            <div className="digraph-chips">
              {IBANI_ORTHOGRAPHY.digraphs.map((d, idx) => (
                <div key={idx} className="digraph-chip">
                  <strong>{d.char}</strong> &mdash; <span>{d.sound}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Phrases */}
        <div className="vocab-search-container">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search phrases or English translations (e.g. greeting, king, song, water)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Phrases Categories */}
        <div className="phrase-categories-grid">
          {IBANI_PHRASES.map((group, groupIdx) => {
            const filteredItems = group.items.filter(item => 
              item.ibani.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.literal.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={groupIdx} className="phrase-category-card">
                <h3 className="phrase-group-title">{group.category}</h3>
                <div className="phrases-list">
                  {filteredItems.map((phrase, pIdx) => (
                    <div key={pIdx} className="phrase-card">
                      <div className="phrase-texts">
                        <span className="phrase-ibani">{phrase.ibani}</span>
                        <span className="phrase-english">{phrase.english}</span>
                        {phrase.literal && (
                          <span className="phrase-literal">Lit: {phrase.literal}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="btn-copy-phrase"
                        onClick={() => handleCopy(phrase.ibani)}
                        title="Copy phrase"
                        aria-label={`Copy ${phrase.ibani}`}
                      >
                        {copiedText === phrase.ibani ? (
                          <Check size={16} className="text-success" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

