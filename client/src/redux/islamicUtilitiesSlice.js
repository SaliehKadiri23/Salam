import { createSlice } from '@reduxjs/toolkit';

// Islamic quotes for inspiration and reflection
const islamicQuotes = [
  {
    text: "And whoever relies upon Allah - then He is sufficient for him.",
    reference: "Quran 65:3",
  },
  {
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    reference: "Quran 6:73",
  },
  {
    text: "Remember Allah and Allah will remember you.",
    reference: "Hadith",
  },
  {
    text: "The best of people are those who benefit others.",
    reference: "Prophet Muhammad (PBUH)",
  },
];

// Prayer-specific duas for recitation
const duas = {
  fajr: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا",
  dhuhr: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
  asr: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ",
  maghrib: "اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ",
  isha: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ",
};

const initialState = {
  qiblaDirection: 45, // Direction in degrees
  dhikrCount: 0, // Tasbih counter
  currentQuote: 0, // Index for current Islamic quote
  islamicQuotes, // Array of Islamic quotes
  duas, // Prayer-specific duas
};

export const islamicUtilitiesSlice = createSlice({
  name: 'islamicUtilities',
  initialState,
  reducers: {
    setQiblaDirection: (state, action) => {
      state.qiblaDirection = action.payload;
    },
    updateQiblaDirection: (state, action) => {
      // Ensure direction stays within 0-359 degrees
      let newDirection = action.payload;
      if (newDirection < 0) newDirection += 360;
      if (newDirection >= 360) newDirection -= 360;
      state.qiblaDirection = newDirection;
    },
    incrementDhikrCount: (state) => {
      state.dhikrCount += 1;
    },
    decrementDhikrCount: (state) => {
      state.dhikrCount = Math.max(0, state.dhikrCount - 1);
    },
    setDhikrCount: (state, action) => {
      state.dhikrCount = Math.max(0, action.payload);
    },
    resetDhikrCount: (state) => {
      state.dhikrCount = 0;
    },
    setCurrentQuote: (state, action) => {
      state.currentQuote = action.payload;
    },
    nextQuote: (state, action) => {
      // action.payload should be the total number of quotes
      const totalQuotes = action.payload || 4; // Default fallback
      state.currentQuote = (state.currentQuote + 1) % totalQuotes;
    },
    previousQuote: (state, action) => {
      // action.payload should be the total number of quotes
      const totalQuotes = action.payload || 4; // Default fallback
      state.currentQuote = (state.currentQuote - 1 + totalQuotes) % totalQuotes;
    },
  },
});

export const {
  setQiblaDirection,
  updateQiblaDirection,
  incrementDhikrCount,
  decrementDhikrCount,
  setDhikrCount,
  resetDhikrCount,
  setCurrentQuote,
  nextQuote,
  previousQuote,
} = islamicUtilitiesSlice.actions;

export default islamicUtilitiesSlice.reducer;