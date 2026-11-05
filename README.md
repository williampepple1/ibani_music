# Ịbạnị Nume (Ibani Music & Language Archive) 🎵🇳🇬

A modern web application built for the preservation, learning, and celebration of the indigenous **Ibani language** (spoken in Grand Bonny and Opobo Kingdoms, Rivers State, Nigeria). The platform embeds and streams authentic cultural music, oral history recordings, and language lessons directly from YouTube, paired with interactive lyrics, orthography breakdowns, and vocabulary glossaries.

---

## 🌟 Key Features

1. **Embedded YouTube Video & Audio Player**
   - Responsive `16:9` embedded YouTube player with zero Cumulative Layout Shift (CLS).
   - Video controls: Next, Previous, Shuffle, and full Theater Mode.
   - Quick action to share or open directly on YouTube.

2. **Interactive Ibani Lyrics & Translation Drawer**
   - Displays authentic Ibani song lines paired with English translations so users can sing along and learn indigenous phrases.
   - Highlights key vocabulary words found within each song with phonetic guides and cultural definitions.

3. **Curated Preset Vault**
   - **Heritage Clubs**: *Eremina Ogbo* (Opobo), *Lily Club* (Grand Bonny), *Ikia Mina Ogbo*.
   - **Traditional & Masquerades**: *Nwaotam* masquerade rhythms, war drums (*Ikpirikpi*), *Uke* folk anthems.
   - **Language & Oral History**: *Let's Speak Ibani* alphabet, vowels with Advanced Tongue Root (ATR) harmonic sub-dots (`ẹ`, `ị`, `ọ`, `ụ`), greetings, and proverbs.
   - **Sacred & Choral**: Ibani Anglican hymns from St. Stephen's Cathedral (Bonny) and St. Paul's (Opobo).

4. **Community Video Curator ("Add YouTube Song")**
   - Easily paste **any** YouTube video URL (`youtube.com/watch`, `youtu.be`, `youtube.com/shorts`, or video ID).
   - Automatic video ID extraction, thumbnail validation, category tagging, and lyrics addition.
   - Persisted in the browser's `localStorage` so custom added songs remain across visits.

5. **Learn Ibani Language Corner**
   - Full orthography guide explaining the 9-vowel system and labial-velar consonants (`gb`, `kp`).
   - Categorized phrasebook (Greetings, Cultural Expressions, Nature & Life) with instant one-click copy.
   - Searchable glossary.

6. **Modern Design System**
   - Niger Delta royal marine and bronze/coral aesthetic with dark and light mode toggle.
   - Fully responsive across desktop, tablet, and mobile devices.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ibani_music.git
cd ibani_music

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will start at `http://localhost:5173`.

### Production Build

```bash
# Build optimized static assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🏛️ About the Ibani Language

**Ibani** (*Ịbạnị*, also referred to as *Ubani* or *Bonny*) is an Eastern Ijo language spoken primarily by the people of the **Grand Bonny Kingdom** and **Opobo Kingdom** in the coastal Niger Delta of Rivers State, Nigeria. 

Notable for its tonal phonology, vowel harmony, and deep proverbs, music has historically functioned as the kingdom's living library, transmitting laws, genealogy, maritime wisdom, and spiritual lore from generation to generation.

---

## 📜 License
MIT License. Built for cultural preservation, education, and community heritage.
