import React, { useEffect } from 'react'
import { DepartmentFlow, useDepartmentContext } from '../../context'
import { DepartmentForm } from '../../models/department-form.model';
import { DepartmentComponents } from '../../models/constants';

function DepartmentActionOptions({ departmentId, component }: { departmentId?: string; component?: DepartmentComponents }) {

    const { dispatch, state: { selectedDepartment, records } } = useDepartmentContext();

    const onClickHandler = (flow: DepartmentFlow) => {
        if (flow === 'edit' || flow === 'member_update') {
            dispatch({ type: 'UPDATE_FORM', payload: selectedDepartment as unknown as DepartmentForm, setFormDirty: false })
        }
        dispatch({ type: 'SET_FLOW', payload: flow, component })
    }

    useEffect(() => {
     if (departmentId) {
         const rec = records.find((dept) => dept.id === departmentId);
         if (rec) {
            dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: rec }); 
            const data = rec.empOrgAssignment.flatMap((e) => e.employeeDetails);
            dispatch({ type: 'SET_DEPARTMENT_USERS', payload: data });
         }
     }
    }, [departmentId])
    

    return (
        <div className="flex flex-col py-2">
            <button
                className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]"
                onClick={() => onClickHandler('edit')}
            >
                Edit Department info
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('member_update')}>Manage Users</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('activation')}>{selectedDepartment?.status === 'Inactive' ? 'Reactivate' : 'Deactivate'} {selectedDepartment?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('duplicate')}>Duplicate {selectedDepartment?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('delete')}>Delete {selectedDepartment?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('export')}>Export Data</span>
            </button>
        </div>
    )
}

export default DepartmentActionOptions
