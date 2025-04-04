import { create } from "zustand";
import { combine } from "zustand/middleware";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

// mock data - to be removed

const DEFAULT_COMPANY_LIST: Company[] = [
    {
        id: '1',
        logo: 'CS',
        since: today(getLocalTimeZone()),
        location: 'New York, NY',
        additionalMeta: {
            createdAt: '2021-01-01',
            createdBy: 'John Doe',
            updatedAt: '2021-01-01',
            updatedBy: 'John Doe',
        },
        generalInfo: {
            companyName: 'Company Name',
            companyCode: 'CS',
            zeakUrl: 'https://zeak.com',
            website: 'https://zeak.com',
            status: 'Active',
            startDate: today(getLocalTimeZone()),
            endDate: today(getLocalTimeZone()),
        },
        addressInfo: [
            {
                title: 'Main Office',
                status: 'Active',
                primary: true,
                address: {
                    addressLine1: '123 Main St',
                    addressLine2: '',
                    phone: '123-456-7890',
                    email: 'info@zeak.com',
                    country: 'United States',
                    city: 'New York',
                    state: 'NY',
                    zip: '10001',
                },
                contactList: [
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john.doe@zeak.com',
                        phone: '123-456-7890',
                    }
                ],
            }
        ],
        additionalInfo: {
            primaryLanguage: 'English',
            timezone: 'America/New_York',
            dunsNumber: '1234567890',
            bbbRating: 'A+',
            creditRating: 'AAA',
        },
        fiscalPeriod: {
            from: today(getLocalTimeZone()),
            to: today(getLocalTimeZone()),
        },
        attachments: [
            {
                id: '1',
                name: 'Company Logo',
                type: 'image/png',
                url: 'https://zeak.com/logo.png',
            }
        ],
    }
];

export enum ActiveStep {
    GENERAL = 'General',
    ADDITIONAL_INFO = 'Additional Info',
    USERS = 'Users',
    BRANDING = 'Branding',
    TEAMS = 'Teams',
    DEPARTMENTS = 'Departments',
    INTEGRATIONS = 'Integrations'
}

export type Company = {
    id: string;
    selected?: boolean;
    logo: string;
    since: CalendarDate;
    location: string;
    additionalMeta: {
        createdAt: CalendarDate;
        createdBy: string;
        updatedAt: CalendarDate;
        updatedBy: string;
    },
    generalInfo: {
        companyName: string;
        companyCode: string;
        zeakUrl: string;
        website: string;
        status: string;
        startDate: CalendarDate;
        endDate: CalendarDate;
    },
    addressInfo: {
        title: string;
        status: string;
        primary: boolean;
        address: {
            addressLine1: string;
            addressLine2: string;
            phone: string;
            email: string;
            country: string;
            city: string;
            state: string;
            zip: string;
        },
        contactList: {
            id: string;
            name: string;
            email: string;
            phone: string;
        }[]

    }[],
    additionalInfo: {
        primaryLanguage: string;
        timezone: string;
        dunsNumber: string;
        bbbRating: string;
        creditRating: string;
    },
    fiscalPeriod: {
        from: CalendarDate,
        to: CalendarDate,
    },
    attachments: {
        id: string;
        name: string;
        type: string;
        url: string;
    }[]
}

interface CompanyEditState {
    activeSection: typeof ActiveStep[keyof typeof ActiveStep];
    companies: Company[];
    currentCompanyId: string;
    isEditing: boolean;
    setActiveSection: (step: typeof ActiveStep[keyof typeof ActiveStep]) => void;
    setIsEditing: (enabled: boolean) => void;
    setCompanies: (companies: Company[]) => void;
    setCurrentCompanyId: (id: string) => void;
    updateCompany: (company: Company) => void;
    updateGeneralInfo: (id: string, generalInfo: Company['generalInfo']) => void;
    updateAddressInfo: (id: string, addressInfo: Company['addressInfo']) => void;
    updateAdditionalInfo: (id: string, additionalInfo: Company['additionalInfo']) => void;
    updateFiscalPeriod: (id: string, fiscalPeriod: Company['fiscalPeriod']) => void;
    updateAttachments: (id: string, attachments: Company['attachments']) => void;
}

export const useCompanyEditStore = create<CompanyEditState>()(
    combine(
        {
            activeSection: ActiveStep.GENERAL,
            companies: DEFAULT_COMPANY_LIST,
            currentCompanyId: DEFAULT_COMPANY_LIST[0].id,
            isEditing: false,
        },
        (set) => ({
            setActiveSection: (step: typeof ActiveStep[keyof typeof ActiveStep]) => set({ activeSection: step }),
            setIsEditing: (enabled: boolean) => set({ isEditing: enabled }),
            setCompanies: (companies: Company[]) => set({ companies: companies }),
            setCurrentCompanyId: (id: string) => set({ currentCompanyId: id }),
            updateCompany: (company: Company) => set((state) => ({ companies: state.companies.map(c => c.id === company.id ? company : c) })),
            updateGeneralInfo: (id: string, generalInfo: Company['generalInfo']) => set((state) => {
                const company = state.companies.find(c => c.id === id);
                if (company) {
                    company.generalInfo = generalInfo;
                }
                return { companies: state.companies };
            }),
            updateAddressInfo: (id: string, addressInfo: Company['addressInfo']) => set((state) => {
                const company = state.companies.find(c => c.id === id);
                if (company) {
                    company.addressInfo = addressInfo;
                }
                return { companies: state.companies };
            }),
            updateAdditionalInfo: (id: string, additionalInfo: Company['additionalInfo']) => set((state) => {
                const company = state.companies.find(c => c.id === id);
                if (company) {
                    company.additionalInfo = additionalInfo;
                }
                return { companies: state.companies };
            }),
            updateFiscalPeriod: (id: string, fiscalPeriod: Company['fiscalPeriod']) => set((state) => {
                const company = state.companies.find(c => c.id === id);
                if (company) {
                    company.fiscalPeriod = fiscalPeriod;
                }
                return { companies: state.companies };
            }),
            updateAttachments: (id: string, attachments: Company['attachments']) => set((state) => {
                const company = state.companies.find(c => c.id === id);
                if (company) {
                    company.attachments = attachments;
                }
                return { companies: state.companies };
            }),
        })
    )
)