"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateValue();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = () => {
    // Parse the value to extract number, prefix, and suffix
    const match = value.match(/^(\$)?(\d+\.?\d*)(M|K|B|X|\+|%)?$/);

    if (!match) {
      // If it doesn't match (like "Seoul"), just show the value
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const targetNumber = parseFloat(match[2]);
    const suffix = match[3] || "";
    const hasDecimal = match[2].includes(".");
    const decimalPlaces = hasDecimal ? match[2].split(".")[1].length : 0;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(increment * step, targetNumber);
      const formatted = hasDecimal ? current.toFixed(decimalPlaces) : Math.round(current).toString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value); // Ensure final value is exact
      }
    }, duration / steps);
  };

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
