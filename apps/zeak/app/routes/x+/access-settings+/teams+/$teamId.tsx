import TeamView from "../../../../modules/organisation/teams/components/ViewFlow"
import { TeamProvider } from "../../../../modules/organisation/teams/context"

function TeamViewScreen() {
  return <TeamProvider>
    <TeamView />
  </TeamProvider>
}

export default TeamViewScreen
