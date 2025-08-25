import React from 'react';
import { useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
} from '../../redux/resourcesSlice';

const EmptyState = () => {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(setSearchQuery(''));
    dispatch(setSelectedCategory('all'));
    dispatch(setSelectedType('all'));
  };

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No resources found
      </h3>
      <p className="text-gray-600 dark:text-gray-200 mb-4">
        Try adjusting your search criteria or filters
      </p>
      <button
        onClick={handleClearFilters}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default EmptyState;