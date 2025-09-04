import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedCategory: 'all',
  selectedType: 'all',
  categories: [
    { id: "all", name: "All Resources" },
    { id: "quran", name: "Quranic Studies" },
    { id: "hadith", name: "Hadith" },
    { id: "fiqh", name: "Fiqh" },
    { id: "aqidah", name: "Aqidah" },
    { id: "seerah", name: "Seerah" },
    { id: "history", name: "History" },
    { id: "family", name: "Family" },
    { id: "culture", name: "Culture" },
  ],
  resourceTypes : [
    { id: "all", name: "All Types" },
    { id: "video", name: "Videos" },
    { id: "podcast", name: "Podcasts" },
    { id: "course", name: "Courses" },
  ]
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    addResourceType: (state, action) => {
      state.resourceTypes.push(action.payload);
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
  addCategory,
  addResourceType,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;