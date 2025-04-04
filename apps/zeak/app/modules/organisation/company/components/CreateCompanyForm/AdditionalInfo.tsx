import { Button, cn, DatePicker, InputComponent, Label } from "@zeak/react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

import { useState } from "react";
import { parseDate } from "@internationalized/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companyInfoValidator } from "../../utils/company.validators";
import { ValidatedForm } from "@zeak/remix-validated-form";
import AdditionalInfoAttachements from "./AdditionalInfoAttachements";
import Toaster from "~/components/Globals/Toaster";

export default function AdditionalInfoForm({
  additionalInfo,
  setAdditionalInfo,
}: {
  additionalInfo: any;
  setAdditionalInfo: any;
}) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [showNote, setShowNote] = useState(true);

  const {
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(companyInfoValidator),
  });

  const handleSubmit = async (data: any) => {
    console.log("submitted :: ", data);
  };

  return (
    <div>
      {showNote && (
        <Toaster
          variant="warning"
          icon={<HelpCircle className="h-6 w-6 text-[#F18F01]" />}
          className="p-[24px] rounded-[12px] bg-[linear-gradient(0deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%), var(--macOS-system-colors-Default-Yellow-Default-Light, #FC0)]"
          title="NOTE"
          content="Company addresses can serve various purposes, including the
          primary legal address of the company (often referred to as the
          registered or headquarters address), addresses for legal
          registrations, and addresses for official communications. These
          addresses are typically used in legal documents, tax filings,
          and official correspondence."
          onClose={() => setShowNote(false)}
        />
      )}
      <ValidatedForm
        validator={companyInfoValidator}
        defaultValues={{
          fiscalYearStart: additionalInfo?.fiscalYearStart,
          fiscalYearEnd: additionalInfo?.fiscalYearEnd,
        }}
        onSubmit={handleSubmit}
        method="post"
      >
        <div className="mt-8 space-y-8">
          <div>
            <div className="grid grid-cols-2 gap-12 py-4 px-4">
              <div className="flex flex-col gap-3">
                <InputComponent
                  name="language"
                  label="Primary Language"
                  placeholder="Enter Primary Language"
                  className="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                  value={additionalInfo?.language}
                  onChange={(e) =>
                    setAdditionalInfo({
                      ...additionalInfo,
                      language: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <InputComponent
                  name="timezone"
                  label="Timezone"
                  placeholder="Enter Timezone"
                  className="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                  value={additionalInfo?.timezone}
                  onChange={(e) =>
                    setAdditionalInfo({
                      ...additionalInfo,
                      timezone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 py-4 px-4">
              <div className="flex flex-col gap-3">
                <InputComponent
                  name="duns"
                  id="duns"
                  label="DUNS Number"
                  placeholder="Enter DUNS Number"
                  className="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                  value={additionalInfo?.dnbNumber}
                  onChange={(e) =>
                    setAdditionalInfo({
                      ...additionalInfo,
                      dnbNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <InputComponent
                  id="bbb"
                  name="bbb"
                  label="BBB Rating"
                  placeholder="Enter BBB Rating"
                  className="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                  value={additionalInfo?.bbbNumber}
                  onChange={(e) =>
                    setAdditionalInfo({
                      ...additionalInfo,
                      bbbNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 py-4 px-4">
              <div className="flex flex-col gap-3">
                <InputComponent
                  id="credit"
                  name="credit"
                  label="Credit Rating"
                  placeholder="Enter Credit Rating"
                  className="bg-[#F7F7F8] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                  value={additionalInfo?.creditRating}
                  onChange={(e) =>
                    setAdditionalInfo({
                      ...additionalInfo,
                      creditRating: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
            <div
              className={cn(
                "flex items-center justify-between bg-[#E5EAF2] px-6 py-4 rounded-t-zeak",
                {
                  "rounded-b-zeak": !isEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies" className="text-[#0D0C22] text-lg font-['Suisse Int\'l'] font-medium">Fiscal Period</Label>
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
                  <Label className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]">
                    From
                  </Label>

                  <DatePicker
                    value={additionalInfo?.fiscalYearStart}
                    onChange={(date) => {
                      setAdditionalInfo({
                        ...additionalInfo,
                        fiscalYearStart: date,
                      });
                      const value =
                        date &&
                          parseDate(date.toString()) >
                          additionalInfo?.fiscalYearEnd
                          ? "End date must be after start date"
                          : null;
                      console.log("value :: ", value);
                      setError("fiscalYearEnd", {
                        message: value ? value : undefined,
                      });
                    }}
                    inputClasses="bg-[#ffffff]"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Label className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]">
                    To
                  </Label>

                  <DatePicker
                    value={additionalInfo?.fiscalYearEnd}
                    onChange={(date) => {
                      setAdditionalInfo({
                        ...additionalInfo,
                        fiscalYearEnd: date,
                      });
                      const value =
                        date &&
                          parseDate(date.toString()) <
                          additionalInfo?.fiscalYearStart
                          ? "End date must be after start date"
                          : null;
                      console.log("value :: ", value);
                      setError("fiscalYearEnd", {
                        message: value ? value : undefined,
                      });
                    }}
                    minValue={additionalInfo?.fiscalYearStart?.add({
                      days: 1,
                    })}
                    inputClasses="bg-[#ffffff]"
                  />
                  {errors.fiscalYearEnd && (
                    <p className="text-red-500 text-sm font-sans">
                      {errors.fiscalYearEnd.message as string}
                    </p>
                  )}
                </div>
                <h3 className="text-lg font-medium">Upload</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Drag/ Drop files here.
                </p>
                <p className="text-sm text-gray-500">(Max 5 files)</p>
              </div>
            )}
          </section>

          <AdditionalInfoAttachements />
        </div>
      </ValidatedForm>
    </div>
  );
}
