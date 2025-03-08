import { ChevronLeft, ChevronUpIcon, ChevronDownIcon } from 'lucide-react'
import { IoSearchOutline } from 'react-icons/io5'
import { useState, useMemo, useCallback, useEffect, ReactNode } from 'react'
import { useNavigate } from '@remix-run/react'
import Image from '../../../Image'
import { motion } from 'framer-motion'
import { Popover, PopoverContent, PopoverTrigger } from '@zeak/react'
import { capitalize } from '../../../../utils/string'
import StatusPill from './StatusPill'


export type IRecord = {
    id: string;
    name: string;
    code?: string;
    description?: string;
    status?: string;
    isArchived?: boolean;
    logo?: string;
    createdBy?: string;
    createdOn?: string;
    updatedAt?: string
    lastUpdatedBy?: string
    // for integrations
    integrationCategory?: string;
    integrationType?: string;
    lastUpdated?: string;
    // for connections
    connectionType?: string;
    connectionStatus?: string;
}

// Define the types for the props
interface ListingPanelProps {
    type: 'team' | 'department' | 'integration' | 'connection'
    selectedId: string;
    records: Array<IRecord>;
    button: ReactNode;
    backUrl: string;
    backButton?: ReactNode;
    onItemClicked: (record: any) => void;
    onCreateHandler: () => void;
}

/**
 * ListingPanel Component
 * 
 * A panel that displays a list of records with search and filter capabilities.
 * 
 * ### How to Use
 * ```tsx
 * <ListingPanel
 *     selectedId="some-id"
 *     records={yourRecordsArray}
 *     button="Create New"
 *     backUrl="/previous-page"
 *     onItemClicked={(record) => console.log(record)}
 *     onCreateHandler={() => console.log('Create new item')}
 * />
 * ```
 */
