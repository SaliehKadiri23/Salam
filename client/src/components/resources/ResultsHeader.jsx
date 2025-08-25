import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid3X3, List } from 'lucide-react';
import { setViewMode } from '../../redux/uiSlice';

const ResultsHeader = ({ resultCount }) => {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state) => state.ui);
  const { searchQuery } = useSelector((state) => state.resources);

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-gray-600 dark:text-gray-100">
        Found{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-50">
          {resultCount}
        </span>{" "}
        resources
        {searchQuery && (
          <span>
            {" "}
            for "<span className="font-medium">{searchQuery}</span>"
          </span>
        )}
      </p>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-200">View:</span>
        <button
          onClick={() => dispatch(setViewMode("grid"))}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "bg-emerald-100 text-emerald-600"
              : "text-gray-400 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-50"
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => dispatch(setViewMode("list"))}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === "list"
              ? "bg-emerald-100 text-emerald-600"
              : "text-gray-400 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-50"
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ResultsHeader;