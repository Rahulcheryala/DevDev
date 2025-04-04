import { useEffect, useLayoutEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState<{
    height: number | null;
    width: number | null;
  }>({
    width: null,
    height: null,
  });

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
