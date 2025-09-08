import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from 'axios';

// Function to get location by IP
const getLocationByIP = async () => {
  try {
    // First, try to get location using a more reliable service
    try {
      const response = await axios.get('https://ipapi.co/json/', {
        timeout: 5000 // 5 second timeout
      });
      const { city, region, country_name } = response.data;
      // Check if we have valid data
      if (city && region && country_name) {
        return `${city}, ${region}, ${country_name}`;
      }
    } catch (primaryError) {
      console.warn('Primary IP API failed:', primaryError.message);
    }
    
    // If the primary service fails, try a fallback
    try {
      const response = await axios.get('https://ipwho.is/', {
        timeout: 5000 // 5 second timeout
      });
      const { city, region, country } = response.data;
      // Check if we have valid data
      if (city && region && country) {
        return `${city}, ${region}, ${country}`;
      }
    } catch (fallbackError) {
      console.warn('Fallback IP API failed:', fallbackError.message);
    }
    
    // If both services fail, use the default
    throw new Error('Unable to detect location');
  } catch (error) {
    console.error('Error fetching location by IP:', error);
    throw new Error('Unable to detect your location automatically');
  }
};

// Function to get prayer times by address
const getPrayerTimesByAddress = async (address) => {
  try {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/today`, {
      params: {
        address,
        method: 2, // ISNA
        school: 0  // Shafi/Maliki/Hanbali
      },
      timeout: 10000 
    });
    
    const { data } = response;
    if (data && data.code === 200 && data.data) {
      const { timings } = data.data;
      
      return [
        {
          name: "Fajr",
          begins: timings.Fajr,
          iqama: timings.Fajr,
          icon: "Moon",
          next: false
        },
        {
          name: "Sunrise",
          begins: timings.Sunrise,
          iqama: "-",
          icon: "Sunrise",
          next: false
        },
        {
          name: "Dhuhr",
          begins: timings.Dhuhr,
          iqama: timings.Dhuhr,
          icon: "Sun",
          next: false
        },
        {
          name: "Asr",
          begins: timings.Asr,
          iqama: timings.Asr,
          icon: "Sun",
          next: false
        },
        {
          name: "Maghrib",
          begins: timings.Maghrib,
          iqama: timings.Maghrib,
          icon: "Sunset",
          next: false
        },
        {
          name: "Isha",
          begins: timings.Isha,
          iqama: timings.Isha,
          icon: "Moon",
          next: false
        }
      ];
    }
    throw new Error('Invalid response from prayer times API');
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    // Default prayer times as fallback
    const defaultTimes = [
      {
        name: "Fajr",
        begins: "05:30",
        iqama: "05:45",
        icon: "Moon",
        next: false
      },
      {
        name: "Sunrise",
        begins: "06:45",
        iqama: "-",
        icon: "Sunrise",
        next: false
      },
      {
        name: "Dhuhr",
        begins: "13:15",
        iqama: "13:30",
        icon: "Sun",
        next: true
      },
      {
        name: "Asr",
        begins: "17:00",
        iqama: "17:15",
        icon: "Sun",
        next: false
      },
      {
        name: "Maghrib",
        begins: "20:30",
        iqama: "20:45",
        icon: "Sunset",
        next: false
      },
      {
        name: "Isha",
        begins: "22:00",
        iqama: "22:15",
        icon: "Moon",
        next: false
      }
    ];
    throw new Error('Unable to fetch prayer times.');
  }
};

export const apiSlice = createApi({
  reducerPath: "salam",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  tagTypes: [
    "Articles",
    "Forums",
    "QuestionsAndAnswers",
    "PrayerTimes",
    "IslamicQuotes",
    "Resources",
    "DuaRequests",
  ],
  endpoints: (builder) => ({
    // ! ARTICLES
    //  Getting All Articles
    getArticles: builder.query({
      query: () => "/articles",

      //   For sorting the Articles
      //   transformErrorResponse: (res) =>
      //     res.sort((a, b) => new Date(a.publishDate)  - new Date(b.publishDate) ),
      providesTags: ["Articles"],
    }),

    // Adding an Article
    addNewArticle: builder.mutation({
      query: (newArticle) => ({
        url: "/articles",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newArticle,
      }),
      invalidatesTags: ["Articles"],
    }),

    // Updating an Article
    updateArticle: builder.mutation({
      query: (articleToUpdate) => ({
        url: `/articles/${articleToUpdate._id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: articleToUpdate,
      }),
      invalidatesTags: ["Articles"],
    }),

    // Deleting an Article
    deleteArticle: builder.mutation({
      query: ({ _id }) => ({
        url: `/articles/${_id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: _id,
      }),
      invalidatesTags: ["Articles"],
    }),

    // ! FORUMS
    // Getting all Forums
    getForums: builder.query({
      query: () => "/forums",
      providesTags: ["Forums"],
    }),

    // ! QuestionsAndAnswers
    // Getting all "Questions And Answers"
    getQuestionsAndAnswers: builder.query({
      query: () => "/questions_and_answers",
      providesTags: ["QuestionsAndAnswers"],
    }),

    // Adding a QuestionsAndAnswer
    addNewQuestionAndAnswer: builder.mutation({
      query: (newQuestionAndAnswer) => ({
        url: "/questions_and_answers",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newQuestionAndAnswer,
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Updating a QuestionsAndAnswer
    updateQuestionAndAnswer: builder.mutation({
      query: (questionAndAnswerToUpdate) => {
        // Create a clean update object without the _id field
        const { _id, ...updateData } = questionAndAnswerToUpdate;
        
        return {
          url: `/questions_and_answers/${_id}`,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: updateData,
        };
      },
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Deleting a QuestionsAndAnswer
    deleteQuestionAndAnswer: builder.mutation({
      query: (_id) => ({
        url: `/questions_and_answers/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Liking / Un-Liking a QuestionsAndAnswer
    toggleQuestionAndAnswerLike: builder.mutation({
      query: (_id) => ({
        url: `/questions_and_answers/${_id}/like`,
        method: "POST",
      }),
      // TODO : Implement individual QA invalidation
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // ! PRAYER TIMES
    // Getting prayer times by IP location
    getPrayerTimesByIPLocation: builder.query({
      queryFn: async () => {
        try {
          const location = await getLocationByIP();
          const prayerTimes = await getPrayerTimesByAddress(location);
          return { data: { prayerTimes, location } };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: ["PrayerTimes"],
    }),

    // Getting prayer times by specific location
    getPrayerTimesByLocation: builder.query({
      queryFn: async (location) => {
        try {
          const prayerTimes = await getPrayerTimesByAddress(location);
          return { data: { prayerTimes, location } };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: error.message } };
        }
      },
      providesTags: ["PrayerTimes"],
    }),

    // ! Newsletter
    addNewsletterSignUp: builder.mutation({
      query: (email) => ({
        url: "/newsletter",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Getting all Newsletter Subscribers
    getNewsletterSubscribers: builder.query({
      query: () => "/newsletter",
      providesTags: ["NewsletterSubscribers"],
    }),

    // ! Islamic Quotes
    // Get all Islamic quotes
    getIslamicQuotes: builder.query({
      query: () => "/islamic-quotes",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "IslamicQuotes",
                id: _id,
              })),
              { type: "IslamicQuotes", id: "LIST" },
            ]
          : [{ type: "IslamicQuotes", id: "LIST" }],
    }),

    // ! Resources
    // Get all resources
    getResources: builder.query({
      query: () => "/resources",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Resources", id:_id })),
              { type: "Resources", id: "LIST" },
            ]
          : [{ type: "Resources", id: "LIST" }],
    }),

    // Get a single resource
    getResource: builder.query({
      query: (id) => `/resources/${id}`,
      providesTags: (result, error, id) => [{ type: "Resources", id }],
    }),

    // Create a new resource
    createResource: builder.mutation({
      query: (newResource) => ({
        url: "/resources",
        method: "POST",
        body: newResource,
      }),
      invalidatesTags: [{ type: "Resources", id: "LIST" }],
    }),

    // Update a resource
    updateResource: builder.mutation({
      query: (updatedResource) => ({
        url: `/resources/${updatedResource._id}`,
        method: "PATCH",
        body: updatedResource,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "Resources", id: _id },
        { type: "Resources", id: "LIST" },
      ],
    }),

    // Delete a resource
    deleteResource: builder.mutation({
      query: (_id) => ({
        url: `/resources/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, _id) => [
        { type: "Resources", id: _id },
        { type: "Resources", id: "LIST" },
      ],
    }),

    // Get the Quote of the Day
    getQuoteOfTheDay: builder.query({
      query: () => "/islamic-quotes/quote-of-the-day",
      providesTags: ["IslamicQuotes"],
    }),

    // Get latest 7 Islamic quotes for rotation
    getLatestIslamicQuotes: builder.query({
      query: () => "/islamic-quotes/latest",
      providesTags: ["IslamicQuotes"],
    }),

    // Add a new Islamic quote
    addIslamicQuote: builder.mutation({
      query: (newQuote) => ({
        url: "/islamic-quotes",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newQuote,
      }),
      invalidatesTags: [{ type: "IslamicQuotes", id: "LIST" }],
    }),

    // Update an Islamic quote
    updateIslamicQuote: builder.mutation({
      query: ({ id, ...updatedQuote }) => ({
        url: `/islamic-quotes/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedQuote,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "IslamicQuotes", id },
        { type: "IslamicQuotes", id: "LIST" },
      ],
    }),

    // Delete an Islamic quote
    deleteIslamicQuote: builder.mutation({
      query: (id) => ({
        url: `/islamic-quotes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "IslamicQuotes", id },
        { type: "IslamicQuotes", id: "LIST" },
      ],
    }),

    // ! Dua Requests
    // Get all Dua Requests
    getDuaRequests: builder.query({
      query: () => "/dua-requests",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "DuaRequests", id: _id })),
              { type: "DuaRequests", id: "LIST" },
            ]
          : [{ type: "DuaRequests", id: "LIST" }],
    }),

    // Create a new Dua Request
    createDuaRequest: builder.mutation({
      query: (newDuaRequest) => ({
        url: "/dua-requests",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newDuaRequest,
      }),
      invalidatesTags: [{ type: "DuaRequests", id: "LIST" }],
    }),

    // Update a Dua Request
    updateDuaRequest: builder.mutation({
      query: ({ _id, ...updatedDuaRequest }) => ({
        url: `/dua-requests/${_id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatedDuaRequest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "DuaRequests", id },
        { type: "DuaRequests", id: "LIST" },
      ],
    }),

    // Delete a Dua Request
    deleteDuaRequest: builder.mutation({
      query: (id) => ({
        url: `/dua-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "DuaRequests", id },
        { type: "DuaRequests", id: "LIST" },
      ],
    }),

    // Increment prayer count for a Dua Request
    incrementDuaRequestPrayerCount: builder.mutation({
      query: (id) => ({
        url: `/dua-requests/${id}/pray`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => [{ type: "DuaRequests", id }],
    }),
  }),
});

export const {
  // Articles
  useGetArticlesQuery,
  useAddNewArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,

  // Forums
  useGetForumsQuery,

  // QuestionsAndAnswers
  useGetQuestionsAndAnswersQuery,
  useAddNewQuestionAndAnswerMutation,
  useUpdateQuestionAndAnswerMutation,
  useDeleteQuestionAndAnswerMutation,
  useToggleQuestionAndAnswerLikeMutation,
  
  // PrayerTimes
  useGetPrayerTimesByIPLocationQuery,
  useGetPrayerTimesByLocationQuery,
  
  // Newsletter
  useAddNewsletterSignUpMutation,
  useGetNewsletterSubscribersQuery,
  
  // Islamic Quotes
  useGetIslamicQuotesQuery,
  useGetQuoteOfTheDayQuery,
  useGetLatestIslamicQuotesQuery,
  useAddIslamicQuoteMutation,
  useUpdateIslamicQuoteMutation,
  useDeleteIslamicQuoteMutation,
  
  // Resources
  useGetResourcesQuery,
  useGetResourceQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,

  // Dua Requests
  useGetDuaRequestsQuery,
  useCreateDuaRequestMutation,
  useUpdateDuaRequestMutation,
  useDeleteDuaRequestMutation,
  useIncrementDuaRequestPrayerCountMutation,
} = apiSlice;
