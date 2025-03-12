import { useEffect, useState } from "react";
import { useUnifiedContext } from "../context";
import { IIntegrationModel } from "../models/integration.model";
import { IConnectionModel } from "../models/connection.model";

/**
 * Custom hook to efficiently manage integration data access
 * Provides memoized access to integration and connection data
 * while optimizing fetching behavior
 */
export const useIntegrationData = () => {
  const {
    state: { records, connectionsList, isIntegrationLoading, integrationError },
    refreshData
  } = useUnifiedContext();
  
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
  
  // Helper functions to filter and work with the data
  const getConnectionsForIntegration = (integrationId: string): IConnectionModel[] => {
    if (!connectionsList) return [];
    return connectionsList.filter(conn => conn.integrationId === integrationId);
  };
  
  const getIntegrationById = (id: string): IIntegrationModel | undefined => {
    return records.find(integration => integration.id === id);
  };
  
  return {
    integrations: records,
    connectionsList: connectionsList,
    isIntegrationLoading,
    integrationError,
    refresh,
    getConnectionsForIntegration,
    getIntegrationById,
  };
}; 