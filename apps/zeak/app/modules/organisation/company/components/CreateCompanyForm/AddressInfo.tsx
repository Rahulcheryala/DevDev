import {
  Button,
  InputComponent,
  Label,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
  BadgeComponent
} from "@zeak/react";

import {
  CheckCircle2Icon,
  ChevronDown,
  CircleIcon,
  PlusIcon,
  TrashIcon,
  Info, HelpCircle
} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addressInfoValidator } from "../../utils/company.validators";

import CollapsiblePanel from "./CollapsiblePanel";
import DropdownSelect from "~/components/Globals/Dropdown/DropdownSelect";
import Toaster from "~/components/Globals/Toaster";
import { AccordionComponent } from '~/components/Globals/AccordionComponent';
import { useLocations } from "~/hooks/useLocations";

type BadgeItem = {
  label: string;
  value: string;
  selected: boolean;
};

const DEFAULT_STATUS_OPTIONS = [
  { label: "Active", value: "active", selected: true },
  { label: "Inactive", value: "inactive", selected: false },
  { label: "Blocked", value: "blocked", selected: false },
  { label: "Pending", value: "pending", selected: false }
];

export default function AddressInfoForm({
  addressInfo,
  setAddressInfo,
  addressInfoList,
  addressInfoIndex,
  setAddressInfoIndex,
  setDisabled,
  onEditAddress,
}: {
  addressInfo: any;
  setAddressInfo: any;
  addressInfoList: any;
  addressInfoIndex: any;
  setAddressInfoIndex: any;
  setDisabled: any;
  onEditAddress: (index: number) => void;
}) {
  const [addAddressFormVisible, setAddAddressFormVisible] = useState(true);
  const [contacts, setContacts] = useState<
    {
      name: string;
      email: string;
      phone: string;
    }[]
  >([{ name: "", email: "", phone: "" }]);
  const [showAllContacts, setShowAllContacts] = useState(false);
  const [showNote, setShowNote] = useState(true);
  const [statusOptions, setStatusOptions] = useState<BadgeItem[]>(DEFAULT_STATUS_OPTIONS);

  useEffect(() => {
    if (addressInfo?.contacts?.length > 0) {
      setContacts(addressInfo?.contacts);
    }

    if (addressInfo?.status) {
      setStatusOptions(prevStatusOptions => prevStatusOptions.map((item) => ({
        ...item,
        selected: item.value === addressInfo?.status
      })));
    }
  }, [addressInfo?.contacts, addressInfo?.status]);

  const handleContactChange = (
    index: number,
    field: keyof (typeof contacts)[number],
    value: string
  ) => {
    const newContacts = [...contacts];
    const currentContact: { name: string; email: string; phone: string } =
      Object.assign({}, newContacts[index]);
    currentContact[field] = value;
    const updatedContacts = newContacts.map((item, currIndex) =>
      currIndex === index ? currentContact : item
    );
    setAddressInfo({
      ...addressInfo,
      contacts: updatedContacts,
    });
  };

  const {
    formState: { isDirty, isValid },
  } = useForm({
    resolver: zodResolver(addressInfoValidator),
    mode: "onChange",
  });

  useEffect(() => {
    setDisabled(!isDirty || !isValid);
  }, [isDirty, isValid]);

  const handleSubmit = async (data: any) => {
    console.log("submitted :: ", data);
  };

  const { countries, states, isLoading } = useLocations(addressInfo?.country);

  return (
    <div>
      {showNote && (
        <Toaster
          variant="warning"
          icon={<HelpCircle className="h-6 w-6 text-[#F18F01]" />}
          title="NOTE"
          content="Company addresses can serve various purposes, including the primary legal address of the company (often referred to as the registered or headquarters address), addresses for legal registrations, and addresses for official communications. These addresses are typically used in legal documents, tax filings, and official correspondence."
          onClose={() => setShowNote(false)}
          className="p-[24px] rounded-[12px] bg-[linear-gradient(0deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.70) 100%), var(--macOS-system-colors-Default-Yellow-Default-Light, #FC0)]"
        />
      )}

      <div className="my-8 space-y-8">
        <section
          className={cn("w-full rounded-zeak", {})}
        >
          {addressInfoList.map((address: any, index: any) => (
            <AccordionComponent
              key={index}
              title={address?.addressName}
              isDefault={address?.isDefault}
              isActive={address?.isActive}
              defaultExpanded={false}
              onEdit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditAddress(index);
                setAddAddressFormVisible(true);
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
        </section>
      </div>

      {addAddressFormVisible && (
        <>
          <ValidatedForm
            validator={addressInfoValidator}
            defaultValues={{
              isActive: addressInfo?.isActive,
              addressName: addressInfo?.addressName,
              isDefault: addressInfo?.isDefault,
              purpose: addressInfo?.purpose,
              address1: addressInfo?.address1,
              address2: addressInfo?.address2,
              city: addressInfo?.city,
              state: addressInfo?.state,
              postalCode: addressInfo?.postalCode,
              country: addressInfo?.country,
              contacts: contacts,
            }}
            onSubmit={handleSubmit}
            method="post"
          >
            <section className={cn("w-full bg-[#F7F7F8] rounded-zeak ", {})}>
              {/* Header */}
              <CollapsiblePanel label="Address" showEnabled>
                <>
                  <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="priority" className="text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]">
                        Status<span className="text-red-500 ml-0.5">*</span>
                      </Label>
                      <BadgeComponent
                        items={statusOptions}
                        onSelect={(value: string) => {
                          setStatusOptions(prevStatusOptions => prevStatusOptions.map((item) => ({
                            ...item,
                            selected: item.value === value
                          })));
                          setAddressInfo({
                            ...addressInfo,
                            isActive: value === "active",
                            status: value,
                          })
                        }
                        }
                      />
                    </div>

                    <div className="flex flex-row items-center justify-end gap-3 cursor-pointer mt-[26px] select-none text-sm font-normal font-['Suisse Int\'l']">
                      {addressInfo?.isDefault ? (
                        <CheckCircle2Icon className="w-5 h-5 bg-black text-white rounded-full" />
                      ) : (
                        <CircleIcon className="w-5 h-5 rounded-full" />
                      )}
                      <Tooltip>
                        <span
                          className="flex items-center gap-2 text-[#475467] text-sm font-semibold leading-5 tracking-[0.2px]"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAddressInfo({
                              ...addressInfo,
                              isDefault: !addressInfo?.isDefault,
                            });
                          }}
                        >
                          Set as default
                          <TooltipTrigger>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                        </span>
                        <TooltipContent
                          side="top"
                          className="bg-accent-dark px-4 py-3 rounded-xl text-white w-[350px]"
                        >
                          One of the company's addresses must be designated as
                          the 'Primary' address. If no other address is
                          defined or specified, the Primary address will serve
                          as the default contact address for the company. You
                          can update the Primary address to a different one at
                          any time.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="addressName"
                        label="Address Name"
                        placeholder="Enter Address Name"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.addressName}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            addressName: e.target.value,
                          })
                        }
                        isRequired
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="purpose"
                        label="Purpose"
                        placeholder="Enter Purpose"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.purpose}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            purpose: e.target.value,
                          })
                        }
                        isRequired
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="address1"
                        label="Address Line 1"
                        placeholder="Enter Address 1"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.address1}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            address1: e.target.value,
                          })
                        }
                        isRequired
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="address2"
                        label="Address Line 2"
                        placeholder="Enter Address 2"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.address2}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            address2: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="city"
                        label="City"
                        placeholder="Enter City"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.city}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            city: e.target.value,
                          })
                        }
                        isRequired
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <DropdownSelect
                        name="country"
                        label="Country"
                        items={countries}
                        value={addressInfo?.country}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            country: e,
                          })
                        }
                        isRequired
                        placeholder="Select Country"
                        className="w-full"
                        inputClasses="bg-[#ffffff] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12 py-4 px-4">
                    <div className="flex flex-col gap-3">
                      <InputComponent
                        name="postalCode"
                        label="Zip/Postal Code"
                        placeholder="Enter Zip/Postal Code"
                        inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        value={addressInfo?.postalCode}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            postalCode: e.target.value,
                          })
                        }
                        isRequired
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <DropdownSelect
                          name="state"
                          label="State/Province"
                          items={states}
                          value={addressInfo?.state}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              state: e,
                            })
                          }
                          isRequired
                          placeholder="Select State/Province"
                          className="w-full"
                          inputClasses="bg-[#ffffff] border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                        />
                        {isLoading && (
                          <div className="animate-spin mt-8">
                            <svg
                              className="w-4 h-4 text-[#007AFF]"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </>
              </CollapsiblePanel>
            </section>

            <section
              className={cn("w-full bg-[#F7F7F8] rounded-zeak my-8", {})}
            >
              <CollapsiblePanel label="Contact" showEnabled>
                <>
                  {contacts?.map((contact, index) => {
                    return (
                      <div className="flex items-center" key={index}>
                        <p className="mt-[30px]"> {index + 1}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_40px] gap-6 py-4 px-4">
                          <div className="flex flex-col gap-3 flex-1">
                            <InputComponent
                              name="name"
                              label="Name"
                              placeholder="John Doe"
                              inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                              value={contact?.name}
                              onChange={(e) =>
                                handleContactChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <InputComponent
                              name="email"
                              label="Email Address"
                              placeholder="example@johndoe.com"
                              inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                              value={contact?.email}
                              onChange={(e) =>
                                handleContactChange(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <InputComponent
                              name="phone"
                              label="Phone"
                              placeholder="123-456-7890"
                              inputClasses="border-none text-[#0D0C22] text-md font-['Suisse Int\'l'] font-[450]"
                              value={contact?.phone}
                              onChange={(e) =>
                                handleContactChange(
                                  index,
                                  "phone",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex items-center w-6">
                            <Button
                              variant="ghost"
                              className="px-0 w-6 h-6 mt-[26px]"
                              onClick={() => {
                                const newContacts = [...contacts];
                                newContacts.splice(index, 1);
                                setContacts(newContacts);
                              }}
                            >
                              <TrashIcon
                                size="20px"
                                strokeWidth="2"
                                color="#8A8A8F"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    className="text-[#007AF5] px-6 text-md font-['Suisse Int\'l'] font-[450]"
                    onClick={() => {
                      setContacts((prevContacts) => [
                        ...prevContacts,
                        { name: "", email: "", phone: "" },
                      ]);
                    }}
                  >
                    + New contact
                  </button>
                </>
              </CollapsiblePanel>
            </section>
          </ValidatedForm>
        </>
      )}

      <div className="flex items-center gap-8 mt-8">
        {addAddressFormVisible && (
          <Button
            size="md"
            className="w-[160px] h-[56px] bg-[#D3DFE8] text-[#101828] py-[16px] px-[32px] rounded-[8px] font-['Suisse Int\'l'] font-[450] text-base leading-6 tracking-[0.2px] hover:bg-[#D3DFE8] hover:text-[#101828]"
            onClick={() => {
              setAddressInfoIndex(addressInfoIndex + 1);
              setAddAddressFormVisible(false);
              setContacts([{ name: "", email: "", phone: "" }]);
            }}
          >
            Save
          </Button>
        )}

        <Button
          size="md"
          className="h-[56px] bg-[#D3DFE8] text-[#101828] py-[16px] px-[32px] rounded-[8px] font-['Suisse Int\'l'] font-[450] text-base leading-6 tracking-[0.2px] hover:bg-[#D3DFE8] hover:text-[#101828] disabled:opacity-[0.3] disabled:cursor-not-allowed"
          disabled={addAddressFormVisible}
          onClick={() => setAddAddressFormVisible(true)}
        >
          <PlusIcon className="w-6 h-6 mr-2" />
          Add New Address
        </Button>
      </div>

    </div>
  );
}
