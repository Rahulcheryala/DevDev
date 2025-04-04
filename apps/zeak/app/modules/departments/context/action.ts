import { DepartmentAction } from ".";
import { DepartmentsQuery } from "../services/getPaginatedDepartmentList";
import { fetchDepartmentList } from "../utils/api.utils";

async function refreshRecordsAction(filters: Partial<DepartmentsQuery>, dispatch: React.Dispatch<DepartmentAction>) {
    const records = await fetchDepartmentList(filters);
    dispatch({ type: 'SET_RECORDS', payload: records });
}


export {
    refreshRecordsAction
}