import React from "react";
import { useSelector } from "react-redux";
import { MessageCircle } from "lucide-react";
import { selectFilteredQuestions } from "../../../redux/qaSlice";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import QAList from "./QAList";

function QAFeed() {
  const filteredQuestions = useSelector(selectFilteredQuestions);

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="backdrop-blur-xl relative z-20 bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <SearchBar />

          {/* Filter Dropdown */}
          <FilterDropdown />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-emerald-600" />
          Recent Questions & Answers
          <span className="text-lg text-gray-500 dark:text-gray-100 font-normal">
            ({filteredQuestions.length})
          </span>
        </h2>
      </div>

      {/* Q&A List */}
      <QAList />
    </div>
  );
}

export default QAFeed;