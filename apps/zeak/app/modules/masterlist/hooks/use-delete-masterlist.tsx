import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useMasterlistStore } from "~/modules/masterlist"

export const useDeleteMasterlist = (id: string) => {
    const queryClient = useQueryClient()
    const { setConfirmDeleteMasterlist, setMasterlistIdToDelete } = useMasterlistStore()
    return useMutation({
        mutationFn: () =>
            axios.delete(`/api/masterlist/${id}`),
        onSuccess: () => {
            // Invalidate and refetch masterlist queries
            queryClient.invalidateQueries({ queryKey: ['masterlist'] })
            toast.success('Masterlist deleted successfully')
            setConfirmDeleteMasterlist(false)
            setMasterlistIdToDelete("")
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete masterlist')
        }
    })
}
