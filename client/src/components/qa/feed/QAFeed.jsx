import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";
import { selectFilters } from "../../../redux/qaSlice";
import { useGetQuestionsAndAnswersQuery } from "../../../services/apiSlice";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import QAList from "./QAList";

function QAFeed() {
  const filters = useSelector(selectFilters);
  const { data: allQuestions = [], isLoading } = useGetQuestionsAndAnswersQuery();

  // Calculate filtered questions count for display
  const filteredQuestionsCount = useMemo(() => {
    if (isLoading) return 0;
    
    const { searchQuery, selectedFilter } = filters;
    
    return allQuestions.filter((qa) => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (qa.askedBy?.profileInfo?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Category filter
      if (selectedFilter === "all") return true;
      if (selectedFilter === "answered") return qa.isAnswered;
      if (selectedFilter === "pending") return !qa.isAnswered;
      return qa.questionCategory === selectedFilter;
    }).length;
  }, [allQuestions, filters, isLoading]);

  return (
    <div className="w-full relative overflow-x-hidden">
      {/* Search and Filter Section */}
      <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 p-6 shadow-xl mb-8 w-full relative" style={{ zIndex: 100 }}>
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <SearchBar />
          </div>

          {/* Filter Dropdown */}
          <div className="flex-shrink-0 relative" style={{ zIndex: 9999 }}>
            <FilterDropdown />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3 flex-wrap">
          <MessageCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span className="break-words">Recent Questions & Answers</span>
          <span className="text-lg text-gray-500 dark:text-gray-100 font-normal flex-shrink-0">
            ({isLoading ? "..." : filteredQuestionsCount})
          </span>
        </h2>
      </div>

      {/* Q&A List */}
      <div className="w-full">
        <QAList />
      </div>
    </div>
  );
}

export default QAFeed;