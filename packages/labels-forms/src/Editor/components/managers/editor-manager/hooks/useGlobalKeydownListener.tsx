import { useEffect } from "react";

const useGlobalKeydownListener = (
  callback: (event: KeyboardEvent) => void,
  dependencies: any[] = [],
) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => callback(event);

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, dependencies);
};

export default useGlobalKeydownListener;
