import React from "react";
import { X, BookOpen } from "lucide-react";
import IslamicPattern from "../../utility/IslamicPattern";

const DuaModal = ({ isOpen, onClose, prayerName, dua, transliteration, translation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <IslamicPattern
            className="w-full h-full"
            opacity="opacity-5"
            color="#059669" // emerald-600
            variant="eight-pointed-star"
          />
        </div>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-amber-500 dark:from-emerald-600 dark:to-amber-600 p-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Dua for {prayerName}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 relative">
          {/* Arabic Dua */}
          <div className="text-center">
            <p className="text-2xl font-arabic text-emerald-700 dark:text-emerald-400 leading-loose">
              {dua || "No dua available"}
            </p>
          </div>

          {/* Transliteration */}
          {transliteration && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-1">Transliteration</h4>
              <p className="text-gray-700 dark:text-gray-200 italic">{transliteration}</p>
            </div>
          )}

          {/* Translation */}
          {translation && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-1">Translation</h4>
              <p className="text-gray-700 dark:text-gray-200">{translation}</p>
            </div>
          )}

          {/* Note */}
          {!dua && (
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl">
              <p className="text-amber-700 dark:text-amber-300 text-center">
                No specific dua found for this prayer time.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 flex justify-end relative">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuaModal;