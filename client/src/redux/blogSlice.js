import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchTerm: '',
  selectedCategory: 'All',
  page: 1,
};

const blogSlice = createSlice({
  name: 'blog',
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
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    toggleBookmark: (state, action) => {
      const article = state.articles.find(article => article.id === action.payload);
      if (article) {
        article.isBookmarked = !article.isBookmarked;
      }
    },
  },
});

export const { setSearchTerm, setSelectedCategory, setPage, setArticles, toggleBookmark } = blogSlice.actions;

export default blogSlice.reducer;