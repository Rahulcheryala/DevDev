import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { PageHeader } from './page-header'
import { DataTable } from './data-table'

const columns = [
    { key: 'name', label: 'Company Name', sortable: true },
    { key: 'code', label: 'Company Code', sortable: true },
    { key: 'url', label: 'URL', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'users', label: 'Number of Users', sortable: true },
    { key: 'createdAt', label: 'Creation Date', sortable: true },
]

export async function loader({ request }: LoaderFunctionArgs) {
    const mockData = [
        {
            name: 'Example Company',
            code: 'EX001',
            url: 'example.com',
            status: 'Active',
            users: 10,
            createdAt: '2024-03-20',
        },
    ]
    return json({
        companies: mockData
    });
}

export function CompaniesPage() {
    const { companies } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <PageHeader
                title="Companies"
                breadcrumb={[
                    { label: 'Organization', href: '/organization' },
                    { label: 'Companies' }
                ]}
            />

            <div className="flex px-8 py-4 border-b">
                <button className="px-4 py-2 text-sm font-medium text-[#101828] border-b-2 border-[#007AF5]">
                    Dashboard
                </button>
                <button className="px-4 py-2 text-sm font-medium text-[#475467]">
                    All Companies
                </button>
            </div>

            <div className="flex-1 p-8">
                <DataTable
                    columns={columns}
                    data={companies}
                />
            </div>
        </div>
    )
}