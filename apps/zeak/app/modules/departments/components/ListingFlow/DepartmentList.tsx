import DepartmentDataTable from './DepartmentDataTable'
import { useDepartmentContext } from '../../context';

export default function DepartmentList() {
  const { state: { records } } = useDepartmentContext();
  return (
    <div className="bg-[#F0F4FD] flex flex-col h-full">
      {/* <DepartmentCharts /> */}
      <DepartmentDataTable records={records} />
    </div>
  )
}
