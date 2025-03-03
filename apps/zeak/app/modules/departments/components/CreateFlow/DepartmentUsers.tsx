import { useDepartmentContext } from '../../context'
import { UserMapper } from '../../../../components/Layout';
import { EmployeeUser } from '../../../../components/types/employee-user.model';

function DepartmentUsers() {
    const { state, dispatch } = useDepartmentContext();
    const { departmentUsers, employeeUsers } = state;

    const onToggleUserHandler = (item: EmployeeUser) => {
        dispatch({type: 'TOGGLE_USER', payload: item});
    }

    const onSelectAllHandler = () => {
        if (departmentUsers.length !== employeeUsers.length) {
            dispatch({type: 'SET_DEPARTMENT_USERS', payload: employeeUsers});
        } else {
            dispatch({type: 'SET_DEPARTMENT_USERS', payload: []});
        }
    }

    return <UserMapper
        users={employeeUsers}
        selectedUsers={departmentUsers}
        onToggleUser={onToggleUserHandler}
        onSelectAll={onSelectAllHandler}
    />
}

export default DepartmentUsers
