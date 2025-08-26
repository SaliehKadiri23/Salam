import React from "react";

const IslamicPattern = () => {
  return (
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-green-500 rounded-full transform rotate-45"></div>
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-teal-500 rounded-full transform -rotate-45"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 border-2 border-yellow-500 rounded-full transform rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-36 h-36 border-2 border-green-500 rounded-full transform -rotate-12"></div>
    </div>
  );
};

export default IslamicPattern;