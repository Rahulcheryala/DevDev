import React, { ReactNode, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  ModalDrawer,
  ModalDrawerBody,
  ModalDrawerContent,
  ModalDrawerFooter,
  ModalDrawerHeader
} from "../ModalDrawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../micro-components/Tabs";
import SaveButton, { ButtonProps } from "./SaveButton";
import { Check } from "lucide-react";
import Button from "../../micro-components/Button";
import { cn } from "../../utils";
import ProgressTabs from "../ProgressTabs";

export type { ButtonProps };

export interface ITab {
  id: string;
  title: string;
  value: string;
  component: ReactNode;
  className?: string;
  activeClassName?: string;
  containerClassName?: string;
}

export interface CreationTabsProps {
  isOpen: boolean;
  label: string | ReactNode;
  tabs: ITab[];
  selectedTab: string;
  backButtonClassName?: string;
  labelClassName?: string;
  mainButton: ButtonProps;
  optionButtons?: Array<ButtonProps>;
  closeDrawer: () => void;
  onTabChanged: (tab: ITab) => void;
}

/**
 * CreationTabs Component
 * 
 * A customizable tabbed interface within a modal drawer for multi-step creation flows.
 * 
 * Props:
 * @param {boolean} isOpen - Controls the visibility of the modal drawer.
 * @param {string | ReactNode} label - The label displayed at the top of the modal.
 * @param {string} [labelClassName] - Additional class names for styling the label.
 * @param {Array<ITab>} tabs - Array of tab objects with content and properties.
 * @param {string} selectedTab - The value of the currently selected tab.
 * @param {string} [backButtonClassName] - Additional class names for styling the back button.
 * @param {ButtonProps} [mainButton] - Configuration for the main action button.
 * @param {Array<ButtonProps>} [optionButtons] - Additional buttons shown in dropdown.
 * @param {() => void} closeDrawer - Function to close the modal drawer.
 * @param {(tab: ITab) => void} [onTabChanged] - Callback when tab selection changes.
 * 
 * Usage Example:
 * ```jsx
 * <CreationTabs
 *   isOpen={true}
 *   label="Create New Item"
 *   tabs={[
 *     { id: '1', title: 'General', value: 'general', component: <GeneralForm /> },
 *     { id: '2', title: 'Users', value: 'users', component: <UsersForm /> }
 *   ]}
 *   selectedTab="general"
 *   mainButton={{
 *     id: 'save',
 *     label: 'Save Changes',
 *     onClickHandler: (id) => console.log(`Button clicked: ${id}`)
 *   }}
 *   optionButtons={[
 *     { id: 'draft', label: 'Save as Draft', onClickHandler: (id) => console.log(`Saving as draft`) }
 *   ]}
 *   closeDrawer={() => setIsOpen(false)}
 *   onTabChanged={(tab) => setSelectedTab(tab.value)}
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
}: CreationTabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

  const onCloseHandler = () => {
    setActiveTab(tabs[0]);
    onTabChanged(tabs[0]);
    closeDrawer();
  };

  const onBack = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab.id);
    if (currentIndex === 0) {
      closeDrawer(); // Close the drawer if on the first tab
    } else {
      setActiveTab(tabs[currentIndex - 1]); // Go back to the previous tab
      onTabChanged(tabs[currentIndex - 1]);
    }
  };

  const onTabChange = (tab: ITab) => {
    setActiveTab(tab);
    onTabChanged(tab);
  };

  useEffect(() => {
    const newActiveTab = tabs.find(tab => tab.value === selectedTab);
    if (newActiveTab) {
      setActiveTab(newActiveTab);
      onTabChanged(newActiveTab);
    }
  }, [selectedTab, tabs]);

  return (
    <ModalDrawer open={isOpen} onClose={onCloseHandler}>
      <ModalDrawerContent className="w-[50%] lg:min-w-[900px] sm:min-w-[500px] min-w-[300px]">
        <ModalDrawerHeader className="border-0 px-10 py-4">
          <div className="flex justify-between py-1 items-center">
            <p className={cn("text-[26px] text-text-dark", labelClassName)}>{label}</p>
            <IoCloseOutline className="text-[40px] cursor-pointer" onClick={onCloseHandler} />
          </div>
        </ModalDrawerHeader>
        <ModalDrawerBody className="px-0 py-0">
          <Tabs value={activeTab.value} className="w-full flex-1 relative">
            <TabsList aria-label="List of tabs" className="bg-white px-10 gap-0 sticky top-0 z-10">
              {tabs.map((tab, index) => {
                const tabId = parseInt(tab.id);
                const currentTabId = parseInt(activeTab.id);
                const isCompleted = currentTabId > tabId;
                const isActive = currentTabId === tabId;
                
                return (
                  <TabsTrigger
                    className={cn(
                      "mb-0 flex flex-col items-center data-[state=active]:border-0 group data-[state=active]:py-0 relative", 
                      tab.className
                    )}
                    key={tab.id}
                    value={tab.value}
                    onClick={() => onTabChange(tab)}
                  >
                    <div className="px-4 py-2 leading-[20px] whitespace-nowrap flex items-center gap-3">
                      {tab.title}
                      {isCompleted && <Check className="h-4 w-4 text-[#28CD41]" />}
                    </div>
                    <div 
                      className={cn(
                        "w-full h-[4px]",
                        index === 0 ? "rounded-tl-zeak" : "",
                        index === tabs.length - 1 ? "rounded-tr-zeak" : "",
                        isActive || isCompleted ? "bg-[#FFDF41]" : "bg-[#9BA2AC]/20"
                      )}
                    />
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.value} className={cn(tab.containerClassName, "")}>
                {tab.component}
              </TabsContent>
            ))}
          </Tabs>
        </ModalDrawerBody>
        <ModalDrawerFooter className="px-10 py-4 shadow-none border-0">
          <div className="flex justify-between items-center w-full">
            <Button
              className={cn("px-0 w-[160px] h-[56px] text-secondary-tertiary cursor-pointer hover:bg-gray-200", backButtonClassName)}
              variant="ghost"
              onClick={onBack}
            >
              Back
            </Button>
            <SaveButton
              id={mainButton.id}
              label={mainButton.label}
              onClickHandler={mainButton.onClickHandler}
              options={optionButtons || []}
            />
          </div>
        </ModalDrawerFooter>
      </ModalDrawerContent>
    </ModalDrawer>
  );
};

export default CreationTabs; 