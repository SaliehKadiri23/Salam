import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuestionForm, updateQuestionForm } from "../../../redux/qaSlice";

function ContactFields() {
  const dispatch = useDispatch();
  const { data: formData } = useSelector(selectQuestionForm);

  const handleNameChange = (e) => {
    dispatch(updateQuestionForm({ field: 'name', value: e.target.value }));
  };

  const handleEmailChange = (e) => {
    dispatch(updateQuestionForm({ field: 'email', value: e.target.value }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700  dark:text-gray-100 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full px-4 py-3 dark:text-gray-100 dark:placeholder:text-gray-200 bg-white dark:bg-black/40 bg-opacity-90 border border-gray-200 dark:border-emerald-600 outline-none rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700  dark:text-gray-100 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 dark:text-gray-100 dark:placeholder:text-gray-200 bg-white dark:bg-black/40 bg-opacity-90 border border-gray-200 dark:border-emerald-600 outline-none rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default ContactFields;