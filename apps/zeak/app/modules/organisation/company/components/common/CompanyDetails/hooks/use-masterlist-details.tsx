import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMasterlistDetails = (id: string | null) => {
    return useQuery({
        queryKey: ["masterlist-details", id],
        queryFn: () => axios.get(`/api/masterlist/${id}`).then((res) => res.data),
        enabled: !!id
    })
}
