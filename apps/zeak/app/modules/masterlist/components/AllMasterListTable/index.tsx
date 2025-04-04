
import { columns } from './columns';
import { DataTable } from '@zeak/datatable';
import { useAllMasterlist, useDeactivateMasterlist, useDuplicateMasterlist } from "~/modules/masterlist"
import { useMasterlistStore } from "~/modules/masterlist"
import { TableEmptyState } from "~/components/Common"
import { TrashIcon } from "lucide-react"
import { ui } from "@zeak/react"
import { useDeleteMasterlist } from '~/modules/masterlist';


const AllMasterListTable = ({ userId }: { userId: string }) => {
    const { data: masterList, isPending, isError, isFetching } = useAllMasterlist();
    const { setIsCreateMasterlistOpen, confirmDeleteMasterlist, masterlistIdToDelete,
        setConfirmDeleteMasterlist,
        masterlistIdToDeactivate,
        confirmDuplicateMasterlist,
        setConfirmDeactivateMasterlist,
        setConfirmDuplicateMasterlist,
        confirmDeactivateMasterlist,
        selectedMasterListStatus
    } = useMasterlistStore()
    const { mutate: deleteMasterlist } = useDeleteMasterlist(masterlistIdToDelete)
    const { mutate: duplicateMasterlist } = useDuplicateMasterlist(userId)
    const { mutate: deactivateMasterlist } = useDeactivateMasterlist(masterlistIdToDeactivate)
    if (isPending || isFetching) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return <div className="w-full mt-4">
        <ui.DeleteAlert
            isOpen={confirmDeleteMasterlist}
            onClose={() => setConfirmDeleteMasterlist(false)}
            onConfirm={() => deleteMasterlist()}
            title="Delete Master List"
            message="Are you sure you want to delete this master list?"


        />
        <ui.AlertModal
            isOpen={confirmDuplicateMasterlist}
            onClose={() => setConfirmDuplicateMasterlist(false)}
            onConfirm={() => duplicateMasterlist()}
            title="Duplicate Master List"
            message="Are you sure you want to duplicate this master list?"
            buttonText="Ok"
        />
        <ui.AlertModal
            isOpen={confirmDeactivateMasterlist}
            fromColor="#6642F6"
            toColor="#598E39"
            onClose={() => setConfirmDeactivateMasterlist(false)}
            onConfirm={() => deactivateMasterlist()}
            title={selectedMasterListStatus ? "Deactivate Master List" : "Activate Master List"}
            message={selectedMasterListStatus ? "Are you sure you want to deactivate this master list?" : "Are you sure you want to activate this master list?"}
            buttonText="Ok"
        />

        <DataTable columns={columns} data={masterList?.data} onClickNewBtn={() => {
            setIsCreateMasterlistOpen(true)
        }} />
        {masterList?.data?.length === 0 && <TableEmptyState title="Create New Master List" link="Create Master List" />}
    </div>;
};

export default AllMasterListTable;