const ListingPanel: React.FC<ListingPanelProps> = ({ type, selectedId, records, button, backUrl, backButton, onItemClicked, onCreateHandler }: ListingPanelProps): JSX.Element => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStatus, setActiveStatus] = useState('All');
    const status = type === 'integration' || type === 'connection' ? ['All', 'System', 'User Defined'] : ['All', 'Active', 'Inactive', 'Archived'];
    const [sortBy, setSortBy] = useState<string>('name-asc');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    console.log(records)

    const sortOptions = [
        { id: 'name-asc', label: 'Name A-Z' },
        { id: 'name-desc', label: 'Name Z-A' },
        { id: 'code-asc', label: 'Code A-Z' },
        { id: 'code-desc', label: 'Code Z-A' },
        { id: 'updated-by', label: 'Updated by' },
        { id: 'last-updated', label: 'Last updated' },
        { id: 'status', label: 'Status' },
    ];

    // Memoize filtered records to prevent unnecessary recalculations
    const filteredRecords = useMemo(() => {
        let sorted = records
            .filter(record => {
                // Status filter
                if (activeStatus === 'Archived') {
                    return record.isArchived;
                } else if (activeStatus !== 'All') {

                    return  type === 'integration' ? record.integrationType === activeStatus : record.status === activeStatus && !record.isArchived;
                }
                return !record.isArchived;
            })
            .filter(record => {
                // Search filter
                if (!searchTerm) return true;
                const searchLower = searchTerm.toLowerCase();
                return (
                    record.name?.toLowerCase().includes(searchLower) ||
                    record.code?.toLowerCase().includes(searchLower) ||
                    record.description?.toLowerCase().includes(searchLower)
                );
            });

        // Apply sorting
        return [...sorted].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return (a.name || '').localeCompare(b.name || '');
                case 'name-desc':
                    return (b.name || '').localeCompare(a.name || '');
                case 'code-asc':
                    return (a.code || '').localeCompare(b.code || '');
                case 'code-desc':
                    return (b.code || '').localeCompare(a.code || '');
                case 'updated-by':
                    return (a.lastUpdatedBy || '').localeCompare(b.lastUpdatedBy || '');
                case 'last-updated':
                    return new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime();
                case 'status':
                    return (a.status || '').localeCompare(b.status || '');
                default:
                    return 0;
            }
        });
    }, [records, searchTerm, activeStatus, sortBy]);

    // Debounce search to prevent excessive filtering
    const debouncedSearch = useCallback((value: string) => {
        // add debounce later
        setSearchTerm(value);
    }, []);

    const handleBack = () => {
        if (typeof backUrl === 'string') {
            navigate(backUrl); // Navigate to the backUrl if it's a string
        } else {
            navigate(-1); // Go back one step in history if backUrl is not a string
        }
    };

    const caption = capitalize(type);

    return <motion.div
        initial={{ x: '-10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
    >
        <div className="top-section bg-white rounded-[12px]">
            <div className='py-4 px-[18px]'>
                {type === 'connection' ? backButton : (
                    <div
                    title={`Back to ${caption}s`}
                    className='flex gap-2 py-3 cursor-pointer'
                    onClick={handleBack}
                    >
                        <ChevronLeft className='text-secondary' />
                        <span className='text-secondary'>Back</span>
                    </div>
                )}
            </div>
            <div className="search-section px-4 flex flex-col gap-6 py-4 pt-3">
                <div className="relative">
                    <input
                        id="search"
                        name="search"
                        placeholder="Search"
                        className="bg-[#F0F4FD] border-0 h-14 w-full p-2 rounded-md pl-10"
                        autoComplete="off"
                        onChange={(e) => debouncedSearch(e.target.value)}
                    />
                    <IoSearchOutline className="absolute top-[32%] text-xl left-3 text-text-tertiary" />
                </div>
                <div className="tab-section flex gap-3">
                    {status.map((statusItem) => (
                        <button
                            title={`Filter ${statusItem} ${caption}s`}
                            key={statusItem}
                            onClick={() => setActiveStatus(statusItem)}
                            className={`text-accent-dark py-[10px] px-3 rounded-[12px] transition-colors cursor-pointer whitespace-nowrap
                                ${activeStatus === statusItem
                                    ? 'bg-[#D3DFE8] hover:bg-[#C2CED7] font-semibold'
                                    : ''
                                }`}
                        >
                            {statusItem}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        <div className='mt-3'>
            <div className='flex justify-between items-center px-4 py-[14px] bg-white rounded-t-[12px]'>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <span title='Sort By' className='text-secondary text-sm flex gap-2 items-center cursor-pointer'>
                            Sort By: <b>{sortOptions.find(opt => opt.id === sortBy)?.label}</b>
                            <div className="flex flex-col items-center justify-center">
                                <ChevronUpIcon className='h-4 w-4' />
                                <ChevronDownIcon className='h-4 w-4 mt-[-8px]' />
                            </div>
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0 divide-y divide-white" side="bottom" align="start">
                        {sortOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`flex items-center gap-2 px-4 text-left py-2 text-sm hover:rounded-[8px] hover:bg-[#B7DCFF]
                                    ${sortBy === option.id ? 'bg-[#B7DCFF] rounded-[8px]' : 'text-secondary'}`}
                                onClick={() => {
                                    setSortBy(option.id);
                                    setIsPopoverOpen(false);
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </PopoverContent>
                </Popover>
                <p
                    title={`Showing ${filteredRecords.length} of ${records.length} ${caption}s`}
                    className='uppercase text-text-tertiary text-sm'>
                    <b>{filteredRecords.length}</b> Records
                </p>
            </div>
            <div className="relative">
                <div className="listing-container h-[calc(100vh-485px)] overflow-auto">
                    {filteredRecords.length > 0 ? (
                        filteredRecords.map(record => (
                            <div
                                key={record.id}
                                onClick={() => onItemClicked(record)}
                                className={`px-4 py-3 mt-[2px] cursor-pointer hover:bg-accent-primary hover:rounded-[12px] transition-all duration-200 group
                                    ${selectedId === record.id ? 'bg-accent-primary hover:opacity-100 rounded-[12px]' : 'bg-white hover:opacity-80'}`}
                            >
                                <div className='flex items-center gap-4'>
                                    <Image src={record.logo || '/images/dynamics365.png'} alt={record.name} className={`h-10 w-10 min-h-10 min-w-10 p-2 object-cover ${type === 'integration' ? 'rounded-full' : 'rounded-zeak'} ${selectedId === record.id ? 'bg-white' : 'bg-[#00000010]'}`} />
                                    <div className='flex-1'>
                                        <p className='flex justify-between items-center'>
                                            <span
                                                title={`${caption} Name`}
                                                className={`text-[14px] font-medium ${selectedId === record.id ? 'text-white' : 'text-secondary group-hover:text-white'}`}>
                                                {record.name}
                                            </span>
                                            {type !== 'integration' && type !== 'connection' && (
                                                <span
                                                    title={`${caption} Code`}
                                                    className={`text-[14px] uppercase ${selectedId === record.id ? 'text-white' : 'text-secondary-tertiary group-hover:text-white'}`}>
                                                    {record.code}
                                                </span>
                                            )}
                                            {type === 'connection' && (
                                                <div className="px-1 py-0.5 rounded-sm text-xs"><StatusPill status={record.connectionType!} /></div>
                                            )}
                                        </p>
                                        {type === 'integration' || type === 'connection' ? (
                                            <p
                                                title="Integration Category"
                                                className={`text-[12px] uppercase ${selectedId === record.id ? 'text-white opacity-60' : 'text-secondary-tertiary group-hover:text-white group-hover:opacity-60'}`}>
                                                {record.integrationCategory}
                                            </p>
                                        ):(
                                            <p
                                                title="Activation Status"
                                                className={`text-[12px] uppercase ${selectedId === record.id ? 'text-white opacity-60' : 'text-secondary-tertiary group-hover:text-white group-hover:opacity-60'}`}>
                                                {record.status}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='mt-[14px]'>
                                    <p className='grid grid-cols-[60%_40%] justify-between'>
                                        <div className='flex gap-x-2 flex-nowrap'>
                                            <span className={`text-sm whitespace-nowrap ${selectedId === record.id ? 'text-white opacity-60' : 'text-tertiary group-hover:text-white group-hover:opacity-60'}`}>
                                                Last updated
                                            </span>
                                            <span
                                                title="Last Updated By"
                                                className={`text-sm truncate max-w-[120px] block ${selectedId === record.id ? 'text-white opacity-60' : 'text-secondary group-hover:text-white group-hover:opacity-60'}`}>
                                                {record.lastUpdatedBy || '-'}
                                            </span>
                                        </div>
                                        <div className='flex flex-nowrap justify-end'>
                                        <span className={`text-sm mx-2 ${selectedId === record.id ? 'text-white' : 'text-accent-primary group-hover:text-white'}`}>|</span>
                                        <span
                                            title="Last Updated On"
                                            className={`text-sm truncate ${selectedId === record.id ? 'text-white opacity-60' : 'text-tertiary group-hover:text-white group-hover:opacity-60'}`}>
                                            {record.updatedAt ? new Date(record.updatedAt!).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : '-'}
                                        </span>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-white mt-[2px] text-tertiary">
                            <p>No {type} found</p>
                            <p className="text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
                <button
                    onClick={onCreateHandler}
                    className='flex justify-center items-center gap-3 absolute top-full translate-y-1 w-full px-7 py-5 bg-[#0D0844] text-white rounded-[12px] hover:bg-[#1a1255] transition-colors transform hover:scale-[.98]'
                >
                    {button}
                </button>
            </div>
        </div>
    </motion.div>;
}

export default ListingPanel
