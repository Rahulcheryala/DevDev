import { UserMapper } from "../../../../../components/Layout";
import { EmployeeUser } from "../../../../../components/types/employee-user.model";
import { useTeamContext } from "../../context";


function TeamUsers() {
    const { state, dispatch } = useTeamContext();
    const { teamUsers, employeeUsers } = state;

    const onToggleUserHandler = (item: EmployeeUser) => {
        dispatch({type: 'TOGGLE_USER', payload: item});
    }

    const onSelectAllHandler = () => {
        if (teamUsers.length !== employeeUsers.length) {
            dispatch({type: 'SET_TEAM_USERS', payload: employeeUsers});
        } else {
            dispatch({type: 'SET_TEAM_USERS', payload: []});
        }
    }

    return <UserMapper
        users={employeeUsers}
        selectedUsers={teamUsers}
        onToggleUser={onToggleUserHandler}
        onSelectAll={onSelectAllHandler}
    />
}

export default TeamUsers
