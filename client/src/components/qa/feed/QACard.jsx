import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, Clock, CheckCircle, Star } from "lucide-react";
import { 
  selectQuestionStates, 
  selectLoading,
  toggleQuestionLike, 
  initializeQuestionState 
} from "../../../redux/qaSlice";

function QACard({ qa }) {
  const dispatch = useDispatch();
  const questionStates = useSelector(selectQuestionStates);
  const { updatingLike } = useSelector(selectLoading);
  
  const questionState = questionStates[qa.id];
  const isUpdatingLike = updatingLike[qa.id] || false;

  // Initialize question state if not exists
  useEffect(() => {
    if (!questionState) {
      dispatch(initializeQuestionState({
        questionId: qa.id,
        initialLikes: qa.likes
      }));
    }
  }, [dispatch, qa.id, qa.likes, questionState]);

  const handleLikeToggle = () => {
    if (isUpdatingLike || !questionState) return;
    
    dispatch(toggleQuestionLike({
      questionId: qa.id,
      currentLikeState: questionState
    }));
  };

  // Use questionState if available, otherwise fall back to original data
  const displayLikes = questionState ? questionState.likeCount : qa.likes;
  const isLiked = questionState ? questionState.isLiked : false;

  return (
    <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Question Section */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800">{qa.user}</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                  {qa.category.replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {qa.timeAgo}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{qa.question}</p>

            {/* Question Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleLikeToggle}
                disabled={isUpdatingLike}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } ${
                  isUpdatingLike ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""} ${
                  isUpdatingLike ? "animate-pulse" : ""
                }`} />
                <span className="text-sm font-medium">
                  {displayLikes}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {qa.hasAnswer ? (
                  <span className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Answered
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      {qa.hasAnswer && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-emerald-800 flex justify-center items-center">
                  <Star className="w-7 h-7 rounded-full text-white fill-white bg-green-600 p-1 mr-4" />
                  {qa.scholar}
                </h4>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Clock className="w-4 h-4" />
                  {qa.answerTime}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QACard;