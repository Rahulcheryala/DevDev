import { UnifiedAction } from ".";
import { ConnectionsQuery } from "../services/getPaginatedConnectionList";
import { IntegrationsQuery } from "../services/getPaginatedIntegrationList";
import { fetchConnectionsList, fetchIntegrationsList } from "../utils/api.utils";

export async function refreshIntegrationsAction(filters: Partial<IntegrationsQuery>, dispatch: React.Dispatch<UnifiedAction>) {
    const records = await fetchIntegrationsList(filters);
    dispatch({ type: 'SET_INTEGRATIONS_LIST', payload: records.data });
}

export async function refreshConnectionsAction(filters: Partial<ConnectionsQuery>, dispatch: React.Dispatch<UnifiedAction>) {
    const records = await fetchConnectionsList(filters);
    dispatch({ type: 'SET_CONNECTIONS_LIST', payload: records.data });
}
