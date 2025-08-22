import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showFilters: false,
  viewMode: 'grid',
  currentView: 'main', // 'main' or 'detail'
  selectedResource: null,
  activeTab: 0, // For PrayerTimes page tabs (0 = Prayer Times, 1 = Hijri Calendar)
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    openResourceDetail: (state, action) => {
      state.selectedResource = action.payload;
      state.currentView = 'detail';
    },
    closeResourceDetail: (state) => {
      state.selectedResource = null;
      state.currentView = 'main';
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const {
  toggleFilters,
  setViewMode,
  openResourceDetail,
  closeResourceDetail,
  setActiveTab,
} = uiSlice.actions;

export default uiSlice.reducer;