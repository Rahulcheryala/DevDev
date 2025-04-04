import React from "react";

export default function AuthFormCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white p-[40px] rounded-[12px]">{children}</div>;
}
