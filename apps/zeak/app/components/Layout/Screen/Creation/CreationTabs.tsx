import { Button, cn, ModalDrawer, ModalDrawerBody, ModalDrawerContent, ModalDrawerFooter, ModalDrawerHeader, Tabs, TabsContent, TabsList, TabsTrigger } from "@zeak/react"
import { IoCloseOutline } from "react-icons/io5"
import { ReactNode, useEffect, useState } from "react";
import SaveButton, { ButtonProps } from "./SaveButton";


export interface ITab {
    id: string;
    title: string;
    value: string;
    component: ReactNode;
    className?: string;
    activeClassName?: string;
    containerClassName?: string;
}

interface CreationTabsProps {
    isOpen: boolean;
    label: string | ReactNode;
    tabs: ITab[];
    selectedTab: string;
    backButtonClassName?: string;
    labelClassName?: string;
    mainButton?: ButtonProps;
    optionButtons?: Array<ButtonProps>;
    closeDrawer: () => void;
    onTabChanged?: (tab: ITab) => void;
}

/**
 * CreationTabs Component
 * 
 * A customizable tabbed interface within a modal drawer.
 * 
 * Props:
 * @param {boolean} isOpen - Controls the visibility of the modal drawer.
 * @param {string | ReactNode} label - The label displayed at the top of the modal.
 * @param {string} [labelClassName] - Additional class names for styling the label.
 * @param {Array<{ id: string; title: string; value: string; component: ReactNode; className?: string; activeClassName?: string; containerClassName?: string; }>} tabs - Array of tab objects.
 * @param {string} [backButtonClassName] - Additional class names for styling the back button.
 * @param {any} activeTab - The currently active tab.
 * @param {function} closeDrawer - Function to close the modal drawer.
 * 
 * Usage Example:
 * ```jsx
 * <CreationTabs
 *     isOpen={true}
 *     label="My Tabs"
 *     tabs={[
 *         { id: 'tab1', title: 'Tab 1', value: 'tab1', component: <Tab1Content /> },
 *         { id: 'tab2', title: 'Tab 2', value: 'tab2', component: <Tab2Content /> },
 *     ]}
 *     activeTab={tabs[0]}
 *     closeDrawer={() => console.log('Drawer closed')}
 * />
 * ```
 */
const CreationTabs: React.FC<CreationTabsProps> = ({
    isOpen,
    label,
    labelClassName,
    backButtonClassName,
    tabs,
    selectedTab,
    mainButton,
    optionButtons,
    closeDrawer,
    onTabChanged
}: CreationTabsProps) : JSX.Element => {
    const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

    const onCloseHandler = () => {
        setActiveTab(tabs[0]);
        closeDrawer();
    }

    const onBack = () => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab.id);
        if (currentIndex === 0) {
            closeDrawer(); // Close the drawer if on the first tab
        } else {
            setActiveTab(tabs[currentIndex - 1]); // Go back to the previous tab
        }
    }

    const onTabChange = (tab: ITab) => {
        setActiveTab(tab);
        if (onTabChanged)  onTabChanged(tab);
    }


    useEffect(() => {
        const newActiveTab = tabs.find(tab => tab.value === selectedTab);
        if (newActiveTab) {
            setActiveTab(newActiveTab);
        }
    }, [selectedTab, tabs])
    


    return (<ModalDrawer open={isOpen} onClose={onCloseHandler}>
        <ModalDrawerContent className='w-[55%] '>
            <ModalDrawerHeader className="border-0 px-10 py-4">
                <div className="flex justify-between py-1 items-center">
                    <p className={cn('text-[26px] text-text-dark', labelClassName)}>{label}</p>
                    <IoCloseOutline className="text-[40px] cursor-pointer" onClick={onCloseHandler} />
                </div>
            </ModalDrawerHeader>
            <ModalDrawerBody className="px-0 py-0">
                <Tabs value={activeTab.value} className="w-full flex-1" >
                    <TabsList aria-label="List of tabs" className="bg-white px-10 gap-0" >
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
                                <div className={cn('w-full h-[6px] bg-[#ebecee] group-data-[state=active]:block  group-data-[state=active]:bg-[#ffdf41]', tab.activeClassName)}></div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {tabs.map((tab) => <TabsContent key={tab.id} value={tab.value} className={cn(tab.containerClassName)}>
                        {tab.component}
                    </TabsContent>)}
                </Tabs>
            </ModalDrawerBody>
            <ModalDrawerFooter className="px-10 py-4 shadow-none border-0">
                <div className="flex justify-between items-center w-full">
                    <Button className={cn("px-0 w-[160px] h-[56px] text-secondary-tertiary cursor-pointer hover:bg-gray-200", backButtonClassName)} variant="ghost" onClick={onBack}>
                        Back
                    </Button>
                    <SaveButton
                        id={mainButton?.id!}
                        label={mainButton?.label!}
                        onClickHandler={mainButton?.onClickHandler!}
                        options={optionButtons!}
                    />
                </div>
            </ModalDrawerFooter>
        </ModalDrawerContent>
    </ModalDrawer>)
}

export default CreationTabs;
