import ListCard from "./ListCard";
import { useAllMasterlist, useMasterlistStore, useSearchMasterlist } from "~/modules/masterlist";
import { ScrollArea } from "@zeak/react";
import LoadingCard from "./LoadingCard";
import AllMasterlist from "./AllMasterlist";
import SearchResults from "./SearchResults";

interface ListViewProps {
    systemDefinedMasterLists: any;
}

export default function ListView({ systemDefinedMasterLists }: ListViewProps) {
    const { searchTerm } = useMasterlistStore()


    return (
        <div>
            {searchTerm ? <SearchResults systemDefinedMasterLists={systemDefinedMasterLists} /> : <AllMasterlist systemDefinedMasterLists={systemDefinedMasterLists} />}
        </div>
    );
}
