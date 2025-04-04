import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useCompanies() {
    return useQuery({
        queryKey: ['companies'],
        queryFn: () => axios.get(`/api/masterlist/companies`).then(res => res.data),
        staleTime: 1000 * 60 * 60 * 24,
    })
}
