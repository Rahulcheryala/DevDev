import {
  Avatar,
  Button,
  DatePicker,
  InputComponent,
  Label,
  cn,
} from "@zeak/react";
import { ChevronDown, ChevronUp, PencilLine, UploadIcon } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useForm } from "react-hook-form";
import { path } from "~/utils/path";
import { companyInfoValidator } from "../../utils/company.validators";
import DropdownSelect from "~/components/Globals/Dropdown/DropdownSelect";

const STATUS_ICONS = {
  ACTIVE: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_4401_36207)">
      <path d="M10.0001 18.3815C14.6025 18.3815 18.3334 14.6506 18.3334 10.0482C18.3334 5.4458 14.6025 1.71484 10.0001 1.71484C5.39771 1.71484 1.66675 5.4458 1.66675 10.0482C1.66675 14.6506 5.39771 18.3815 10.0001 18.3815Z" stroke="#101828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M6.25 10.0469L8.75 12.5469L13.75 7.54688" stroke="#101828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4401_36207">
        <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
      </clipPath>
    </defs>
  </svg>),
  INACTIVE: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_4401_36219)">
      <path d="M12.5001 7.54818L7.50008 12.5482M7.50008 7.54818L12.5001 12.5482M18.3334 10.0482C18.3334 14.6506 14.6025 18.3815 10.0001 18.3815C5.39771 18.3815 1.66675 14.6506 1.66675 10.0482C1.66675 5.4458 5.39771 1.71484 10.0001 1.71484C14.6025 1.71484 18.3334 5.4458 18.3334 10.0482Z" stroke="#101828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4401_36219">
        <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
      </clipPath>
    </defs>
  </svg>),
  BLOCKED: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <g clip-path="url(#clip0_4401_36230)">
      <path d="M4.10841 4.15651L15.8917 15.9398M1.66675 7.15046V12.9459C1.66675 13.1497 1.66675 13.2516 1.68977 13.3475C1.71019 13.4326 1.74386 13.5139 1.78955 13.5884C1.84108 13.6725 1.91315 13.7446 2.05727 13.8887L6.15956 17.991C6.30368 18.1351 6.37575 18.2072 6.45984 18.2587C6.5344 18.3044 6.61569 18.3381 6.70072 18.3585C6.79663 18.3815 6.89854 18.3815 7.10237 18.3815H12.8978C13.1016 18.3815 13.2035 18.3815 13.2994 18.3585C13.3845 18.3381 13.4658 18.3044 13.5403 18.2587C13.6244 18.2072 13.6965 18.1351 13.8406 17.991L17.9429 13.8887C18.087 13.7446 18.1591 13.6725 18.2106 13.5884C18.2563 13.5139 18.29 13.4326 18.3104 13.3475C18.3334 13.2516 18.3334 13.1497 18.3334 12.9459V7.15046C18.3334 6.94664 18.3334 6.84472 18.3104 6.74882C18.29 6.66379 18.2563 6.5825 18.2106 6.50794C18.1591 6.42384 18.087 6.35178 17.9429 6.20765L13.8406 2.10537C13.6965 1.96124 13.6244 1.88918 13.5403 1.83764C13.4658 1.79195 13.3845 1.75828 13.2994 1.73787C13.2035 1.71484 13.1016 1.71484 12.8978 1.71484H7.10237C6.89854 1.71484 6.79663 1.71484 6.70072 1.73787C6.61569 1.75828 6.5344 1.79195 6.45984 1.83764C6.37575 1.88918 6.30368 1.96124 6.15956 2.10537L2.05727 6.20765C1.91315 6.35178 1.84108 6.42384 1.78955 6.50794C1.74386 6.5825 1.71019 6.66379 1.68977 6.74882C1.66675 6.84472 1.66675 6.94664 1.66675 7.15046Z" stroke="#101828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_4401_36230">
        <rect width="20" height="20" fill="white" transform="translate(0 0.046875)" />
      </clipPath>
    </defs>
  </svg>)
}

