import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, X, MapPin } from 'lucide-react';
import { setSearchQuery, setLocation } from '../../../redux/prayerTimesSlice';

const LocationSearch = () => {
  const dispatch = useDispatch();
  const { searchQuery, location } = useSelector((state) => state.prayerTimes);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(setLocation(searchQuery.trim()));
      inputRef.current?.blur();
    }
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
    inputRef.current?.focus();
  };

  // Simulate IP location detection
  const handleUseMyLocation = () => {
    dispatch(setLocation("Detecting location..."));
    // Simulate API call delay
    setTimeout(() => {
      dispatch(setLocation("Kano State, Nigeria"));
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-100 pointer-events-none z-10" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for any city worldwide..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit(e);
              }
            }}
            className="w-full pl-10 pr-10 py-3 dark:bg-black dark:placeholder:text-white/80 dark:text-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm outline-none transition-all duration-200 relative z-0"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-white hover:text-gray-600 transition-colors z-10"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={handleUseMyLocation}
          disabled={location === "Detecting location..."}
          className="flex justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none whitespace-nowrap"
        >
          <MapPin className="h-5 w-5" />
          <span className="">
            {location === "Detecting location..."
              ? "Detecting..."
              : "Use My IP Address"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LocationSearch;