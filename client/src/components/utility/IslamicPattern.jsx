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
    ),

    'corner-decoration': (
      <svg width="48" height="48" viewBox="0 0 48 48" className="w-full h-full">
        <path
          d="M0,0 L48,0 L48,12 Q36,12 24,24 Q12,36 0,48 Z"
          fill={color}
          fillOpacity="0.15"
        />
        <path
          d="M0,0 L12,0 Q12,12 24,24 Q36,36 48,48 L48,36 Q36,24 24,12 Q12,0 0,0 Z"
          fill={color}
          fillOpacity="0.1"
        />
      </svg>
    ),

    divider: (
      <svg width="96" height="24" viewBox="0 0 96 24" className="w-full h-full">
        <g fill={color} fillOpacity="0.2">
          <circle cx="12" cy="12" r="2" />
          <circle cx="24" cy="12" r="1" />
          <circle cx="36" cy="12" r="2" />
          <circle cx="48" cy="12" r="3" />
          <circle cx="60" cy="12" r="2" />
          <circle cx="72" cy="12" r="1" />
          <circle cx="84" cy="12" r="2" />
        </g>
        <path
          d="M0,12 Q12,8 24,12 T48,12 T72,12 T96,12"
          stroke={color}
          strokeOpacity="0.1"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),

    'eight-pointed-star': (
      <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full">
        <defs>
          <pattern id="eight-star" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M15,2 L17,8 L23,6 L19,12 L25,14 L19,16 L23,22 L17,20 L15,26 L13,20 L7,22 L11,16 L5,14 L11,12 L7,6 L13,8 Z"
              fill={color}
              fillOpacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#eight-star)" />
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