
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function CompaninesCell({ companiesIds, }: { companiesIds: string[] }) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['companies'],
        queryFn: () => axios.get(`/api/masterlist/companies`).then(res => res.data)
    })
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>
    const { companies } = data
    const companiesNames = companies.filter((company: any) => companiesIds.includes(company.id))
    return (
        <div className='px-4 py-3'>

            <div>
                {companiesNames.map((company: any) => (
                    <div key={company.id}>
                        {company.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
