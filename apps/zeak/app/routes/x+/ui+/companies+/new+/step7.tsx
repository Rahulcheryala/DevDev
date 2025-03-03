import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { VscPlug } from "react-icons/vsc";
import { IoChevronDown, IoChevronUp, IoCloseOutline } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
import {
  TbCircleCheckFilled,
  TbPencilMinus,
  TbFileSettings,
} from "react-icons/tb";
import { CheckIcon, BuildingIcon, EditIcon3 } from "@zeak/icons";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { ClearableInput } from "~/components/Form";

export default function Step6() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "Company Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Status and Effectivity Dates",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "2",
    },
    {
      id: 3,
      title: "Address",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "3",
    },
    {
      id: 4,
      title: "Additional Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "4",
    },
    {
      id: 5,
      title: "Fiscal Period",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "5",
    },
    {
      id: 6,
      title: "Third-Party Integration",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: true,
      label: "6",
    },
    {
      id: 7,
      title: "Summary",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: true,
      isCompleted: false,
      label: "7",
    },
  ];
  const [rightBanner, setRightBanner] = useState<boolean>(false);

  const handleReview = () => {
    navigate("/x/ui/companies/new/step7");
  };

  return (
    <>
      <div className="bg-accent-bgHoverNew flex h-full">
        <div
          className={`h-full ${
            rightBanner ? "w-[calc(100%_-_400px)]" : "w-full"
          }`}
        >
          <div className="pt-[25px] px-[60px] bg-white w-full mb-2 rounded-md">
            {/* New Breadcumbs */}
            <ul className="grid grid-flow-col auto-cols-max gap-1">
              <li>
                <Link
                  to={"/"}
                  className="text-textLink text-sm leading-[20px] tracking-wider"
                >
                  Settings
                </Link>
              </li>
              <li>
                <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
                  <RxSlash />
                </span>
              </li>
              <li>
                <span className="text-accent text-sm leading-[20px] tracking-wider">
                  Companies
                </span>
              </li>
            </ul>
            {/* New Breadcumbs */}
            <SettingsList isSelectable={false} title="New Company" />
          </div>
          <div className="flex space-x-2 h-full max-h-[calc(100vh_-_219px)]">
            <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
              <div className="grid grid-cols-1 gap-y-4">
                {stepsList.map((step, index) => (
                  <>
                    <div
                      key={index}
                      className={`relative before:absolute before:content-[''] before:w-[2px] before:h-[calc(100%_-_56px)] ${
                        step.isActive
                          ? "before:bg-accent-primaryDark"
                          : step.isCompleted
                            ? "before:bg-accent-darkGreen"
                            : "before:bg-tertiary"
                      } before:top-[56px] before:left-5 last:before:content-none`}
                    >
                      <div className="absolute">
                        <span
                          className={`p-[5px] w-10 h-10 border-[2px] inline-block border rounded-full ${
                            step.isActive
                              ? "border-accent-primaryDark border-solid"
                              : step.isCompleted
                                ? "border-accent-darkGreen border-solid"
                                : "border-tertiary border-dashed"
                          }`}
                        >
                          <span
                            className={`w-full h-full flex items-center justify-center text-sm text-white rounded-full ${
                              step.isActive
                                ? "bg-primary-bright"
                                : step.isCompleted
                                  ? "bg-accent-brightGreen"
                                  : "bg-tertiary"
                            }`}
                          >
                            {step.isCompleted ? (
                              <CheckIcon color="#ffffff" size="18" />
                            ) : (
                              step.label
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="pl-[64px]">
                        <h5
                          className={`font-semibold mb-1 ${
                            step.isActive || step.isCompleted
                              ? "text-accent-dark"
                              : "text-tertiary"
                          }`}
                        >
                          {step.title}
                        </h5>
                        <p
                          className={`text-sm ${
                            step.isActive || step.isCompleted
                              ? "text-accent-dark"
                              : "text-tertiary"
                          }`}
                        >
                          {step.subTitle}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="xxxl:w-[calc(100%_-_500px)] w-[calc(100%_-_360px)] bg-white rounded-tl-md rounded-tr-md flex flex-col">
              <div className="grow max-h-[calc(100vh_-_302px)] overflow-y-auto">
                <div className="flex items-center justify-between py-6 px-[60px] border-b border-stroke">
                  <div className="">
                    <span className="text-accent-pink text-xs mb-2">
                      Step 6 of 7
                    </span>
                    <h4 className="text-xl text-accent-dark font-medium">
                      Third-Party Integration
                    </h4>
                  </div>
                  <div className="flex items-center space-x-4">
                    <IconButton
                      variant="ghost"
                      aria-label="in-progress"
                      icon={
                        false ? <TbCircleCheckFilled /> : <MdInfo size={24} />
                      }
                      className={`${
                        false ? "text-accent-green" : "text-accent-accentYellow"
                      } p-0`}
                    />

                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                        <BsThreeDots />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="min-w-[100px]"
                      >
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant="secondary"
                            className={`p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none ${
                              true ? "bg-stroke hover:bg-stroke" : ""
                            }`}
                          >
                            <TbPencilMinus size={20} className="mr-4" />
                            Edit
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant="secondary"
                            className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                          >
                            <LuTrash size={20} className="mr-4" />
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="px-[60px] py-10">
                  <SummaryContent />
                </div>
              </div>
              <div className="py-4 px-[60px] flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
                <Button
                  variant="ghost"
                  className="px-8 py-4 h-auto text-secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
                  onClick={handleReview}
                >
                  Review and Finish
                </Button>
              </div>
            </div>
          </div>
        </div>
        {rightBanner && (
          <div className="w-[400px] pl-2 h-full">
            <div className=" py-[52px] px-[60px] bg-white rounded-md relative  h-full">
              <Button
                className="p-0 absolute right-4 top-2"
                variant="ghost"
                onClick={() => setRightBanner(false)}
              >
                <IoCloseOutline size={32} />
              </Button>
              <div className="grid grid-cols-1 gap-10">
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const SummaryContent = () => {
  const [stepOneAccordionOpen, setStepOneAccordionOpen] = useState<any>(0);

  const summaryList = [
    {
      id: "1",
      title: "Summary",
      isFinished: false,
      content: <SummaryAccordionContent />,
    },
    {
      id: "2",
      title: "Status and Effectivity Dates",
      isFinished: true,
      content: <StatusEffectivityDateContent />,
    },
    {
      id: "3",
      title: "Additional Info",
      isFinished: true,
      content: "sas",
    },
    {
      id: "4",
      title: "Fiscal Period",
      isFinished: true,
      content: "sas",
    },
    {
      id: "5",
      title: "Third-Party Integration",
      isFinished: true,
      content: "sas",
      icon: (
        <>
          <span className="mr-6 flex items-center justify-center bg-accent-primary w-7 h-7 text-white rounded-sm">
            <VscPlug />
          </span>
        </>
      ),
    },
    {
      id: "6",
      title: "Audit",
      isFinished: false,
      content: <AuditContent />,
      icon: (
        <>
          <span className="mr-6 flex items-center justify-center w-7 h-7  rounded-sm">
            <TbFileSettings />
          </span>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="">
        <div className="">
          <h3 className="mb-[28px] text-[28px] leading-[28px] font-medium">
            Review and Finish
          </h3>
          <div
            className="flex justify-between items-start p-6 rounded-sm mb-10 relative"
            style={{ backgroundColor: "hsl(177.27deg 56.12% 61.57% / 20%)" }}
          >
            <div className="max-w-[600px]">
              <h3 className="text-[20px] leading-[28px] text-accent-dark font-medium mb-2">
                Next Steps
              </h3>
              <p className="text-secondary font-normal text-sm">
                Your Department has been successfully created. You can close the
                record or use the{" "}
                <span className="font-semibold">next steps</span> shown on right
                to add users and manage your department details.
              </p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="min-w-[268px] items-center h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark mr-4 font-normal"
              >
                <BuildingIcon className="mr-2" />
                Add Departments
              </Button>
              <Button
                variant="secondary"
                className="min-w-[268px] items-center h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark font-normal"
              >
                <FiUser size={24} className="mr-2" />
                Add Users
              </Button>
            </div>
          </div>
          <Accordion.Root
            className="AccordionRoot"
            type="single"
            defaultValue={summaryList[0].title}
            collapsible
          >
            {summaryList.map((stepThreeOption, index) => (
              <Accordion.Item
                key={index}
                className="AccordionItem border border-stroke rounded-lg mb-10"
                value={stepThreeOption.title}
              >
                <Accordion.Trigger
                  onClick={() => {
                    if (stepOneAccordionOpen == index) {
                      setStepOneAccordionOpen(null);
                    } else {
                      setStepOneAccordionOpen(index);
                    }
                  }}
                  className="w-full py-2 px-6 flex items-center justify-between items-center font-medium text-accent h-auto"
                >
                  <span className="trancate w-[calc(100%_-_160px)] text-left flex items-center">
                    {stepThreeOption?.icon}
                    {stepThreeOption.title}
                  </span>
                  <div className="flex items-center space-x-4 w-[152px] justify-end">
                    <IconButton
                      variant="ghost"
                      aria-label="in-progress"
                      icon={
                        stepThreeOption.isFinished ? (
                          <TbCircleCheckFilled />
                        ) : (
                          <MdInfo size={24} />
                        )
                      }
                      className={`${
                        stepThreeOption.isFinished
                          ? "text-accent-green"
                          : "text-accent-accentYellow"
                      } p-0`}
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="in-progress"
                      icon={<EditIcon3 />}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                        <BsThreeDots />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="min-w-[100px]"
                      >
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant="secondary"
                            className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                          >
                            <TbPencilMinus size={20} className="mr-4" />
                            Edit
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0">
                          <Button
                            variant="secondary"
                            className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                          >
                            <LuTrash size={20} className="mr-4" />
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <IconButton
                      variant="ghost"
                      aria-label="more-option"
                      icon={
                        index == stepOneAccordionOpen ? (
                          <IoChevronUp size={24} />
                        ) : (
                          <IoChevronDown size={24} />
                        )
                      }
                      className="p-0"
                    />
                  </div>
                </Accordion.Trigger>
                <Accordion.Content className="p-10 border-t border-stroke">
                  {stepThreeOption.content}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </>
  );
};

const SummaryAccordionContent = () => {
  return (
    <>
      <ValidatedForm validator={[]}>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-1">
                Company Name
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">PFIZER SALES</p>
            ) : (
              <ClearableInput name="companyName" placeholder="" />
            )}
          </div>
          <div className="">
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Company Code
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                Conducts research and development
              </p>
            ) : (
              <ClearableInput name="companyCode" placeholder="" />
            )}
          </div>
          <div className="">
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Company's URL
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                pfizer.my.zeak.com/pfizer-sales
              </p>
            ) : (
              <ClearableInput name="companyUrl" placeholder="" />
            )}
          </div>
          <div></div>
          <div>
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Addresses
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                1231 Cataluna Street, Las Nevadas, Texas
              </p>
            ) : (
              <ClearableInput name="addresses" placeholder="" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Default Timezone
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">
                UTC-6 Central Standard Time (CST)
              </p>
            ) : (
              <ClearableInput name="timezone" placeholder="" />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="text-sm text-accent-dark font-medium mb-2">
                Default Language
              </h4>
            </div>

            {false ? (
              <p className="text-base text-tertiary">EN-US</p>
            ) : (
              <ClearableInput name="defaultLanguage" placeholder="" />
            )}
          </div>
        </div>
        {true && (
          <div className="flex justify-end space-x-10 pt-10">
            <Button variant="ghost" className="rounded-sm" size="lg">
              Cancel
            </Button>
            <Button variant="primary" className="rounded-sm" size="lg">
              Save
            </Button>
          </div>
        )}
      </ValidatedForm>
    </>
  );
};

const StatusEffectivityDateContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[60px] gap-x-4">
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">Status</h4>
          <p className="text-base text-tertiary">Active</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Effectivity From
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Effectivity To
          </h4>
          <p className="text-base text-tertiary">--</p>
        </div>
      </div>
    </>
  );
};

const AuditContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-[60px] gap-x-4">
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Created By
          </h4>
          <p className="text-base text-tertiary">Ryan Pazos</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Created on
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Last Updated By
          </h4>
          <p className="text-base text-tertiary">Ryan Pazos</p>
        </div>
        <div>
          <h4 className="text-sm text-accent-dark font-medium mb-1">
            Updated on
          </h4>
          <p className="text-base text-tertiary">08/19/2024</p>
        </div>
      </div>
    </>
  );
};
