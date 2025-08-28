import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

const ReviewForm = ({ onSubmit, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmit({
        id: Date.now(),
        rating,
        comment,
        author: 'Current User',
        date: new Date().toLocaleDateString(),
        likes: 0,
      });
      onClose();
    }
  };

  return (
    <div className=" p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-3 ">
        Write a Review
      </h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-1">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600 dark:text-gray-300 mb-2">
            Your thoughts
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this resource..."
            className="w-full px-3 py-2 dark:bg-black/40 dark:text-gray-100 text-sm border border-gray-200 dark:border-emerald-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            rows="3"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={rating === 0}
            className="flex-1 bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
          >
            <Send className="w-3 h-3" />
            <span>Submit</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 border border-gray-200 dark:border-emerald-600 text-gray-600 dark:text-gray-100 dark:hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;