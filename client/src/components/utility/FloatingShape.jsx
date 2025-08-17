import React from "react";

const FloatingShape = ({ top, left, size = 20, delay = 0, children }) => (
  <div
    className={`absolute w-${size} h-${size} opacity-20 text-emerald-500`}
    style={{
      top: `${top}%`,
      left: `${left}%`,
      animation: `float 6s ease-in-out ${delay}s infinite`,
    }}
  >
    {children}
  </div>
);

export default FloatingShape;