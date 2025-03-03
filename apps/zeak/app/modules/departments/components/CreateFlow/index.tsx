import { toast } from "@zeak/react"
import { DepartmentAddFlowTabs } from '../../models/constants';
import DepartmentCreateForm from "./DepartmentCreate";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDepartmentContext } from "../../context";
import { DepartmentForm } from "../../models/department-form.model";
import { refreshRecordsAction } from "../../context/action";
import { manageEmployeesToDepartment, createDepartmentFn, updateDepartmentFn } from "../../utils/api.utils";
import { CreationTabs } from "../../../../components/Layout";
import { ButtonProps } from "../../../../components/Layout/Screen/Creation/SaveButton";
import DepartmentUsers from "./DepartmentUsers";

type ButtonTypes = 'next' | 'draft' | 'save' | 'save_clear' | 'save_manage_users' | 'save_edit_info'


interface DepartmentCreateFormProps {
    isOpen: boolean;
    closeDrawer: (bool?: boolean) => void
}

function DepartmentAddFlow({ isOpen, closeDrawer }: DepartmentCreateFormProps) {
    const [activeTab, setactiveTab] = useState<DepartmentAddFlowTabs>(DepartmentAddFlowTabs.CREATE_FLOW);
    const { state, dispatch } = useDepartmentContext();
    const { departmentForm, departmentUsers, currentFlow, selectedDepartment, company } = state;

    const onCloseHandler = (bool?: boolean) => {
        setactiveTab(DepartmentAddFlowTabs.CREATE_FLOW)
        closeDrawer(bool);
    }

    const onSubmit = (action: ButtonTypes) => {
        if (action === 'next') {
            // const isValid = checkForError();
            if (true) {
                setactiveTab(DepartmentAddFlowTabs.USER_FLOW)
            }
        } else if (action === 'save') {
            saveData(true);
        } else if (action === 'save_clear') {
            saveData(false);
        } else if (action === 'draft') {
            saveData(true, 'all', { status: 'Blocked' });
        } else if (action === 'save_manage_users') {
            saveData(false, 'general').then(() => setactiveTab(DepartmentAddFlowTabs.USER_FLOW));
        } else if (action === 'save_edit_info') {
            saveData(false, 'users').then(() => setactiveTab(DepartmentAddFlowTabs.CREATE_FLOW));
        }
    }

    const saveData = async (close: boolean = true, mode: 'all' | 'users' | 'general' = 'all', updateBody?: Partial<DepartmentForm>) => {
        try {
            const body = { ...departmentForm, ...updateBody };
            let department = null;
            let departmentId = selectedDepartment?.id!;
            // const isValid = checkForError();
            if (!true) {
                toast.warning('Missing Details, Cannot submit the form');
                return;
            }
            if (mode !== 'users') {
                if (currentFlow === 'create') {
                    department = await createDepartmentFn(body)
                    departmentId = department.id;
                } else {
                    await updateDepartmentFn(departmentId, body)
                }
            }
            if (departmentUsers.length && mode !== 'general') {
                let existing: string[] = [];
                if (currentFlow === 'edit' || currentFlow === 'member_update' && selectedDepartment?.id) {
                    existing = selectedDepartment?.empOrgAssignment.flatMap((e) => e.employeeId) || [];
                }
                await manageEmployeesToDepartment(departmentId, departmentUsers.map((e) => e.id), existing);
            }
            await refreshRecordsAction({}, dispatch);
            if (close) {
                onCloseHandler(true);
            } else {
                if (currentFlow === 'create') {
                    dispatch({ type: 'SET_DEPARTMENT_USERS', payload: [] });
                    dispatch({ type: 'RESET_FORM' });
                    dispatch({ type: 'CLEAR_ERRORS' });
                    setactiveTab(DepartmentAddFlowTabs.CREATE_FLOW);
                } else if (currentFlow === 'edit' || currentFlow === 'member_update') {
                    dispatch({ type: 'UPDATE_FORM', payload: {}, setFormDirty: false });
                }
            }
            return toast.success(`Department ${currentFlow === 'create' ? 'created' : 'updated'} successfully!!`);
        } catch (error) {
            console.error("Unexpected error:", error);
            return toast.error(`Failed to ${currentFlow === 'create' ? 'create' : 'update'} department`);
        }
    };

    // Side Effects
    useEffect(() => {
        switch (currentFlow) {
            case 'edit':
                setactiveTab(DepartmentAddFlowTabs.CREATE_FLOW);
                break;
            case 'member_update':
                setactiveTab(DepartmentAddFlowTabs.USER_FLOW);
                break;
            default:
                break;
        }
    }, [currentFlow]);

    // Variable Assignments
    const label = useMemo(() => (
        currentFlow === 'create' ? (
            <Fragment>Create New Department in <span className="text-text-tertiary">{company?.name}</span></Fragment>
        ) : (
            <Fragment>Edit <span className="text-text-tertiary">{selectedDepartment?.name}</span></Fragment>
        )
    ), [currentFlow, selectedDepartment?.name]);

    const mainButton: ButtonProps = {
        label: currentFlow === 'create'
            ? (activeTab === DepartmentAddFlowTabs.CREATE_FLOW ? 'Next' : 'Save & Create Another')
            : 'Save and Close',
        id: currentFlow === 'create'
            ? (activeTab === DepartmentAddFlowTabs.CREATE_FLOW ? 'next' : 'save_clear')
            : 'save',
        onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
    };

    const optionButtons: ButtonProps[] = currentFlow === 'create' 
        ? [
            {
                label: 'Save as Draft',
                id: 'draft',
                onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
            },
            ...(activeTab === DepartmentAddFlowTabs.USER_FLOW ? [{
                label: 'Save & Finish',
                id: 'save',
                onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
            }] : [])
        ]
        : (currentFlow === 'edit' || currentFlow === 'member_update') 
            ? [{
                label: activeTab === DepartmentAddFlowTabs.USER_FLOW
                    ? 'Save and Edit General Info'
                    : 'Save and Manage Users',
                id: activeTab === DepartmentAddFlowTabs.USER_FLOW
                    ? 'save_edit_info'
                    : 'save_manage_users',
                onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
            }]
            : [];

    const StepTabs = [
        {
            id: '1',
            title: "General",
            value: DepartmentAddFlowTabs.CREATE_FLOW,
            containerClassName: 'h-[calc(100vh-210px)] overflow-auto px-10 py-8',
            component: <DepartmentCreateForm />
        },
        {
            id: '2',
            title: "Users",
            value: DepartmentAddFlowTabs.USER_FLOW,
            containerClassName: 'h-[calc(100vh-205px)] overflow-clip',
            component: <DepartmentUsers />
        },
    ]

    return <CreationTabs
        label={label}
        isOpen={isOpen}
        tabs={StepTabs}
        mainButton={mainButton}
        optionButtons={optionButtons}
        closeDrawer={onCloseHandler}
        selectedTab={activeTab}
        onTabChanged={(tab) => setactiveTab(tab.value as DepartmentAddFlowTabs)}
    />
}

export default DepartmentAddFlow
