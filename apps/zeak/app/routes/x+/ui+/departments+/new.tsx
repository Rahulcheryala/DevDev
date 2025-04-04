import { Textarea } from "@zeak/react";
import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { ProfilePhotoFormV2 } from "~/modules/shared";
import { ClearableInput, DatePicker, Select } from "~/components/Form";
import { MdCheckBox } from "react-icons/md";
import WarningNote from "~/modules/shared/ui/WarningNote";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";
import { BottomControls, StepperItem } from "~/modules/access-settings";

export default function NewDepartment() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "General",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Summary",
      isActive: true,
      isCompleted: false,
      label: "2",
    },
  ];

  const handleReview = () => {
    navigate("/x/ui/departments/review");
  };
  return (
    <div className="py-[25px] px-[60px] w-full">
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
            Departments
          </span>
        </li>
      </ul>
      {/* New Breadcumbs */}
      <SettingsList isSelectable={false} title="Departments" />
      <div className="mx-auto max-w-[1240px] pb-4">
        <div className="flex items-center">
          {stepsList.map((step, index) => (
            <>
              <StepperItem
                stepItem={step}
                listLength={stepsList.length}
                index={index}
              />
            </>
          ))}
        </div>
      </div>
      <div className="pt-10 -mx-[60px] px-[60px] border-t border-stroke">
        <div className="mx-auto max-w-[1240px] pb-[60px]">
          <div className="mb-[60px]">
            <WarningNote
              message="This is a template editable note which is optional and can be
                closed from X icon on top right of the note box"
              closeHandle={() => console.log("sd")}
            />
          </div>
          <ValidatedForm validator={[]}>
            <ProfilePhotoFormV2
              userName={"N X"}
              onFileChange={() => console.log("sdf")}
            />
            <div className="grid grid-cols-2 gap-10">
              <div className="pt-10">
                <Select
                  value="Select"
                  name="Company"
                  label="Company"
                  defaultValue="pfizerDefault"
                  options={companyOptions}
                />
              </div>
              <div className=""></div>
              <ClearableInput
                name="DepartmentName"
                placeholder="Enter Department Name"
                label={
                  <>
                    Department Name
                    <span className="text-accent-red ml-1">*</span>
                  </>
                }
              />
              <div>
                <label className="text-sm mb-3 block">Description</label>
                <Textarea
                  name="description"
                  className="min-h-[52px] rounded-sm"
                />
              </div>
              <div>
                <div className="relative">
                  <ClearableInput
                    name="DepartmentCode"
                    placeholder="Enter Department Code"
                    hideClose={true}
                    label={
                      <>
                        Department Code
                        <span className="text-accent-red inline-block ml-1">
                          *
                        </span>
                        <span className="inline-block relative group ml-2">
                          <GoQuestion />
                          <span
                            id="tooltip-right"
                            role="tooltip"
                            className="absolute hidden left-[calc(100%_+_4px)] top-[50%] -translate-y-[50%] z-10  group-hover:inline-flex max-w-[320px] w-[max-content] group-hover:group-opacity-1 p-3 text-xs font-normal text-white bg-accent-dark rounded-lg shadow-sm tooltip"
                          >
                            This is an alphanumeric code which is unique for
                            each department within a company.
                            <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-[50%] w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-accent-dark"></span>
                          </span>
                        </span>
                      </>
                    }
                  />
                  {true && (
                    <MdCheckBox
                      className="text-accent-green absolute bottom-[18px] right-2 "
                      size={20}
                    />
                  )}
                </div>
                <div className="gap-y-1 gap-x-3 flex items-center mt-3">
                  <h4 className="text-sm text-secondary">Suggested:</h4>
                  <p className="text-sm text-accent-primary">ATR-01</p>
                  <p className="text-sm text-accent-primary">ATR-24</p>
                  <p className="text-sm text-accent-primary">ATY-05</p>
                </div>
              </div>
              <div></div>
              <Select
                value=""
                name="Supervisor"
                label="Supervisor"
                defaultValue=""
                placeholder="Select"
                options={companyOptions}
              />

              <ClearableInput
                name="Email"
                label="Email"
                disabled={true}
                placeholder="Email Address"
                isReadOnly
                hideClose={true}
              />
            </div>
            <div className="mt-[60px] p-6 bg-card-green rounded-sm">
              <h3 className="text-lg mb-6">Status and Effectivity Dates</h3>
              <div className="grid grid-cols-2 gap-10">
                <Select
                  value="Select"
                  name="Status"
                  label="Status"
                  defaultValue="Select"
                  options={statusOptions}
                />
                <div className=""></div>
                <DatePicker name="Start Date" label="Start Date" />
                <DatePicker name="End Date" label="End Date" />
              </div>
            </div>
          </ValidatedForm>
        </div>
      </div>
      <BottomControls
        handleReview={handleReview}
        isReviewPage={false}
        handleBackClick={() => {}}
      />
    </div>
  );
}

export const companyOptions = [
  {
    label: "Pfizer (Default)",
    value: "pfizerDefault",
  },
];

export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];
