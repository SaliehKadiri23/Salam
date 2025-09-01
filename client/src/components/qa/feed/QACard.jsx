import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, Clock, CheckCircle, Star } from "lucide-react";
import {
  selectQuestionStates,
  selectLoading,
  initializeQuestionState
} from "../../../redux/qaSlice";
import { getTimeAgo } from "../../../utils/timeUtils";
import { useDeleteQuestionAndAnswerMutation, useToggleQuestionAndAnswerLikeMutation } from "../../../services/apiSlice";

function QACard({ qa }) {
  const dispatch = useDispatch();
  const questionStates = useSelector(selectQuestionStates);
  const [liked, setLiked] = useState(false);
  const [deleteQuestionAndAnswer] = useDeleteQuestionAndAnswerMutation();
  
  const questionState = questionStates[qa._id];
  

  // Initialize question state if it does not exists
  useEffect(() => {
    if (!questionState) {
      dispatch(initializeQuestionState({
        questionId: qa._id,
        initialLikes: qa.likes
      }));
    }
  }, [dispatch, qa._id, qa.likes, questionState]);

  const [
    toggleQuestionAndAnswerLike,
    { isLoading: isLikeUpdateLoading, isSuccess },
  ] = useToggleQuestionAndAnswerLikeMutation();

  const handleLikeToggle =  async (_id) => {
    
    // TODO: Check how to implement single id invalidation tags
    const result = await toggleQuestionAndAnswerLike(_id).unwrap();
    setLiked(result.liked);
    
  };

  const handleQuestionAndAnswerDelete = async (_id) => {
    try {
      await deleteQuestionAndAnswer(_id)
      alert(`Deleted Qa with id : ${_id}`)
      // TODO :  Add Toast Notifications
    } catch (error) {
      console.log("Error : ", error)
    }
    
  }

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
                <button
                  onClick={() => handleQuestionAndAnswerDelete(qa._id)}
                  className="px-3  py-2 bg-red-600 text-white rounded-full text-xs font-medium capitalize whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100 flex-shrink-0">
                <Clock className="w-4 h-4" />
                <span className="whitespace-nowrap">
                  {getTimeAgo(qa.dateAsked)}
                </span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4 break-words">
              {qa.question}
            </p>

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