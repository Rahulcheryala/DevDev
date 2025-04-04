import { TabsList, TabsTrigger, TabsContent, Tabs, cn } from '@zeak/react'
import { ReactNode, useEffect, useState } from 'react'
import { IoDocument } from 'react-icons/io5'
import { useSearchParams } from "@remix-run/react";
import { motion } from 'framer-motion'
import { ITab } from '../Creation/CreationTabs';

interface ViewContainerProps {
    selectedItemId: string;
    selectedItem: { id: string, [key: string]: any };
    type: string;
    tabs: ITab[];
    listingComponent: ReactNode;
    headerComponent: ReactNode;
    onTabChanged?: (tab: ITab) => void;
}

/**
 * ViewContainer Component
 * 
 * A component that displays a tabbed interface for viewing details of a selected item.
 * 
 * How to use:
 * 
 * ```tsx
 * <ViewContainer
 *     selectedItemId="1"
 *     listingComponent={ListingComponent}
 *     headerComponent={HeaderComponent}
 *     tabs={[
 *         { id: 'tab1', value: 'tab1', title: 'Tab 1', component: <Tab1Component />, className: '', activeClassName: '', containerClassName: '' },
 *         { id: 'tab2', value: 'tab2', title: 'Tab 2', component: <Tab2Component />, className: '', activeClassName: '', containerClassName: '' },
 *     ]}
 *     onTabChanged={(tab) => console.log(tab)}
 * />
 * ```
 */
const ViewContainer: React.FC<any> = ({
    selectedItemId,
    selectedItem,
    type,
    listingComponent,
    headerComponent,
    tabs,
    onTabChanged,
}: ViewContainerProps): JSX.Element => {
    const [searchParams] = useSearchParams();
    const tab = searchParams.get("t") as string;
    const [activeTab, setActiveTab] = useState<string>(tab || tabs[0].value);

    useEffect(() => {
        setActiveTab(tab || tabs[0].value);
    }, [tab]);

    const onTabChange = (tab: ITab) => {
        setActiveTab(tab.value);
        if (onTabChanged) onTabChanged(tab);
    }

    return (
        <div className='flex gap-4 h-full bg-[#F0F4FD] pl-4'>
            <div className="left-col w-[350px] mb-6 flex flex-col gap-[14px]">
                {listingComponent}
            </div>
            <div className="right-col flex-1 mr-4 mb-6">
                {selectedItem?.id ? <>
                    {headerComponent}
                    <Tabs value={activeTab} className="w-full flex-1 relative" >
                        <TabsList aria-label="List of tabs" className="bg-white px-6 gap-11 mb-4 rounded-b-[12px] pt-3" >
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    className={cn('mb-0 flex flex-col items-center data-[state=active]:border-0  group data-[state=active]:py-0', tab.className)}
                                    key={tab.id}
                                    value={tab.value}
                                    onClick={() => onTabChange(tab)}
                                >
                                    <div className="px-8 pt-[10px] pb-[10px] leading-[20px] ">
                                        {tab.title}
                                    </div>
                                    <div className={cn('w-full h-[6px] bg-white group-data-[state=active]:block  group-data-[state=active]:bg-[#ACBBD6]', tab.activeClassName)}></div>
                                </TabsTrigger>
                            ))}
                            <button className='absolute right-6 top-5 flex gap-1 text-text-tertiary items-center'>
                                <IoDocument />
                                <span className='text-sm text-secondary'>Notes</span>
                            </button>
                        </TabsList>
                        {tabs.map((tab) => <TabsContent key={tab.id} value={tab.value} className={cn(tab.containerClassName)}>
                            {tab.component}
                        </TabsContent>)}
                    </Tabs>
                </> :
                    <div className="flex items-center justify-center h-full">
                        <motion.div
                            initial={{ x: '-10%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}>
                            <p className="text-gray-500 text-lg">No {type} selected. Please select a department to view details.</p>
                        </motion.div>
                    </div>}
            </div>
        </div>
    )
}

export default ViewContainer
