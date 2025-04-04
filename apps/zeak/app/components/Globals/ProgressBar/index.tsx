import { Progress as ProgressBase } from "@zeak/react";

export default function ProgressBar({ value }: { value: number }) {


  return (
    <div className="w-full flex items-center gap-5 ">
      <ProgressBase className="w-full h-2 bg-gray-200" value={value} />
      <span className="text-xs text-gray-500">{value}%</span>
    </div>
  );
}
