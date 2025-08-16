import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarkedItems: [1, 3, 5],
  completedItems: [],
  progressItems: {
    3: 45,
    4: 78,
  },
  reviews: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const id = action.payload;
      if (state.bookmarkedItems.includes(id)) {
        state.bookmarkedItems = state.bookmarkedItems.filter((item) => item !== id);
      } else {
        state.bookmarkedItems.push(id);
      }
    },
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      state.progressItems[id] = progress;
      if (progress >= 100 && !state.completedItems.includes(id)) {
        state.completedItems.push(id);

        
        // delete state.progressItems[id];
      }
    },
    addReview: (state, action) => {
      const { resourceId, review } = action.payload;
      if (!state.reviews[resourceId]) {
        state.reviews[resourceId] = [];
      }
      state.reviews[resourceId].push(review);
    },
  },
});

export const { toggleBookmark, updateProgress, addReview } = userSlice.actions;

export default userSlice.reducer;