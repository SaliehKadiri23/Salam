import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  formData: {
    donationType: '',
    amount: 0,
    frequency: 'One-time',
    paymentMethod: '',
  },
  isSubmitting: false,
  submissionSuccess: false,
  submissionError: null,
};

// Mock async thunk for form submission
export const submitDonation = createAsyncThunk(
  'donationForm/submitDonation',
  async (formData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Donation submitted:', formData);
      return true; // Indicates success
    } catch (error) {
      return rejectWithValue('Submission failed. Please try again.');
    }
  }
);

const donationFormSlice = createSlice({
  name: 'donationForm',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 4);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 0);
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDonation.pending, (state) => {
        state.isSubmitting = true;
        state.submissionSuccess = false;
        state.submissionError = null;
      })
      .addCase(submitDonation.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submissionSuccess = true;
        state.currentStep = 4; // Move to success step
      })
      .addCase(submitDonation.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submissionError = action.payload;
      });
  },
});

export const { updateFormData, nextStep, prevStep, setStep, resetForm } =
  donationFormSlice.actions;

export default donationFormSlice.reducer;