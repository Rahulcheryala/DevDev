import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { useCompanyEditStore, type Company } from "~/shared/companyEditStore";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";

const DEFAULT_COMPANIES_LIST: Company[] = [
    {
        id: '1',
        logo: 'https://ui-avatars.com/api/?name=AC&background=0D8ABC&color=fff',
        since: today(getLocalTimeZone()),
        location: 'New York, USA',
        additionalMeta: {
            createdAt: today(getLocalTimeZone()),
            createdBy: 'Emma Thompson',
            updatedAt: today(getLocalTimeZone()),
            updatedBy: 'Emma Thompson',
        },
        generalInfo: {
            companyName: 'Acme Corporation',
            companyCode: 'ACME001',
            zeakUrl: 'https://acme.zeak.com',
            website: 'https://acmecorp.com',
            status: 'Active',
            startDate: today(getLocalTimeZone()),
            endDate: today(getLocalTimeZone()).add({ months: 12 }),
        },
        addressInfo: [{
            title: 'Headquarters',
            status: 'Active',
            primary: true,
            address: {
                addressLine1: '123 Corporate Drive',
                addressLine2: 'Floor 45',
                phone: '+1 (555) 123-4567',
                email: 'contact@acmecorp.com',
                country: 'United States',
                city: 'New York',
                state: 'NY',
                zip: '10001',
            },
            contactList: [
                {
                    id: '1',
                    name: 'John Smith',
                    email: 'john.smith1@acmecorp.com',
                    phone: '+1 (555) 123-4567',
                },
                {
                    id: '2',
                    name: 'John Smith 2',
                    email: 'john.smith2@acmecorp.com',
                    phone: '+1 (555) 123-4568',
                },
                {
                    id: '3',
                    name: 'John Smith 3',
                    email: 'john.smith3@acmecorp.com',
                    phone: '+1 (555) 123-4569',
                },
                {
                    id: '4',
                    name: 'John Smith 4',
                    email: 'john.smith4@acmecorp.com',
                    phone: '+1 (555) 123-4561',
                }
            ],
        }],
        additionalInfo: {
            primaryLanguage: 'English',
            timezone: 'America/New_York',
            dunsNumber: '123456789',
            bbbRating: 'A+',
            creditRating: 'AAA',
        },
        fiscalPeriod: {
            from: today(getLocalTimeZone()),
            to: today(getLocalTimeZone()).add({ months: 12 }),
        },
        attachments: [
            {
                id: '1',
                name: 'Company Logo',
                type: 'image/png',
                url: 'https://ui-avatars.com/api/?name=AC&background=0D8ABC&color=fff',
            }
        ],
    },
    {
        id: '2',
        logo: 'https://ui-avatars.com/api/?name=GX&background=FF6B6B&color=fff',
        since: today(getLocalTimeZone()),
        location: 'San Francisco, USA',
        additionalMeta: {
            createdAt: '2024-02-14',
            createdBy: 'Michael Chen',
            updatedAt: '2024-02-14',
            updatedBy: 'Michael Chen',
        },
        generalInfo: {
            companyName: 'Globex Industries',
            companyCode: 'GLOB002',
            zeakUrl: 'https://globex.zeak.com',
            website: 'https://globexindustries.com',
            status: 'Active',
            startDate: today(getLocalTimeZone()),
            endDate: today(getLocalTimeZone()).add({ months: 12 }),
        },
        addressInfo: [{
            title: 'Main Office',
            status: 'Active',
            primary: true,
            address: {
                addressLine1: '456 Tech Boulevard',
                addressLine2: 'Suite 789',
                phone: '+1 (555) 987-6543',
                email: 'info@globexindustries.com',
                country: 'United States',
                city: 'San Francisco',
                state: 'CA',
                zip: '94105',
            },
            contactList: [
                {
                    id: '1',
                    name: 'Sarah Chen',
                    email: 'sarah.chen@globexindustries.com',
                    phone: '+1 (555) 987-6543',
                }
            ],
        }],
        additionalInfo: {
            primaryLanguage: 'English',
            timezone: 'America/Los_Angeles',
            dunsNumber: '987654321',
            bbbRating: 'A',
            creditRating: 'AA',
        },
        fiscalPeriod: {
            from: today(getLocalTimeZone()),
            to: today(getLocalTimeZone()).add({ months: 12 }),
        },
        attachments: [
            {
                id: '1',
                name: 'Company Logo',
                type: 'image/png',
                url: 'https://ui-avatars.com/api/?name=GX&background=FF6B6B&color=fff',
            }
        ],
    },
];

interface CompanyData {
    id: string;
    tenantId: string;
    companyCode: string | null;
    deletedAt: string | null;
    domainUrl: string | null;
    name: string | null;
    primaryContactId: string | null;
    status: "Active" | "Inactive";
}

export default function CompanyDetails({ company, onSave }: { company: any, onSave: (data: any) => void }) {
    // const [activeSection, setActiveSection] = useState("general");
    // const [isEditing, setIsEditing] = useState(false);
    // const [currentCompanyId, setCurrentCompanyId] = useState<string | undefined>(undefined);
    // const [companies, setCompanies] = useState<any[]>([]);
    const { companies, setCompanies, currentCompanyId, setCurrentCompanyId, activeSection, setActiveSection, isEditing, setIsEditing } = useCompanyEditStore();

    const onCompanySelect = (id: string | number) => {
        setCurrentCompanyId(typeof id === 'string' ? id : id.toString());
    }

    const transformCompanyData = (data: any) => {
        return data.map((company: CompanyData) => ({
            ...company,
            // lastUpdatedBy: 'John Doe 10',
            // updatedAt: new Date(),
            // link: '#',
            // logo: 'CS10',
            // code: company.companyCode || 'CYS110',
            // selected: false
        }));
    }

    useEffect(() => {
        // const companiesList = company.data ? transformCompanyData(company.data) : [];

        //enable mock data
        const companiesList = DEFAULT_COMPANIES_LIST;
        companiesList.map((company: Company, index: number) => {
            if (index === 0) {
                company.selected = true;
            } else {
                company.selected = false;
            }

            return company;
        });
        const currentCompanyId = companiesList.find((company: any) => company.selected)?.id || '';
        setCurrentCompanyId(currentCompanyId);
        setCompanies(companiesList);
    }, [company.data?.length]);

    return (
        <div className="flex h-full">
            <Sidebar
            // companies={companies}
            // currentCompanyId={currentCompanyId}
            // onCompanySelect={onCompanySelect}
            />
            <MainContent
                // company={companies.find((company) => company.id === currentCompanyId)}
                // companyCount={companies.length}
                // onPrevClick={onCompanySelect}
                // onNextClick={onCompanySelect}
                // activeSection={activeSection}
                // isEditing={isEditing}
                // setIsEditing={setIsEditing}
                onSave={onSave}
            />
        </div>
    );
} 