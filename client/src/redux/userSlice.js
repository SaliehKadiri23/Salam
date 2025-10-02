import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarkedItems: [],
  completedItems: [],
  completedSections: {}, // { resourceId: [sectionId1, sectionId2, ...] }
  progressItems: {
    
  },
  reviews: {},
  languages: [
    { code: "en", name: "English" },
    { code: "ar", name: "العربية" },
    { code: "ur", name: "اردو" },
    { code: "fr", name: "Français" },
  ],
  selectedLanguage: "en",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    toggleBookmark: (state, action) => {
      const id = action.payload.toString();
      if (state.bookmarkedItems.includes(id)) {
        state.bookmarkedItems = state.bookmarkedItems.filter((item) => item !== id);
      } else {
        state.bookmarkedItems.push(id);
      }
    },
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      const resourceId = id.toString();
      state.progressItems[resourceId] = progress;
      if (progress >= 100 && !state.completedItems.includes(resourceId)) {
        state.completedItems.push(resourceId);
      }
    },
    markSectionAsCompleted: (state, action) => {
      const { resourceId, sectionId } = action.payload;
      const resourceIdStr = resourceId.toString();
      if (!state.completedSections[resourceIdStr]) {
        state.completedSections[resourceIdStr] = [];
      }
      if (!state.completedSections[resourceIdStr].includes(sectionId)) {
        state.completedSections[resourceIdStr].push(sectionId);
      }
    },
    addReview: (state, action) => {
      const { resourceId, review } = action.payload;
      const resourceIdStr = resourceId.toString();
      if (!state.reviews[resourceIdStr]) {
        state.reviews[resourceIdStr] = [];
      }
      state.reviews[resourceIdStr].push(review);
    },
  },
});

export const { setSelectedLanguage, toggleBookmark, updateProgress, markSectionAsCompleted, addReview } = userSlice.actions;

export default userSlice.reducer;