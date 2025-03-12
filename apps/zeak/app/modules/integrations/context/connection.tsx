import React, { ReactNode } from "react";

/**
 * @deprecated This file has been deprecated. 
 * All connection context functionality has been merged into the unified context in index.tsx.
 * Please use the UnifiedProvider and associated hooks from index.tsx instead.
 */

export type ConnectionFlow =
  | "create"
  | "edit"
  | "delete"
  | "activation"
  | "duplicate"
  | null;

// Deprecated connection provider that just passes through children
// Kept for backward compatibility only
export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  console.warn("ConnectionProvider in connection.tsx is deprecated. Use UnifiedProvider from index.tsx instead.");
  return <>{children}</>;
};

// Deprecated hook that throws an informative error
export const useConnectionContext = () => {
  throw new Error(
    "useConnectionContext from connection.tsx is deprecated. Use useUnifiedContext or useConnectionContext from index.tsx instead."
  );
};
