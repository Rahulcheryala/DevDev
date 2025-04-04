import { TeamTableColumns } from './TeamTableColumns'
import { TbPlus } from 'react-icons/tb'
import { DataTable } from '../../../../../components/DataTable';
import { useTeamContext } from '../../context';
import { ITeamModel } from '../../models/team.model';

type TeamDataTableProps = {
  records: ITeamModel[];
}

export default function TeamDataTable({ records }: TeamDataTableProps) {
  return <DataTable
    columns={TeamTableColumns}
    data={records.filter((e) => !e.isArchived)}>
    <InitiateTeamScreen />
  </DataTable>
}

function InitiateTeamScreen() {
  const { dispatch } = useTeamContext();

  const onCreateHandler = () => {
    dispatch({ type: 'SET_FLOW', payload: 'create' });
  }

  return <div className="w-full h-full rounded-[12px] bg-white flex-1 flex flex-col" onClick={onCreateHandler}>
    <div className="h-[64px] w-full bg-[#66D4CF1A] rounded-t-zeak"></div>
    <div className="h-[64px] w-full bg-[#66D4CF2A]"></div>
    <div className="flex flex-col flex-1 items-start gap-2 bg-[#66D4CF3A] overflow-y-hidden p-6 cursor-pointer">
      <h1 className="text-[36px] font-medium">Click to create</h1>
      <div className='h-[56px] w-[56px] rounded-full bg-white flex justify-center items-center'>
        <TbPlus className="w-[32px] h-[32px] font-weight" />
      </div>
    </div>
  </div>
}