import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectFilters } from "../../../redux/qaSlice";
import QACard from "./QACard";
import { useGetQuestionsAndAnswersQuery } from "../../../services/apiSlice";

function QAList() {
  const filters = useSelector(selectFilters);
  const {
    data: allQuestions = [],
    isLoading,
    isError,
    error,
  } = useGetQuestionsAndAnswersQuery();

  // Filter questions based on current filters using backend field names
  const filteredQuestions = useMemo(() => {
    const { searchQuery, selectedFilter } = filters;

    return allQuestions.filter((qa) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.askedBy.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category filter
      if (selectedFilter === "all") return true;
      if (selectedFilter === "answered") return qa.isAnswered;
      if (selectedFilter === "pending") return !qa.isAnswered;
      return qa.questionCategory === selectedFilter;
    });
  }, [allQuestions, filters]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl p-6"
          >
            <div className="animate-pulse">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl p-8 text-center">
        <div className="text-red-600 mb-4">
          <p className="font-semibold">Error loading questions</p>
          <p className="text-sm">
            {error?.message || "An error occurred while fetching questions"}
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Please refresh the Page
        </button>
      </div>
    );
  }

  // Empty state
  if (filteredQuestions.length === 0) {
    return (
      <div className="pt-20 pb-8">
        <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 shadow-xl p-8 text-center">
          <div className="text-gray-500 dark:text-gray-100">
            <p className="font-semibold my-2">No questions found</p>
            <p className="text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Questions list
  return (
    <div className="space-y-6 w-full">
      {filteredQuestions.map((qa) => (
        <div id={`${qa._id}`} key={qa._id} className="w-full">
          <QACard qa={qa} />
        </div>
      ))}
    </div>
  );
}

export default QAList;
