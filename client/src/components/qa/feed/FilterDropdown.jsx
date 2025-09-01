import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, MessageCircle, CheckCircle, Clock, TrendingUp, Medal, Star } from "lucide-react";
import CustomDropdown from "../../utility/CustomDropdown";
import { selectFilters, setSelectedFilter } from "../../../redux/qaSlice";

function FilterDropdown() {
  const dispatch = useDispatch();
  const { selectedFilter, filterOptions } = useSelector(selectFilters);

  // Add icons to filter options
  const filterOptionsWithIcons = filterOptions.map(option => {
    const iconMap = {
      all: MessageCircle,
      answered: CheckCircle,
      pending: Clock,
      finance: TrendingUp,
      'daily-life': Medal,
      worship: Star
    };
    
    return {
      ...option,
      icon: iconMap[option.value] || MessageCircle
    };
  });

  const handleFilterChange = (value) => {
    dispatch(setSelectedFilter(value));
  };

  return (
    <div className="w-full relative z-100 md:w-64">
      <CustomDropdown
        options={filterOptionsWithIcons}
        value={selectedFilter}
        onChange={handleFilterChange}
        placeholder="Filter questions"
        icon={Filter}
      />
    </div>
  );
}

export default FilterDropdown;