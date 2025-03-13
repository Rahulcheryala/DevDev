import React, { createContext, useContext, ReactNode, useEffect, useCallback, useReducer, useState } from "react";
import { DepartmentForm, initialDepartmentForm } from "../models/department-form.model";
import { createDepartmentFn, fetchCompany, fetchDepartmentList, fetchEmployeeList, updateDepartmentFn } from "../utils/api.utils";
import { IDepartmentModel } from "../models/department.model";
import { DepartmentComponents } from "../models/constants";
import { DepartmentAddFlow } from "../components";
import { toast } from "@zeak/react";
import DepartmentDeletion from "../components/misc/DepartmentDeletion";
import { useNavigate } from "@remix-run/react";
import { exportDepartmentData } from "../utils/download.utils";
import { EmployeeUser } from "../../../components/types/employee-user.model";
import { ConfirmationModal } from "../../../components/Layout/Screen";

export type DepartmentFlow = 'create' | 'edit' | 'member_update' | 'delete' | 'activation' | 'duplicate' | 'export' | null;

export type DepartmentState = {
    company: { id: string, name: string } | null;
    records: IDepartmentModel[];
    selectedDepartment: IDepartmentModel | null;
    departmentForm: DepartmentForm;
    departmentUsers: EmployeeUser[];
    employeeUsers: EmployeeUser[];
    currentFlow: DepartmentFlow;
    isLoading: boolean;
    error: Error | null;
    errors: { [key: string]: string | null };
    component: DepartmentComponents;
    isFormDirty: boolean;
};

export type DepartmentAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: Error | null }
    | { type: 'SET_COMPANY'; payload: { id: string;  name: string } }
    | { type: 'SET_RECORDS'; payload: IDepartmentModel[] }
    | { type: 'ADD_RECORDS'; payload: IDepartmentModel[] }
    | { type: 'SET_SELECTED_DEPARTMENT'; payload: IDepartmentModel | null }
    | { type: 'UPDATE_FORM'; payload: Partial<DepartmentForm>; setFormDirty?: boolean }
    | { type: 'RESET_FORM' }
    | { type: 'SET_DEPARTMENT_USERS'; payload: EmployeeUser[] }
    | { type: 'SET_EMPLOYEE_USERS'; payload: EmployeeUser[] }
    | { type: 'SET_FLOW'; payload: DepartmentFlow; component?: DepartmentComponents; }
    | { type: 'TOGGLE_USER'; payload: EmployeeUser }
    | { type: 'UPDATE_ERROR'; payload: { [key: string]: string | null } }
    | { type: 'CLEAR_ERRORS' };

const initialState: DepartmentState = {
    company: null,
    records: [],
    selectedDepartment: null,
    departmentForm: initialDepartmentForm,
    departmentUsers: [],
    employeeUsers: [],
    currentFlow: null,
    isLoading: true,
    error: null,
    errors: {},
    component: null,
    isFormDirty: false,
};

function departmentReducer(state: DepartmentState, action: DepartmentAction): DepartmentState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_COMPANY':
            return { ...state, company: action.payload };
        case 'SET_RECORDS':
            return { ...state, records: action.payload };
        case 'ADD_RECORDS':
            return { ...state, records: [...state.records, ...action.payload] };
        case 'SET_SELECTED_DEPARTMENT':
            return { ...state, selectedDepartment: action.payload };
        case 'UPDATE_FORM':
            return {
                ...state,
                departmentForm: { ...state.departmentForm, ...action.payload },
                isFormDirty: action.setFormDirty !== undefined ? action.setFormDirty : true,
            };
        case 'RESET_FORM':
            return {
                ...state,
                departmentForm: initialDepartmentForm,
                isFormDirty: false,
            };
        case 'SET_DEPARTMENT_USERS':
            return { ...state, departmentUsers: action.payload };
        case 'SET_EMPLOYEE_USERS':
            return { ...state, employeeUsers: action.payload };
        case 'SET_FLOW':
            return { ...state, currentFlow: action.payload as DepartmentFlow, component: action.component || null };
        case 'TOGGLE_USER':
            const userExists = state.departmentUsers.some(user => user.id === action.payload.id);
            return {
                ...state,
                departmentUsers: userExists
                    ? state.departmentUsers.filter(user => user.id !== action.payload.id)
                    : [...state.departmentUsers, action.payload]
            };
        case 'UPDATE_ERROR':
            return {
                ...state,
                errors: { ...state.errors, ...action.payload }
            };
        case 'CLEAR_ERRORS':
            return {
                ...state,
                errors: {}
            };
        default:
            return state;
    }
}

const DepartmentContext = createContext<{
    state: DepartmentState;
    dispatch: React.Dispatch<DepartmentAction>;
} | undefined>(undefined);

const initialConfirmationValues = {
    message: '',
    title: '',
    flag: false
};

