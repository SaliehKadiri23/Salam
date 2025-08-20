import React from "react";

const IslamicPattern = ({
  className = "",
  opacity = "opacity-5",
  color = "currentColor",
  variant = "geometric"
}) => {
  const patterns = {
    geometric: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <pattern id="islamic-star" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M15,5 L18,12 L25,12 L20,17 L22,24 L15,20 L8,24 L10,17 L5,12 L12,12 Z"
              fill={color}
              fillOpacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star)" />
      </svg>
    ),
    
    circles: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
        <g fill={color} fillRule="evenodd">
          <circle cx="30" cy="30" r="4" />
          <circle cx="15" cy="15" r="2" />
          <circle cx="45" cy="15" r="2" />
          <circle cx="15" cy="45" r="2" />
          <circle cx="45" cy="45" r="2" />
        </g>
      </svg>
    ),

    moroccan: (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
        <path
          d="M30,5 Q35,15 45,15 Q35,25 30,35 Q25,25 15,15 Q25,15 30,5 Z"
          fill={color}
          fillOpacity="0.08"
        />
        <path
          d="M30,25 Q35,35 45,35 Q35,45 30,55 Q25,45 15,35 Q25,35 30,25 Z"
          fill={color}
          fillOpacity="0.08"
        />
      </svg>
    )
  };

  return (
    <div className={`${opacity} pointer-events-none ${className}`}>
      {patterns[variant] || patterns.geometric}
    </div>
  );
};

export default IslamicPattern;