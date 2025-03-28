import React from "react";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white p-[40px] rounded-[12px]">{children}</div>;
}
