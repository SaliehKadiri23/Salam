import React, { useState } from 'react';
import { Heart, Clock, User, MessageCircle } from 'lucide-react';
import DuaCounter from './DuaCounter';
import CategoryBadge from './CategoryBadge';

const DuaRequestCard = ({ request }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(request.likes || 0);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white dark:bg-black/50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-emerald-600 group">
      <div className="flex items-start gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {request.isAnonymous ? "Anonymous" : request.author}
              </h3>
              {request.category && (
                <CategoryBadge category={request.category} />
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-200">
              <Clock className="w-4 h-4" />
              <span>{request.timeAgo}</span>
            </div>
          </div>

          {/* Request Text */}
          <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
            {request.content}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-50 dark:bg-gray-100 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              {/* Comment Indicator */}
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-100">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{request.comments || 0}</span>
              </div>
            </div>

            {/* Prayer Counter */}
            <DuaCounter
              initialCount={request.prayerCount || 0}
              requestId={request.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaRequestCard;