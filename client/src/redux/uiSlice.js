import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showFilters: false,
  viewMode: 'grid',
  currentView: 'main', // 'main' or 'detail'
  selectedResource: null,
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
  },
});

export const {
  toggleFilters,
  setViewMode,
  openResourceDetail,
  closeResourceDetail,
} = uiSlice.actions;

export default uiSlice.reducer;