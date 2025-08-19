import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  category: 'All',
  location: 'All',
  skills: 'All',
  timeCommitment: 'All',
  skillLevel: 'All',
  filterOptions: {
    categories: [
      "All",
      "Mosque Events",
      "Educational Programs",
      "Community Outreach",
    ],
    locations: [
      "All",
      "Al-Madinah",
      "Al-Noor",
      "Al-Falah",
      "Remote",
      "Multiple Locations",
      "Various",
    ],
    skills: [
      "All",
      "Event Planning",
      "Teaching",
      "Driving",
      "Arabic",
      "Customer Service",
    ],
    timeCommitments: [
      "All",
      "4-8 hours/week",
      "5-8 hours/week",
      "6-10 hours/week",
      "8-12 hours/week",
      "10-15 hours/week",
      "12-20 hours/week",
    ],
    skillLevels: ["All", "Beginner", "Intermediate", "Advanced"],
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilters: (state) => {
      return initialState;
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;