import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter } from "lucide-react";
import CustomDropdown from "../../utility/CustomDropdown";
import { selectQuestionForm, selectFilters, updateQuestionForm } from "../../../redux/qaSlice";

function CategorySelector() {
  const dispatch = useDispatch();
  const { data: formData } = useSelector(selectQuestionForm);
  const { categories } = useSelector(selectFilters);

  const handleCategoryChange = (value) => {
    dispatch(updateQuestionForm({ field: 'category', value }));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Question Category
      </label>
      <CustomDropdown
        options={categories}
        value={formData.category}
        onChange={handleCategoryChange}
        placeholder="Select a category"
        icon={Filter}
      />
    </div>
  );
}

export default CategorySelector;