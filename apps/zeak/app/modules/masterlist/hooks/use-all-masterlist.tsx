import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAllMasterlist = () => {
    return useQuery({
        queryKey: ["masterlist"],
        queryFn: () => axios.get("/api/masterlist/get-all").then((res) => res.data),
        staleTime: 1000 * 60 * 60 * 24,


    })
}