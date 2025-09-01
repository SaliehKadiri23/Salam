import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "salam",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:7000" }),
  tagTypes: ["Articles", "Forums", "QuestionsAndAnswers"],
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
        // headers: { "Content-Type": "application/json" },
        body: _id,
      }),
      invalidatesTags: ["QuestionsAndAnswers"],
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
} = apiSlice;
