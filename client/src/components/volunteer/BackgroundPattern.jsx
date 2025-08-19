import React from 'react';

const BackgroundPattern = () => (
  <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
            fill="currentColor"
            className="text-teal-600"
          />
          <polygon
            points="50,20 73.3,35 73.3,65 50,80 26.7,65 26.7,35"
            fill="white"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  </div>
);

export default BackgroundPattern;