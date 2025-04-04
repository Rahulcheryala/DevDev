import React, { createContext, useContext, ReactNode, useEffect, useCallback, useReducer, useState } from "react";
import { fetchTeamList, fetchEmployeeList, createTeamFn, updateTeamFn } from "../utils/api.utils";
import { TeamComponents } from "../models/constants";
import { toast } from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { EmployeeUser } from "../../../../components/types/employee-user.model";
import TeamAddFlow from "../components/CreateFlow";
import { initialTeamForm, TeamForm } from "../models/team-form.model";
import { ITeamModel } from "../models/team.model";
import { exportDepartmentData } from "../../../departments/utils/download.utils";
import { fetchCompany } from "../../../departments/utils/api.utils";
import { ConfirmationModal } from "../../../../components/Layout/Screen";
import TeamDeletion from "../components/misc/TeamDeletion";

export type TeamFlow = 'create' | 'edit' | 'member_update' | 'delete' | 'activation' | 'duplicate' | 'export' | null;

export type TeamState = {
    company: { id: string, name: string } | null;
    records: ITeamModel[];
    selectedTeam: ITeamModel | null;
    teamForm: TeamForm;
    teamUsers: EmployeeUser[];
    employeeUsers: EmployeeUser[];
    currentFlow: TeamFlow;
    isLoading: boolean;
    error: Error | null;
    errors: { [key: string]: string | null };
    component: TeamComponents;
    isFormDirty: boolean;
};

export type TeamAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: Error | null }
    | { type: 'SET_COMPANY'; payload: { id: string;  name: string } }
    | { type: 'SET_RECORDS'; payload: ITeamModel[] }
    | { type: 'ADD_RECORDS'; payload: ITeamModel[] }
    | { type: 'SET_SELECTED_TEAM'; payload: ITeamModel | null }
    | { type: 'UPDATE_FORM'; payload: Partial<TeamForm>; setFormDirty?: boolean }
    | { type: 'RESET_FORM' }
    | { type: 'SET_TEAM_USERS'; payload: EmployeeUser[] }
    | { type: 'SET_EMPLOYEE_USERS'; payload: EmployeeUser[] }
    | { type: 'SET_FLOW'; payload: TeamFlow; component?: TeamComponents; }
    | { type: 'TOGGLE_USER'; payload: EmployeeUser }
    | { type: 'UPDATE_ERROR'; payload: { [key: string]: string | null } }
    | { type: 'CLEAR_ERRORS' };

const initialState: TeamState = {
    company: null,
    records: [],
    selectedTeam: null,
    teamForm: initialTeamForm,
    teamUsers: [],
    employeeUsers: [],
    currentFlow: null,
    isLoading: true,
    error: null,
    errors: {},
    component: null,
    isFormDirty: false,
};

