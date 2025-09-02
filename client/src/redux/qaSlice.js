import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';



const categories = [
  { value: "general", label: "General Questions" },
  { value: "fiqh", label: "Islamic Jurisprudence" },
  { value: "finance", label: "Islamic Finance" },
  { value: "daily-life", label: "Daily Life" },
  { value: "worship", label: "Worship & Prayer" },
];

const filterOptions = [
  { value: "all", label: "All Questions" },
  { value: "answered", label: "Answered" },
  { value: "pending", label: "Pending" },
  { value: "finance", label: "Islamic Finance" },
  { value: "daily-life", label: "Daily Life" },
  { value: "worship", label: "Worship" },
];




const initialState = {
  // Q&A Data
  questions: [],
  stats: {
    questionsAnswered: "0",
    activeScholars: "0", 
    thisMonth: "0"
  },
  
  // Form Management
  questionForm: {
    data: {
      question: "",
      
      category: "general"
    },
    isSubmitting: false,
    errors: null,
    submitSuccess: false
  },
  
  // Search & Filter
  filters: {
    searchQuery: "",
    selectedFilter: "all",
    categories,
    filterOptions
  },
  
  // Individual Question States
  questionStates: {},
  
  // Loading States
  loading: {
    fetchingQuestions: false,
    submittingQuestion: false,
    updatingLike: {}
  },
  
  // Error States
  error: null
};

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    // Form Management
    updateQuestionForm: (state, action) => {
      const { field, value } = action.payload;
      state.questionForm.data[field] = value;
      // Clear errors when user starts typing
      if (state.questionForm.errors) {
        state.questionForm.errors = null;
      }
    },
    
    resetQuestionForm: (state) => {
      state.questionForm.data = {
        question: "",
        
        category: "general"
      };
      state.questionForm.errors = null;
      state.questionForm.submitSuccess = false;
    },
    
    clearFormSuccess: (state) => {
      state.questionForm.submitSuccess = false;
    },
    
    // Search & Filter
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    
    setSelectedFilter: (state, action) => {
      state.filters.selectedFilter = action.payload;
    },
    
    // Question States
    initializeQuestionState: (state, action) => {
      const { questionId, initialLikes } = action.payload;
      if (!state.questionStates[questionId]) {
        state.questionStates[questionId] = {
          isLiked: false,
          likeCount: initialLikes
        };
      }
    },
    
    // Error Management
    clearError: (state) => {
      state.error = null;
    }
  },
  
});

// Actions
export const {
  updateQuestionForm,
  resetQuestionForm,
  clearFormSuccess,
  setSearchQuery,
  setSelectedFilter,
  initializeQuestionState,
  clearError
} = qaSlice.actions;

// Selectors - Updated for RTK Query usage

export const selectQuestionForm = (state) => state.qa.questionForm;
export const selectFilters = (state) => state.qa.filters;
export const selectQuestionStates = (state) => state.qa.questionStates;
export const selectLoading = (state) => state.qa.loading;
export const selectError = (state) => state.qa.error;

export const selectFormValidation = createSelector(
  [selectQuestionForm],
  (form) => {
    const { question  } = form.data;
    return {
      isValid: question.trim(),
      canSubmit: question.trim() && !form.isSubmitting
    };
  }
);


export default qaSlice.reducer;