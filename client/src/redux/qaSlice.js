import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

// Mock data that matches the current structure
const mockQAData = [
  {
    id: 1,
    user: "Fatima Khan",
    question: "What are the key principles of Islamic finance, and how do they differ from conventional finance?",
    category: "finance",
    timeAgo: "2 days ago",
    likes: 24,
    hasAnswer: true,
    scholar: "Scholar Ahmed",
    answer: "Islamic finance is based on principles such as the prohibition of interest (riba), risk-sharing, and ethical investing. It differs from conventional finance by avoiding interest-based transactions and promoting fairness and social responsibility.",
    answerTime: "1 day ago",
  },
  {
    id: 2,
    user: "Omar Hassan",
    question: "How can I balance my professional career with my religious obligations as a Muslim?",
    category: "daily-life",
    timeAgo: "3 days ago",
    likes: 18,
    hasAnswer: true,
    scholar: "Scholar Ahmed",
    answer: "Balancing your career and religious obligations involves time management, prioritizing prayers and religious duties, and seeking opportunities to integrate your faith into your work life. It's about finding harmony between your professional and spiritual commitments.",
    answerTime: "2 days ago",
  },
  {
    id: 3,
    user: "Aisha Abdullah",
    question: "What is the proper etiquette for making dua during prayer?",
    category: "worship",
    timeAgo: "1 day ago",
    likes: 12,
    hasAnswer: false,
  },
];

const mockStats = {
  questionsAnswered: "2,847",
  activeScholars: "23",
  thisMonth: "156",
};

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

export const fetchQuestions = createAsyncThunk(
  'qa/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      
      return {
        questions: mockQAData,
        stats: mockStats
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch questions');
    }
  }
);

export const submitQuestion = createAsyncThunk(
  'qa/submitQuestion',
  async (questionData, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      
      // For now, just return success
      return { success: true, message: 'Question submitted successfully' };
    } catch (error) {
      return rejectWithValue('Failed to submit question');
    }
  }
);

export const toggleQuestionLike = createAsyncThunk(
  'qa/toggleQuestionLike',
  async ({ questionId, currentLikeState }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        questionId,
        isLiked: !currentLikeState.isLiked,
        likeCount: currentLikeState.isLiked 
          ? currentLikeState.likeCount - 1 
          : currentLikeState.likeCount + 1
      };
    } catch (error) {
      return rejectWithValue('Failed to update like status');
    }
  }
);

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
      name: "",
      email: "",
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
  
  // Individual Question States (for likes, etc.)
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
        name: "",
        email: "",
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
  
  extraReducers: (builder) => {
    builder
      // Fetch Questions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading.fetchingQuestions = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading.fetchingQuestions = false;
        state.questions = action.payload.questions;
        state.stats = action.payload.stats;
        
        // Initialize question states for likes
        action.payload.questions.forEach(question => {
          if (!state.questionStates[question.id]) {
            state.questionStates[question.id] = {
              isLiked: false,
              likeCount: question.likes
            };
          }
        });
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading.fetchingQuestions = false;
        state.error = action.payload || 'Failed to fetch questions';
      })
      
      // Submit Question
      .addCase(submitQuestion.pending, (state) => {
        state.questionForm.isSubmitting = true;
        state.questionForm.errors = null;
      })
      .addCase(submitQuestion.fulfilled, (state) => {
        state.questionForm.isSubmitting = false;
        state.questionForm.submitSuccess = true;
        // Form will be reset by component after showing success message
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.questionForm.isSubmitting = false;
        state.questionForm.errors = action.payload || 'Failed to submit question';
      })
      
      // Toggle Question Like
      .addCase(toggleQuestionLike.pending, (state, action) => {
        const questionId = action.meta.arg.questionId;
        state.loading.updatingLike[questionId] = true;
      })
      .addCase(toggleQuestionLike.fulfilled, (state, action) => {
        const { questionId, isLiked, likeCount } = action.payload;
        state.questionStates[questionId] = {
          isLiked,
          likeCount
        };
        delete state.loading.updatingLike[questionId];
      })
      .addCase(toggleQuestionLike.rejected, (state, action) => {
        const questionId = action.meta.arg.questionId;
        delete state.loading.updatingLike[questionId];
        // Could add error handling here
      });
  }
});

// Action creators
export const {
  updateQuestionForm,
  resetQuestionForm,
  clearFormSuccess,
  setSearchQuery,
  setSelectedFilter,
  initializeQuestionState,
  clearError
} = qaSlice.actions;

// Selectors
export const selectQAData = (state) => state.qa.questions;
export const selectQAStats = (state) => state.qa.stats;
export const selectQuestionForm = (state) => state.qa.questionForm;
export const selectFilters = (state) => state.qa.filters;
export const selectQuestionStates = (state) => state.qa.questionStates;
export const selectLoading = (state) => state.qa.loading;
export const selectError = (state) => state.qa.error;

// Memoized selectors for performance
export const selectFilteredQuestions = createSelector(
  [selectQAData, selectFilters],
  (questions, filters) => {
    const { searchQuery, selectedFilter } = filters;
    
    return questions.filter((qa) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.user.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Category filter
      if (selectedFilter === "all") return true;
      if (selectedFilter === "answered") return qa.hasAnswer;
      if (selectedFilter === "pending") return !qa.hasAnswer;
      return qa.category === selectedFilter;
    });
  }
);

export const selectFormValidation = createSelector(
  [selectQuestionForm],
  (form) => {
    const { question, name, email } = form.data;
    return {
      isValid: question.trim() && name.trim() && email.trim(),
      canSubmit: question.trim() && name.trim() && email.trim() && !form.isSubmitting
    };
  }
);

export const selectQuestionById = (questionId) => createSelector(
  [selectQAData, selectQuestionStates],
  (questions, questionStates) => {
    const question = questions.find(q => q.id === questionId);
    const state = questionStates[questionId];
    
    if (!question) return null;
    
    return {
      ...question,
      isLiked: state?.isLiked || false,
      displayLikes: state?.likeCount ?? question.likes
    };
  }
);

export default qaSlice.reducer;