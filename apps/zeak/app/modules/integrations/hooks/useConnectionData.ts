import { useEffect, useState } from "react";
import { useConnectionContext } from "../context/connection";
import { IConnectionModel } from "../models/connection.model";

/**
 * Custom hook to efficiently manage connection data access
 * Provides memoized access to connection data while optimizing fetching behavior
 */
export const useConnectionData = () => {
  const {
    state: { records, isLoading, error },
    refreshData
  } = useConnectionContext();
  
  const [lastRefresh, setLastRefresh] = useState<number | null>(null);
  
  // Force refresh data if it's stale (more than 5 minutes old)
  const forceRefreshIfStale = () => {
    const now = Date.now();
    if (!lastRefresh || now - lastRefresh > 5 * 60 * 1000) {
      refreshData();
      setLastRefresh(now);
    }
  };
  
  // Check for stale data on mount
  useEffect(() => {
    forceRefreshIfStale();
  }, []);
  
  // Explicit refresh method for components to use
  const refresh = () => {
    refreshData();
    setLastRefresh(Date.now());
  };
  
  // Helper functions for working with connections
  const getConnectionById = (id: string): IConnectionModel | undefined => {
    return records?.find((connection: IConnectionModel) => connection.id === id);
  };
  
  const getConnectionsByIntegrationId = (integrationId: string): IConnectionModel[] => {
    if (!records) return [];
    return records.filter((connection: IConnectionModel) => connection.integrationId === integrationId);
  };
  
  return {
    connections: records || [],
    isLoading,
    error,
    refresh,
    getConnectionById,
    getConnectionsByIntegrationId,
  };
}; 