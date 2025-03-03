import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CreateMasterlistSchema } from '../schema'

interface CreateMasterlistResponse {
    success: boolean
    error?: string
}

export const useCreateMasterlist = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateMasterlistSchema) => {
            try {
                const response = await axios.post<CreateMasterlistResponse>('/api/masterlist', {
                    ...data,
                    createdBy: userId
                })
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
            toast.success('Masterlist created successfully')
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
}