import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const DuaCounter = ({ initialCount = 0, requestId }) => {
  const [count, setCount] = useState(initialCount);
  const [hasUserPrayed, setHasUserPrayed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if user has already prayed for this request
  useEffect(() => {
    const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '[]');
    setHasUserPrayed(prayedRequests.includes(requestId));
  }, [requestId]);

  const handlePray = () => {
    if (hasUserPrayed) return;

    // Animate the counter
    setIsAnimating(true);
    setCount(prev => prev + 1);
    
    // Mark as prayed in localStorage
    const prayedRequests = JSON.parse(localStorage.getItem('prayedRequests') || '[]');
    prayedRequests.push(requestId);
    localStorage.setItem('prayedRequests', JSON.stringify(prayedRequests));
    
    setHasUserPrayed(true);

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePray}
        disabled={hasUserPrayed}
        className={`
          relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 
          ${
            hasUserPrayed
              ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md cursor-default"
              : "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100 hover:shadow-md cursor-pointer"
          }
          ${isAnimating ? "transform scale-105" : ""}
        `}
      >
        {hasUserPrayed ? (
          <>
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Prayed</span>
          </>
        ) : (
          <>
            <Heart className="w-4 h-4" />
            <span>Make Dua</span>
          </>
        )}

        {/* Animation effect */}
        {isAnimating && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl opacity-20 animate-ping"></div>
        )}
      </button>

      {/* Prayer count with animated number */}
      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-100">
        <div
          className={`font-semibold transition-all duration-300 ${
            isAnimating ? "text-emerald-600 scale-110" : ""
          }`}
        >
          {count}
        </div>
        <span className="text-xs">{count === 1 ? "prayer" : "prayers"}</span>
      </div>
    </div>
  );
};

export default DuaCounter;