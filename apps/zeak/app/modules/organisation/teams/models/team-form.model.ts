export type TeamForm = {
    name: string;
    teamCode: string;
    description: string;
    status: string;
    startDate: string | null;
    endDate: string | null;
    parentTeamId: string | null;
    teamLeaderId: string | null;
    teamLeaderEmail: string | null;
    visibility: string;
    imageUrl: string;
};


// Initial states for the context
export const initialTeamForm: TeamForm = {
    name: '',
    teamCode: '',
    description: '',
    status: '',
    startDate: null,
    endDate: null,
    parentTeamId: '',
    teamLeaderId: '',
    teamLeaderEmail: '',
    visibility: '',
    imageUrl: '',
};