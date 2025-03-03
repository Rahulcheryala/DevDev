import { memo, useCallback, useState } from "react";
import { VStack } from "@zeak/react";
import { TeamUsersTable } from "../shared";
import { useParams, useRevalidator } from "@remix-run/react";
import { EmployeeTeamSearchInput, teamStatus } from "~/modules/access-settings";
import axios from "axios";
import { path } from "~/utils/path";

type TeamUsersProps = {
  count: number;
  teamMembers: any;
};

const TeamUsers = memo(({ count, teamMembers }: TeamUsersProps) => {
  const { teamId } = useParams();
  const revalidator = useRevalidator();
  const [isDisabled, setIsDisabled] = useState(false);

  const addUserToTeam = useCallback(
    async (userId: string) => {
      if (
        teamMembers.find(
          (member: { userId: { id: string } }) => member.userId.id === userId,
        )
      ) {
        return;
      }
      setIsDisabled(true);

      const formData = new FormData();
      formData.append("teamId", teamId!);
      formData.append("userId", userId);
      formData.append("status", teamStatus[0]);

      await axios({
        method: "post",
        url: path.to.api.addUserToTeam,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      revalidator.revalidate();

      setIsDisabled(!true);
    },
    [teamMembers, teamId, revalidator],
  );

  return (
    <VStack spacing={0} className="h-full user-table-search">
      <EmployeeTeamSearchInput
        onChange={(value: any) => {
          addUserToTeam(value);
        }}
        existingMembers={teamMembers}
        disabled={isDisabled}
      />
      <TeamUsersTable data={teamMembers} count={count} />
    </VStack>
  );
});

TeamUsers.displayName = "TeamUsers";
export default TeamUsers;
