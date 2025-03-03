import { toast } from "@zeak/react"
import { Fragment, useEffect, useMemo, useState } from "react";
import { useTeamContext } from "../../context";
import { refreshRecordsAction } from "../../context/action";
import { createTeamFn, manageEmployeesToTeam, updateTeamFn } from "../../utils/api.utils";
import { CreationTabs } from "../../../../../components/Layout";
import { TeamAddFlowTabs } from "../../models/constants";
import { ButtonProps } from "../../../../../components/Layout/Screen/Creation/SaveButton";
import TeamUsers from "./TeamsUsers";
import { TeamForm } from "../../models/team-form.model";
import TeamCreateForm from "./TeamsCreate";

type ButtonTypes = 'next' | 'draft' | 'save' | 'save_clear' | 'save_manage_users' | 'save_edit_info'


interface DepartmentCreateFormProps {
    isOpen: boolean;
    closeDrawer: (bool?: boolean) => void
}

function TeamAddFlow({ isOpen, closeDrawer }: DepartmentCreateFormProps) {
    const [activeTab, setactiveTab] = useState<TeamAddFlowTabs>(TeamAddFlowTabs.CREATE_FLOW);
    const { state, dispatch } = useTeamContext();
    const { teamForm, teamUsers, currentFlow, selectedTeam, company } = state;

    const onCloseHandler = (bool?: boolean) => {
        setactiveTab(TeamAddFlowTabs.CREATE_FLOW)
        closeDrawer(bool);
    }

    const onSubmit = (action: ButtonTypes) => {
        if (action === 'next') {
            // const isValid = checkForError();
            if (true) {
                setactiveTab(TeamAddFlowTabs.USER_FLOW)
            }
        } else if (action === 'save') {
            saveData(true);
        } else if (action === 'save_clear') {
            saveData(false);
        } else if (action === 'draft') {
            saveData(true, 'all', { status: 'Blocked' });
        } else if (action === 'save_manage_users') {
            saveData(false, 'general').then(() => setactiveTab(TeamAddFlowTabs.USER_FLOW));
        } else if (action === 'save_edit_info') {
            saveData(false, 'users').then(() => setactiveTab(TeamAddFlowTabs.CREATE_FLOW));
        }
    }

    const saveData = async (close: boolean = true, mode: 'all' | 'users' | 'general' = 'all', updateBody?: Partial<TeamForm>) => {
        try {
            const body = { ...teamForm, ...updateBody };
            let team = null;
            let teamId = selectedTeam?.id!;
            // const isValid = checkForError();
            if (!true) {
                toast.warning('Missing Details, Cannot submit the form');
                return;
            }
            if (mode !== 'users') {
                if (currentFlow === 'create') {
                    team = await createTeamFn(body)
                    teamId = team.id;
                } else {
                    await updateTeamFn(teamId, body)
                }
            }
            if (teamUsers.length && mode !== 'general') {
                let existing: string[] = [];
                if (currentFlow === 'edit' || currentFlow === 'member_update' && selectedTeam?.id) {
                    existing = selectedTeam?.teamUsers.flatMap((e) => e.userId) || [];
                }
                await manageEmployeesToTeam(teamId, teamUsers.map((e) => e.id), existing);
            }
            await refreshRecordsAction({}, dispatch);
            if (close) {
                onCloseHandler(true);
            } else {
                if (currentFlow === 'create') {
                    dispatch({ type: 'SET_TEAM_USERS', payload: [] });
                    dispatch({ type: 'RESET_FORM' });
                    dispatch({ type: 'CLEAR_ERRORS' });
                    setactiveTab(TeamAddFlowTabs.CREATE_FLOW);
                } else if (currentFlow === 'edit') {
                    dispatch({ type: 'UPDATE_FORM', payload: {}, setFormDirty: false });
                }
            }
            return toast.success(`Team ${currentFlow === 'create' ? 'created' : 'updated'} successfully!!`);
        } catch (error) {
            console.error("Unexpected error:", error);
            return toast.error(`Failed to ${currentFlow === 'create' ? 'create' : 'update'} team`);
        }
    };
    // Side Effects
    useEffect(() => {
        switch (currentFlow) {
            case 'edit':
                setactiveTab(TeamAddFlowTabs.CREATE_FLOW);
                break;
            case 'member_update':
                setactiveTab(TeamAddFlowTabs.USER_FLOW);
                break;
            default:
                break;
        }
    }, [currentFlow]);

    // Variable Assignments
    const label = useMemo(() => (
        currentFlow === 'create' ? (
            <Fragment>Create New Team in <span className="text-text-tertiary">{company?.name}</span></Fragment>
        ) : (
            <Fragment>Edit <span className="text-text-tertiary">{selectedTeam?.name}</span></Fragment>
        )
    ), [currentFlow, selectedTeam?.name]);

    const mainButton: ButtonProps = {
        label: currentFlow === 'create'
            ? (activeTab === TeamAddFlowTabs.CREATE_FLOW ? 'Next' : 'Save & Create Another')
            : 'Save and Close',
        id: currentFlow === 'create'
            ? (activeTab === TeamAddFlowTabs.CREATE_FLOW ? 'next' : 'save_clear')
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
            ...(activeTab === TeamAddFlowTabs.USER_FLOW
                ? [{
                    label: 'Save & Finish',
                    id: 'save',
                    onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
                }]
                : [])
        ]
        : (currentFlow === 'edit' || currentFlow === 'member_update')
            ? [{
                label: activeTab === TeamAddFlowTabs.USER_FLOW
                    ? 'Save and Edit General Info'
                    : 'Save and Manage Users',
                id: activeTab === TeamAddFlowTabs.USER_FLOW
                    ? 'save_edit_info'
                    : 'save_manage_users',
                onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes)
            }] : [];

    const StepTabs = [
        {
            id: '1',
            title: "General",
            value: TeamAddFlowTabs.CREATE_FLOW,
            containerClassName: 'h-[calc(100vh-210px)] overflow-auto px-10 py-8',
            component: <TeamCreateForm />
        },
        {
            id: '2',
            title: "Users",
            value: TeamAddFlowTabs.USER_FLOW,
            containerClassName: 'h-[calc(100vh-205px)] overflow-clip',
            component: <TeamUsers />
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
        onTabChanged={(tab) => setactiveTab(tab.value as TeamAddFlowTabs)}
    />
}

export default TeamAddFlow
