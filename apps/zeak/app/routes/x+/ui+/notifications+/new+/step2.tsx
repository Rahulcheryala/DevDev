import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Input,
  RadioGroup,
  RadioGroupItem,
} from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { DatePicker, Select, TimePicker } from "~/components/Form";
import { LuTrash } from "react-icons/lu";
import { TbCircleCheckFilled, TbPencilMinus } from "react-icons/tb";
import { MdInfo, MdOutlineCalendarToday } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CreationWizardItem } from "~/modules/access-settings/ui/creation-wizard";
import { useState } from "react";
import {
  ClockFastForwardIcon,
  EndIcon,
  InfoCircleIcon,
  PropertyVariantIcon,
  StartIcon,
} from "@zeak/icons";

export default function NotificationStep2() {
  const navigate = useNavigate();

  const stepsList = [
    {
      id: 1,
      title: "General",
      subTitle:
        "The General section configures key notification details, ensuring correct triggers and associations.",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Frequency and Effectivity",
      subTitle:
        "Frequency applies to time- and event-based notifications. Set the start, end times, and frequency.",
      isActive: true,
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
    navigate("/x/ui/notifications/new/step3");
  };

  return (
    <>
      <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-y-4">
          {stepsList.map((step) => (
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
              <span className="text-accent-pink text-xs mb-2">Step 2 of 4</span>
              <h4 className="text-xl text-accent-dark font-medium">
                Frequency and Effectivity
              </h4>
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
              <EfficiencyContent />
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

const EfficiencyContent = () => {
  const [endType, setEndType] = useState("Occurrence");
  return (
    <>
      <div className="">
        <div className="flex py-[60px] first:pt-0 last:pb-0 border-b border-stroke last:border-none">
          <div className="w-[320px] pr-[64px]">
            <StartIcon size="40" className="mb-6" />
            <h4 className="text-lg text-accent-dark mb-2">Start</h4>
            <p className="text-sm text-textLink">
              Manual (on-demand) notifications do not have a Start date. For
              timed and event-based notifications, you can select the relevant
              details.
            </p>
          </div>
          <div className="w-[calc(100%_-_320px)] pl-[24px] xxl:pl-[94px]">
            <div className="grid grid-cols-1 xxl:grid-cols-2 gap-x-[60px] gap-y-10">
              <Select
                value="Select"
                name="Recurrence"
                label="Recurrence"
                defaultValue="OneTime"
                options={recurrenceOptions}
              />
              <div className="col-span-2 xxl:col-span-1">
                <div className="flex items-center xxl:pt-8">
                  <Checkbox
                    name="recurringJob"
                    id="recurringJob"
                    data-testid="notify"
                    className="h-[18px] w-[18px] custom__checkbox !text-white mr-2"
                    onCheckedChange={(e) => {
                      console.log(e);
                    }}
                  />

                  <label
                    htmlFor="recurringJob"
                    className="font-light text-sm font-medium flex items-center"
                  >
                    Indefinitely Recurring Job{" "}
                    <InfoCircleIcon size="18" className="ml-2" />
                  </label>
                </div>
              </div>
              <div className="col-span-2 xxl:col-span-1">
                <DatePicker name="Start Date" label="Start Date" />
              </div>
              <div className="col-span-2 xxl:col-span-1">
                <TimePicker name="Start Time" label="Start Time" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-[60px] first:pt-0 last:pb-0 border-b border-stroke last:border-none">
          <div className="w-[320px] pr-[64px]">
            <EndIcon size="40" className="mb-6" />
            <h4 className="text-lg text-accent-dark mb-2">End</h4>
            <p className="text-sm text-textLink">
              Manual (on-demand) notifications do not have a Start date. For
              timed and event-based notifications, you can select the relevant
              details.
            </p>
          </div>
          <div className="w-[calc(100%_-_320px)] pl-[24px] xxl:pl-[94px]">
            <div className="grid grid-cols-1 xxl:grid-cols-2 gap-x-[60px] gap-y-10">
              <div className="col-span-2">
                <RadioGroup className="grid grid-cols-1 xl:grid-cols-1 xxl:grid-cols-3 gap-10">
                  <div
                    className={`relative flex items-center border p-4 rounded-md ${
                      endType === "date"
                        ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)] bg-[hsl(var(--stroke-primary),_0.5)]"
                        : "border-stroke"
                    }`}
                  >
                    <RadioGroupItem
                      className="me-2"
                      onChange={() => setEndType("date")}
                      checked={endType === "date"}
                      value={"Date"}
                      id="Date"
                      name="endType"
                    />
                    <span className="pr-6 truncate inline-block">Date</span>

                    <MdOutlineCalendarToday className="absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                  <div
                    className={`relative flex items-center border p-4 rounded-md ${
                      endType === "event"
                        ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)] bg-[hsl(var(--stroke-primary),_0.5)]"
                        : "border-stroke"
                    }`}
                  >
                    <RadioGroupItem
                      className="me-2"
                      onChange={() => setEndType("event")}
                      checked={endType === "event"}
                      value={"event"}
                      id="event"
                      name="endType"
                    />
                    <span className="pr-6 truncate inline-block">Event</span>

                    <PropertyVariantIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                  <div
                    className={`relative flex items-center border p-4 rounded-md ${
                      endType === "Occurrence"
                        ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)] bg-[hsl(var(--stroke-primary),_0.5)]"
                        : "border-stroke"
                    }`}
                  >
                    <RadioGroupItem
                      className="me-2"
                      onChange={() => setEndType("Occurrence")}
                      checked={endType === "Occurrence"}
                      value={"Occurrence"}
                      id="Occurrence"
                      name="endType"
                    />
                    <span className="pr-6 truncate inline-block">
                      Occurrence
                    </span>
                    <MdOutlineCalendarToday className="absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>
                </RadioGroup>
              </div>
              {endType === "date" && (
                <>
                  <div className="col-span-2 xxl:col-span-1">
                    <DatePicker name="End Date" label="End Date" />
                  </div>
                  <div className="col-span-2 xxl:col-span-1">
                    <TimePicker name="End Time" label="End Time" />
                  </div>
                </>
              )}
              {endType === "event" && (
                <>
                  <div className="col-span-2 xxl:col-span-1">
                    <Select
                      value="Select an Event, Trigger or Process"
                      name="timezone"
                      label="Event Type"
                      options={timezoneOptions}
                    />
                  </div>
                  <div className="col-span-2 xxl:col-span-1">
                    <Select
                      value="Criteria Presets"
                      name="timezone"
                      label="Criteria Preset"
                      options={timezoneOptions}
                    />
                  </div>
                </>
              )}
              {endType === "Occurrence" && (
                <>
                  <div className="col-span-2 xxl:col-span-1">
                    <label
                      htmlFor="occurenceCount"
                      className="block text-sm text-accent mb-3"
                    >
                      No. of Occurrences
                    </label>
                    <div className="relative">
                      <Input
                        id="occurenceCount"
                        name="occurrence"
                        placeholder="Enter Occurrence"
                        className="h-[56px]"
                      />
                      <ClockFastForwardIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2 md:grid-col-3 gap-x-10 gap-y-[60px]">
        <Select
          value="Select"
          name="Recurrence"
          label="Recurrence"
          defaultValue="OneTime"
          options={recurrenceOptions}
        />

        <div className="col-span-2">
          <div className="bg-[rgba(40,_205,_65,_0.3)] p-6 rounded-md flex items-start">
            <div className="xxxl:w-[387px] w-[300px] pr-10">
              <h4 className="text-accent-dark mb-2">
                When does the Notification start?
              </h4>
              <p className="text-sm text-secondary-tertiary">
                Manual (on-demand) notifications do not have a Start date. For
                timed and event-based notifications, you can select the relevant
                details.
              </p>
            </div>
            <div className="xxxl:w-[calc(100%_-_387px)] w-[calc(100%_-_300px)] xxxl:pl-[64px] pl-10 space-y-5 relative before:content-[''] before:block before:w-[1px] before:h-[calc(100%_-_118px)] before:bg-white before:absolute before:top-[86px]">
              <div className="flex flex-col items-start xxxl:flex-row xxxl:items-center justify-end pl-10">
                <div className="w-[160px]">
                  <div className="relative">
                    <input
                      className="peer absolute hidden"
                      type="radio"
                      name="notificationstartSelection"
                      id="date"
                      checked={startSelection === "date"}
                      onChange={() => setStartSelection("date")}
                    />
                    <label className="pl-10 inline-block" htmlFor="date">
                      {startSelection === "date" ? (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                          <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                        </span>
                      ) : (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
                      )}
                      Date
                    </label>
                  </div>
                </div>
                <div className="w-full xxxl:w-[calc(100%_-_140px)] pt-3 xxxl:pt-0 grid grid-flow-row-dense grid-cols-3 gap-5">
                  <div className="col-span-2">
                    <DatePicker name="Start Date" label="Start Date" />
                  </div>
                  <div className="">
                    <DatePicker name="Start Time" label="Start Time" />
                  </div>
                  <div className="col-span-3">
                    <Select
                      value="Select"
                      name="timezone"
                      label="Default Timezone"
                      defaultValue="+5:30 IST"
                      options={timezoneOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start xxxl:flex-row xxxl:items-center justify-end pl-10">
                <div className="w-[160px]">
                  <div className="relative">
                    <input
                      className="peer absolute hidden"
                      type="radio"
                      name="notificationstartSelection"
                      id="Event"
                      checked={startSelection === "Event"}
                      onChange={() => setStartSelection("Event")}
                    />
                    <label className="pl-10 inline-block" htmlFor="Event">
                      {startSelection === "Event" ? (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                          <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                        </span>
                      ) : (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
                      )}
                      Event
                    </label>
                  </div>
                </div>
                <div className="w-full xxxl:w-[calc(100%_-_140px)] pt-3 xxxl:pt-0 grid grid-flow-row-dense grid-cols-3 gap-5">
                  <div className="col-span-3">
                    <Select
                      value="Select"
                      name="timezone"
                      label="Event Type"
                      defaultValue="+5:30 IST"
                      options={timezoneOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-[rgba(255,_49,_38,_0.3)] p-6 rounded-md flex items-start">
            <div className="xxxl:w-[387px] w-[300px] pr-10">
              <h4 className="text-accent-dark mb-2">
                When does the Notification end?
              </h4>
              <p className="text-sm text-secondary-tertiary">
                Manual (on-demand) notifications do not have a Start date. For
                timed and event-based notifications, you can select the relevant
                details.
              </p>
            </div>
            <div className="xxxl:w-[calc(100%_-_387px)] w-[calc(100%_-_300px)] xxxl:pl-[64px] pl-10 space-y-5 relative before:content-[''] before:block before:w-[1px] before:h-[calc(100%_-_118px)] before:bg-white before:absolute before:top-[86px]">
              <div className="flex flex-col items-start xxxl:flex-row xxxl:items-center justify-end pl-10">
                <div className="w-[160px]">
                  <div className="relative">
                    <input
                      className="peer absolute hidden"
                      type="radio"
                      name="notificationendSelection"
                      id="endDate"
                      checked={endSelection === "endDate"}
                      onChange={() => setEndSelection("endDate")}
                    />
                    <label className="pl-10 inline-block" htmlFor="endDate">
                      {endSelection === "endDate" ? (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                          <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                        </span>
                      ) : (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
                      )}
                      End Date
                    </label>
                  </div>
                </div>
                <div className="w-full xxxl:w-[calc(100%_-_160px)] pt-3 xxxl:pt-0 grid grid-flow-row-dense grid-cols-3 gap-5">
                  <div className="col-span-2">
                    <DatePicker name="End Date" label="End Date" />
                  </div>
                  <div className="">
                    <DatePicker name="End Time" label="End Time" />
                  </div>
                  <div className="col-span-3">
                    <Select
                      value="Select"
                      name="timezone"
                      label="Default Timezone"
                      defaultValue="+5:30 IST"
                      options={timezoneOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start xxxl:flex-row xxxl:items-center justify-end pl-10">
                <div className="w-[160px]">
                  <div className="relative">
                    <input
                      className="peer absolute hidden"
                      type="radio"
                      name="notificationendSelection"
                      id="endEvent"
                      checked={endSelection === "endEvent"}
                      onChange={() => setEndSelection("endEvent")}
                    />
                    <label className="pl-10 inline-block" htmlFor="endEvent">
                      {endSelection === "endEvent" ? (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                          <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                        </span>
                      ) : (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
                      )}
                      End Event
                    </label>
                  </div>
                </div>
                <div className="w-full xxxl:w-[calc(100%_-_140px)] pt-3 xxxl:pt-0 grid grid-flow-row-dense grid-cols-3 gap-5">
                  <div className="col-span-3">
                    <Select
                      value="Select"
                      name="timezone"
                      label="Event Type"
                      defaultValue="+5:30 IST"
                      options={timezoneOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start xxxl:flex-row xxxl:items-center justify-end pl-10">
                <div className="w-[160px]">
                  <div className="relative">
                    <input
                      className="peer absolute hidden"
                      type="radio"
                      name="notificationendSelection"
                      id="occurrence"
                      checked={endSelection === "occurrence"}
                      onChange={() => setEndSelection("occurrence")}
                    />
                    <label className="pl-10 inline-block" htmlFor="occurrence">
                      {endSelection === "occurrence" ? (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                          <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                        </span>
                      ) : (
                        <span className="inline-block absolute top-0 left-0 w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
                      )}
                      Occurrences
                    </label>
                  </div>
                </div>
                <div className="w-full xxxl:w-[calc(100%_-_140px)] pt-3 xxxl:pt-0 grid grid-flow-row-dense grid-cols-3 gap-5">
                  <div className="col-span-3">
                    <Select
                      value="Select"
                      name="occurrence"
                      label="No. of Occurrences"
                      defaultValue="1"
                      options={occurrencesOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];

export const recurrenceOptions = [
  {
    label: "One-Time",
    value: "OneTime",
  },
  {
    label: "Hourly",
    value: "Hourly",
  },
  {
    label: "Daily",
    value: "Daily",
  },
  {
    label: "Weekly",
    value: "Weekly",
  },
  {
    label: "Monthly",
    value: "Monthly",
  },
  {
    label: "Quarterly",
    value: "Quarterly",
  },
  {
    label: "Yearly",
    value: "Yearly",
  },
  {
    label: "Custom",
    value: "Custom",
  },
];
export const timezoneOptions = [
  {
    label: "+5:30 IST",
    value: "+5:30 IST",
  },
];
export const occurrencesOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
];
