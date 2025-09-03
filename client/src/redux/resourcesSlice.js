import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';

// Extend the apiSlice with resource endpoints
export const resourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all resources
    getResources: builder.query({
      query: () => '/resources',
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Resources', id })),
              { type: 'Resources', id: 'LIST' },
            ]
          : [{ type: 'Resources', id: 'LIST' }],
    }),
    
    // Get a single resource
    getResource: builder.query({
      query: (id) => `/resources/${id}`,
      providesTags: (result, error, id) => [{ type: 'Resources', id }],
    }),
    
    // Create a new resource
    createResource: builder.mutation({
      query: (newResource) => ({
        url: '/resources',
        method: 'POST',
        body: newResource,
      }),
      invalidatesTags: [{ type: 'Resources', id: 'LIST' }],
    }),
    
    // Update a resource
    updateResource: builder.mutation({
      query: ({ id, ...updatedResource }) => ({
        url: `/resources/${id}`,
        method: 'PATCH',
        body: updatedResource,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Resources', id },
        { type: 'Resources', id: 'LIST' },
      ],
    }),
    
    // Delete a resource
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Resources', id },
        { type: 'Resources', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetResourcesQuery,
  useGetResourceQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = resourcesApiSlice;

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
    { id: "article", name: "Articles" },
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