export default function CompanyInfoForm({
  companyInfo,
  companyName,
  setCompanyInfo,
}: {
  companyInfo: any;
  companyName?: string;
  setCompanyInfo: any;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isCompanyCodeDisabled, setIsCompanyCodeDisabled] = useState(true);
  const {
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(companyInfoValidator),
  });

  const handleSubmit = async (data: any) => {
    console.log("submitted :: ", data);
  };

  const fetchGeneratedCompanyCode = async () => {
    const formData = new FormData();
    formData.append("companyName", companyInfo?.name);
    fetch(path.to.api.generateCompanyCode, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setCompanyInfo({
          ...companyInfo,
          companyCode: data.generatedCompanyCode,
        });
      });
  };

  const checkCompanyName = async () => {
    if (companyInfo?.name?.trim() !== "") {
      const formData = new FormData();
      formData.append("companyName", companyInfo?.name);
      fetch(path.to.api.checkCompanyName, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError("name", {
              message: data.message,
            });
          } else {
            fetchGeneratedCompanyCode();
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  const checkCompanyCode = async () => {
    if (companyInfo?.companyCode?.trim() !== "") {
      const formData = new FormData();
      formData.append("companyCode", companyInfo?.companyCode);
      fetch(path.to.api.checkCompanyCode, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError("companyCode", {
              message: data.message,
            });
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  return (
    <ValidatedForm
      validator={companyInfoValidator}
      defaultValues={{
        name: companyInfo?.name,
        companyCode: companyInfo?.companyCode,
        domainUrl: companyInfo?.domainUrl,
        website: companyInfo?.website,
        status: companyInfo?.status,
        effectivityStartDate: companyInfo?.effectivityStartDate,
        effectivityEndDate: companyInfo?.effectivityEndDate,
      }}
      onSubmit={handleSubmit}
      method="post"
    >
      <div className="mb-12 space-y-8">
        <div className="flex items-center gap-8 mb-12">
          <Avatar name={companyName ?? companyInfo?.name ?? ''} size='xxl' className="ring-1 ring-gray-100 bg-white shadow-lg" />
          <div>
            <p className="font-['Suisse Int\'l'] text-sm font-medium text-[#475467]">
              Company Logo
            </p>
            <p className="font-['Suisse Int\'l'] text-sm font-normal text-[#475467]">
              PNG, JPEG, SVG
            </p>
            <label
              htmlFor="file-upload"
              className="inline-flex items-center justify-between font-['Suisse Int\'l'] text-[#9BA2AC] text-sm font-[450] cursor-pointer transition mt-3"
            >
              <input
                id="file-upload"
                type="file"
                accept=".png, .jpeg, .jpg"
                className="hidden"
              />
              <UploadIcon className="w-5 h-5 mr-3" />
              Upload
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="">
            <InputComponent
              name="name"
              label="Company Name"
              placeholder="Enter Company Name"
              inputClasses="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
              onFocus={() => setError("name", { message: undefined })}
              onChange={(e) =>
                setCompanyInfo({
                  ...companyInfo,
                  name: e.target.value,
                  domainUrl: `https://${e.target.value.toLowerCase()}.zeak.io`,
                })
              }
              onBlur={checkCompanyName}
              isRequired
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-['Suisse Int\'l'] font-[450] pt-2">
                {errors.name.message as string}
              </p>
            )}
          </div>
          <div className="">
            <div className="flex">
              <InputComponent
                name="companyCode"
                label="Company Code"
                placeholder="Enter Company Code"
                inputClasses={cn("bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]", {
                  "text-[#0D0C22] bg-[#F7F7F8] cursor-not-allowed pointer-events-none": isCompanyCodeDisabled,
                })}
                value={companyInfo?.companyCode}
                onFocus={() =>
                  setError("companyCode", { message: undefined })
                }
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    companyCode: e.target.value,
                  })
                }
                onBlur={checkCompanyCode}
                disabled={isCompanyCodeDisabled}
                isRequired
              />
              <Button
                variant="ghost"
                className="p-0 w-5 h-5 relative right-5"
                onClick={() =>
                  setIsCompanyCodeDisabled(!isCompanyCodeDisabled)
                }
              >
                <PencilLine className="w-4 h-4 text-secondary" />
              </Button>
            </div>
            {errors.companyCode && (
              <p className="text-red-500 text-sm font-['Suisse Int\'l'] font-[450] pt-2">
                {errors.companyCode.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="">
            <InputComponent
              name="domainUrl"
              label="Zeak URL"
              placeholder="Enter Zeak URL"
              inputClasses="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
              value={companyInfo?.domainUrl}
              onChange={(e) =>
                setCompanyInfo({
                  ...companyInfo,
                  domainUrl: e.target.value,
                })
              }
              isRequired
            />
          </div>
          <div className="">
            <InputComponent
              name="website"
              label="Company Website"
              placeholder="Enter Company Website"
              inputClasses="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
              onChange={(e) =>
                setCompanyInfo({ ...companyInfo, website: e.target.value })
              }
            />
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 gap-12">
          <div className="">
            {/* <Label htmlFor="priority">Status</Label> */}
            <DropdownSelect
              name="status"
              label="Status"
              placeholder="Select Status"
              className="w-full"
              inputClasses="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
              value={companyInfo?.status}
              defaultValue="Active"
              onChange={(value: string) => setCompanyInfo({ ...companyInfo, status: value })}
              items={[
                { label: 'Active', value: 'Active', icon: STATUS_ICONS.ACTIVE },
                { label: 'Inactive', value: 'Inactive', icon: STATUS_ICONS.INACTIVE },
                { label: 'Blocked', value: 'Blocked', icon: STATUS_ICONS.BLOCKED },
              ]}
            />
          </div>
        </div>
      </div>

      <section className={cn("w-full bg-[#F7F7F8] rounded-zeak", {})}>
        <div
          className={cn(
            "flex items-center justify-between bg-[#E5EAF2] pl-6 py-4 pr-0 rounded-t-zeak",
            {
              "rounded-b-zeak": !isEnabled,
            }
          )}
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="companies" className="text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium">Effectivity Dates</Label>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsEnabled(!isEnabled)}
            >
              {isEnabled ? (
                <ChevronDown className="w-6 h-6" />
              ) : (
                <ChevronUp className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {isEnabled && (
          <div className="grid grid-cols-2 gap-12 py-4 px-4">
            <div className="flex flex-col gap-3">
              <Label
                className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]"
                htmlFor="effectivityStartDate"
              >
                Start Date <span className="text-red-500 ml-0.5">*</span>
              </Label>

              <DatePicker
                value={companyInfo?.effectivityStartDate}
                onChange={(date) => {
                  setCompanyInfo({
                    ...companyInfo,
                    effectivityStartDate: date,
                  });
                  const value =
                    date &&
                      parseDate(date.toString()) >
                      companyInfo?.effectivityEndDate
                      ? "End date must be after start date"
                      : null;
                  setError("effectivityEndDate", {
                    message: value ? value : undefined,
                  });
                }}
                minValue={today(getLocalTimeZone())}
                inputClasses="bg-[#ffffff]"
              />
              {errors.effectivityStartDate && (
                <p className="text-red-500 text-sm font-sans">
                  {errors.effectivityStartDate.message as string}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Label
                className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]"
                htmlFor="effectivityEndDate"
              >
                End Date <span className="text-[#9BA2AC]">(Optional)</span>
              </Label>

              <DatePicker
                value={companyInfo?.effectivityEndDate}
                onChange={(date) => {
                  setCompanyInfo({
                    ...companyInfo,
                    effectivityEndDate: date,
                  });
                  const value =
                    date &&
                      parseDate(date.toString()) <
                      companyInfo?.effectivityStartDate
                      ? "End date must be after start date"
                      : null;
                  setError("effectivityEndDate", {
                    message: value ? value : undefined,
                  });
                }}
                minValue={
                  companyInfo?.effectivityStartDate
                    ? companyInfo?.effectivityStartDate.add({ days: 1 })
                    : today(getLocalTimeZone())
                }
                inputClasses="bg-[#ffffff]"
              />
              {errors.effectivityEndDate && (
                <p className="text-red-500 text-sm font-sans">
                  {errors.effectivityEndDate.message as string}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </ValidatedForm>
  );
}
