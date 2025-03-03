/* eslint-disable */
import React, { useEffect, useState } from "react";

export const useDPI = () => {
  const [dpi, setDpi] = useState(0);

  useEffect(() => {
    // Check if document and window are available
    if (typeof document !== "undefined" && typeof window !== "undefined") {
      try {
        // Create an empty div element
        const div = document.createElement("div");
        // Set the style of the div to a size of 1 inch
        div.style.width = "1in";
        // Append the div to the body to have it in the document
        document.body.appendChild(div);
        // Get the DPI by measuring the offsetWidth, which is the width in pixels
        // and adjust it by the device pixel ratio
        const calculatedDPI = div.offsetWidth * window.devicePixelRatio;
        // Set the DPI state
        setDpi(calculatedDPI);
        // Remove the div from the body after measurement
        document.body.removeChild(div);
      } catch (error) {
        console.error("Error calculating DPI:", error);
      }
    } else {
      console.warn("document or window is not available");
    }
  }, []); // Empty dependency array means this effect runs only once on mount

  return dpi;
};
