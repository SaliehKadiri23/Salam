import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

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
        body: newArticle,
      }),
      invalidatesTags: ["Articles"],
    }),

    // Updating an Article
    updateArticle: builder.mutation({
      query: (articleToUpdate) => ({
        url: `/articles/${articleToUpdate._id}`,
        method: "PATCH",
        body: articleToUpdate,
      }),
      invalidatesTags: ["Articles"],
    }),

    // Deleting an Article
    deleteArticle: builder.mutation({
      query: ({ _id }) => ({
        url: `/articles/${_id}`,
        method: "DELETE",
        body: _id,
      }),
      invalidatesTags: ["Articles"],
    }),

    // ! FORUMS
    // Getting all Articles
    getForums: builder.query({
      query: () => "/forums",
      providesTags: ["Forums"],
    }),

    // ! QuestionsAndAnswers
    // Getting all "Questions And Answers
    getQuestionsAndAnswers: builder.query({
      query: () => "/questions_and_answers",
      providesTags: ["QuestionsAndAnswers"],
    }),
  }),
});

export const {useGetArticlesQuery, useAddNewArticleMutation, useUpdateArticleMutation, useDeleteArticleMutation, useGetForumsQuery, useGetQuestionsAndAnswersQuery} = apiSlice