import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import IslamicPattern from '../../utility/IslamicPattern';

const ModalHeader = ({ onClose, hasChanges, title }) => {
  return (
    <div className="relative bg-gradient-to-r from-islamic-500 to-islamic-600 text-white p-6 rounded-t-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-2xl">
        <IslamicPattern 
          className="w-full h-full text-white" 
          opacity="opacity-10"
          variant="moroccan"
        />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-white/80 mt-1">Update your profile information</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Unsaved Changes Indicator */}
          {hasChanges && (
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Unsaved changes</span>
            </div>
          )}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              p-2 
              rounded-full 
              bg-white/20 
              hover:bg-white/30 
              transition-all 
              duration-200
              hover:scale-110
              focus:outline-none
              focus:ring-2
              focus:ring-white/50
            "
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;