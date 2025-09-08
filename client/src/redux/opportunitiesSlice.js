import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';

// Extend the apiSlice with volunteer opportunities endpoints
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVolunteerOpportunities: builder.query({
      query: () => '/volunteer-opportunities',
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetVolunteerOpportunitiesQuery } = extendedApiSlice;

const initialState = {
  opportunities: [],
};

const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.getVolunteerOpportunities.matchFulfilled,
      (state, { payload }) => {
        state.opportunities = payload;
      }
    );
  },
});

export const { setOpportunities } = opportunitiesSlice.actions;
export default opportunitiesSlice.reducer;