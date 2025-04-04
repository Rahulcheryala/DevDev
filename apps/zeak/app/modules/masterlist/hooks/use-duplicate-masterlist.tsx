import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useMasterlistStore } from './use-masterlist-store'

interface DuplicateMasterlistResponse {
    success: boolean
    error?: string
    masterlist: {
        id: string
    }
}

export const useDuplicateMasterlist = (userId: string) => {
    const queryClient = useQueryClient()
    const { masterlistIdToDuplicate } = useMasterlistStore()
    return useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.post<DuplicateMasterlistResponse>(`/api/masterlist/${masterlistIdToDuplicate}/duplicate`, {
                    userId
                })
                return response.data
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.error || 'Failed to duplicate masterlist')
                }
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['masterlist'] })
            queryClient.refetchQueries({ queryKey: ['masterlist'] })
            toast.success('Masterlist duplicated successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
}
