import {
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
import { LuTrash } from "react-icons/lu";
import { TbCircleCheckFilled, TbPencilMinus } from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CreationWizardItem } from "~/modules/access-settings/ui/creation-wizard";
import { useState } from "react";
import { BuildingIcon5, WorkFlowIcon, UserIcon1 } from "@zeak/icons";
import { BiSearch } from "react-icons/bi";

export default function NotificationStep3() {
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
      isActive: false,
      isCompleted: true,
      label: "2",
    },
    {
      id: 3,
      title: "Target Audience",
      subTitle:
        "Defines the specific users or groups who will receive the notification, ensuring it reaches the right audience.",
      isActive: true,
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
    navigate("/x/ui/notifications/new/step4");
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
              <span className="text-accent-pink text-xs mb-2">Step 3 of 4</span>
              <h4 className="text-xl text-accent-dark font-medium">
                Target Audience
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
              <TargetAudienceContent />
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

const TargetAudienceContent = () => {
  const [targetAudience, setTargetAudience] = useState("all");
  return (
    <>
      <div className="space-y-10">
        <div
          className={`py-6 border bg-white relative rounded-md ${
            targetAudience === "all"
              ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)]"
              : "border-stroke-primary"
          }`}
        >
          <UserIcon1
            size="40"
            className="absolute top-1/2 left-10 -translate-y-1/2"
          />
          <div className="pl-[120px] pr-[104px]">
            <h4 className="text-lg text-accent-dark font-medium">
              All Platform Users
            </h4>
            <p className="text-sm text-secondary-tertiary mt-2">
              Choose undefined to use this notification in Workflows,
              Automations and Business Rules.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <input
              className="peer absolute hidden"
              type="radio"
              name="targetAudience"
              id="all"
              checked={targetAudience === "all"}
              onChange={() => setTargetAudience("all")}
            />
            <label className="pl-10 inline-block" htmlFor="all">
              {targetAudience === "all" ? (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                </span>
              ) : (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
              )}
            </label>
          </div>
        </div>
        <div
          className={`py-6 border bg-white relative rounded-md ${
            targetAudience === "few"
              ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)]"
              : "border-stroke-primary"
          }`}
        >
          <BuildingIcon5
            size="40"
            className="absolute top-1/2 left-10 -translate-y-1/2"
          />
          <div className="pl-[120px] pr-[104px]">
            <h4 className="text-lg text-accent-dark font-medium">
              Select One or More Users, Teams or Departments
            </h4>
            <p className="text-sm text-secondary-tertiary mt-2">
              You can select multiple users, teams or departments separated by a
              comma
            </p>
            <div className="relative max-w-[600px] mt-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="max-w-full w-full outline-none focus-visible:outline-none p-0 h-auto flex justify-between items-center">
                  <div className="relative w-full">
                    <Input
                      className="pl-[52px] rounded-md"
                      placeholder="Search for Users, Teams or Departments"
                    />
                    <BiSearch
                      size="20"
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-tertiary"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-full min-w-[452px]"
                >
                  <div className="py-4 px-8">
                    <p className="text-sm text-accent-dark">
                      {" "}
                      <span className="text-accent-primary">
                        8 Suggestions
                      </span>{" "}
                      based on your search
                    </p>
                  </div>
                  {/* Add table for the list */}
                  <div className="px-8 py-4 pb-6">
                    <Button
                      variant="outline-primary"
                      className="w-full h-[56px]"
                    >
                      Select
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <input
              className="peer absolute hidden"
              type="radio"
              name="targetAudience"
              id="few"
              checked={targetAudience === "few"}
              onChange={() => setTargetAudience("few")}
            />
            <label className="pl-10 inline-block" htmlFor="few">
              {targetAudience === "few" ? (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                </span>
              ) : (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
              )}
            </label>
          </div>
        </div>
        <div
          className={`py-6 border bg-white relative rounded-md ${
            targetAudience === "undefined"
              ? "border-accent-primary ring-4 ring-[hsl(var(--accent-primary),_0.09)]"
              : "border-stroke-primary"
          }`}
        >
          <WorkFlowIcon
            size="40"
            className="absolute top-1/2 left-10 -translate-y-1/2"
          />
          <div className="pl-[120px] pr-[104px]">
            <h4 className="text-lg text-accent-dark font-medium">
              Undefined - For Business Rules and Automations
            </h4>
            <p className="text-sm text-secondary-tertiary mt-2">
              Choose undefined to use this notification in Workflows,
              Automations and Business Rules.
            </p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
            <input
              className="peer absolute hidden"
              type="radio"
              name="targetAudience"
              id="undefined"
              checked={targetAudience === "undefined"}
              onChange={() => setTargetAudience("undefined")}
            />
            <label className="pl-10 inline-block" htmlFor="undefined">
              {targetAudience === "undefined" ? (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-accent-dark bg-white flex items-center justify-center">
                  <span className="w-4 h-4 rounded-full bg-accent-dark"></span>
                </span>
              ) : (
                <span className="inline-block w-6 h-6 rounded-full border-[1px] border-stroke bg-white"></span>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
