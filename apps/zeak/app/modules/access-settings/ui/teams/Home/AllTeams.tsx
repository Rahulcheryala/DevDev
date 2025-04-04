import { memo } from "react";
import type { TeamType } from "~/modules/access-settings";
import { Team } from "./components";

type TeamTableProps = {
  data: TeamType[];
  count: number;
};

const AllTeams = memo(({ data, count }: TeamTableProps) => {
  return <Team data={data} count={count} />;
});

AllTeams.displayName = "AllTeams";
export default AllTeams;
