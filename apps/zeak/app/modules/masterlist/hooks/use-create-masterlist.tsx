import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CreateMasterlistSchema } from '../schema'
import { useMasterlistStore } from './use-masterlist-store'
interface CreateMasterlistResponse {
    success: boolean
    error?: string
    masterlist: {
        id: string
    }
}
type CreateMasterlistData = CreateMasterlistSchema & {
    companies: string[]
}
export const useCreateMasterlist = (userId: string) => {
    const queryClient = useQueryClient()
    const { setActiveStep, setCreatedMasterlistId } = useMasterlistStore()
    return useMutation({
        mutationFn: async (data: CreateMasterlistData) => {
            try {
                const response = await axios.post<CreateMasterlistResponse>('/api/masterlist', {
                    ...data,
                    createdBy: userId
                })
                setCreatedMasterlistId(response.data.masterlist.id)
                return response.data
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.error || 'Failed to create masterlist')
                }
                throw error
            }
        },
        onSuccess: () => {
            // Invalidate and refetch in one step
            queryClient.invalidateQueries({ queryKey: ['masterlist'] })
            queryClient.refetchQueries({ queryKey: ['masterlist'] })
            setActiveStep(2)
            toast.success('Masterlist created successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
}