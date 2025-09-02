import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prayerTimes: [
    {
      name: "Fajr",
      begins: "05:30",
      iqama: "05:45",
      icon: "Moon",
      next: false,
    },
    {
      name: "Sunrise",
      begins: "06:45",
      iqama: "-",
      icon: "Sunrise",
      next: false,
    },
    {
      name: "Dhuhr",
      begins: "13:15",
      iqama: "13:30",
      icon: "Sun",
      next: true
    },
    {
      name: "Asr",
      begins: "17:00",
      iqama: "17:15",
      icon: "Sun",
      next: false
    },
    {
      name: "Maghrib",
      begins: "20:30",
      iqama: "20:45",
      icon: "Sunset",
      next: false,
    },
    {
      name: "Isha",
      begins: "22:00",
      iqama: "22:15",
      icon: "Moon",
      next: false,
    },
  ],
  location: "Kano State, Nigeria",
  searchQuery: "",
  notificationsEnabled: false,
  audioPlaying: false,
  loading: false,
  error: null,
};

export const prayerTimesSlice = createSlice({
  name: 'prayerTimes',
  initialState,
  reducers: {
    setPrayerTimes: (state, action) => {
      state.prayerTimes = action.payload;
    },
    updatePrayerTime: (state, action) => {
      const { index, prayerData } = action.payload;
      if (state.prayerTimes[index]) {
        state.prayerTimes[index] = { ...state.prayerTimes[index], ...prayerData };
      }
    },
    setNextPrayer: (state, action) => {
      // Reset all prayers' next status
      state.prayerTimes.forEach(prayer => prayer.next = false);
      // Set the specified prayer as next
      const nextPrayerIndex = action.payload;
      if (state.prayerTimes[nextPrayerIndex]) {
        state.prayerTimes[nextPrayerIndex].next = true;
      }
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setAudioPlaying: (state, action) => {
      state.audioPlaying = action.payload;
    },
    toggleAudio: (state) => {
      state.audioPlaying = !state.audioPlaying;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPrayerTimesWithLocation: (state, action) => {
      const { prayerTimes, location } = action.payload;
      state.prayerTimes = prayerTimes;
      state.location = location;
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  setPrayerTimes,
  updatePrayerTime,
  setNextPrayer,
  setLocation,
  setSearchQuery,
  setNotificationsEnabled,
  toggleNotifications,
  setAudioPlaying,
  toggleAudio,
  setLoading,
  setError,
  setPrayerTimesWithLocation,
} = prayerTimesSlice.actions;

export default prayerTimesSlice.reducer;