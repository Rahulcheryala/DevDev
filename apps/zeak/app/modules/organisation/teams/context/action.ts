import { TeamAction } from ".";
import {  TeamsQuery } from "../services/getPaginatedTeamList";
import { fetchTeamList } from "../utils/api.utils";

async function refreshRecordsAction(filters: Partial<TeamsQuery>, dispatch: React.Dispatch<TeamAction>) {
    const records = await fetchTeamList(filters);
    dispatch({ type: 'SET_RECORDS', payload: records });
}


export {
    refreshRecordsAction
}