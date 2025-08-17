import React from "react";

const IslamicPattern = ({ className = "" }) => (
  <div className={`opacity-5 pointer-events-none ${className}`}>
    <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
      <g fill="currentColor" fillRule="evenodd">
        <circle cx="30" cy="30" r="4" />
        <circle cx="15" cy="15" r="2" />
        <circle cx="45" cy="15" r="2" />
        <circle cx="15" cy="45" r="2" />
        <circle cx="45" cy="45" r="2" />
      </g>
    </svg>
  </div>
);

export default IslamicPattern;