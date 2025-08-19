import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { selectFilters, setSearchQuery } from "../../../redux/qaSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(selectFilters);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="relative flex-1">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
      />
    </div>
  );
}

export default SearchBar;