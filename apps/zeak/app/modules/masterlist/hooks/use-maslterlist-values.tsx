import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMasterlistValues = (id: string | null) => {
    return useQuery({
        queryKey: ["masterlist-values", id],
        queryFn: () => axios.get(`/api/masterlist/${id}/values?id=${id}`).then((res) => res.data),
        enabled: !!id
    })
}
