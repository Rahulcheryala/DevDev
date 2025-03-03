import { useState, useEffect } from "react";

export function useCtxVariables() {
  const [variables, setVariables] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVariables() {
      try {
        const response = await fetch("/api/context-variables");
        const data = await response.json();

        console.log("Fetched variables:", data);

        if (!data.success) {
          throw new Error(data.error);
        }

        setVariables(data.variables);
      } catch (err) {
        console.error("Error fetching variables:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch variables",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchVariables();
  }, []);

  return { variables, isLoading, error };
}
