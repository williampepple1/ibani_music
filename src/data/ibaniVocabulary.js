/**
 * Ibani language vocabulary, phrases, and linguistic notes
 * Ibani (Ịbạnị / Ubani / Bonny) is an Ijo language spoken in Grand Bonny
 * and Opobo Kingdoms in Rivers State, Niger Delta, Nigeria.
 */

export const IBANI_ORTHOGRAPHY = {
  vowels: [
    { char: 'A, a', sound: 'Open front unrounded (as in "father")' },
    { char: 'E, e', sound: 'Close-mid front unrounded (as in "bed")' },
    { char: 'Ẹ, ẹ', sound: 'Open-mid front unrounded (sub-dot indicates lower tongue root)' },
    { char: 'I, i', sound: 'Close front unrounded (as in "see")' },
    { char: 'Ị, ị', sound: 'Near-close front vowel with retracted tongue root' },
    { char: 'O, o', sound: 'Close-mid back rounded (as in "go")' },
    { char: 'Ọ, ọ', sound: 'Open-mid back rounded (as in "saw")' },
    { char: 'U, u', sound: 'Close back rounded (as in "flute")' },
    { char: 'Ụ, ụ', sound: 'Near-close back rounded with retracted tongue root' },
  ],
  digraphs: [
    { char: 'Gb / gb', sound: 'Voiced labial-velar stop, characteristic Niger Delta sound' },
    { char: 'Kp / kp', sound: 'Voiceless labial-velar stop, crisp double articulation' },
    { char: 'Nw / nw', sound: 'Labialized nasal' },
    { char: 'Ny / ny', sound: 'Palatal nasal (as in Spanish "ñ" / "canyon")' },
  ],
  notes: 'Ibani orthography uses sub-dots under ẹ, ị, ọ, and ụ to distinguish Expanded (+ATR) and Non-Expanded (-ATR) vowel harmony sets, a signature feature of Ijo languages.'
};

export const IBANI_PHRASES = [
  {
    category: 'Greetings & Salutations',
    items: [
      { ibani: 'Alua!', english: 'Welcome! / Greetings!', literal: 'Welcome' },
      { ibani: 'Ibani mịe?', english: 'How are the Ibani people? (Traditional greeting)', literal: 'Ibani greetings' },
      { ibani: 'Nua!', english: 'Thank you!', literal: 'Thank you' },
      { ibani: 'Eri mịe?', english: 'Good day / How are you doing?', literal: 'Day greetings' },
      { ibani: 'Tọbạ da ye na-in', english: 'God bless you', literal: 'God the Father be with you' },
      { ibani: 'Miẹ bibi', english: 'Please / Pardon me', literal: 'Sweet word' },
      { ibani: 'Ọ ma bo', english: 'Good bye / Farewell', literal: 'Go and come back' },
    ]
  },
  {
    category: 'Music & Cultural Expressions',
    items: [
      { ibani: 'Nume', english: 'Song / Musical piece', literal: 'Song' },
      { ibani: 'Kiri nume', english: 'Traditional folk song / Dance melody', literal: 'Earth/land song' },
      { ibani: 'Ikpirikpi', english: 'War drum / Resonating wooden talking drum', literal: 'Slit drum' },
      { ibani: 'Erigiri / Igirigi', english: 'Vibrant celebratory rhythm / High energy', literal: 'Surging energy' },
      { ibani: 'Opu-wari', english: 'Chieftaincy house / Ancestral Great House', literal: 'Great House' },
      { ibani: 'Amanyanabo', english: 'King / Sovereign Ruler of the Kingdom', literal: 'Owner of the Land' },
      { ibani: 'Nwaotam', english: 'Sacred masquerade festival of Bonny Kingdom', literal: 'Aquatic cultural masquerade' },
      { ibani: 'Uke', english: 'Age-grade society / Traditional social fraternity', literal: 'Age club' },
    ]
  },
  {
    category: 'People, Nature & Life',
    items: [
      { ibani: 'Tori', english: 'River / Saltwater creek / Ocean waterway', literal: 'Water / River' },
      { ibani: 'Biri', english: 'Town / Community / Heart & soul', literal: 'Town / settlement' },
      { ibani: 'Eremina', english: 'Women / Daughters / Matriarchs of the land', literal: 'Womenfolk' },
      { ibani: 'Opu polo', english: 'Town square / Palace courtyard', literal: 'Grand arena' },
      { ibani: 'Okolo', english: 'Bonny (Ancient Ibani name for Bonny is Okoloma)', literal: 'Curlew bird realm' },
      { ibani: 'Opubo', english: 'Opobo (Founded by King Jaja of Opobo)', literal: 'Great Opubo' },
      { ibani: 'Finima', english: 'Historic coastal town in Bonny Island', literal: 'Sandy beach settlement' },
      { ibani: 'Bolo', english: 'Boat / Canoe / Marine transport', literal: 'Canoe' },
    ]
  }
];

