import FilterOptions from "./FilterOptions";
import LeftPanelHeader from "./LeftPanelHeader";
import ListView from "./ListView";
import { Button } from "@zeak/react";
import { Plus } from "lucide-react";
import { ui } from "@zeak/react";
import { useDeleteMasterlist, useDeactivateMasterlist } from "../../hooks";

import { useMasterlistStore } from "../../hooks";
import { useParams } from "@remix-run/react";

interface LeftPanelProps {
  systemDefinedMasterLists: any;
}

export default function LeftPanel({ systemDefinedMasterLists }: LeftPanelProps) {
  const { id } = useParams()
  if (!id) {
    throw new Error("Masterlist ID is required");
  }
  const { setIsCreateMasterlistOpen, confirmDeleteMasterlist, setConfirmDeleteMasterlist, confirmDeactivateMasterlist, setConfirmDeactivateMasterlist } = useMasterlistStore();
  const { mutate: deleteMasterlist } = useDeleteMasterlist(id)

  return (
    <div className="space-y-1 relative w-[350px] h-[calc(100vh-120px)]">
      <ui.DeleteAlert
        isOpen={confirmDeleteMasterlist}
        onClose={() => setConfirmDeleteMasterlist(false)}
        onConfirm={() => {
          deleteMasterlist()
        }}
        title="Delete Master List"
        message="Are you sure you want to delete this master list?"


      />
      {/* <ui.AlertModal
        isOpen={confirmDuplicateMasterlist}
        onClose={() => setConfirmDuplicateMasterlist(false)}
        onConfirm={() => duplicateMasterlist()}
        title="Duplicate Master List"
        message="Are you sure you want to duplicate this master list?"
        buttonText="Ok"
      />
      /> */}
      <div className="mb-3">

        <FilterOptions />
      </div>
      <LeftPanelHeader />

      <ListView systemDefinedMasterLists={systemDefinedMasterLists} />
      <div className="absolute bottom-0 left-0 right-0">
        <Button
          onClick={() => setIsCreateMasterlistOpen(true)}
          variant="ghost"
          className="gap-2 py-5 h-[60px] hover:opacity-90 hover:bg-[#0D0844] text-white bg-[#0D0844] w-full"
        >
          <Plus className="h-4 w-4 text-white" />
          <span className="uppercase text-white">New List</span>
        </Button>
      </div>
    </div>
  );
}