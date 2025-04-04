import { useState } from "react";
import { Button, Label, cn } from "@zeak/react";
import { formatDate } from "date-fns";
import { ChevronDown, HelpCircle } from "lucide-react";

import Toaster from "~/components/Globals/Toaster";
import { AccordionComponent } from '~/components/Globals/AccordionComponent';

const NULL_VALUE = "--";

export default function Summary({
  companyInfo,
  addressInfoList,
  additionalInfo,
}: {
  companyInfo: any;
  addressInfoList: any;
  additionalInfo: any;
}) {
  const [showNote, setShowNote] = useState(true);
  const [showAllContacts, setShowAllContacts] = useState(false);

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

      <section className={cn("w-full rounded-zeak ", {})}>
        <div
          className={cn(
            "flex items-center justify-between bg-[#66D4CF] mt-8 px-6 py-4 rounded-t-zeak"
          )}
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="companies" className="text-[20px] font-['Suisse Int\'l'] font-[500] leading-[28px] tracking-[0.2px] text-[#0D0C22]">Next Steps</Label>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>

        <div className="bg-[#66D4CF]/30 rounded-[12px] rounded-t-none p-6">
          <div className="flex gap-4 ">
            <p className="w-2/3 text-[14px] font-['Suisse Int\'l'] font-[400] leading-[20px] tracking-[0.2px] text-[#475467]">
              Your team has been successfully created. You can close the
              record or use the next steps shown on right to add users and
              manage your department details.
            </p>
            <Button
              size="md"
              className="bg-white h-[56px] py-[12px] px-[24px] rounded-[12px] flex items-center gap-2 font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#475467] hover:bg-white hover:text-[#475467]"
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 11H17.8C18.9201 11 19.4802 11 19.908 11.218C20.2843 11.4097 20.5903 11.7157 20.782 12.092C21 12.5198 21 13.0799 21 14.2V21M13 21V6.2C13 5.0799 13 4.51984 12.782 4.09202C12.5903 3.71569 12.2843 3.40973 11.908 3.21799C11.4802 3 10.9201 3 9.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.0799 3 6.2V21M22 21H2M6.5 7H9.5M6.5 11H9.5M6.5 15H9.5" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {" "}
              Add Departments
            </Button>
            <Button
              size="md"
              className="bg-white h-[56px] py-[12px] px-[24px] rounded-[12px] flex items-center gap-2 font-['Suisse Int\'l'] text-[16px] font-[450] leading-[24px] tracking-[0.2px] text-[#475467] hover:bg-white hover:text-[#475467]"
            >
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {" "}
              Add Users
            </Button>
          </div>
        </div>
      </section>

      {/* Company logo */}
      <div className="mt-8 space-y-8">
        <AccordionComponent
          title="General"
          defaultExpanded={true}
        // onEdit={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   onEditAddress(index);
        //   setAddAddressFormVisible(true);
        // }}
        // onDelete={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Delete clicked');
        // }}
        // onAttach={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Attach clicked');
        // }}
        // onDotsClick={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Dots clicked');
        // }}
        >
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Company Name
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{companyInfo?.name ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Company Code
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{companyInfo?.companyCode ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Zeak URL
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{companyInfo?.domainUrl ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Company Website
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{companyInfo?.website ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Status
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{companyInfo.status ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Effectivity - Start Date
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p> {companyInfo?.effectivityStartDate
                  ? formatDate(
                    companyInfo?.effectivityStartDate,
                    "MM/dd/yyyy"
                  )
                  : NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                End Date
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p> {companyInfo?.effectivityEndDate
                  ? formatDate(
                    companyInfo?.effectivityEndDate,
                    "MM/dd/yyyy"
                  )
                  : NULL_VALUE}</p>
              </div>
            </div>
          </div>
        </AccordionComponent>


        {addressInfoList?.length > 0 && addressInfoList.map((address: any, index: any) => (
          <AccordionComponent
            key={index}
            title={address?.addressName}
            isDefault={address?.isDefault}
            isActive={address?.isActive}
            defaultExpanded={false}
            onEdit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // onEditAddress(index);
              // setAddAddressFormVisible(true);
            }}
            onDelete={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Delete clicked');
            }}
            onAttach={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Attach clicked');
            }}
          >
            <div className='flex items-center justify-between'>
              <div className="flex items-start gap-16">
                {address?.address1 && <div className="flex flex-col gap-4">
                  <span className="font-['Suisse Int\'l'] text-[16px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467] uppercase">
                    ADDRESS
                  </span>
                  <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                    {address.address1 && <p>{address.address1 + ", "}</p>}
                    {address.address2 && <p>{address.address2 + ", "}</p>}
                    <p>{address.city} {address.state ? ", " + address.state : ""}{" "}
                      {address.postalCode ? ", " + address.postalCode : ""}</p>
                  </div>
                </div>}
                {address?.contacts?.length > 0 && <div className="flex flex-col gap-4">
                  <span className="font-['Suisse Int\'l'] text-[16px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467] uppercase">
                    CONTACT
                  </span>
                  <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22]">
                    <p>{address?.contacts?.[0]?.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M17.9166 14.9987L12.381 9.9987M7.61905 9.9987L2.08336 14.9987M1.66667 5.83203L8.47077 10.5949C9.02174 10.9806 9.29723 11.1734 9.59689 11.2481C9.86158 11.3141 10.1384 11.3141 10.4031 11.2481C10.7028 11.1734 10.9783 10.9806 11.5292 10.5949L18.3333 5.83203M5.66667 16.6654H14.3333C15.7335 16.6654 16.4335 16.6654 16.9683 16.3929C17.4387 16.1532 17.8212 15.7707 18.0609 15.3003C18.3333 14.7656 18.3333 14.0655 18.3333 12.6654V7.33203C18.3333 5.9319 18.3333 5.23183 18.0609 4.69705C17.8212 4.22665 17.4387 3.8442 16.9683 3.60451C16.4335 3.33203 15.7335 3.33203 14.3333 3.33203H5.66667C4.26654 3.33203 3.56647 3.33203 3.03169 3.60451C2.56129 3.8442 2.17884 4.22665 1.93915 4.69705C1.66667 5.23183 1.66667 5.9319 1.66667 7.33203V12.6654C1.66667 14.0655 1.66667 14.7656 1.93915 15.3003C2.17884 15.7707 2.56129 16.1532 3.03169 16.3929C3.56647 16.6654 4.26654 16.6654 5.66667 16.6654Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <a
                          href={`mailto:${address?.contacts?.[0]?.email}`}
                          className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]"
                        >
                          {address?.contacts?.[0]?.email}
                        </a>
                      </div>
                      <span className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]">|</span>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M6.98356 7.37779C7.56356 8.58581 8.35422 9.71801 9.35553 10.7193C10.3568 11.7206 11.4891 12.5113 12.6971 13.0913C12.801 13.1412 12.8529 13.1661 12.9187 13.1853C13.1523 13.2534 13.4392 13.2045 13.637 13.0628C13.6927 13.0229 13.7403 12.9753 13.8356 12.88C14.1269 12.5887 14.2726 12.443 14.4191 12.3478C14.9715 11.9886 15.6837 11.9886 16.2361 12.3478C16.3825 12.443 16.5282 12.5887 16.8196 12.88L16.9819 13.0424C17.4248 13.4853 17.6462 13.7067 17.7665 13.9446C18.0058 14.4175 18.0058 14.9761 17.7665 15.449C17.6462 15.6869 17.4248 15.9083 16.9819 16.3512L16.8506 16.4825C16.4092 16.9239 16.1886 17.1446 15.8885 17.3131C15.5556 17.5001 15.0385 17.6346 14.6567 17.6334C14.3126 17.6324 14.0774 17.5657 13.607 17.4322C11.0792 16.7147 8.69387 15.361 6.70388 13.371C4.7139 11.381 3.36017 8.99569 2.6427 6.46786C2.50919 5.99749 2.44244 5.7623 2.44141 5.41818C2.44028 5.03633 2.57475 4.51925 2.76176 4.18633C2.9303 3.88631 3.15098 3.66563 3.59233 3.22428L3.72369 3.09292C4.16656 2.65005 4.388 2.42861 4.62581 2.30833C5.09878 2.0691 5.65734 2.0691 6.1303 2.30832C6.36812 2.42861 6.58955 2.65005 7.03242 3.09291L7.19481 3.25531C7.48615 3.54665 7.63182 3.69231 7.72706 3.8388C8.08622 4.3912 8.08622 5.10336 7.72706 5.65576C7.63182 5.80225 7.48615 5.94791 7.19481 6.23925C7.09955 6.33451 7.05192 6.38214 7.01206 6.43782C6.87038 6.63568 6.82146 6.92256 6.88957 7.15619C6.90873 7.22193 6.93367 7.27389 6.98356 7.37779Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <a
                          href={`tel:${address?.contacts?.[0]?.phone}`}
                          className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]"
                        >
                          {address?.contacts?.[0]?.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                  {
                    address?.contacts?.length > 1 && showAllContacts && address?.contacts?.filter((_contact: any, index: any) => index !== 0).map((contact: any, index: any) => (
                      <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22]" key={index}>
                        <p>{contact?.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M17.9166 14.9987L12.381 9.9987M7.61905 9.9987L2.08336 14.9987M1.66667 5.83203L8.47077 10.5949C9.02174 10.9806 9.29723 11.1734 9.59689 11.2481C9.86158 11.3141 10.1384 11.3141 10.4031 11.2481C10.7028 11.1734 10.9783 10.9806 11.5292 10.5949L18.3333 5.83203M5.66667 16.6654H14.3333C15.7335 16.6654 16.4335 16.6654 16.9683 16.3929C17.4387 16.1532 17.8212 15.7707 18.0609 15.3003C18.3333 14.7656 18.3333 14.0655 18.3333 12.6654V7.33203C18.3333 5.9319 18.3333 5.23183 18.0609 4.69705C17.8212 4.22665 17.4387 3.8442 16.9683 3.60451C16.4335 3.33203 15.7335 3.33203 14.3333 3.33203H5.66667C4.26654 3.33203 3.56647 3.33203 3.03169 3.60451C2.56129 3.8442 2.17884 4.22665 1.93915 4.69705C1.66667 5.23183 1.66667 5.9319 1.66667 7.33203V12.6654C1.66667 14.0655 1.66667 14.7656 1.93915 15.3003C2.17884 15.7707 2.56129 16.1532 3.03169 16.3929C3.56647 16.6654 4.26654 16.6654 5.66667 16.6654Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <a
                              href={`mailto:${contact?.email}`}
                              className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]"
                            >
                              {contact?.email}
                            </a>
                          </div>
                          <span className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]">|</span>
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M6.98356 7.37779C7.56356 8.58581 8.35422 9.71801 9.35553 10.7193C10.3568 11.7206 11.4891 12.5113 12.6971 13.0913C12.801 13.1412 12.8529 13.1661 12.9187 13.1853C13.1523 13.2534 13.4392 13.2045 13.637 13.0628C13.6927 13.0229 13.7403 12.9753 13.8356 12.88C14.1269 12.5887 14.2726 12.443 14.4191 12.3478C14.9715 11.9886 15.6837 11.9886 16.2361 12.3478C16.3825 12.443 16.5282 12.5887 16.8196 12.88L16.9819 13.0424C17.4248 13.4853 17.6462 13.7067 17.7665 13.9446C18.0058 14.4175 18.0058 14.9761 17.7665 15.449C17.6462 15.6869 17.4248 15.9083 16.9819 16.3512L16.8506 16.4825C16.4092 16.9239 16.1886 17.1446 15.8885 17.3131C15.5556 17.5001 15.0385 17.6346 14.6567 17.6334C14.3126 17.6324 14.0774 17.5657 13.607 17.4322C11.0792 16.7147 8.69387 15.361 6.70388 13.371C4.7139 11.381 3.36017 8.99569 2.6427 6.46786C2.50919 5.99749 2.44244 5.7623 2.44141 5.41818C2.44028 5.03633 2.57475 4.51925 2.76176 4.18633C2.9303 3.88631 3.15098 3.66563 3.59233 3.22428L3.72369 3.09292C4.16656 2.65005 4.388 2.42861 4.62581 2.30833C5.09878 2.0691 5.65734 2.0691 6.1303 2.30832C6.36812 2.42861 6.58955 2.65005 7.03242 3.09291L7.19481 3.25531C7.48615 3.54665 7.63182 3.69231 7.72706 3.8388C8.08622 4.3912 8.08622 5.10336 7.72706 5.65576C7.63182 5.80225 7.48615 5.94791 7.19481 6.23925C7.09955 6.33451 7.05192 6.38214 7.01206 6.43782C6.87038 6.63568 6.82146 6.92256 6.88957 7.15619C6.90873 7.22193 6.93367 7.27389 6.98356 7.37779Z" stroke="#475467" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <a
                              href={`tel:${contact?.phone}`}
                              className="font-['Suisse Int\'l'] text-[14px] font-[450] leading-[20px] tracking-[0.2px] text-[#475467]"
                            >
                              {contact?.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>}
              </div>
              {address?.contacts?.length > 1 && <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowAllContacts(!showAllContacts);
                }}
                className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-normal tracking-[0.2px] text-[#007AFF] uppercase hover:underline flex self-end"
              >
                <span>{showAllContacts ? "LESS" : "MORE"}</span>
                <ChevronDown className={cn("w-5 h-5", { "rotate-180": showAllContacts })} />
              </button>}
            </div>
          </AccordionComponent>
        ))}

        <AccordionComponent
          title="Additional Info"
          defaultExpanded={true}
        // onEdit={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   onEditAddress(index);
        //   setAddAddressFormVisible(true);
        // }}
        // onDelete={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Delete clicked');
        // }}
        // onAttach={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Attach clicked');
        // }}
        // onDotsClick={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Dots clicked');
        // }}
        >
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Primary Language
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo?.language ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Timezone
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo?.timezone ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                DUNS Number
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo?.dnbNumber ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                BBB Rating
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo?.bbbNumber ?? NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                Credit Rating
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo.creditRating ?? NULL_VALUE}</p>
              </div>
            </div>
          </div>
        </AccordionComponent>


        <AccordionComponent
          title="Fiscal Period"
          defaultExpanded={true}
        // onEdit={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   onEditAddress(index);
        //   setAddAddressFormVisible(true);
        // }}
        // onDelete={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Delete clicked');
        // }}
        // onAttach={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Attach clicked');
        // }}
        // onDotsClick={(e) => {
        //   e.preventDefault();
        //   e.stopPropagation();
        //   console.log('Dots clicked');
        // }}
        >
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                From
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p>{additionalInfo?.fiscalYearStart
                  ? formatDate(
                    additionalInfo?.fiscalYearStart,
                    "MM/dd/yyyy"
                  )
                  : NULL_VALUE}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-['Suisse Int\'l'] text-[14px] font-[600] leading-[20px] tracking-[0.2px] text-[#475467]">
                To
              </span>
              <div className="font-['Suisse Int\'l'] text-[16px] font-[500] leading-[24px] tracking-[0.2px] text-[#0D0C22] mt-1">
                <p> {additionalInfo?.fiscalYearEnd
                  ? formatDate(
                    additionalInfo?.fiscalYearEnd,
                    "MM/dd/yyyy"
                  )
                  : NULL_VALUE}</p>
              </div>
            </div>
          </div>
        </AccordionComponent>
      </div>
    </div>
  );
}
