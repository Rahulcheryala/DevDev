import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useMasterlistStore } from "./use-masterlist-store"


export const useUpdateMasterlist = (id: string, userId?: string) => {
    const { editMasterlist, setIsEditing, setEditMasterlist } = useMasterlistStore()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () =>
            await axios.put(`/api/masterlist/${id}`, { ...editMasterlist, lastUpdatedBy: userId }),
        onSuccess: () => {
            // Invalidate and refetch masterlist queries
            queryClient.invalidateQueries({ queryKey: ['masterlist'] })
            queryClient.invalidateQueries({ queryKey: ['masterlist-details', id] })
            setIsEditing(false)
            setEditMasterlist({

            })
        }
    })
}