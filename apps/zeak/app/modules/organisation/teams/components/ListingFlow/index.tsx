import { useTeamContext } from '../../context';
import TeamDataTable from './TeamDataTable';

export default function TeamList() {
  const { state: { records } } = useTeamContext();
  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      <TeamDataTable records={records} />
    </div>
  )
}
