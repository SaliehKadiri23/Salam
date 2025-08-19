import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MessageCircle, Send } from "lucide-react";
import { 
  selectQuestionForm, 
  selectFormValidation, 
  submitQuestion,
  resetQuestionForm,
  clearFormSuccess
} from "../../../redux/qaSlice";
import CategorySelector from "./CategorySelector";
import QuestionInput from "./QuestionInput";
import ContactFields from "./ContactFields";

function QuestionForm() {
  const dispatch = useDispatch();
  const { data: formData, isSubmitting, errors, submitSuccess } = useSelector(selectQuestionForm);
  const { canSubmit } = useSelector(selectFormValidation);

  // Handle successful submission
  useEffect(() => {
    if (submitSuccess) {
      // Show success feedback briefly, then reset form
      const timer = setTimeout(() => {
        dispatch(resetQuestionForm());
        dispatch(clearFormSuccess());
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, dispatch]);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    dispatch(submitQuestion(formData));
  };

  return (
    <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
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
      {errors && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          <p className="font-medium">Error submitting question:</p>
          <p className="text-sm">{errors}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Category Selection */}
        <CategorySelector />

        {/* Question Textarea */}
        <QuestionInput />

        {/* Name and Email */}
        <ContactFields />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-200 flex items-center justify-center gap-2 select-none ${
            (!canSubmit || isSubmitting) ? "opacity-50 cursor-not-allowed transform-none" : "cursor-pointer"
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
        {!canSubmit && !isSubmitting && (
          <p className="text-sm text-gray-500 text-center">
            Please fill in all required fields to submit your question.
          </p>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;