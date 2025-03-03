import React from "react";
import { cn } from "@zeak/react";
export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        " font-suisse text-4xl font-semibold leading-[1.1] tracking-[0.2px] mb-5 flex gap-2",
        className,
      )}
    >
      {children}
    </h1>
  );
}
