import { DepartmentEmployeeColumns } from './DepartmentEmployeeColumns'
import { DataTable } from '../../../../components/DataTable'
import { TbPlus } from 'react-icons/tb'
import { useDepartmentContext } from '../../context'

function DepartmentEmployees() {
    const { state: { departmentUsers }, dispatch } = useDepartmentContext();
    const onCreateHandler = () => {
        dispatch({ type: 'SET_FLOW', payload: 'member_update' });
    }
    return <DataTable
        columns={DepartmentEmployeeColumns}
        data={departmentUsers}>
        {/* <InitiateDepartmentScreen /> */}
        <div className="w-full h-full rounded-[12px] bg-white flex-1 flex flex-col" onClick={onCreateHandler}>
            <div className="h-[64px] w-full bg-[#66D4CF1A] rounded-t-zeak"></div>
            <div className="h-[64px] w-full bg-[#66D4CF2A]"></div>
            <div className="flex flex-col flex-1 items-start gap-2 bg-[#66D4CF3A] overflow-y-hidden p-6 cursor-pointer">
                <h1 className="text-[36px] font-medium">Click to Add Users</h1>
                <div className='h-[56px] w-[56px] rounded-full bg-white flex justify-center items-center'>
                    <TbPlus className="w-[32px] h-[32px] font-weight" />
                </div>
            </div>
        </div>
    </DataTable>
}

export default DepartmentEmployees

