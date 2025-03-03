import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Input,
} from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { ClearableInput, Select } from "~/components/Form";
import { LuChevronDown, LuTrash } from "react-icons/lu";
import { TbCircleCheckFilled, TbPencilMinus } from "react-icons/tb";
import {
  AlarmClockIcon,
  HelpCircleIcon,
  InfoCircleIcon,
  PropertyVariantIcon,
  TrendUpIcon1,
} from "@zeak/icons";
import { MdClose, MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CreationWizardItem } from "~/modules/access-settings/ui/creation-wizard";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function NewNotification() {
  const navigate = useNavigate();

  const stepsList = [
    {
      id: 1,
      title: "General",
      subTitle:
        "The General section configures key notification details, ensuring correct triggers and associations.",
      isActive: true,
      isCompleted: false,
      label: "1",
    },
    {
      id: 2,
      title: "Frequency and Effectivity",
      subTitle:
        "Frequency applies to time- and event-based notifications. Set the start, end times, and frequency.",
      isActive: false,
      isCompleted: false,
      label: "2",
    },
    {
      id: 3,
      title: "Target Audience",
      subTitle:
        "Defines the specific users or groups who will receive the notification, ensuring it reaches the right audience.",
      isActive: false,
      isCompleted: false,
      label: "3",
    },
    {
      id: 4,
      title: "Notification Delivery Method",
      subTitle:
        "Specifies the channels through which notifications are sent, ensuring timely and effective communication.",
      isActive: false,
      isCompleted: false,
      label: "4",
    },
  ];
  const handleReview = () => {
    navigate("/x/ui/notifications/new/step2");
  };

  return (
    <>
      <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-y-4">
          {stepsList.map((step, index) => (
            <>
              <CreationWizardItem stepItem={step} />
            </>
          ))}
        </div>
      </div>
      <div className="xxxl:w-[calc(100%_-_500px)] w-[calc(100%_-_360px)] bg-white rounded-tl-md rounded-tr-md flex flex-col">
        <div className="grow max-h-[calc(100vh_-_302px)] overflow-y-auto">
          <div className="flex items-center justify-between py-6 px-[60px] border-b border-stroke">
            <div className="">
              <span className="text-accent-pink text-xs mb-2">Step 1 of 4</span>
              <h4 className="text-xl text-accent-dark font-medium">General</h4>
            </div>
            <div className="flex items-center space-x-4">
              <IconButton
                variant="ghost"
                aria-label="in-progress"
                icon={false ? <TbCircleCheckFilled /> : <MdInfo size={24} />}
                className={`${
                  false ? "text-accent-green" : "text-accent-accentYellow"
                } p-0`}
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                  <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[100px]">
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
            <ValidatedForm validator={[]} className="">
              <CompanyDetailsContent />
            </ValidatedForm>
          </div>
        </div>
        <div className="py-4 px-[60px] flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
          <Button variant="ghost" className="px-8 py-4 h-auto text-secondary">
            Back
          </Button>
          <Button
            variant="primary"
            className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
            onClick={handleReview}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

const CompanyDetailsContent = () => {
  const [triggerType, setTriggerType] = useState("onDemand");
  return (
    <>
      <div className="grid grid-cols-2 md:grid-col-3 gap-x-10 gap-y-[60px]">
        <ClearableInput
          name="NotificationName"
          placeholder="Enter Notification Name"
          autoFocus
          label={
            <>
              Notification Name
              <span className="text-accent-red inline-block ml-1">*</span>
            </>
          }
        />
        <div className="relative">
          <ClearableInput
            name="Description"
            placeholder="Enter Description"
            hideClose={true}
            label="Description"
          />
        </div>
        {/* Create a component according to your need */}
        <div>
          <label className="text-sm text-accent block mb-3">Companies</label>
          <DropdownMenu>
            <DropdownMenuTrigger className="max-w-full w-full outline-none focus-visible:outline-none py-3 px-[18px] bg-[hsl(var(--stroke-primary),_0.5)] hover:bg-[hsl(var(--stroke-primary),_0.5)] border border-stroke-secondary rounded-md h-auto flex justify-between items-center">
              <div className="flex items-center truncate w-[calc(100%_-_90px)]">
                {[2, 23, 4, 3, 4].map((item, index) => (
                  <span
                    key={index}
                    className="rounded-md min-w-[fit-content] p-1 text-sm h-8 border border-[hsl(var(--tertiary),_0.5)] bg-[hsl(var(--stroke-secondary,_0.5))] flex items-center justify-center text-accent-dark"
                  >
                    Pfizer USA (Primary){" "}
                    <IconButton
                      aria-label="arrow"
                      variant="ghost"
                      className="ml-2"
                      icon={<MdClose />}
                    />
                  </span>
                ))}
              </div>
              <div className="flex justify-end space-x-2 w-[90px]">
                <span className="w-8 h-8 rounded-md border border-[hsl(var(--tertiary),_0.5)] bg-[hsl(var(--stroke-secondary,_0.5))] flex items-center justify-center text-accent-dark">
                  5
                </span>
                <IconButton
                  aria-label="arrow"
                  variant="ghost"
                  icon={<LuChevronDown />}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-full min-w-[475px]">
              <div className="relative border-b border-stroke">
                <Input
                  autoFocus={true}
                  className="max-w-[320px] w-[320px] h-[56px] px-[44px] border-none bg-transparent"
                  placeholder="Search"
                />
                <BiSearch
                  size={20}
                  className="absolute top-[50%] -translate-y-[50%] left-4"
                />
              </div>
              {/* Add table for the list */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Select
          value="Select"
          name="Purpose"
          label="Purpose"
          defaultValue="Marketing"
          options={purposeOptions}
        />
        <Select
          value="Select"
          name="Priority"
          label="Priority"
          defaultValue="Critical"
          options={priorityOptions}
        />
        <div>
          <Select
            value="Select"
            name="flagNotificaiton"
            label="Flag Notification"
            defaultValue="Yellow"
            options={flagNotificaitonOptions}
          />
          <span className="flex items-start mt-3">
            <InfoCircleIcon size="18" className="mr-2" />
            <span className="text-sm text-secondary-tertiary">
              Flag allows you to highlight key notifications and facilitates
              quick search.
            </span>
          </span>
        </div>

        <div className="col-span-2">
          <label className="text-[14px] inline-block leading-[20px] text-accent mb-6">
            Notification Trigger Type
            <span className="text-accent-red inline-block ml-1">*</span>
          </label>
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
            <div className="relative">
              <input
                className="peer absolute hidden top-[26px] right-4 "
                type="radio"
                name="notificationTriggerType"
                id="onDemand"
                checked={triggerType === "onDemand"}
                onChange={() => setTriggerType("onDemand")}
              />
              <label
                className={`py-[26px] px-4 bg-white inline-block rounded-md border-[2px] ${
                  triggerType === "onDemand"
                    ? "border-accent-primaryDark ring-4 ring-[hsl(var(--accent-primary-dark),_0.09)]"
                    : "border-stroke"
                }`}
                htmlFor="onDemand"
              >
                {triggerType === "onDemand" ? (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                  </span>
                ) : (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-tertiary bg-white"></span>
                )}
                <span className="flex flex-col items-start text-lg font-medium mb-1 inline-block text-accent-dark">
                  <TrendUpIcon1 className="mb-4" color="#0040DD" size="40" />
                  On-Demand
                </span>
                <span className="text-sm text-textLink">
                  The General section configures key notification details,
                  ensuring correct triggers and associations.
                </span>
                <span className="flex justify-between items-center mt-[26px]">
                  <Badge variant="blue" className="uppercase text-xs">
                    One-Time
                  </Badge>
                  <HelpCircleIcon />
                </span>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer absolute hidden top-[26px] right-4 "
                type="radio"
                name="notificationTriggerType"
                id="timeBased"
                checked={triggerType === "timeBased"}
                onChange={() => setTriggerType("timeBased")}
              />
              <label
                className={`py-[26px] px-4 bg-white inline-block rounded-md border-[2px] ${
                  triggerType === "timeBased"
                    ? "border-accent-greenishBlue ring-4 ring-[hsl(var(--greenish-blue),_0.09)]"
                    : "border-stroke"
                }`}
                htmlFor="timeBased"
              >
                {triggerType === "timeBased" ? (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                  </span>
                ) : (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-tertiary bg-white"></span>
                )}
                <span className="flex flex-col items-start text-lg font-medium mb-1 inline-block text-accent-dark">
                  <AlarmClockIcon
                    className="mb-4"
                    color="hsl(var(--greenish-blue))"
                    size="40"
                  />
                  Time Based
                </span>
                <span className="text-sm text-textLink">
                  The General section configures key notification details,
                  ensuring correct triggers and associations.
                </span>
                <span className="flex justify-between items-center mt-[26px]">
                  <Badge variant="greenishBlue" className="uppercase text-xs">
                    Scheduled
                  </Badge>
                  <HelpCircleIcon />
                </span>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer absolute hidden top-[26px] right-4 "
                type="radio"
                name="notificationTriggerType"
                id="eventBased"
                checked={triggerType === "eventBased"}
                onChange={() => setTriggerType("eventBased")}
              />
              <label
                className={`py-[26px] px-4 bg-white inline-block rounded-md border-[2px] ${
                  triggerType === "eventBased"
                    ? "border-accent-accentYellow ring-4 ring-[hsl(var(--accent-yellow),_0.09)]"
                    : "border-stroke"
                }`}
                htmlFor="eventBased"
              >
                {triggerType === "eventBased" ? (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                  </span>
                ) : (
                  <span className="inline-block absolute top-[26px] right-4 w-6 h-6 rounded-full border-[1px] border-tertiary bg-white"></span>
                )}
                <span className="flex flex-col items-start text-lg font-medium mb-1 inline-block text-accent-dark">
                  <PropertyVariantIcon
                    className="mb-4"
                    color="hsl(var(--accent-yellow))"
                    size="40"
                  />
                  Event Based
                </span>
                <span className="text-sm text-textLink">
                  The General section configures key notification details,
                  ensuring correct triggers and associations.
                </span>
                <span className="flex justify-between items-center mt-[26px]">
                  <Badge variant="warning" className="uppercase text-xs">
                    System Trigger
                  </Badge>
                  <HelpCircleIcon />
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export const purposeOptions = [
  {
    label: "Marketing",
    value: "Marketing",
  },
  {
    label: "HR",
    value: "HR",
  },
];
export const priorityOptions = [
  {
    label: "Critical",
    value: "Critical",
  },
  {
    label: "High",
    value: "High",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "Low",
    value: "Low",
  },
];

export const flagNotificaitonOptions = [
  {
    label: "Yellow",
    value: "Yellow",
  },
  {
    label: "Red",
    value: "Red",
  },
];
