import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMasterlistStore } from "./use-masterlist-store";
export const useSearchMasterlist = () => {
    const { searchTerm, sortList } = useMasterlistStore()
    return useQuery({
        queryKey: ["masterlist-search", searchTerm, sortList],
        queryFn: () =>
            axios
                .get(`/api/masterlist/search?${searchTerm ? `name=${searchTerm}` : ""}&sort=${sortList}`)
                .then((res) => res.data),
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
