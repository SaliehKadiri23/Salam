import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from 'axios';

// Function to get location by IP
const getLocationByIP = async () => {
  try {
    const response = await axios.get('https://ipapi.co/json/');
    const { city, region, country_name } = response.data;
    return `${city}, ${region}, ${country_name}`;
  } catch (error) {
    console.error('Error fetching location by IP:', error);
    return "Kano State, Nigeria"; // fallback
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
      }
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
    throw new Error('Failed to fetch prayer times');
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
};

export const apiSlice = createApi({
  reducerPath: "salam",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  tagTypes: ["Articles", "Forums", "QuestionsAndAnswers", "PrayerTimes"],
  endpoints: (builder) => ({
    // ! ARTICLES
    //  Getting All Articles
    getArticles: builder.query({
      query: () => "/articles",

      //   For sorting he Articles
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
      query: (questionAndAnswerToUpdate) => ({
        url: `/questions_and_answers/${questionAndAnswerToUpdate._id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: questionAndAnswerToUpdate,
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Deleting a QuestionsAndAnswer
    deleteQuestionAndAnswer: builder.mutation({
      query: (_id ) => ({
        url: `/questions_and_answers/${_id}`,
        method: "DELETE",
        
        body: _id,
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
    }),

    // Liking / Un-Liking a QuestionsAndAnswer
    toggleQuestionAndAnswerLike: builder.mutation({
      query: (_id ) => ({
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
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
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
          return { error: { status: 'CUSTOM_ERROR', error: error.message } };
        }
      },
      providesTags: ["PrayerTimes"],
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
} = apiSlice;
