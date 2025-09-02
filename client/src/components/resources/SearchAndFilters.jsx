import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, Filter, ChevronDown } from "lucide-react";
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedType,
} from "../../redux/resourcesSlice";
import { toggleFilters } from "../../redux/uiSlice";

export default function SearchAndFilters() {
  const dispatch = useDispatch();
  const { searchQuery, categories, resourceTypes, selectedCategory, selectedType } = useSelector(
    (state) => state.resources
  );
  const { showFilters } = useSelector((state) => state.ui);

  
  return (
    <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-500 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-100" />
          <input
            type="text"
            placeholder="Search resources, topics, or authors..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-emerald-500 dark:bg-black/40 dark:text-white dark:placeholder:text-white/80 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
        <button
          onClick={() => dispatch(toggleFilters())}
          className="flex items-center space-x-2 px-4 py-3 bg-emerald-50 dark:bg-black/40 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200 dark:border-emerald-600"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-emerald-500 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomSelect
            label="Category"
            value={selectedCategory}
            onChange={(value) => dispatch(setSelectedCategory(value))}
            options={categories}
          />
          <CustomSelect
            label="Resource Type"
            value={selectedType}
            onChange={(value) => dispatch(setSelectedType(value))}
            options={resourceTypes}
          />
        </div>
      )}
    </div>
  );
}

const CustomSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left bg-white dark:bg-black/70 border border-gray-200 dark:border-emerald-500 rounded-lg hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors flex items-center justify-between"
      >
        <span className="flex items-center space-x-2">
          {selectedOption?.icon && (
            <selectedOption.icon className="w-4 h-4 text-gray-500 dark:text-gray-100" />
          )}
          <span className="dark:text-gray-100">{selectedOption?.name}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 dark:text-gray-100 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-black/90 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left dark:text-gray-100 hover:bg-emerald-50 dark:hover:bg-emerald-600  hover:text-emerald-600 transition-colors flex items-center space-x-2"
            >
              {option.icon && <option.icon className="w-4 h-4" />}
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
