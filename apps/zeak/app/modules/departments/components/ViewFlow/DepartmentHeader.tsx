import { useDepartmentContext } from "../../context";
import DepartmentActionOptions from "../misc/DepartmentActionOptions";
import { ItemHeader } from "../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../components/Layout/Screen/View/ItemHeader";

export default function DepartmentHeader() {
    const { state: { selectedDepartment, company }, dispatch } = useDepartmentContext();

    if (!selectedDepartment) return null;

    const breadcrumbs = [
        {
            label: "Organization",
            to: "/"
        },
        {
            label: "Departments",
            to: "/x/departments"
        }
    ];

    const unsetDepartmentHandler = () => {
        dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: null });
        dispatch({ type: 'SET_DEPARTMENT_USERS', payload: [] });
    }

    return <ItemHeader
        breadcrumbs={breadcrumbs}
        backUrl="/x/access-settings/departments/"
        onClose={unsetDepartmentHandler}
        selectedItem={{
            ...selectedDepartment,
            code: selectedDepartment.departmentCode,
            userCount: selectedDepartment.noOfUsers || 0,
        } as ISelectedItem}
        companyName={company?.name!}
        actionPopover={<DepartmentActionOptions component="individual" />}
    />
}
