import {
  Button,
  DatePicker,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from "@zeak/react";
import { ChevronDown, ChevronUp, PencilLine, UploadIcon } from "lucide-react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useForm } from "react-hook-form";
import { ClearableInput } from "~/components/Form";
import { path } from "~/utils/path";
import { companyInfoValidator } from "../../utils/company.validators";
import { StepHeader } from "./StepHeader";

export default function CompanyInfoForm({
  companyInfo,
  setCompanyInfo,
}: {
  companyInfo: any;
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
    <div className=" bg-white rounded-md ">
      <StepHeader title="General" />
      <div className=" 2xl:px-[60px] px-10 mt-8 ">
        {/* Company logo */}
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
          <div className="2xl:mb-[60px] mb-10 space-y-8">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-center bg-gray-400 text-white text-3xl w-24 h-24 rounded-full">
                    NX
                  </div>

                  <div>
                    <p className="text-sm font-medium text-secondary font-sans">
                      Company Logo
                    </p>
                    <p className="text-sm font-normal text-secondary font-sans">
                      PNG, JPEG, SVG
                    </p>
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center justify-center mt-2 py-2 text-tertiary text-sm font-medium rounded-md cursor-pointer transition"
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
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-3">
                <ClearableInput
                  name="name"
                  label={
                    <Label htmlFor="name">
                      Company Name
                      <span className="text-sm font-semibold font-sans text-[#F56B1E] ml-1">
                        *
                      </span>
                    </Label>
                  }
                  placeholder="Enter Company Name"
                  inputClasses="bg-gray-100 border-none"
                  onFocus={() => setError("name", { message: undefined })}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      name: e.target.value,
                      domainUrl: `https://${e.target.value.toLowerCase()}.zeak.io`,
                    })
                  }
                  onBlur={checkCompanyName}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm font-sans">
                    {errors.name.message as string}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <ClearableInput
                  name="companyCode"
                  label={
                    <div className="flex flex-row justify-between items-center">
                      <Label htmlFor="companyCode">
                        Company Code
                        <span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <Button
                        variant="ghost"
                        className="p-0 w-5 h-5"
                        onClick={() =>
                          setIsCompanyCodeDisabled(!isCompanyCodeDisabled)
                        }
                      >
                        <PencilLine className="w-4 h-4 text-secondary" />
                      </Button>
                    </div>
                  }
                  placeholder="Enter Company Code"
                  inputClasses={cn("bg-gray-100 border-none", {
                    "text-tertiary bg-[#F7F7F8] cursor-not-allowed pointer-events-none": isCompanyCodeDisabled,
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
                />
                {errors.companyCode && (
                  <p className="text-red-500 text-sm font-sans">
                    {errors.companyCode.message as string}
                  </p>
                )}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-3">
                <ClearableInput
                  name="domainUrl"
                  label={
                    <>
                      Zeak URL
                      <span className="text-sm font-semibold font-sans text-[#F56B1E] ml-1">
                        *
                      </span>
                    </>
                  }
                  placeholder="Enter Zeak URL"
                  inputClasses="bg-gray-100 border-none"
                  value={companyInfo?.domainUrl}
                  onChange={(e) =>
                    setCompanyInfo({
                      ...companyInfo,
                      domainUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <ClearableInput
                  name="website"
                  label="Company Website"
                  placeholder="Enter Company Website"
                  inputClasses="bg-gray-100 border-none"
                  onChange={(e) =>
                    setCompanyInfo({ ...companyInfo, website: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Status */}
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="flex flex-col gap-3">
                <Label htmlFor="priority">Status</Label>
                <Select
                  value={companyInfo?.status}
                  onValueChange={(value) =>
                    setCompanyInfo({ ...companyInfo, status: value })
                  }
                >
                  <SelectTrigger className="bg-gray-100 border-none">
                    <SelectValue placeholder="Active" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <section className={cn("w-full bg-[#F7F7F8] rounded-zeak mb-40", {})}>
            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between bg-[#E5EAF2] px-6 py-[8px] rounded-t-zeak",
                {
                  "rounded-b-zeak": !isEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies">Effectivity Dates</Label>
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
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                <div className="flex flex-col gap-3">
                  <Label
                    className="text-[14px] font-semibold tracking-[0px]"
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
                  />
                  {errors.effectivityStartDate && (
                    <p className="text-red-500 text-sm font-sans">
                      {errors.effectivityStartDate.message as string}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Label
                    className="text-[14px] font-semibold tracking-[0px]"
                    htmlFor="effectivityEndDate"
                  >
                    End Date (Optional)
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
      </div>
    </div>
  );
}
