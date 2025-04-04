// import { DataTable } from '~/components/DataTable'
import { DataTable } from "@zeak/datatable"

import NotificationTableColumns from './NotificationTableColumns'

import { makeData } from './data'

export default function NotificationDataTable() {
  const data = makeData(10)

  return <DataTable columns={NotificationTableColumns} data={data} />
}
