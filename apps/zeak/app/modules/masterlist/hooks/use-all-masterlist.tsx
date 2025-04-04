import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMasterlistStore } from "./use-masterlist-store"
export const useAllMasterlist = () => {
    const { sortList } = useMasterlistStore()
    return useQuery({
        queryKey: ["masterlist", sortList],
        queryFn: () => axios.get(`/api/masterlist/get-all?sort=${sortList}`).then((res) => res.data),
        staleTime: 1000 * 60 * 60 * 24,


    })
}