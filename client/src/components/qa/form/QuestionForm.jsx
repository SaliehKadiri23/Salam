import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MessageCircle, Send } from "lucide-react";
import CategorySelector from "./CategorySelector";
import QuestionInput from "./QuestionInput";
import { useAddNewQuestionAndAnswerMutation } from "../../../services/apiSlice";

// Categories data - moved from Redux slice
const categories = [
  { value: "general", label: "General Questions" },
  { value: "fiqh", label: "Islamic Jurisprudence" },
  { value: "finance", label: "Islamic Finance" },
  { value: "daily-life", label: "Daily Life" },
  { value: "worship", label: "Worship & Prayer" },
];

// Validation schema
const validationSchema = Yup.object({
  question: Yup.string()
    .trim()
    .required("Please enter your question")
    .min(10, "Question must be at least 10 characters long"),
  category: Yup.string()
    .oneOf(categories.map(cat => cat.value), "Please select a valid category")
    .required("Please select a category"),
});

function QuestionForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

   const [addNewQuestionAndAnswer, { data, error, isSuccess }] =
     useAddNewQuestionAndAnswerMutation();

  // Initial form values
  const initialValues = {
    question: "",
    category: "general"
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitError(null);

      const newQuestionAndAnswer = {
        askedBy: "64f1abf1a2b4c3d4e5f6a701",
        dateAsked: new Date(),
        questionCategory: values.category,
        question: values.question,
      };

      console.log('Submit question:', newQuestionAndAnswer);

      await addNewQuestionAndAnswer(newQuestionAndAnswer)


      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      resetForm();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setSubmitError(error.message || "An error occurred while submitting your question");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-full backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Submit Your Question
        </h2>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
          <p className="font-medium">Question submitted successfully!</p>
          <p className="text-sm">Our scholars will review and respond soon.</p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          <p className="font-medium">Error submitting question:</p>
          <p className="text-sm">{submitError}</p>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched, isValid }) => (
          <Form className="space-y-6">
            {/* Category Selection */}
            <CategorySelector categories={categories} />

            {/* Question Textarea */}
            <QuestionInput />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-200 flex items-center justify-center gap-2 select-none ${
                isSubmitting || !isValid
                  ? "opacity-50 cursor-not-allowed transform-none"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Question
                </>
              )}
            </button>

            {/* Form Validation Help */}
            {!isSubmitting && (
              <p className="text-sm text-gray-500 dark:text-gray-100 text-center">
                Please fill in all required fields to submit your question.
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuestionForm;
