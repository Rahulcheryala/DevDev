import { Button, Label, cn } from "@zeak/react";

import { BuildingIcon, UserIcon, XCloseIcon } from "@zeak/icons";
import { formatDate } from "date-fns";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import AddressCard from "./AddressCard";
import { StepHeader } from "./StepHeader";

export default function Summary({
  companyInfo,
  addressInfoList,
  additionalInfo,
}: {
  companyInfo: any;
  addressInfoList: any;
  additionalInfo: any;
}) {
  const [isGeneralInfoEnabled, setIsGeneralInfoEnabled] = useState(true);
  const [isAddressInfoEnabled, setIsAddressInfoEnabled] = useState(true);
  const [isAdditionalInfoEnabled, setIsAdditionalInfoEnabled] = useState(true);
  const [isFiscalPeriodEnabled, setIsFiscalPeriodEnabled] = useState(true);
  return (
    <div className=" bg-white rounded-md ">
      <StepHeader title="Summary" />
      <div className=" 2xl:px-[60px] px-10  ">
        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4 flex items-start gap-4 shadow-sm">
          {/* Icon */}
          <div className="flex items-center">
            <HelpCircle className="h-6 w-6 text-yellow-500" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-yellow-500">NOTE</h3>
            <p className="text-sm text-gray-700">
              Company addresses can serve various purposes, including the
              primary legal address of the company (often referred to as the
              registered or headquarters address), addresses for legal
              registrations, and addresses for official communications. These
              addresses are typically used in legal documents, tax filings, and
              official correspondence.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="text-yellow-700 hover:text-yellow-900 focus:outline-none flex items-center justify-center self-center"
          >
            <XCloseIcon className="h-5 w-5 yellow-700" />
          </button>
        </div>

        <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
          <div
            className={cn(
              "flex items-center justify-between bg-[#66D4CF] mt-8  px-6 py-[15px] rounded-t-zeak"
            )}
          >
            <div className="flex items-center gap-2">
              <Label htmlFor="companies">Next Steps</Label>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>

          <div className="bg-[#D7E9E8] rounded-b-lg p-6">
            <div className="flex gap-4 ">
              <p className="text-sm text-[#475467] w-2/3">
                Your team has been successfully created. You can close the
                record or use the next steps shown on right to add users and
                manage your department details.
              </p>
              <Button
                size="md"
                className="bg-white text-[#475467] hover:bg-white hover:text-[#101828]   py-6"
              >
                {" "}
                <BuildingIcon className="h-5 w-5 text-[#475467]" /> &nbsp; Add
                Departments
              </Button>
              <Button
                size="md"
                className="bg-white text-[#475467] hover:bg-white hover:text-[#101828]   py-6"
              >
                {" "}
                <UserIcon /> &nbsp; Add Users
              </Button>
            </div>
          </div>
        </section>

        {/* Company logo */}
        <div className="2xl:mb-[60px] mt-8 mb-10 space-y-8">
          {/* General info section */}
          <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
            <div
              className={cn(
                "flex items-center justify-between bg-[#E5EAF2] px-6 py-[8px] rounded-t-zeak",
                {
                  "rounded-b-zeak": !isGeneralInfoEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies">General</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsGeneralInfoEnabled(!isGeneralInfoEnabled)}
                >
                  {isGeneralInfoEnabled ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronUp className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>

            {isGeneralInfoEnabled && (
              <div className="bg-gray-50 rounded-b-lg p-6">
                <div className="grid md:grid-cols-2 gap-y-6 mt-4">
                  {/* Company Name */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Company Name
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.name}
                    </p>
                  </div>

                  {/* Company Code */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Company Code
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.companyCode}
                    </p>
                  </div>

                  {/* Zeak URL */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Zeak URL
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.domainUrl}
                    </p>
                  </div>

                  {/* Company Website */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Company Website
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.website}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Status
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo.status}
                    </p>
                  </div>

                  <div></div>

                  {/* Effectivity - Start Date */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Effectivity - Start Date
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.effectivityStartDate
                        ? formatDate(
                            companyInfo?.effectivityStartDate,
                            "MM/dd/yyyy"
                          )
                        : ""}
                    </p>
                  </div>

                  {/* Default Language */}
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      End Date
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {companyInfo?.effectivityEndDate
                        ? formatDate(
                            companyInfo?.effectivityEndDate,
                            "MM/dd/yyyy"
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Addresses section */}
          <section className={cn("w-full rounded-zeak", {})}>
            <div
              className={cn(
                "flex items-center justify-between bg-[#DCE4F0] px-6 py-[15px] rounded-zeak mb-1",
                {
                  "rounded-b-zeak": !isAddressInfoEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies">Addresses</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsAddressInfoEnabled(!isAddressInfoEnabled)}
                >
                  {isAddressInfoEnabled ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronUp className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>

            {addressInfoList?.length > 0 && (
              <>
                {addressInfoList.map((address: any, index: any) => (
                  <AddressCard
                    key={index}
                    purpose={address?.purpose}
                    isDefault={address?.isDefault}
                    address={{
                      address1: address?.address1,
                      address2: address?.address2,
                      city: address?.city,
                      state: address?.state,
                      postalCode: address?.postalCode,
                      country: address?.country,
                    }}
                    contacts={address?.contacts}
                    isActive={address?.status}
                    onEdit={() =>
                      console.log("edit action called for Address cards")
                    }
                  />
                ))}
              </>
            )}
          </section>

          {/* Additional info section */}
          <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
            <div
              className={cn(
                "flex items-center justify-between bg-[#E5EAF2] px-6 py-[8px] rounded-t-zeak",
                {
                  "rounded-b-zeak": !isAdditionalInfoEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies">Additional Info</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() =>
                    setIsAdditionalInfoEnabled(!isAdditionalInfoEnabled)
                  }
                >
                  {isAdditionalInfoEnabled ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronUp className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>

            {isAdditionalInfoEnabled && (
              <div className="bg-gray-50 rounded-b-lg p-6">
                <div className="grid md:grid-cols-2 gap-y-6 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Primary Language
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo.language}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Timezone
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo.timezone}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      DUNS Number
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo?.dnbNumber}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      BBB Rating
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo?.bbbNumber}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">
                      Credit Rating
                    </h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo.creditRating}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Fiscal period section */}
          <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
            <div
              className={cn(
                "flex items-center justify-between bg-[#E5EAF2] px-6 py-[8px] rounded-t-zeak",
                {
                  "rounded-b-zeak": !isFiscalPeriodEnabled,
                }
              )}
            >
              <div className="flex items-center gap-2">
                <Label htmlFor="companies">Fiscal Period</Label>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() =>
                    setIsFiscalPeriodEnabled(!isFiscalPeriodEnabled)
                  }
                >
                  {isFiscalPeriodEnabled ? (
                    <ChevronDown className="w-6 h-6" />
                  ) : (
                    <ChevronUp className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>

            {isFiscalPeriodEnabled && (
              <div className="bg-gray-50 rounded-b-lg p-6">
                <div className="grid md:grid-cols-2 gap-y-6 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">From</h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo?.fiscalYearStart
                        ? formatDate(
                            additionalInfo?.fiscalYearStart,
                            "MM/dd/yyyy"
                          )
                        : ""}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#475467]">To</h3>
                    <p className="text-base font-medium text-[#0D0C22]">
                      {additionalInfo?.fiscalYearEnd
                        ? formatDate(
                            additionalInfo?.fiscalYearEnd,
                            "MM/dd/yyyy"
                          )
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
