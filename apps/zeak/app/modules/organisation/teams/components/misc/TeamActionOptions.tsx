import React, { useEffect } from 'react'
import { TeamComponents } from '../../models/constants';
import { TeamFlow, useTeamContext } from '../../context';
import { TeamForm } from '../../models/team-form.model';

function TeamActionOptions({ teamId, component }: { teamId?: string; component?: TeamComponents }) {

    const { dispatch, state: { selectedTeam, records } } = useTeamContext();

    const onClickHandler = (flow: TeamFlow) => {
        if (flow === 'edit' || flow === 'member_update') {
            dispatch({ type: 'UPDATE_FORM', payload: selectedTeam as unknown as TeamForm, setFormDirty: false })
        }
        dispatch({ type: 'SET_FLOW', payload: flow, component })
    }

    useEffect(() => {
     if (teamId) {
         const rec = records.find((dept) => dept.id === teamId);
         if (rec) {
            dispatch({ type: 'SET_SELECTED_TEAM', payload: rec }); 
            const data = rec.teamUsers.flatMap((e) => e.user);
            dispatch({ type: 'SET_TEAM_USERS', payload: data });
         }
     }
    }, [teamId])
    

    return (
        <div className="flex flex-col py-2">
            <button
                className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]"
                onClick={() => onClickHandler('edit')}
            >
                Edit Team info
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('member_update')}>Manage Users</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('activation')}>{selectedTeam?.status === 'Inactive' ? 'Reactivate' : 'Deactivate'} {selectedTeam?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('duplicate')}>Duplicate {selectedTeam?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('delete')}>Delete {selectedTeam?.name}</span>
            </button>
            <button className="flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[12px] hover:bg-[#B7DCFF]">
                <span onClick={() => onClickHandler('export')}>Export Data</span>
            </button>
        </div>
    )
}

export default TeamActionOptions
