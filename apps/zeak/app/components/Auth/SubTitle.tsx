import React from "react";

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] text-accent-dark font-[450] font-suisse">
      {children}
    </p>
  );
}
