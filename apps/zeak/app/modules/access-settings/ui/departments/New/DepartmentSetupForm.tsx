import { Textarea } from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import axios from "axios";
import { forwardRef, useState } from "react";
import { GoQuestion } from "react-icons/go";
import { MdCheckBox } from "react-icons/md";
import { ClearableInput, DatePicker, Select } from "~/components/Form";
import { useRouteData } from "~/hooks";
import {
  departmentStatus,
  departmentValidator,
  logoAsFileSchema,
} from "~/modules/access-settings/access-settings.model";
import {
  type DepartmentValidatorWithLogoFileType,
  type DepartmentValidatorType,
} from "~/modules/access-settings/types";
import { type Company } from "~/modules/settings";
import { ProfilePhotoFormV2 } from "~/modules/shared";
import { type User } from "~/modules/users";
import { path } from "~/utils/path";

type DepartmentSetupFormProps = {
  initialData?: DepartmentValidatorType;
  supervisorList: Array<Pick<User, "id" | "email" | "fullName">>;
  onSubmit: (deptDetails: DepartmentValidatorWithLogoFileType) => void;
};

const DepartmentSetupForm = forwardRef<
  HTMLButtonElement,
  DepartmentSetupFormProps
>(({ initialData, onSubmit, supervisorList }, submitBtnRef) => {
  const [imageData, setImageData] = useState<File>();
  const [email, setEmail] = useState<string>();
  const [isCodeDuplicate, setIsCodeDuplicate] = useState();
  const [isNameDuplicate, setIsNameDuplicate] = useState();
  const routeData = useRouteData<{ company: Company; companies: Company[] }>(
    path.to.authenticatedRoot,
  );
  const companyOptions =
    routeData?.companies.map((c) => ({
      label: c.name as string,
      value: c.id as string,
    })) ?? [];

  const statusOptions = departmentStatus.map((status) => ({
    label: status,
    value: status,
  }));
  const supervisorOptions = supervisorList.map((s) => ({
    label: s.fullName as string,
    value: s.id,
    email: s.email,
  }));

  const handleDepartmentCodeBlur = async (code: string) => {
    if (code && code.length > 1) {
      const formData = new FormData();
      formData.append("departmentCode", code);
      const {
        data: { isDuplicate },
      } = await axios({
        method: "post",
        url: path.to.api.checkDuplicateDepartmentCode,
        data: formData,
      });
      setIsCodeDuplicate(isDuplicate);
    }
  };

  const handleDepartmentNameBlur = async (name: string) => {
    if (name && name.length > 1) {
      const formData = new FormData();
      formData.append("name", name);
      const {
        data: { isDuplicate },
      } = await axios({
        method: "post",
        url: path.to.api.checkDuplicateDepartmentName,
        data: formData,
      });
      setIsNameDuplicate(isDuplicate);
    }
  };

  const handleSubmit = async (
    data: DepartmentValidatorWithLogoFileType,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    onSubmit({
      ...data,
      logo: imageData,
    });
  };

  return (
    <ValidatedForm
      validator={departmentValidator.merge(logoAsFileSchema)}
      resetAfterSubmit={true}
      onSubmit={handleSubmit}
      defaultValues={initialData}
    >
      <ProfilePhotoFormV2
        uniqueId={"department-logo"}
        userName={initialData?.name ?? ""}
        onFileChange={(e) => setImageData(e || undefined)}
      />
      <div className="grid grid-cols-2 gap-10">
        <div className="pt-10">
          <Select name="companyId" label="Company" options={companyOptions} />
        </div>
        <div className=""></div>
        <div>
          <div className="relative">
            <ClearableInput
              name="name"
              placeholder="Enter Department Name"
              hideClose={true}
              onBlur={(e) => handleDepartmentNameBlur(e?.target?.value)}
              externalErrors={
                isNameDuplicate
                  ? ["Department name is already taken. Try another."]
                  : []
              }
              label={
                <>
                  Department Name
                  <span className="text-accent-red inline-block ml-1">*</span>
                  <span className="inline-block relative group ml-2">
                    <GoQuestion />
                    <span
                      id="tooltip-right"
                      role="tooltip"
                      className="absolute hidden left-[calc(100%_+_4px)] top-[50%] -translate-y-[50%] z-10  group-hover:inline-flex max-w-[320px] w-[max-content] group-hover:group-opacity-1 p-3 text-xs font-normal text-white bg-accent-dark rounded-lg shadow-sm tooltip"
                    >
                      This is an name which is unique for each department within
                      a company.
                      <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-[50%] w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-accent-dark"></span>
                    </span>
                  </span>
                </>
              }
            />
            {isNameDuplicate == false && (
              <MdCheckBox
                className="text-accent-green absolute bottom-4 right-2 "
                size={20}
              />
            )}
          </div>
        </div>
        <div>
          <label className="text-sm mb-3 block">Description</label>
          <Textarea
            name="description"
            className="min-h-[52px] rounded-sm"
            defaultValue={initialData?.description}
          />
        </div>
        <div>
          <div className="relative">
            <ClearableInput
              name="departmentCode"
              placeholder="Enter Department Code"
              hideClose={true}
              onBlur={(e) => handleDepartmentCodeBlur(e?.target?.value)}
              externalErrors={
                isCodeDuplicate
                  ? ["Department code is already taken. Try another."]
                  : []
              }
              label={
                <>
                  Department Code
                  <span className="text-accent-red inline-block ml-1">*</span>
                  <span className="inline-block relative group ml-2">
                    <GoQuestion />
                    <span
                      id="tooltip-right"
                      role="tooltip"
                      className="absolute hidden left-[calc(100%_+_4px)] top-[50%] -translate-y-[50%] z-10  group-hover:inline-flex max-w-[320px] w-[max-content] group-hover:group-opacity-1 p-3 text-xs font-normal text-white bg-accent-dark rounded-lg shadow-sm tooltip"
                    >
                      This is an alphanumeric code which is unique for each
                      department within a company.
                      <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-[50%] w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-accent-dark"></span>
                    </span>
                  </span>
                </>
              }
            />
            {isCodeDuplicate == false && (
              <MdCheckBox
                className="text-accent-green absolute bottom-4 right-2 "
                size={20}
              />
            )}
          </div>
        </div>
        <div></div>
        <Select
          name="supervisor"
          label="Supervisor"
          placeholder="Select"
          options={supervisorOptions}
          onChange={(item) => {
            const userEmail = supervisorOptions.find(
              (s) => s.value === item?.value,
            )?.email;
            setEmail(userEmail);
          }}
        />

        <ClearableInput
          name="email"
          label="Email"
          value={email}
          disabled={true}
          placeholder="Email Address"
          isReadOnly
          hideClose={true}
          showErrors={false}
        />
      </div>
      <div className="mt-[60px] p-6 bg-card-green rounded-sm">
        <h3 className="text-lg mb-6">Status and Effectivity Dates</h3>
        <div className="grid grid-cols-2 gap-10">
          <Select name="status" label="Status" options={statusOptions} />
          <div className=""></div>
          <DatePicker name="effectiveStartDate" label="Start Date" />
          <DatePicker name="effectiveEndDate" label="End Date" />
        </div>
      </div>
      <button
        type="submit"
        disabled={isCodeDuplicate}
        ref={submitBtnRef}
        className="hidden"
      >
        Submit
      </button>
    </ValidatedForm>
  );
});

DepartmentSetupForm.displayName = "DepartmentSetupForm";

export default DepartmentSetupForm;
