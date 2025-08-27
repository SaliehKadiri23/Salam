import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectQuestionForm, updateQuestionForm } from "../../../redux/qaSlice";

function QuestionInput() {
  const dispatch = useDispatch();
  const { data: formData } = useSelector(selectQuestionForm);

  const handleQuestionChange = (e) => {
    dispatch(updateQuestionForm({ field: 'question', value: e.target.value }));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
        Your Question
      </label>
      <textarea
        value={formData.question}
        onChange={handleQuestionChange}
        placeholder="Share your question with our scholars..."
        rows={4}
        className="w-full px-4 py-3 bg-white dark:bg-black/40 dark:text-gray-100 dark:placeholder:text-gray-200 outline-none bg-opacity-90 border border-gray-200 dark:border-emerald-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
      />
    </div>
  );
}

export default QuestionInput;