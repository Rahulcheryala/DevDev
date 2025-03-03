import React, { useEffect } from "react";

// A custom hook that listens for resize events on an element
const useResizeObserver = (
  ref: React.RefObject<HTMLDivElement>, // This is a reference to our HTML element
  callback: (contentRect: DOMRectReadOnly) => void, // A function we'll call on resize
): void => {
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0 || entries[0].target !== ref.current) {
        return;
      }
      callback(entries[0].contentRect);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};

export default useResizeObserver;
