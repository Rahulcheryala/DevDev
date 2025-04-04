import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useMasterlistStore } from './use-masterlist-store'

interface DeactivateMasterlistResponse {
    success: boolean
    error?: string
    masterlist: {
        id: string
        isActive: boolean
    }
}

export const useDeactivateMasterlist = (id: string) => {
    const queryClient = useQueryClient()
    const { setConfirmDeactivateMasterlist, setMasterlistIdToDeactivate } = useMasterlistStore()

    return useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.put<DeactivateMasterlistResponse>(`/api/masterlist/${id}/deactivate`)
                return response.data
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.error || 'Failed to deactivate masterlist')
                }
                throw error
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['masterlist'] })
            queryClient.invalidateQueries({ queryKey: ['masterlist-details', id] })
            queryClient.refetchQueries({ queryKey: ['masterlist'] })

            toast.success(`Masterlist ${data.masterlist.isActive ? 'activated' : 'deactivated'} successfully`)
            setConfirmDeactivateMasterlist(false)
            setMasterlistIdToDeactivate("")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
}
