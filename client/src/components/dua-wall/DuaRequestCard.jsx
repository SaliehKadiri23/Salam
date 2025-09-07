import React, { useState, useEffect } from 'react';
import { Heart, Clock, User, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import DuaCounter from './DuaCounter';
import CategoryBadge from './CategoryBadge';

const DuaRequestCard = ({ request, onLike, onPray, onDelete, onEdit }) => {
  const [likeCount, setLikeCount] = useState(request.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [hasUserPrayed, setHasUserPrayed] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Set initial state
  useEffect(() => {
    setLikeCount(request.likes || 0);
    
    // Check if user is owner using hardcoded user ID
    const currentUserId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded user ID
    const isRequestOwner = request.userId === currentUserId;
    setIsOwner(isRequestOwner);
    
    // Check if current user has liked this request
    const likedRequests = JSON.parse(localStorage.getItem('likedRequests') || '[]');
    setIsLiked(likedRequests.includes(request.id));
  }, [request.likes, request.userId, request.isAnonymous, request.id]);

  // Check if user has already prayed for this request
  useEffect(() => {
    const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '[]');
    setHasUserPrayed(prayedRequests.includes(request.id));
  }, [request.id]);

  const handleLike = () => {
    // Update local state immediately for UI feedback
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setLikeCount(prev => newLikeState ? prev + 1 : prev - 1);
    
    // Update localStorage
    const likedRequests = JSON.parse(localStorage.getItem('likedRequests') || '[]');
    if (newLikeState) {
      likedRequests.push(request.id);
    } else {
      const index = likedRequests.indexOf(request.id);
      if (index > -1) {
        likedRequests.splice(index, 1);
      }
    }
    localStorage.setItem('likedRequests', JSON.stringify(likedRequests));
    
    // Call the parent's onLike function if provided
    if (onLike) {
      onLike(request.id);
    }
  };

  const handlePray = () => {
    // Call the parent's onPray function if provided
    if (onPray && !hasUserPrayed) {
      onPray(request.id);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this dua request?")) {
      if (onDelete) {
        onDelete(request.id);
      }
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(request);
    }
  };

  return (
    <div className="bg-white dark:bg-black/50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-emerald-600 group overflow-hidden">
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
            <div className="flex items-center gap-2">
              {/* Owner Actions */}
              {isOwner && (
                <div className="flex gap-1">
                  <button
                    onClick={handleEdit}
                    className="p-1.5 text-gray-500 dark:text-gray-100 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                    title="Edit request"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1.5 text-gray-500 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete request"
                  >
                    <Trash2 className="w-4 h-4 " />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-200">
                <Clock className="w-4 h-4" />
                <span>{request.timeAgo}</span>
              </div>
            </div>
          </div>

          {/* Request Text */}
          <p className="text-gray-700 dark:text-gray-100 leading-relaxed mb-4 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors break-words">
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
            </div>

            {/* Prayer Counter */}
            <DuaCounter
              initialCount={request.prayerCount || 0}
              requestId={request.id}
              onPray={() => handlePray()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaRequestCard;