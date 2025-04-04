
import { DepartmentPageHeader, DepartmentPageTabs } from "../../../../modules/departments";

export default function Departments() {
  return (
    // TODO: Remove the width from the div later 
    <div className="bg-[#F0F4FD] w-[calc(100vw-260px)] px-4 h-full">
      <DepartmentPageHeader />
      <DepartmentPageTabs />
    </div>
  );
}

