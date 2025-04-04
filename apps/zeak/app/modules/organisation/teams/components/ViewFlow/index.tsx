import TeamListingPanel from './TeamListingPanel'
import TeamHeader from './TeamHeader'
import { useEffect } from 'react'
import { useParams } from '@remix-run/react'
import TeamDetails from './TeamDetails'
import TeamEmployees from './TeamEmployees'
import { useTeamContext } from '../../context'
import { ITab } from '../../../../../components/Layout/Screen/Creation/CreationTabs'
import { TeamViewFlowTabs } from '../../models/constants'
import { ViewContainer } from '../../../../../components/Layout/Screen'

function TeamView() {
    const { teamId } = useParams();
    const { state: { records, currentFlow, selectedTeam }, dispatch } = useTeamContext();

    useEffect(() => {
        if (teamId && records.length > 0) {
            const selectedTeam = records.find(record => record.id === teamId);
            if (selectedTeam && currentFlow !== 'create') {
                dispatch({ type: 'SET_SELECTED_TEAM', payload: selectedTeam });
                const data = selectedTeam.teamUsers.flatMap((e) => e.user);
                dispatch({ type: 'SET_TEAM_USERS', payload: data });
            }
        }
    }, [teamId, records, dispatch]);

    const onTabChangeHandler = (tab: ITab) => { };

    const StepTabs = [
        {
            id: '1',
            title: "General",
            value: TeamViewFlowTabs.GENERAL,
            containerClassName: 'max-h-[calc(100vh-370px)] overflow-auto',
            component: <TeamDetails />
        },
        {
            id: '2',
            title: "Users",
            value: TeamViewFlowTabs.USERS,
            containerClassName: 'max-h-[calc(100vh-370px)] max-w-[940px] overflow-auto',
            component: <TeamEmployees />
        },
        {
            id: '3',
            title: "Audit",
            value: TeamViewFlowTabs.AUDIT,
            content: "Audit",
            component: <p>Currently Unavailable</p>
        }
    ]

    return <ViewContainer
        type="teams"
        selectedItemId={teamId}
        selectedItem={selectedTeam}
        headerComponent={<TeamHeader />}
        listingComponent={<TeamListingPanel />}
        tabs={StepTabs}
        onTabChange={onTabChangeHandler}
    />
}

export default TeamView
