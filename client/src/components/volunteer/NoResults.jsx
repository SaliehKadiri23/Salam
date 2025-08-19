import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearFilters } from '../../redux/filtersSlice';

const NoResults = () => {
  const dispatch = useDispatch();

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        No opportunities found
      </h3>
      <p className="text-slate-600 mb-6">
        Try adjusting your filters or search terms
      </p>
      <button
        onClick={handleClearFilters}
        className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default NoResults;