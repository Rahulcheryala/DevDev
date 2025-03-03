import { ItemHeader } from "../../../../../components/Layout/Screen";
import { ISelectedItem } from "../../../../../components/Layout/Screen/View/ItemHeader";
import { useTeamContext } from "../../context";
import TeamActionOptions from "../misc/TeamActionOptions";
import DepartmentActionOptions from "../misc/TeamActionOptions";

export default function TeamHeader() {
    const { state: { selectedTeam, company }, dispatch } = useTeamContext();

    if (!selectedTeam) return null;

    const breadcrumbs = [
        {
            label: "Organization",
            to: "/"
        },
        {
            label: "Teams",
            to: "/x/access-settings/teams"
        }
    ];

    const unsetTeamHandler = () => {
        dispatch({ type: 'SET_SELECTED_TEAM', payload: null });
        dispatch({ type: 'SET_TEAM_USERS', payload: [] });
    }

    return <ItemHeader
        breadcrumbs={breadcrumbs}
        backUrl="/x/access-settings/teams/"
        onClose={unsetTeamHandler}
        selectedItem={{
            ...selectedTeam,
            code: selectedTeam.teamCode,
            userCount: selectedTeam.teamUsers.length || 0,
        } as ISelectedItem}
        companyName={company?.name!}
        actionPopover={<TeamActionOptions teamId={selectedTeam.id} component="individual" />}
    />
}
