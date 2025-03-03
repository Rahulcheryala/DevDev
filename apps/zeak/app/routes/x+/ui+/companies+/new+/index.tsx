import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
} from "@zeak/react";
import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { ProfilePhotoFormV2 } from "~/modules/shared";
import { ClearableInput } from "~/components/Form";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuTrash } from "react-icons/lu";
import { TbCircleCheckFilled, TbPencilMinus } from "react-icons/tb";
import { CheckIcon } from "@zeak/icons";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { MdInfo } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

export default function NewCompany() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "Company Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: true,
      isCompleted: false,
      label: "1",
    },
    {
      id: 2,
      title: "Status and Effectivity Dates",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "2",
    },
    {
      id: 3,
      title: "Address",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "3",
    },
    {
      id: 4,
      title: "Additional Info",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "4",
    },
    {
      id: 5,
      title: "Fiscal Period",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "5",
    },
    {
      id: 6,
      title: "Third-Party Integration",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "6",
    },
    {
      id: 7,
      title: "Summary",
      subTitle:
        "This is a template editable note which is optional and can be closed from X icon on top right of the note box",
      isActive: false,
      isCompleted: false,
      label: "7",
    },
  ];
  const [rightBanner, setRightBanner] = useState<any>(true);

  const handleReview = () => {
    navigate("/x/ui/companies/new/step2");
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
                      Step 1 of 7
                    </span>
                    <h4 className="text-xl text-accent-dark font-medium">
                      Company Info
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
                  <ValidatedForm validator={[]} className="">
                    <div className="mb-10">
                      <ProfilePhotoFormV2
                        userName={"N X"}
                        onFileChange={() => console.log("sdf")}
                        size="xxl"
                        msg1="Company Logo"
                        msg2="Click Here to upload a picture."
                        msg3=".png, .jpg, .jpeg (Max 2MB)"
                      />
                    </div>
                    <CompanyDetailsContent />
                  </ValidatedForm>
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
                  Next
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

const CompanyDetailsContent = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10 gap-y-[60px]">
        <ClearableInput
          name="companyName"
          placeholder="Enter Company Name"
          label={
            <>
              Company Name
              <span className="text-accent-red ml-1">*</span>
            </>
          }
        />
        <div className="relative">
          <ClearableInput
            name="DepartmentCode"
            placeholder="Enter Department Code"
            hideClose={true}
            label={
              <>
                Company Code
                <span className="text-accent-red inline-block ml-1">*</span>
              </>
            }
          />
        </div>
        <ClearableInput
          name="deployedUrl"
          label={`Company's Deployed URL`}
          disabled={true}
          placeholder="pfizer.{productname}.com/pfizer-US"
          isReadOnly
          hideClose={true}
        />
        <ClearableInput
          name="DepartmentCode"
          placeholder="e.g. https://sales.pfizer.com"
          hideClose={true}
          label={
            <>
              Company's Website Domain
              <span className="text-accent-red inline-block ml-1">*</span>
            </>
          }
        />
      </div>
    </>
  );
};

export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];
export const purposeOptions = [
  {
    label: "Shipping",
    value: "shipping",
  },
  {
    label: "Billing",
    value: "billing",
  },
];
