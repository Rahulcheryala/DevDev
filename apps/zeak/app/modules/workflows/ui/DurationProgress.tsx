// DurationProgress.tsx

import React from "react";

type DurationProgressProps = {
  duration: number; // Duration in seconds
  maxDuration?: number; // Maximum duration for scaling the progress bar
};

const DurationProgress: React.FC<DurationProgressProps> = ({
  duration,
  maxDuration = 10,
}) => {
  // Calculate the percentage for the progress bar
  const percentage = Math.min((duration / maxDuration) * 100, 100);

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-sm text-gray-700">{duration.toFixed(1)} s</span>
      <div className="w-full bg-gray-300 rounded h-2 mt-1">
        <div
          className="bg-lime-500 h-2 rounded"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DurationProgress;
