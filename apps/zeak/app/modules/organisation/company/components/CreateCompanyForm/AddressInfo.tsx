import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
} from "@zeak/react";

import {
  CheckCircle2Icon,
  CircleIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import { Info } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { XCloseIcon } from "@zeak/icons";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClearableInput } from "~/components/Form";
import { addressInfoValidator } from "../../utils/company.validators";
import AddressCard from "./AddressCard";
import CollapsiblePanel from "./CollapsiblePanel";
import { StepHeader } from "./StepHeader";

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

  useEffect(() => {
    if (addressInfo?.contacts?.length > 0) {
      setContacts(addressInfo?.contacts);
    }
  }, [addressInfo?.contacts]);

  const handleContactChange = (
    index: number,
    field: keyof (typeof contacts)[number],
    value: string
  ) => {
    const newContacts = [...contacts];
    const currentContact: { name: string; email: string; phone: string } =
      Object.assign({}, newContacts[index]);
    currentContact[field] = value;
    const updatedContacts = newContacts.map((item, index) =>
      index === index ? currentContact : item
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

  return (
    <div className=" bg-white rounded-md ">
      <StepHeader title="New Address" />

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

        <div className="mt-8 mb-8 space-y-8">
          <section
            className={cn("w-full rounded-zeak flex flex-col gap-8", {})}
          >
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
                isActive={address?.isActive}
                onEdit={() => {
                  console.log("edit action called for Address cards");
                  onEditAddress(index);
                  setAddAddressFormVisible(true);
                }}
              />
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="priority">
                          Status<span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            className={cn(
                              addressInfo?.isActive === true
                                ? "bg-yellow-300 text-[#101828] hover:bg-yellow-300 hover:text-[#101828]"
                                : "bg-white text-secondary hover:bg-white hover:text-secondary"
                            )}
                            onClick={() =>
                              setAddressInfo({
                                ...addressInfo,
                                isActive: true,
                              })
                            }
                          >
                            Active
                          </Button>
                          <Button
                            type="button"
                            className={cn(
                              addressInfo?.isActive === false
                                ? "bg-yellow-300 text-[#101828] hover:bg-yellow-300 hover:text-[#101828]"
                                : "bg-white text-secondary hover:bg-white hover:text-secondary"
                            )}
                            onClick={() =>
                              setAddressInfo({
                                ...addressInfo,
                                isActive: false,
                              })
                            }
                          >
                            Inactive
                          </Button>
                          <Button
                            type="button"
                            className={cn(
                              // addressInfo?.status === "blocked"
                              // ? "bg-yellow-300 text-[#101828] hover:bg-yellow-300 hover:text-[#101828]"
                              // :
                              "bg-white text-secondary hover:bg-white hover:text-secondary"
                            )}
                            onClick={() =>
                              setAddressInfo({
                                ...addressInfo,
                                status: "blocked",
                              })
                            }
                          >
                            Blocked
                          </Button>
                          <Button
                            type="button"
                            className={cn(
                              // addressInfo?.status === "pending"
                              //   ? "bg-yellow-300 text-[#101828] hover:bg-yellow-300 hover:text-[#101828]"
                              // :
                              "bg-white text-secondary hover:bg-white hover:text-secondary"
                            )}
                            onClick={() =>
                              setAddressInfo({
                                ...addressInfo,
                                status: "pending",
                              })
                            }
                          >
                            Pending
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="addressName">
                          Address Name
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>

                        <ClearableInput
                          name="addressName"
                          placeholder="Enter Address Name"
                          className="bg-white border-none"
                          value={addressInfo?.addressName}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              addressName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-row items-center gap-2 cursor-pointer mt-[26px] select-none text-sm font-normal font-sans">
                        {addressInfo?.isDefault ? (
                          <CheckCircle2Icon className="w-4 h-4 bg-black text-white rounded-full" />
                        ) : (
                          <CircleIcon className="w-4 h-4 rounded-full" />
                        )}
                        <Tooltip>
                          <span
                            className="flex items-center gap-2"
                            onClick={() =>
                              setAddressInfo({
                                ...addressInfo,
                                isDefault: !addressInfo?.isDefault,
                              })
                            }
                          >
                            Set as the Primary Address for the Company
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="purpose">
                          Purpose
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <ClearableInput
                          name="purpose"
                          placeholder="Enter Purpose"
                          className="bg-white border-none"
                          value={addressInfo?.purpose}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              purpose: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="address1">
                          Address Line 1
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>

                        <ClearableInput
                          name="address1"
                          placeholder="Enter Address 1"
                          className="bg-white border-none"
                          value={addressInfo?.address1}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              address1: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="address2">Address Line 2</Label>
                        <ClearableInput
                          name="address2"
                          placeholder="Enter Address 2"
                          className="bg-white border-none"
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
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="city">
                          City<span className="text-red-500 ml-0.5">*</span>
                        </Label>

                        <ClearableInput
                          name="city"
                          placeholder="Enter City"
                          className="bg-white border-none"
                          value={addressInfo?.city}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="state">
                          State/Province
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <Select
                          name="state"
                          value={addressInfo?.state}
                          onValueChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              state: e,
                            })
                          }
                        >
                          <SelectTrigger className="border-none bg-white">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent></SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 py-4 px-4">
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="postalCode">
                          Zip/Postal Code
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <ClearableInput
                          name="postalCode"
                          placeholder="Enter Zip/Postal Code"
                          className="bg-white border-none"
                          value={addressInfo?.postalCode}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <Label htmlFor="country">
                          Country
                          <span className="text-red-500 ml-0.5">*</span>
                        </Label>
                        <Select
                          name="country"
                          value={addressInfo?.country}
                          onValueChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              country: e,
                            })
                          }
                        >
                          <SelectTrigger className="border-none bg-white">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent></SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                </CollapsiblePanel>
              </section>

              <section
                className={cn("w-full bg-[#F7F7F8] rounded-zeak mb-8 mt-8", {})}
              >
                <CollapsiblePanel label="Contact" showEnabled>
                  <>
                    {contacts?.map((contact, index) => {
                      return (
                        <div className="flex items-center justify-evenly">
                          <p className="mt-4"> {index + 1}</p>
                          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_40px] gap-6 py-4 px-4">
                            <div className="flex flex-col gap-3 flex-1">
                              <Label htmlFor="name">Name</Label>

                              <Input
                                name="name"
                                placeholder="John Doe"
                                className="bg-white border-none"
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
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                name="email"
                                placeholder="example@johndoe.com"
                                className="bg-white border-none"
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
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                name="phone"
                                placeholder="123-456-7890"
                                className="bg-white border-none"
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
                      className="text-blue-500 text-l px-4"
                      onClick={() => {
                        setContacts([
                          ...contacts,
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
              className="w-[200px] bg-[#D3DFE8] text-[#101828] hover:bg-[#D3DFE8] hover:text-[#101828] py-6"
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
            className="w-[200px] bg-[#D3DFE8] text-[#101828] hover:bg-[#D3DFE8] hover:text-[#101828] py-6"
            disabled={addAddressFormVisible}
            onClick={() => setAddAddressFormVisible(true)}
          >
            <PlusIcon className="pr-3" />
            Add New Address
          </Button>
        </div>
      </div>
    </div>
  );
}
