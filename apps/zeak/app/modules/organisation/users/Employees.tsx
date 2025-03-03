import { VStack } from "@zeak/react";
import EmployeesTable from "./components/Employees/EmployeesTable";
import { Outlet } from "@remix-run/react";


const EmployeesModule = ({employees, count, employeeTypes}:{employees:any, count:number, employeeTypes:any}) => {

    return(
    <VStack spacing={0} className="h-full">
    <EmployeesTable
      data={employees}
      count={count}
      employeeTypes={employeeTypes}
    />
    <Outlet />
  </VStack>
    )
}

export default EmployeesModule;