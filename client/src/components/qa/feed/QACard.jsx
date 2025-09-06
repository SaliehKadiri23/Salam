import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, Clock, CheckCircle, Star, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  selectQuestionStates,
  selectLoading,
  initializeQuestionState
} from "../../../redux/qaSlice";
import { getTimeAgo } from "../../../utils/timeUtils";
import { useDeleteQuestionAndAnswerMutation, useToggleQuestionAndAnswerLikeMutation, useUpdateQuestionAndAnswerMutation } from "../../../services/apiSlice";

function QACard({ qa }) {
  const dispatch = useDispatch();
  const questionStates = useSelector(selectQuestionStates);
  const [liked, setLiked] = useState(false);
  const [deleteQuestionAndAnswer] = useDeleteQuestionAndAnswerMutation();
  const [updateQuestionAndAnswer] = useUpdateQuestionAndAnswerMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(qa.question);
  
  const questionState = questionStates[qa._id];
  
  // Hardcoded user ID for now (to be replaced with actual auth system)
  const currentUserId = "64f1abf1a2b4c3d4e5f6a701";

  // Initialize question state if it does not exists
  useEffect(() => {
    if (!questionState) {
      dispatch(initializeQuestionState({
        questionId: qa._id,
        }));
    }
  }, [dispatch, qa._id, liked, qa.likes, questionState]);

  const [
    toggleQuestionAndAnswerLike,
    { isLoading: isLikeUpdateLoading, isSuccess },
  ] = useToggleQuestionAndAnswerLikeMutation();

  const handleLikeToggle =  async (_id) => {
    
    // TODO: Check how to implement single id invalidation tags
    try {
      const result = await toggleQuestionAndAnswerLike(_id).unwrap();
      setLiked(result.liked);
      toast.success(result.liked ? "Question liked!" : "Like removed!");
    } catch (error) {
      toast.error("Failed to update like status");
      console.log("Error : ", error);
    }
  };

  const handleQuestionAndAnswerDelete = async (_id) => {
    try {
      // Check if the question has been answered
      if (qa.isAnswered) {
        toast.error("This question has already been answered and cannot be deleted");
        return;
      }
      
      if (window.confirm("Are you sure you want to delete this question?")) {
        await deleteQuestionAndAnswer(_id).unwrap();
        toast.success("Question deleted successfully!");
      }
    } catch (error) {
      // Check if the error is due to authorization (question already answered)
      if (error?.status === 403) {
        toast.error("This question has already been answered and cannot be deleted");
      } else {
        toast.error("Failed to delete question");
      }
      console.log("Error : ", error);
    }
  };

  const handleQuestionEdit = () => {
    setIsEditing(true);
    setEditedQuestion(qa.question);
  };

  const handleQuestionUpdate = async () => {
    try {
      // Check if the question has been answered while the form was open
      if (qa.isAnswered) {
        toast.error("This question has already been answered and cannot be edited");
        setIsEditing(false);
        return;
      }
      
      if (editedQuestion.trim() && editedQuestion.trim() !== qa.question) {
        const updatedData = {
          _id: qa._id,
          question: editedQuestion.trim(),
          questionCategory: qa.questionCategory,
          askedBy: qa.askedBy,
          dateAsked: qa.dateAsked
        };

        await updateQuestionAndAnswer(updatedData).unwrap();
        toast.success("Question updated successfully!");
        setIsEditing(false);
      } else if (editedQuestion.trim() === qa.question) {
        setIsEditing(false);
      } else {
        toast.error("Question cannot be empty");
      }
    } catch (error) {
      // Check if the error is due to authorization (question already answered)
      if (error?.status === 403) {
        toast.error("This question has already been answered and cannot be edited");
        setIsEditing(false);
      } else {
        toast.error("Failed to update question");
      }
      console.log("Error : ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedQuestion(qa.question);
  };

  // Check if current user is the owner of the question and question is not answered
  // Note: This check is done at render time. If the question status changes (e.g., gets answered),
  // the component won't automatically re-render, so we also check in the action handlers.
  const canEditOrDelete = qa.askedBy === currentUserId && !qa.isAnswered;

  // Use questionState if available, otherwise fall back to original data
  const displayLikes =  qa.likes;


  return (
    <div className="w-full max-w-full backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-80 rounded-2xl border border-white dark:border-emerald-600 border-opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Question Section */}
      <div className="p-6 w-full">
        <div className="flex items-start gap-4 w-full">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div className="flex items-center justify-around gap-3 min-w-0 flex-1">
                <h3 className="font-semibold text-left text-gray-800 dark:text-gray-100 truncate">
                  {qa.askedBy}
                </h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize whitespace-nowrap">
                  {qa.questionCategory.replace("-", " ")}
                </span>
                {canEditOrDelete && !qa.isAnswered && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleQuestionEdit}
                      className="px-3 py-2 bg-blue-600 text-white rounded-full text-xs font-medium capitalize whitespace-nowrap flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleQuestionAndAnswerDelete(qa._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-full text-xs font-medium capitalize whitespace-nowrap flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100 flex-shrink-0">
                <Clock className="w-4 h-4" />
                <span className="whitespace-nowrap">
                  {getTimeAgo(qa.dateAsked)}
                </span>
              </div>
            </div>

            {isEditing ? (
              <div className="mb-4">
                <textarea
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  rows="4"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleQuestionUpdate}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 break-words">
                {qa.question}
              </p>
            )}

            {/* Question Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <button
                onClick={()=>handleLikeToggle(qa._id)}
                disabled={isLikeUpdateLoading}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 self-start ${
                  liked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 dark:bg-gray-200 text-gray-600 hover:bg-gray-200"
                } ${
                  isLikeUpdateLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${liked ? "fill-current" : ""} ${
                    isLikeUpdateLoading ? "animate-pulse" : ""
                  }`}
                />
                <span className="text-sm font-medium">{displayLikes}</span>
              </button>

              <div className="flex items-center gap-2">
                {qa.isAnswered ? (
                  <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span className="whitespace-nowrap">Answered</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    <span className="whitespace-nowrap">Pending</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      {qa.isAnswered && (
        <div className="bg-white dark:bg-gray-700 border-t border-emerald-100 dark:border-emerald-600 p-6 w-full">
          <div className="flex items-start gap-4 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 flex items-center min-w-0">
                  <Star className="w-7 h-7 rounded-full text-white fill-white bg-green-600 p-1 mr-4 flex-shrink-0" />
                  <span className="truncate">{qa.answeredBy || "Scholar"}</span>
                </h4>
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-200 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                  <span className="whitespace-nowrap">
                    {getTimeAgo(qa.dateAnswered)}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-100 leading-relaxed break-words">
                {qa.answer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QACard;