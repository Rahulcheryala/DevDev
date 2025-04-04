import DepartmentListingPanel from './DepartmentListingPanel'
import DepartmentHeader from './DepartmentHeader'
import { useEffect } from 'react'
import { useDepartmentContext } from '../../context'
import { useParams } from '@remix-run/react'
import { ViewContainer } from '../../../../components/Layout/Screen'
import { ITab } from '../../../../components/Layout/Screen/Creation/CreationTabs'
import { DepartmentViewFlowTabs } from '../../models/constants'
import DepartmentDetails from './DepartmentDetails'
import DepartmentEmployees from './DepartmentEmployees'

function DepartmentView() {
    const { departmentId } = useParams();
    const { state: { records, currentFlow, selectedDepartment }, dispatch } = useDepartmentContext();

    useEffect(() => {
        if (departmentId && records.length > 0) {
            const selectedDepartment = records.find(record => record.id === departmentId);
            if (selectedDepartment && currentFlow !== 'create') {
                dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: selectedDepartment });
                const data = selectedDepartment.empOrgAssignment.flatMap((e) => e.employeeDetails);
                dispatch({ type: 'SET_DEPARTMENT_USERS', payload: data });
            }
        }
    }, [departmentId, records, dispatch]);

    const onTabChangeHandler = (tab: ITab) => { };

    const StepTabs = [
        {
            id: '1',
            title: "General",
            value: DepartmentViewFlowTabs.GENERAL,
            containerClassName: 'max-h-[calc(100vh-370px)] overflow-auto',
            component: <DepartmentDetails />
        },
        {
            id: '2',
            title: "Users",
            value: DepartmentViewFlowTabs.USERS,
            containerClassName: 'max-h-[calc(100vh-370px)] max-w-[940px] overflow-auto',
            component: <DepartmentEmployees />
        },
        {
            id: '3',
            title: "Audit",
            value: DepartmentViewFlowTabs.AUDIT,
            content: "Audit",
            component: <p>Currently Unavailable</p>
        }
    ]

    return <ViewContainer
        type="departments"
        selectedItemId={departmentId}
        selectedItem={selectedDepartment}
        headerComponent={<DepartmentHeader />}
        listingComponent={<DepartmentListingPanel />}
        tabs={StepTabs}
        onTabChange={onTabChangeHandler}
    />
}

export default DepartmentView
