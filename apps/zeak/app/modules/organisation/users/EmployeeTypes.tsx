import { VStack } from "@zeak/react";
import { Outlet } from "@remix-run/react";
import EmployeeTypesTable from "./components/EmployeeTypes/EmployeeTypesTable";

export default function EmployeeTypesModule({data, count}:{data:any, count:number}) {
    
  
    return (
      <VStack spacing={0} className="h-full">
        <EmployeeTypesTable data={data ?? []} count={count ?? 0} />
        <Outlet />
      </VStack>
    );
  }
  