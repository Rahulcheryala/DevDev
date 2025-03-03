
import { TeamPageHeader, TeamPageTabs } from "../../../../modules/organisation/teams/components";

export default function Teams() {
  return (
    // TODO: Remove the width from the div later 
    <div className="bg-[#F0F4FD] w-[calc(100vw-260px)] px-4 h-full">
      <TeamPageHeader />
      <TeamPageTabs />
    </div>
  );
}

