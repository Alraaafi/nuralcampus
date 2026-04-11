import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber = ({ targetValue, duration = 2000, startValue = 0 }) => {
  const [currentValue, setCurrentValue] = useState(startValue);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    const start = startValue;
    const end = targetValue;
    const increment = end / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCurrentValue(end);
        clearInterval(timer);
        setIsAnimating(false);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  };

  return (
    <span ref={elementRef} className="text-2xl font-bold text-gray-800 dark:text-white">
      {currentValue.toLocaleString()}
    </span>
  );
};

export default AnimatedNumber;