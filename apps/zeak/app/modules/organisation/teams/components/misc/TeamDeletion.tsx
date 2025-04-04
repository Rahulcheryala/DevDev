import { DeletionModal } from "../../../../../components/Layout/Screen";
import { useTeamContext } from "../../context";

interface TeamDeletionProps {
    isOpen: boolean;
    onClose: () => void;
}

function TeamDeletion({ isOpen, onClose }: TeamDeletionProps) {
    const { state: { selectedTeam } } = useTeamContext();
    const blockers = [
        {
            title: 'Assigned Users',
            count: selectedTeam?.teamUsers.length || 0,
            link: `/x/access-settings/teams/${selectedTeam?.id}?t=users`
        }
    ]

    return <DeletionModal isOpen={isOpen} onClose={onClose} blockers={blockers} />
}
export default TeamDeletion;