export const DepartmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(departmentReducer, initialState);
    const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
    const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState({ ...initialConfirmationValues });
    const { currentFlow, selectedDepartment, records, component, isFormDirty } = state;
    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });

            const [company, employees, department] = await Promise.all([
                fetchCompany(),
                fetchEmployeeList(),
                fetchDepartmentList()
            ]);
            dispatch({ type: 'SET_COMPANY', payload: company  });
            dispatch({ type: 'SET_EMPLOYEE_USERS', payload: employees });
            dispatch({ type: 'SET_RECORDS', payload: department });
        } catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error : new Error('An error occurred')
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(()=>{
        console.log(state.records);
    },[state.records])

    useEffect(() => {
        switch (currentFlow) {
            case 'create':
            case 'edit':
            case 'member_update':
                if (currentFlow === 'create') {
                    dispatch({ type: 'SET_DEPARTMENT_USERS', payload: [] });
                } else {
                    const data = selectedDepartment?.empOrgAssignment.flatMap((e) => e.employeeDetails);
                    dispatch({ type: 'SET_DEPARTMENT_USERS', payload: data || [] });
                }
                setIsCreateFlowOpen(true);
                break;
            case 'activation':
                setConfirmationOpen({
                    flag: true,
                    title: `${selectedDepartment?.status === 'Active' ? 'Deactivate' : 'Activate'} Department`,
                    message: `Are you sure you want to ${selectedDepartment?.status === 'Active' ? 'deactivate' : 'activate'} this Department?`
                })
                break;
            case 'duplicate':
                setConfirmationOpen({
                    flag: true,
                    title: 'Duplicate Department',
                    message: 'Are you sure you want to duplicate this Department?'
                })
                break;
            case 'delete':
                if (selectedDepartment?.noOfUsers) {
                    setIsDeleteNoteOpen(true);
                } else {
                    setConfirmationOpen({
                        flag: true,
                        title: `Delete Department`,
                        message: `Are you sure you want to delete this Department?`
                    })
                }
                break;
            case 'export':
                exportDepartmentData(selectedDepartment!);
                break;
            default:
                break;
        }
    }, [currentFlow]);


    const closeCreateDrawer = (ignoreCheck?: boolean) => {
        if (state.isFormDirty && !ignoreCheck) {
            setConfirmationOpen({
                flag: true,
                title: 'Cancel Edit?',
                message: 'Do you want to leave without saving? You will lose all the progress.',
            });
            return;
        }
        setIsCreateFlowOpen(false);
        dispatch({ type: 'RESET_FORM' });
        dispatch({ type: 'SET_FLOW', payload: null });
        dispatch({ type: 'SET_DEPARTMENT_USERS', payload: [] });
        dispatch({ type: 'CLEAR_ERRORS' });
    };

    const closeDeleteModal = () => {
        setIsDeleteNoteOpen(false);
        dispatch({ type: 'SET_FLOW', payload: null });
    };

    const handleDuplication = async () => {
        const record = await createDepartmentFn({ ...selectedDepartment, name: `Copy of ${selectedDepartment?.name!}` } as DepartmentForm);
        const departmentsData = await fetchDepartmentList({ id: record.id! });
        dispatch({ type: 'ADD_RECORDS', payload: departmentsData });
        setConfirmationOpen({ ...initialConfirmationValues });
        toast.success(`Department ${selectedDepartment?.name} duplicated Successfully!`);
        if (departmentsData?.length) {
            if (component === 'individual') {
                navigate(`/x/access-settings/departments/${record.id}`);
                dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: departmentsData[0] });
                dispatch({ type: 'UPDATE_FORM', payload: departmentsData[0] as unknown as DepartmentForm, setFormDirty: false });
                dispatch({ type: 'SET_FLOW', payload: 'edit' });
            }
        }
    }

    const handleActivation = async (isArchiver: boolean = false) => {
        const datarecords = [...records];
        const isActive = selectedDepartment?.status === 'Active';
        let body = {};
        if (isArchiver) {
            body = { isArchived: true };
        } else {
            body = { status: isActive ? 'Inactive' : 'Active' };
        }
        await updateDepartmentFn(selectedDepartment?.id!, body);
        const departmentsData = await fetchDepartmentList({ id: selectedDepartment?.id! });
        const idx = datarecords.findIndex((e) => e.id === selectedDepartment?.id);
        datarecords.splice(idx, 1, departmentsData[0]);
        dispatch({ type: 'SET_RECORDS', payload: datarecords });
        dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: departmentsData[0] });
        onCancelHandler();
        if (isArchiver) {
            toast.success(`Department ${selectedDepartment?.name} archived Successfully`);
        } else {
            toast.success(`Department ${selectedDepartment?.name} ${isActive ? 'deactivated' : 'activated'} Successfully`);
        }
    }

    const onConfirmHandler = async () => {
        switch (currentFlow) {
            case 'duplicate':
                await handleDuplication();
                break;
            case 'activation':
                await handleActivation();
                break;
            case 'delete':
                await handleActivation(true);
                break;
            case 'create':
            case 'edit':
            case 'member_update':
                setConfirmationOpen({ ...initialConfirmationValues });
                closeCreateDrawer(true);
                break;
            default:
                break;
        }
    }

    const onCancelHandler = () => {
        setConfirmationOpen({ ...initialConfirmationValues });
        if (currentFlow === 'create' || currentFlow === 'edit' || currentFlow === 'member_update') return;
        dispatch({ type: 'SET_FLOW', payload: null });
    }

    return (
        <DepartmentContext.Provider value={{ state, dispatch }}>
            {children}
            <DepartmentAddFlow
                isOpen={isCreateFlowOpen}
                closeDrawer={closeCreateDrawer}
            />
            <ConfirmationModal
                isOpen={confirmationOpen.flag}
                message={confirmationOpen.message}
                title={confirmationOpen.title}
                onClose={onCancelHandler}
                onConfirm={onConfirmHandler}
            />
            <DepartmentDeletion
                isOpen={isDeleteNoteOpen}
                onClose={closeDeleteModal}
            />
        </DepartmentContext.Provider>
    );
};

export const useDepartmentContext = () => {
    const context = useContext(DepartmentContext);
    if (!context) {
        throw new Error("useDepartmentContext must be used within a DepartmentProvider");
    }
    return context;
};


