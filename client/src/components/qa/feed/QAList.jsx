import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredQuestions,
  selectQAData,
  selectLoading,
  selectError,
  fetchQuestions
} from "../../../redux/qaSlice";
import QACard from "./QACard";

function QAList() {
  const dispatch = useDispatch();
  const filteredQuestions = useSelector(selectFilteredQuestions);
  const allQuestions = useSelector(selectQAData);
  const { fetchingQuestions } = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Load questions on component mount if not already loaded
  useEffect(() => {
    if (allQuestions.length === 0 && !fetchingQuestions && !error) {
      dispatch(fetchQuestions());
    }
  }, [dispatch, allQuestions.length, fetchingQuestions, error]);

  // Loading state
  if (fetchingQuestions) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl p-6">
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
  if (error) {
    return (
      <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl p-8 text-center">
        <div className="text-red-600 mb-4">
          <p className="font-semibold">Error loading questions</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => dispatch(fetchQuestions())}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (filteredQuestions.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 shadow-xl p-8 text-center">
        <div className="text-gray-500 dark:text-gray-100">
          <p className="font-semibold mb-2">No questions found</p>
          <p className="text-sm">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    );
  }

  // Questions list
  return (
    <div className="space-y-6">
      {filteredQuestions.map((qa) => (
        <QACard key={qa.id} qa={qa} />
      ))}
    </div>
  );
}

export default QAList;