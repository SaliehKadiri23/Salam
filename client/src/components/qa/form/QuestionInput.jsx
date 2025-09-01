import React from "react";
import { useFormikContext, ErrorMessage } from "formik";

function QuestionInput() {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext();

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-100 mb-2">
        Your Question
      </label>
      <textarea
        name="question"
        value={values.question}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Share your question with our scholars..."
        rows={4}
        className={`w-full px-4 py-3 bg-white dark:bg-black/40 dark:text-gray-100 dark:placeholder:text-gray-200 outline-none bg-opacity-90 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none ${
          errors.question && touched.question
            ? "border-red-500 dark:border-red-500"
            : "border-gray-200 dark:border-emerald-600"
        }`}
      />
      <ErrorMessage
        name="question"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}

export default QuestionInput;