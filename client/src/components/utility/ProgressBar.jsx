import React from "react";

const ProgressBar = ({ percentage, animated = true }) => (
  <div className="w-full bg-emerald-100 rounded-full h-4 overflow-hidden">
    <div
      className={`bg-gradient-to-r from-emerald-500 to-green-600 h-4 rounded-full shadow-lg ${
        animated ? "transition-all duration-2000 ease-out" : ""
      }`}
      style={{ width: `${percentage}%` }}
    >
      <div className="h-full w-full bg-white/20 animate-pulse rounded-full"></div>
    </div>
  </div>
);

export default ProgressBar;