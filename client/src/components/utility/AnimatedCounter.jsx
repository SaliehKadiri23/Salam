import React, { useState, useEffect } from "react";

const AnimatedCounter = ({
  target,
  duration = 2000,
 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.floor(increment * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span className="">{count.toLocaleString()}</span>;
};

export default AnimatedCounter;