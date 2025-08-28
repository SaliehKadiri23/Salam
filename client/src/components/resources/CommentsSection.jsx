import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageCircle, User, ThumbsUp, Star } from 'lucide-react';
import ReviewForm from './ReviewForm';
import { addReview } from '../../redux/userSlice';

const CommentsSection = ({ resourceId }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.user);
  const resourceReviews = reviews[resourceId] || [];
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReview = (review) => {
    dispatch(addReview({ resourceId, review }));
    setShowReviewForm(false);
  };

  return (
    <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-600">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Reviews ({resourceReviews.length})
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Add Review</span>
          </button>
        </div>
        {showReviewForm && (
          <div className="mb-6 dark:border dark:border-emerald-600 bg-gray-50 rounded-lg">
            <ReviewForm
              onSubmit={handleAddReview}
              onClose={() => setShowReviewForm(false)}
            />
          </div>
        )}
        <div className="space-y-4">
          {resourceReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 dark:border-emerald-600 last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {review.author}
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500  dark:text-gray-100">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-100 text-sm mb-2">
                    {review.comment}
                  </p>
                  <button className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-100 hover:text-emerald-600 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {resourceReviews.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-100">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400 dark:text-gray-100" />
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;