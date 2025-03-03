import { useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import { PiPencilSimpleLine } from "react-icons/pi";
import * as Accordion from "@radix-ui/react-accordion";
import { IndeterminateCheckbox } from "~/components/Table/components";
import { LuChevronDown } from "react-icons/lu";
import CompanyProfileForm from "./CompanyProfileForm";
import { useNavigate } from "@remix-run/react";
import { path } from "~/utils/path";
import type z from "zod";
import { type companyValidatorV2 } from "../../access-settings.model";

type CompanyEditModalProps = {
  newCompany?: boolean;
  googleMapsApiKey: string;
  companyDetails?: z.infer<typeof companyValidatorV2>;
};

const CompanyModal = ({
  newCompany = true,
  googleMapsApiKey,
  companyDetails,
}: CompanyEditModalProps) => {
  const defaultTab = "overview";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [editProfile, setEditProfile] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const newCompanyModalTitle = "Create a New Company";
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  const onClose = () => navigate(path.to.companySettings);
  /*
    <DrawerContent size="xl">
              <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0">
                <DrawerTitle className="pr-[30px]">
    
    */
  return (
    <Drawer open>
      {/* <DrawerContent size="xl">
          <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0 flex justify-between">
            <DrawerTitle className="pr-[200px]">Create a New Company</DrawerTitle> */}
      <DrawerContent size="xl">
        <DrawerHeader className="px-[60px] pt-[60px] pb-[18px] border-0">
          <DrawerTitle className="pr-[30px] text-accent-dark">
            {!newCompany && companyDetails?.name
              ? companyDetails?.name
              : newCompanyModalTitle}
          </DrawerTitle>
          <div>
            {!newCompany && (
              <Button
                variant={"secondary"}
                className="rounded-[100px] font-normal border border-stroke w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] bg-white hover:text-white absolute top-[48px] right-[96px]"
                leftIcon={<PiPencilSimpleLine size={20} />}
                onClick={() => setEditProfile(true)}
              >
                Edit
              </Button>
            )}
            <DrawerCloseButton
              className="top-[65px] right-[60px] cursor-pointer z-10"
              onClick={onClose}
            />
          </div>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <Tabs
            defaultValue={currentTab}
            onValueChange={handleTabChange}
            value={currentTab}
            className="w-full"
          >
            <TabsList aria-label="List of tabs" className="px-[60px]">
              <TabsTrigger value={"overview"}>Overview</TabsTrigger>
              <TabsTrigger value={"modules"}>Modules</TabsTrigger>
            </TabsList>
            <TabsContent value={"overview"} className="px-[60px] py-[40px]">
              <CompanyProfileForm
                ref={submitBtnRef}
                companyDetails={companyDetails}
                editProfile={newCompany ? newCompany : editProfile}
                googleMapsApiKey={googleMapsApiKey}
              />
            </TabsContent>
            <TabsContent value={"modules"} className="px-[60px] py-[40px]">
              <ModulesContent />
            </TabsContent>
          </Tabs>
        </DrawerBody>
        <DrawerFooter className="px-[60px] pb-[60px] pt-[28px] border-0 sm:justify-start">
          <div className="flex items-center justify-between w-full">
            <Button
              variant="ghost"
              className="rounded-[100px] font-normal min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-secondary hover:no-underline underline-offset-0 pl-0 min-w-0"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => submitBtnRef?.current?.click()}
              className="rounded-[100px] font-normal border border-stroke min-w-[160px] h-[56px] p-[16px] text-base tracking-wider leading-[24px] text-white"
            >
              Next
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
// );

const ModulesContent = () => {
  return (
    <div>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="item-1"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="item-1">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">Default</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="pb-[10px] pt-6">
              <div className="flex items-center">
                <IndeterminateCheckbox
                  {...{
                    checked: true,
                    indeterminate: false,
                    onChange: () => console.log("sdf"),
                  }}
                />
                <span className="inline-block text-sm ml-2">ProjectX</span>
              </div>
              <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                Customer service rep view
              </p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Accordion.Root
        className="AccordionRoot mb-[60px]"
        type="single"
        defaultValue="availableItem"
        collapsible
      >
        <Accordion.Item className="AccordionItem" value="availableItem">
          <Accordion.Trigger className="w-full">
            <div className="flex items-center justify-between py-[10px] border-b border-[#E9E9EE]">
              <p className="text-sm font-normal tracking-[0.5px]">Available</p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="px-0 w-6 h-6">
                  <LuChevronDown size="20px" strokeWidth="2" color="#8A8A8F" />
                </Button>
              </div>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="pb-[10px] pt-6">
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: true,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">
                    Label and Forms
                  </span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Standard and custom Label and Form designer. Works with
                  automations to print label and forms with typical events
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: true,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">Automations</span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Create Rules and Automations for anything your business needs.
                </p>
              </div>
              <div className="mb-10">
                <div className="flex items-center">
                  <IndeterminateCheckbox
                    {...{
                      checked: false,
                      indeterminate: false,
                      onChange: () => console.log("sdf"),
                    }}
                  />
                  <span className="inline-block text-sm ml-2">
                    CSA - Customer Service Automation
                  </span>
                </div>
                <p className="text-sm font-normal tracking-[0.5px] text-tertiary mt-2">
                  {/* add class "text-secondary" for not disabled add "text-tertiary" for disabled view */}
                  Track and manage your customer&apos;s claims and support
                  options.
                </p>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

export default CompanyModal;
