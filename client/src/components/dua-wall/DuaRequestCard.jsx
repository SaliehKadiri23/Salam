import React, { useState, useEffect } from 'react';
import { Clock, User, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import DuaCounter from './DuaCounter';
import CategoryBadge from './CategoryBadge';

const DuaRequestCard = ({ request, onPray, onDelete, onEdit, hasUserPrayed }) => {
  const [isOwner, setIsOwner] = useState(false);

  // Set initial state
  useEffect(() => {
    if (!request) return;
    
    // Check if user is owner using hardcoded user ID
    const currentUserId = "64f1abf1a2b4c3d4e5f6a111"; // Hardcoded user ID
    const isRequestOwner = request.userId === currentUserId;
    setIsOwner(isRequestOwner);
  }, [request]);

  const handlePray = () => {
    if (!request) return;
    
    // Get request ID (use id if available, otherwise fallback to _id)
    const requestId = request.id || request._id;
    
    // Call the parent's onPray function if provided
    if (onPray && !hasUserPrayed) {
      onPray(requestId);
    }
  };

  const handleDelete = () => {
    if (!request) return;
    
    // Get request ID (use id if available, otherwise fallback to _id)
    const requestId = request.id || request._id;
    
    if (window.confirm("Are you sure you want to delete this dua request?")) {
      if (onDelete) {
        onDelete(requestId);
      }
    }
  };

  const handleEdit = () => {
    if (!request) return;
    
    if (onEdit) {
      onEdit(request);
    }
  };

  if (!request) {
    return null;
  }

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
          <div className="flex items-center justify-end">
            {/* Prayer Counter */}
            <DuaCounter
              initialCount={request.prayerCount || 0}
              requestId={request.id || request._id}
              onPray={() => handlePray()}
              hasUserPrayed={hasUserPrayed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuaRequestCard;