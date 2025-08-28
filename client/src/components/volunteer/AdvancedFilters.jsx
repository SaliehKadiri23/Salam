import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/filtersSlice';
import { Filter, ChevronDown } from 'lucide-react';
import CustomSelect from './CustomSelect';
import SearchBar from './SearchBar';

const AdvancedFilters = ({ opportunitiesCount }) => {
  const dispatch = useDispatch();
  const { search, category, location, skills, timeCommitment, skillLevel, filterOptions } = useSelector((state) => state.filters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="bg-white/80 dark:bg-black/70 backdrop-blur-sm relative z-20 rounded-2xl p-6 p shadow-lg border border-slate-200/60 dark:border-emerald-600">
      <SearchBar
        value={search}
        onChange={(value) => handleFilterChange({ search: value })}
        placeholder="Search volunteer opportunities, skills, or organizations..."
      />

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2 text-slate-600 dark:text-gray-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300 mb-4"
      >
        <Filter className="w-4 h-4" />
        Advanced Filters
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isFilterOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div className="mb-4 text-sm text-slate-600 dark:text-gray-100">
        Showing {opportunitiesCount} opportunities
      </div>

      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-200 dark:border-emerald-600">
          <CustomSelect
            label="Category"
            value={category}
            onChange={(value) => handleFilterChange({ category: value })}
            options={filterOptions.categories}
            placeholder="Select category"
          />

          <CustomSelect
            label="Location"
            value={location}
            onChange={(value) => handleFilterChange({ location: value })}
            options={filterOptions.locations}
            placeholder="Select location"
          />

          <CustomSelect
            label="Skills"
            value={skills}
            onChange={(value) => handleFilterChange({ skills: value })}
            options={filterOptions.skills}
            placeholder="Select skills"
          />

          <CustomSelect
            label="Time Commitment"
            value={timeCommitment}
            onChange={(value) => handleFilterChange({ timeCommitment: value })}
            options={filterOptions.timeCommitments}
            placeholder="Select time"
          />

          <CustomSelect
            label="Skill Level"
            value={skillLevel}
            onChange={(value) => handleFilterChange({ skillLevel: value })}
            options={filterOptions.skillLevels}
            placeholder="Select level"
          />
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;