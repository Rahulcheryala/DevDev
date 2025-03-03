import React from 'react';
import { columns } from './columns';
import { DataTable } from '@zeak/datatable';
import { useAllMasterlist } from "~/modules/masterlist"

const AllMasterListTable = () => {
    const { data: masterList, isPending, isError } = useAllMasterlist();
    if (isPending) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return <div>

        <DataTable columns={columns} data={masterList?.data} />
    </div>;
};

export default AllMasterListTable;