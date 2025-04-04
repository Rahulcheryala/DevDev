import { BiPlus } from 'react-icons/bi'
import { useDepartmentContext } from '../../context'
import { useState, useEffect, useMemo } from 'react'
import { IDepartmentModel } from '../../models/department.model'
import { useNavigate } from '@remix-run/react'
import { ListingPanel } from '../../../../components/Layout/Screen'
import { IRecord } from '../../../../components/Layout/Screen/View/ListingPanel'

function DepartmentListingPanel() {
    const { state: { records, selectedDepartment }, dispatch } = useDepartmentContext();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(selectedDepartment?.id?.toString() || null);

    useEffect(() => {
        if (selectedDepartment?.id) {
            setSelectedId(selectedDepartment.id.toString());
        }
    }, [selectedDepartment]);

    const handleDepartmentSelect = (record: IDepartmentModel) => {
        setSelectedId(record.id);
        dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: record });
        const data = record.empOrgAssignment.flatMap((e) => e.employeeDetails);
        dispatch({ type: 'SET_DEPARTMENT_USERS', payload: data });
        navigate(`/x/access-settings/departments/${record.id}`);
    };

    const handleNewDepartment = () => {
        dispatch({ type: 'SET_FLOW', payload: 'create' });
    };

    const transformedRecords: IRecord[] = useMemo(() => {
        return records.map((record) => ({
            ...record,
            code: record?.departmentCode,
            status: record.status,
            isArchived: record.isArchived,
            logo: record.logo || '',
            createdBy: record.createdByUser ? record.createdByUser?.firstName || '' + ' ' + record.createdByUser?.lastName || '' : '-',
            createdOn: record.createdAt,
            updatedAt: record.updatedAt || undefined,
            lastUpdatedBy: record.lastUpdatedByUser ? record.lastUpdatedByUser?.firstName || '' + ' ' + record.lastUpdatedByUser?.lastName || '' : '-',
        }));
    }, [records]);

    return <ListingPanel
        type="department"
        selectedId={selectedId!}
        records={transformedRecords}
        button={<><BiPlus />
            <span>NEW DEPARTMENT</span></>}
        backUrl="/x/access-settings/departments/"
        onItemClicked={handleDepartmentSelect}
        onCreateHandler={handleNewDepartment}
    />
}

export default DepartmentListingPanel
