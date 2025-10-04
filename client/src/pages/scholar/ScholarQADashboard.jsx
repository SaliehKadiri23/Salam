import React, { useState, useEffect } from "react";
import {
  useGetQuestionsAndAnswersQuery,
  useUpdateQuestionAndAnswerMutation,
  useDeleteQuestionAndAnswerMutation,
} from "../../services/apiSlice";
import {
  MessageCircle,
  Search,
  Clock,
  CheckCircle,
  Star,
  Trash2,
  Edit,
  RefreshCw,
} from "lucide-react";
import { useSelector } from "react-redux";
import { getTimeAgo } from "../../utils/timeUtils";
import { toast } from "react-toastify";
import FilterDropdown from "../../components/qa/scholar/FilterDropdown";

const ScholarQADashboard = () => {
  const {
    data: questions = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetQuestionsAndAnswersQuery();
  const [updateQuestionAndAnswer] = useUpdateQuestionAndAnswerMutation();
  const [deleteQuestionAndAnswer] = useDeleteQuestionAndAnswerMutation();
  
  // Get the logged-in user from Redux store
  const user = useSelector(state => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, answered, pending
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate delay for data fetching
  const delayedRefetch = async () => {
    try {
      setIsRefreshing(true);
      // Add a 1500ms delay to simulate real data fetching
      await new Promise((resolve) => setTimeout(resolve, 1500));
      refetch();
      if (isError || error) {
        setIsRefreshing(false);
        return toast.error("Failed to get Questions And Answers!");
      }
      setIsRefreshing(false);
      toast.success("Questions And Answers Updated successfully!");
    } catch (error) {
      toast.error("Failed to get Questions And Answers!");
    }
  };

  // Filter questions based on search and filter criteria
  const filteredQuestions = questions.filter((qa) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (qa.answer &&
        qa.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (qa.askedBy?.profileInfo?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    if (filter === "all") return matchesSearch;
    if (filter === "answered") return matchesSearch && qa.isAnswered;
    if (filter === "pending") return matchesSearch && !qa.isAnswered;

    return matchesSearch;
  });

  const handleAnswerSubmit = async (questionId) => {
    if (!answerText.trim()) {
      toast.error("Please provide an answer before submitting");
      return;
    }

    try {
      const updatedQuestion = {
        _id: questionId,
        answer: answerText,
      };

      // Only set these fields if they don't already exist or if we're updating
      const question = questions.find((q) => q._id === questionId);
      if (question && !question.isAnswered) {
        updatedQuestion.isAnswered = true;
        updatedQuestion.answeredBy = user?.id || "68bc42e761037ccd9005230b"; // Use logged-in user's ID
        updatedQuestion.dateAnswered = new Date().toISOString();
      }

      await updateQuestionAndAnswer(updatedQuestion).unwrap();
      setAnswerText("");
      setEditingQuestionId(null);
      delayedRefetch(); // Refresh the data
      toast.success(
        question && question.isAnswered
          ? "Answer updated successfully!"
          : "Answer submitted successfully!"
      );
    } catch (err) {
      console.error("Failed to submit answer:", err);
      toast.error("Failed to submit answer. Please try again.");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestionAndAnswer(questionId).unwrap();
        delayedRefetch(); // Refresh the data
        toast.success("Question deleted successfully!");
      } catch (err) {
        console.error("Failed to delete question:", err);
        toast.error("Failed to delete question. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Scholar Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Section - Loading Skeleton */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Questions List - Loading Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="animate-pulse space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
            <div className="text-red-500 mb-4">
              <p className="font-semibold text-lg">Error loading questions</p>
              <p className="text-sm mt-2">
                {error?.message || "An error occurred while fetching questions"}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white truncate">
              Scholar Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 truncate">
              Manage community questions and provide answers
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 min-w-0">
            <button
              onClick={delayedRefetch}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isRefreshing
                  ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="whitespace-nowrap">
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </button>

            <div className="flex flex-wrap items-center gap-3 min-w-0">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative whitespace-nowrap">
                <FilterDropdown value={filter} onChange={setFilter} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Statistics
              </h2>

              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-5 lg:grid-cols-1">
                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Total Questions
                    </p>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      {questions.length}
                    </p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Pending Questions
                    </p>
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {questions.filter((q) => !q.isAnswered).length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Answered Questions
                    </p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {questions.filter((q) => q.isAnswered).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Quick Actions
              </h2>

              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-1 sm:gap-4">
                <button
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    setFilter("pending");
                    setSearchQuery("");
                  }}
                >
                  <span className="font-medium text-gray-800 dark:text-white">
                    View Pending Questions
                  </span>
                  <Clock className="w-5 h-5 text-amber-500" />
                </button>

                <button
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => {
                    setFilter("answered");
                    setSearchQuery("");
                  }}
                >
                  <span className="font-medium text-gray-800 dark:text-white">
                    View Answered Questions
                  </span>
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Community Questions
                  <span className="text-gray-500 dark:text-gray-400 text-base font-normal ml-2">
                    ({filteredQuestions.length})
                  </span>
                </h2>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500">
                    {searchQuery || filter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "There are currently no questions in the community"}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredQuestions.map((qa) => (
                    <div
                      key={qa._id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all hover:shadow-md"
                    >
                      {/* Question Section */}
                      <div className="p-5 bg-white dark:bg-gray-800">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-full capitalize">
                              {qa.questionCategory.replace("-", " ")}
                            </span>
                            {qa.isAnswered ? (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                Answered
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full">
                                Pending
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{getTimeAgo(qa.dateAsked)}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="font-medium text-gray-800 dark:text-white mb-1">
                            Asked by: {qa.askedBy?.profileInfo?.fullName || "Anonymous"}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            {qa.question}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                  <CheckCircle className="w-4 h-4" />
                  Answered by {typeof qa.answeredBy === 'object' ? (qa.answeredBy?.profileInfo?.fullName || "Scholar") : qa.answeredBy || "Scholar"}
                </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteQuestion(qa._id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Answer Section */}
                      {qa.isAnswered ? (
                        <div className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span className="font-medium text-gray-800 dark:text-white">
                              Answer by {typeof qa.answeredBy === 'object' ? (qa.answeredBy?.profileInfo?.fullName || "Scholar") : qa.answeredBy || "Scholar"}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              ({getTimeAgo(qa.dateAnswered)})
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {qa.answer}
                          </p>

                          <div className="mt-4">
                            <button
                              onClick={() => {
                                setEditingQuestionId(qa._id);
                                setAnswerText(qa.answer);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit Answer</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 p-5">
                          <button
                            onClick={() => {
                              setEditingQuestionId(qa._id);
                              setAnswerText("");
                            }}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                          >
                            Provide Answer
                          </button>
                        </div>
                      )}

                      {/* Answer Form (when editing/adding) */}
                      {editingQuestionId === qa._id && (
                        <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-700/50">
                          <div className="mb-4">
                            <label
                              htmlFor={`answer-${qa._id}`}
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                              Your Answer
                            </label>
                            <textarea
                              id={`answer-${qa._id}`}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="Provide your detailed answer here..."
                              value={answerText}
                              onChange={(e) => setAnswerText(e.target.value)}
                            />
                          </div>

                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => {
                                setEditingQuestionId(null);
                                setAnswerText("");
                              }}
                              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAnswerSubmit(qa._id)}
                              disabled={!answerText.trim()}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                answerText.trim()
                                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                              }`}
                            >
                              {qa.isAnswered
                                ? "Update Answer"
                                : "Submit Answer"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarQADashboard;
