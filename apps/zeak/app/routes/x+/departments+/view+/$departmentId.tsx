import DepartmentView from "../../../../modules/departments/components/ViewFlow"
import { DepartmentProvider } from "../../../../modules/departments/context"

function DepartmentViewScreen() {
  return <DepartmentProvider>
    <DepartmentView />
  </DepartmentProvider>
}

export default DepartmentViewScreen
