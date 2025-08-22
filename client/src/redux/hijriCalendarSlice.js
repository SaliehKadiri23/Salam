import { createSlice } from '@reduxjs/toolkit';

// Islamic calendar data and events
export const hijriMonths = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

export const islamicEvents = {
  1: "New Year",
  9: "Day of Ashura",
  12: "Mawlid an-Nabi",
  27: "Isra and Mi'raj",
  21: "Laylat al-Qadr",
  10: "Eid al-Adha",
};

const initialState = {
  currentHijriMonth: 0, // Index for hijriMonths array (0 = Muharram)
  currentHijriDate: {
    day: 21,
    month: 1, // Month number (1-12)
    year: 1446
  },
};

export const hijriCalendarSlice = createSlice({
  name: 'hijriCalendar',
  initialState,
  reducers: {
    setCurrentHijriMonth: (state, action) => {
      state.currentHijriMonth = action.payload;
    },
    incrementHijriMonth: (state) => {
      state.currentHijriMonth = (state.currentHijriMonth + 1) % 12;
    },
    decrementHijriMonth: (state) => {
      state.currentHijriMonth = (state.currentHijriMonth - 1 + 12) % 12;
    },
    setCurrentHijriDate: (state, action) => {
      state.currentHijriDate = { ...state.currentHijriDate, ...action.payload };
    },
    setHijriDay: (state, action) => {
      state.currentHijriDate.day = action.payload;
    },
    setHijriYear: (state, action) => {
      state.currentHijriDate.year = action.payload;
    },
    updateFullHijriDate: (state, action) => {
      const { day, month, year } = action.payload;
      state.currentHijriDate = { day, month, year };
      state.currentHijriMonth = month - 1; // Convert month number to index
    },
  },
});

export const {
  setCurrentHijriMonth,
  incrementHijriMonth,
  decrementHijriMonth,
  setCurrentHijriDate,
  setHijriDay,
  setHijriYear,
  updateFullHijriDate,
} = hijriCalendarSlice.actions;

export default hijriCalendarSlice.reducer;