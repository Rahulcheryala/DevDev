import { BiPlus } from 'react-icons/bi'
import { useTeamContext } from '../../context'
import { useState, useEffect, useMemo } from 'react'
import { ITeamModel } from '../../models/team.model'
import { useNavigate } from '@remix-run/react'
import { ListingPanel } from '../../../../../components/Layout/Screen'
import { IRecord } from '../../../../../components/Layout/Screen/View/ListingPanel'

function TeamListingPanel() {
    const { state: { records, selectedTeam }, dispatch } = useTeamContext();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(selectedTeam?.id?.toString() || null);

    useEffect(() => {
        if (selectedTeam?.id) {
            setSelectedId(selectedTeam.id.toString());
        }
    }, [selectedTeam]);

    const handleTeamSelect = (record: ITeamModel) => {
        setSelectedId(record.id);
        dispatch({ type: 'SET_SELECTED_TEAM', payload: record });
        const data = record.teamUsers.flatMap((e) => e.user);
        dispatch({ type: 'SET_TEAM_USERS', payload: data });
        navigate(`/x/access-settings/teams/${record.id}`);
    };

    const handleNewTeam = () => {
        dispatch({ type: 'SET_FLOW', payload: 'create' });
    };

    const transformedRecords: IRecord[] = useMemo(() => {
        return records.map((record) => ({
            ...record,
            code: record?.teamCode,
            status: record.status,
            isArchived: record.isArchived,
            logo: record.imageUrl,
            createdBy: record.createdByUser ? record.createdByUser?.firstName || '' + ' ' + record.createdByUser?.lastName || '' : '-',
            createdOn: record.createdAt,
            updatedAt: record.updatedAt,
            lastUpdatedBy: record.lastUpdatedByUser ? record.lastUpdatedByUser?.firstName || '' + ' ' + record.lastUpdatedByUser?.lastName || '' : '-',
        }));
    }, [records]);

    return <ListingPanel
        type="team"
        selectedId={selectedId!}
        records={transformedRecords}
        button={<><BiPlus />
            <span>NEW TEAM</span></>}
        backUrl="/x/access-settings/teams/"
        onItemClicked={handleTeamSelect}
        onCreateHandler={handleNewTeam}
    />
}

export default TeamListingPanel