function teamReducer(state: TeamState, action: TeamAction): TeamState {
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
        case 'SET_SELECTED_TEAM':
            return { ...state, selectedTeam: action.payload };
        case 'UPDATE_FORM':
            return {
                ...state,
                teamForm: { ...state.teamForm, ...action.payload },
                isFormDirty: action.setFormDirty !== undefined ? action.setFormDirty : true,
            };
        case 'RESET_FORM':
            return {
                ...state,
                teamForm: initialTeamForm,
                isFormDirty: false,
            };
        case 'SET_TEAM_USERS':
            return { ...state, teamUsers: action.payload };
        case 'SET_EMPLOYEE_USERS':
            return { ...state, employeeUsers: action.payload };
        case 'SET_FLOW':
            return { ...state, currentFlow: action.payload as TeamFlow, component: action.component || null };
        case 'TOGGLE_USER':
            const userExists = state.teamUsers.some(user => user.id === action.payload.id);
            return {
                ...state,
                teamUsers: userExists
                    ? state.teamUsers.filter(user => user.id !== action.payload.id)
                    : [...state.teamUsers, action.payload]
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

const TeamContext = createContext<{
    state: TeamState;
    dispatch: React.Dispatch<TeamAction>;
} | undefined>(undefined);

const initialConfirmationValues = {
    message: '',
    title: '',
    flag: false
};

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(teamReducer, initialState);
    const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
    const [isDeleteNoteOpen, setIsDeleteNoteOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState({ ...initialConfirmationValues });
    const { currentFlow, selectedTeam, records, component, isFormDirty } = state;
    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });

            const [company, employees, teams] = await Promise.all([
                fetchCompany(),
                fetchEmployeeList(),
                fetchTeamList()
            ]);
            dispatch({ type: 'SET_COMPANY', payload: company  });
            dispatch({ type: 'SET_EMPLOYEE_USERS', payload: employees });
            dispatch({ type: 'SET_RECORDS', payload: teams });
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

    useEffect(() => {
        switch (currentFlow) {
            case 'create':
            case 'edit':
            case 'member_update':
                if (currentFlow === 'create') {
                    dispatch({ type: 'SET_TEAM_USERS', payload: [] });
                } else {
                    const data = selectedTeam?.teamUsers.flatMap((e) => e.user);
                    dispatch({ type: 'SET_TEAM_USERS', payload: data || [] });
                }
                setIsCreateFlowOpen(true);
                break;
            case 'activation':
                setConfirmationOpen({
                    flag: true,
                    title: `${selectedTeam?.status === 'Active' ? 'Deactivate' : 'Activate'} Team`,
                    message: `Are you sure you want to ${selectedTeam?.status === 'Active' ? 'deactivate' : 'activate'} this Team?`
                })
                break;
            case 'duplicate':
                setConfirmationOpen({
                    flag: true,
                    title: 'Duplicate Team',
                    message: 'Are you sure you want to duplicate this Team?'
                })
                break;
            case 'delete':
                if (selectedTeam?.teamUsers?.length) {
                    setIsDeleteNoteOpen(true);
                } else {
                    setConfirmationOpen({
                        flag: true,
                        title: `Delete Team`,
                        message: `Are you sure you want to delete this Team?`
                    })
                }
                break;
            case 'export':
                exportDepartmentData(null!);
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
        dispatch({ type: 'SET_TEAM_USERS', payload: [] });
        dispatch({ type: 'CLEAR_ERRORS' });
    };

    const closeDeleteModal = () => {
        setIsDeleteNoteOpen(false);
        dispatch({ type: 'SET_FLOW', payload: null });
    };

    const handleDuplication = async () => {
        const record = await createTeamFn({ ...selectedTeam, name: `Copy of ${selectedTeam?.name!}` } as TeamForm);
        const teamsData = await fetchTeamList({ id: record.id! });
        dispatch({ type: 'ADD_RECORDS', payload: teamsData });
        setConfirmationOpen({ ...initialConfirmationValues });
        toast.success(`Team ${selectedTeam?.name} duplicated Successfully!`);
        if (teamsData?.length) {
            if (component === 'individual') {
                navigate(`/x/teams/view/${record.id}`);
                dispatch({ type: 'SET_SELECTED_TEAM', payload: teamsData[0] });
                dispatch({ type: 'UPDATE_FORM', payload: teamsData[0] as unknown as TeamForm, setFormDirty: false });
                dispatch({ type: 'SET_FLOW', payload: 'edit' });
            }
        }
    }

    const handleActivation = async (isArchiver: boolean = false) => {
        const datarecords = [...records];
        const isActive = selectedTeam?.status === 'Active';
        let body = {};
        if (isArchiver) {
            body = { isArchived: true };
        } else {
            body = { status: isActive ? 'Inactive' : 'Active' };
        }
        await updateTeamFn(selectedTeam?.id!, body);
        const teamsData = await fetchTeamList({ id: selectedTeam?.id! });
        const idx = datarecords.findIndex((e) => e.id === selectedTeam?.id);
        datarecords.splice(idx, 1, teamsData[0]);
        dispatch({ type: 'SET_RECORDS', payload: datarecords });
        dispatch({ type: 'SET_SELECTED_TEAM', payload: teamsData[0] });
        onCancelHandler();
        if (isArchiver) {
            toast.success(`Team ${selectedTeam?.name} archived Successfully`);
        } else {
            toast.success(`Team ${selectedTeam?.name} ${isActive ? 'deactivated' : 'activated'} Successfully`);
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
        <TeamContext.Provider value={{ state, dispatch }}>
            {children}
            <TeamAddFlow
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
            <TeamDeletion
                isOpen={isDeleteNoteOpen}
                onClose={closeDeleteModal}
            />
        </TeamContext.Provider>
    );
};

export const useTeamContext = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error("useTeamContext must be used within a TeamProvider");
    }
    return context;
};


