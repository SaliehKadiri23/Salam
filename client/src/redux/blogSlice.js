import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchTerm: "",
  selectedCategory: "All",
  page: 1,
};

// Helper function to calculate reading time
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    
    // ! MAKE IT WORK WITH RTK QUERY
    toggleBookmark: (state, action) => {
      const article = state.articles.find(
        (article) => article.id === action.payload
      );
      if (article) {
        article.isBookmarked = !article.isBookmarked;
      }
    },
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setPage,
  addArticle,
  toggleBookmark,
} = blogSlice.actions;

export default blogSlice.reducer;
