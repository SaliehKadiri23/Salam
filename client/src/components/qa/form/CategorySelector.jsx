import React from "react";
import { useFormikContext, ErrorMessage } from "formik";
import { Filter } from "lucide-react";
import CustomDropdown from "../../utility/CustomDropdown";

function CategorySelector({ categories }) {
  const { values, setFieldValue } = useFormikContext();

  const handleCategoryChange = (value) => {
    setFieldValue('category', value);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
        Question Category
      </label>
      <CustomDropdown
        options={categories}
        value={values.category}
        onChange={handleCategoryChange}
        placeholder="Select a category"
        icon={Filter}
      />
      <ErrorMessage
        name="category"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}

export default CategorySelector;