import {
  Button,
  Input,
  IconButton,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Checkbox,
} from "@zeak/react";
import * as Accordion from "@radix-ui/react-accordion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { GoCheckCircleFill } from "react-icons/go";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  IoCheckmark,
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoClose,
} from "react-icons/io5";
import {
  BlueYellowBadge,
  LightGradientBadge,
} from "~/modules/pricing/ui/badge";
import {
  BuyAdditionsCredits,
  CardHeadersWithImage,
  CoreFeaturesCard,
} from "~/modules/pricing/ui/cards";

export default function CreateBundle() {
  return <CreateBundleContent />;
}
const CreateBundleContent = () => {
  const coreFeaturePoints = [
    { id: 1, title: "200+ integrations", available: true },
    { id: 2, title: "200+ integrations", available: true },
    { id: 3, title: "Advanced reporting and analytics", available: true },
    { id: 4, title: "Advanced reporting and analytics", available: true },
    { id: 5, title: "Up to 20 individual users", available: true },
    { id: 6, title: "Up to 20 individual users", available: true },
  ];
  const [priceFrequency, setPriceFrequency] = useState("yearly");
  const [planSeats, setPlanSeats] = useState(13);
  const [labelsFormsTier, setLabelsFormsTier] = useState("enterprise");
  const [automationTier, setAutomationTier] = useState("none");
  const [labelsSeeMore, setLabelsSeeMore] = useState(true);
  const [automationsSeeMore, setAutomationsSeeMore] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [labelsActiveIndex, setLabelsActiveIndex] = useState(0);

  const handleAccordionClick = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const handleLabelsAccordionClick = (index: any) => {
    setLabelsActiveIndex(index === activeIndex ? null : index);
  };
  const automationAddOnsList = [
    {
      id: 1,
      title: "Text Notifications (1000 Messages/Month)",
      price: "",
    },
    {
      id: 2,
      title: "Storage - 100 Gb ",
      price: "$10/month",
    },
    {
      id: 3,
      title: "Storage - 100 Gb ",
      price: "$10/month",
    },
  ];

  const labelsAddOnsList = [
    {
      id: 1,
      title: "Text Notifications (1000 Messages/Month)",
      price: "",
    },
    {
      id: 2,
      title: "Storage - 100 Gb ",
      price: "$10/month",
    },
    {
      id: 3,
      title: "Storage - 100 Gb ",
      price: "$10/month",
    },
  ];
  return (
    <>
      <div>
        <div className="w-[calc(100%_-_500px)] mb-8">
          <h3 className="text-3xl font-semibold">Create a Bundle</h3>
          <p className="text-textLink">
            We believe Project-X should be accessible to all companies, no
            matter the size. Pick your plan today to get started!
          </p>
        </div>
      </div>
      <div className="flex -mx-[30px]">
        <div className="px-[30px] w-[calc(100%_-_500px)]">
          <div>
            <h3 className="text-2xl font-medium mb-8">
              Select your Products and Add-ons
            </h3>
            <CoreFeaturesCard
              badge={
                <span className="text-sm py-1 pl-3 pr-[56px] bg-accent-yellow rounded-sm rounded-br-none absolute top-4 -right-3 before:content-[''] before:absolute before:border-l-transparent before:border-r-transparent before:border-b-transparent before:border-t-[7px] before:border-l-[0px] before:border-r-[12px] before:border-b-0 before:border-t-[rgba(#000000, 0.4)] before:right-0 before:-bottom-[7px]">
                  Included with every subscription
                </span>
              }
              title="Core Features"
              subTitle="We believe Project-X should be accessible to all companies, no matter
          the size. Pick your plan today to get started!"
              pointsList={coreFeaturePoints}
              isActive={false}
            />
            <div className="p-8 border shadow-sm border-stroke rounded-sm mb-8 relative">
              <span className="text-sm py-1 pl-3 pr-[56px] bg-accent-primary text-white rounded-sm rounded-br-none absolute top-4 -right-3 before:content-[''] before:absolute before:border-l-transparent before:border-r-transparent before:border-b-transparent before:border-t-[7px] before:border-l-[0px] before:border-r-[12px] before:border-b-0 before:border-t-[hsla(205, 100%, 53%, 1)] before:right-0 before:-bottom-[7px]">
                New Features added
              </span>
              <CardHeadersWithImage
                src="/images/pricing/automation.jpg"
                title="Automation"
                badge={<LightGradientBadge label="AI" className="ml-3" />}
                subTitle="We believe Project-X should be accessible to all companies, no matter the size. Pick your plan today to get started!"
              />
              <div className="py-4 px-6 border shadow-sm border-stroke rounded-sm  mb-10">
                <p className="py-0 px-3 border-l-[3px] border-accent-red text-sm text-tertiary">
                  You've already availed the free trial from 05/08/2024 to
                  18/08/2024.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-x-5">
                <div className="relative">
                  <input
                    type="radio"
                    id="automationTier1"
                    name="automationTier"
                    className="peer hidden"
                    checked={automationTier === "none"}
                    onChange={() => setAutomationTier("none")}
                  />
                  <label
                    htmlFor="automationTier1"
                    className=" border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    <span className="text-base ">No, Thank you</span>
                    {automationTier === "none" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute top-0 -translate-y-[100%] left-0 text-accent-red font-semibold">
                    Free Trial Availed
                  </span>
                  <input
                    type="radio"
                    id="automationTier2"
                    name="automationTier"
                    className="peer hidden"
                    disabled={true}
                    checked={automationTier === "free"}
                    onChange={() => setAutomationTier("free")}
                  />
                  <label
                    htmlFor="automationTier2"
                    className=" bg-table border-tertiary border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    {/* 'bg-table border-tertiary" for disabled state */}
                    <span className="text-base">
                      <span className="font-semibold">Free Trial</span>
                      <br />
                      14 days
                    </span>
                    {automationTier === "free" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="automationTier3"
                    name="automationTier"
                    className="peer hidden"
                    checked={automationTier === "enterprise"}
                    onChange={() => setAutomationTier("enterprise")}
                  />
                  <label
                    htmlFor="automationTier3"
                    className="border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    <span className="text-base ">
                      <span className="font-semibold">Enterprise</span>
                      <br />
                      $5/Month
                    </span>
                    {automationTier === "enterprise" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-base">Add-ons for automation</h3>
                <div className="p-4 border shadow-sm border-stroke rounded-sm mt-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-semibold mb-1">Listeners</h4>
                      <p className="text-secondary">$10/Per Listener monthly</p>
                    </div>
                    <div className="flex items-center relative max-w-[120px]">
                      <IconButton
                        variant="ghost"
                        aria-label="Clear"
                        icon={<FaMinus className="text-secondary" />}
                        size="md"
                        className="absolute left-1"
                        disabled={planSeats === 0}
                        onClick={() => setPlanSeats(planSeats - 1)}
                      />
                      <Input
                        size="sm"
                        value={planSeats}
                        readOnly={true}
                        className="px-[36px] text-center"
                      />
                      <IconButton
                        variant="ghost"
                        aria-label="Clear"
                        icon={<FaPlus className="text-secondary" />}
                        size="md"
                        className="absolute right-1"
                        onClick={() => setPlanSeats(planSeats + 1)}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-tertiary mt-[6px]">
                    Increase your included API call volume for your integrations
                    between your HubSpot account and other services to up to
                    1,000,000 calls per day.
                  </p>
                </div>
                <div className="p-4 border shadow-sm border-stroke rounded-sm mt-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-semibold mb-1">Disk Space</h4>
                      <p className="text-secondary">Starts form $10</p>
                    </div>
                    <div className="flex items-center relative max-w-[120px]">
                      <div className="pt-4">
                        <Select
                          defaultValue=""
                          onValueChange={(value) => console.log(value)}
                        >
                          <SelectTrigger className="h-10 min-w-[120px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectItem value="EnglishUS">
                              English US
                            </SelectItem>
                            <SelectItem value="EnglishUK">
                              English UK
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-tertiary mt-[6px]">
                    Increase your included API call volume for your integrations
                    between your HubSpot account and other services to up to
                    1,000,000 calls per day.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setAutomationsSeeMore(!automationsSeeMore)}
                  className="mt-10 text-textLink font-normal"
                >
                  See all features{" "}
                  {automationsSeeMore ? (
                    <IoChevronUp className="ml-2 text-textLink text-center" />
                  ) : (
                    <IoChevronDown className="ml-2 text-textLink text-center" />
                  )}
                </Button>
              </div>
              {automationsSeeMore && (
                <ul className="grid grid-cols-2 gap-x-10 mt-10">
                  {coreFeaturePoints.map((point, index) => (
                    <li key={point.id} className="flex items-center py-[6px]">
                      <IoCheckmark className="text-accent-green" />
                      <span className="text-textLink ml-3">{point.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-8 border shadow-sm border-stroke rounded-sm mb-8 relative">
              <CardHeadersWithImage
                src="/images/pricing/labels-reports.jpg"
                title="Label and Forms"
                badge={<BlueYellowBadge label="Beta" className="ml-3" />}
                subTitle="We believe Project-X should be accessible to all companies, no matter the size. Pick your plan today to get started!"
              />
              <div className="grid grid-cols-3 gap-x-5">
                <div>
                  <input
                    type="radio"
                    id="labelForms1"
                    name="labelsForms"
                    className="peer hidden"
                    checked={labelsFormsTier === "none"}
                    onChange={() => setLabelsFormsTier("none")}
                  />
                  <label
                    htmlFor="labelForms1"
                    className="border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    <span className="text-base ">No, Thank you</span>
                    {labelsFormsTier === "none" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="labelForms2"
                    name="labelsForms"
                    className="peer hidden"
                    checked={labelsFormsTier === "free"}
                    onChange={() => setLabelsFormsTier("free")}
                  />
                  <label
                    htmlFor="labelForms2"
                    className="border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    <span className="text-base ">
                      <span className="font-semibold">Free Trial</span>
                      <br />
                      $5/Month
                    </span>
                    {labelsFormsTier === "free" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="labelForms3"
                    name="labelsForms"
                    className="peer hidden"
                    checked={labelsFormsTier === "enterprise"}
                    onChange={() => setLabelsFormsTier("enterprise")}
                  />
                  <label
                    htmlFor="labelForms3"
                    className="border border-accent-blue min-h-[76px] flex items-center justify-between px-4 py-[13px] rounded-sm text-lg text-secondary cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    <span className="text-base ">
                      <span className="font-semibold">Enterprise</span>
                      <br />
                      $5/Month
                    </span>
                    {labelsFormsTier === "enterprise" ? (
                      <GoCheckCircleFill size={24} />
                    ) : (
                      <span className="peer-checked:hidden w-6 h-6 border border-textLink rounded-sm block"></span>
                    )}
                  </label>
                </div>
              </div>
              <BuyAdditionsCredits
                title="Buy Additional Credits"
                dropdownTitle="See all Add-ons"
              />
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setLabelsSeeMore(!labelsSeeMore)}
                  className="mt-10 text-textLink font-normal"
                >
                  See all features{" "}
                  {labelsSeeMore ? (
                    <IoChevronUp className="ml-2 text-textLink text-center" />
                  ) : (
                    <IoChevronDown className="ml-2 text-textLink text-center" />
                  )}
                </Button>
              </div>
              {labelsSeeMore && (
                <ul className="grid grid-cols-2 gap-x-10 mt-10">
                  {coreFeaturePoints.map((point, index) => (
                    <li key={point.id} className="flex items-center py-[6px]">
                      <IoCheckmark className="text-accent-green" />
                      <span className="text-textLink ml-3">{point.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="px-[30px] w-[500px]">
          <div className="flex bg-accent-bgHoverNew rounded-full w-max mx-auto mb-4">
            <Button
              variant="ghost"
              onClick={() => setPriceFrequency("monthly")}
              className={`py-[14px] px-8 h-auto text-xs rounded-full flex-col border border-[2px] ${
                priceFrequency === "monthly"
                  ? "border-accent-primary bg-white hover:bg-white"
                  : "border-transparent"
              }`}
            >
              <span
                className={
                  priceFrequency === "monthly" ? "text-accent-primary" : ""
                }
              >
                Pay Monthly{" "}
              </span>
              <span className="text-secondary font-normal">
                Monthly subscription
              </span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setPriceFrequency("yearly")}
              className={`py-[14px] px-8 h-auto text-xs rounded-full flex-col border border-[2px] ${
                priceFrequency === "yearly"
                  ? "border-accent-primary bg-white hover:bg-white"
                  : "border-transparent"
              }`}
            >
              <span
                className={
                  priceFrequency === "yearly" ? "text-accent-primary" : ""
                }
              >
                Save 18% Annually{" "}
              </span>
              <span className="text-secondary font-normal">
                Annual subscription
              </span>
            </Button>
          </div>
          <div className="py-6 px-8 border shadow-sm border-stroke rounded-sm mb-4">
            <h4 className="text-textLink font-semibold mb-4">Your Bundle</h4>
            <div className="border border-stroke rounded-sm p-4 relative mb-6">
              <IconButton
                variant="white"
                aria-label="Clear"
                icon={<IoClose className="" />}
                size="md"
                className="absolute right-0 top-0 shadow-lg p-1 rounded-full w-6 h-6 translate-x-[50%] -translate-y-[50%]"
              />
              <div className="flex justify-between ">
                <div className="flex flex-col w-[50%]">
                  <div className="grow">
                    <div className="flex items-center">
                      {" "}
                      <div className="w-8 min-w-8 min-h-8 h-8 mr-4">
                        <img
                          src="/images/pricing/automation.jpg"
                          className="w-full h-full object-contain"
                          alt="..."
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Automation </h4>
                        <p className="text-xs text-secondary">
                          3-day Free trial
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm pt-1 text-textLink">
                      10 Seats Minimum
                    </span>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-sm text-textLink text-right mb-2">
                    Seats
                  </h3>
                  <div className="flex items-center relative max-w-[120px]">
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaMinus className="text-secondary" />}
                      size="md"
                      className="absolute left-1"
                      disabled={planSeats === 0}
                      onClick={() => setPlanSeats(planSeats - 1)}
                    />
                    <Input
                      size="sm"
                      value={planSeats}
                      readOnly={true}
                      className="px-[36px] text-center"
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaPlus className="text-secondary" />}
                      size="md"
                      className="absolute right-1"
                      onClick={() => setPlanSeats(planSeats + 1)}
                    />
                  </div>
                  <p className="text-accent-primary pt-2 text-sm text-right">
                    $20/mo Per User
                  </p>
                </div>
              </div>
              <div className="py-6 px-2">
                <Accordion.Root
                  className="AccordionRoot"
                  type="single"
                  defaultValue="item-1"
                  collapsible
                >
                  <Accordion.Item className="AccordionItem" value="item-1">
                    <Accordion.Trigger className="w-full flex justify-between items-center font-medium text-accent-primary">
                      Selected Add-ons
                      <IoChevronDown className="ml-2 text-textLink text-center" />
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div className="pt-2 border-t border-stroke">
                        <Accordion.Root
                          className="AccordionRoot"
                          type="single"
                          defaultValue="item-notification-0"
                          collapsible
                        >
                          {automationAddOnsList.map((item, index) => (
                            <Accordion.Item
                              key={index}
                              className="AccordionItem my-2"
                              value={`item-notification-${index}`}
                              onClick={() => handleAccordionClick(index)}
                            >
                              <Accordion.Trigger className="w-full flex justify-between items-center">
                                <div className="flex text-left text-sm">
                                  {activeIndex == index ? (
                                    <IoChevronUp
                                      className="mr-2 text-textLink text-center"
                                      size={20}
                                    />
                                  ) : (
                                    <IoChevronForward
                                      className="mr-2 text-textLink text-center"
                                      size={20}
                                    />
                                  )}
                                  {item.title}
                                </div>
                                <div className="flex items-center">
                                  {item.price && (
                                    <span className="text-sm mx-1">
                                      {item.price}
                                    </span>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                                      <IconButton
                                        variant="white"
                                        aria-label="Clear"
                                        icon={
                                          <HiOutlineDotsVertical className="text-secondary" />
                                        }
                                        size="md"
                                        className="w-5 h-5 p-0"
                                      />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className=""
                                    >
                                      <DropdownMenuItem>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </Accordion.Trigger>
                              <Accordion.Content>
                                <div className="pt-2">
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="border-t border-stroke -mx-4 px-4 flex justify-between items-center pt-4">
                <h3 className="font-medium">Automations Total</h3>
                <p className="font-medium text-secondary ml-1">$270.00</p>
              </div>
            </div>
            <div className="border border-stroke rounded-sm p-4 relative mb-6">
              <IconButton
                variant="white"
                aria-label="Clear"
                icon={<IoClose className="" />}
                size="md"
                className="absolute right-0 top-0 shadow-lg p-1 rounded-full w-6 h-6 translate-x-[50%] -translate-y-[50%]"
              />
              <div className="flex justify-between ">
                <div className="flex flex-col w-[50%]">
                  <div className="grow">
                    <div className="flex items-center">
                      {" "}
                      <div className="w-8 min-w-8 min-h-8 h-8 mr-4">
                        <img
                          src="/images/pricing/labels-reports.jpg"
                          className="w-full h-full object-contain"
                          alt="..."
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium">Label & Forms </h4>
                        <p className="text-xs text-secondary">
                          3-day Free trial
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm pt-1 text-textLink">
                      10 Seats Minimum
                    </span>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-sm text-textLink text-right mb-2">
                    Seats
                  </h3>
                  <div className="flex items-center relative max-w-[120px]">
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaMinus className="text-secondary" />}
                      size="md"
                      className="absolute left-1"
                      disabled={planSeats === 0}
                      onClick={() => setPlanSeats(planSeats - 1)}
                    />
                    <Input
                      size="sm"
                      value={planSeats}
                      readOnly={true}
                      className="px-[36px] text-center"
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaPlus className="text-secondary" />}
                      size="md"
                      className="absolute right-1"
                      onClick={() => setPlanSeats(planSeats + 1)}
                    />
                  </div>
                  <p className="text-accent-primary pt-2 text-sm text-right">
                    $20/mo Per User
                  </p>
                </div>
              </div>
              <div className="py-6 px-2">
                <Accordion.Root
                  className="AccordionRoot"
                  type="single"
                  defaultValue="item-1"
                  collapsible
                >
                  <Accordion.Item className="AccordionItem" value="item-1">
                    <Accordion.Trigger className="w-full flex justify-between items-center font-medium text-accent-primary">
                      Selected Add-ons
                      <IoChevronDown className="ml-2 text-textLink text-center" />
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <div className="pt-2 border-t border-stroke">
                        <Accordion.Root
                          className="AccordionRoot"
                          type="single"
                          defaultValue="item-notification-0"
                          collapsible
                        >
                          {labelsAddOnsList.map((item, index) => (
                            <Accordion.Item
                              key={index}
                              className="AccordionItem my-2"
                              value={`item-notification-${index}`}
                              onClick={() => handleLabelsAccordionClick(index)}
                            >
                              <Accordion.Trigger className="w-full flex justify-between items-center">
                                <div className="flex text-left text-sm">
                                  {labelsActiveIndex == index ? (
                                    <IoChevronUp
                                      className="mr-2 text-textLink text-center"
                                      size={20}
                                    />
                                  ) : (
                                    <IoChevronForward
                                      className="mr-2 text-textLink text-center"
                                      size={20}
                                    />
                                  )}
                                  {item.title}
                                </div>
                                <div className="flex items-center">
                                  {item.price && (
                                    <span className="text-sm mx-1">
                                      {item.price}
                                    </span>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                                      <IconButton
                                        variant="white"
                                        aria-label="Clear"
                                        icon={
                                          <HiOutlineDotsVertical className="text-secondary" />
                                        }
                                        size="md"
                                        className="w-5 h-5 p-0"
                                      />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className=""
                                    >
                                      <DropdownMenuItem>
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </Accordion.Trigger>
                              <Accordion.Content>
                                <div className="pt-2 ">
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                  <div className="flex items-start pl-6 mb-1">
                                    <Checkbox
                                      name="name"
                                      id="tos"
                                      className="rounded-sm h-[18px] w-[18px] custom__checkbox !text-white mt-1"
                                      onCheckedChange={(e) => {}}
                                    />

                                    <label
                                      htmlFor="name"
                                      className="font-light text-sm tracking-[1px] ml-3"
                                    >
                                      1000 Text notifications a month - $20.00
                                    </label>
                                  </div>
                                </div>
                              </Accordion.Content>
                            </Accordion.Item>
                          ))}
                        </Accordion.Root>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
              <div className="border-t border-stroke -mx-4 px-4 flex justify-between items-center pt-4">
                <h3 className="font-medium">Automations Total</h3>
                <p className="font-medium text-secondary ml-1">$270.00</p>
              </div>
            </div>
            <div className=" border border-stroke rounded-sm p-4">
              <div className="flex justify-between">
                <div className="flex flex-col w-[50%]">
                  <div className="grow">
                    {" "}
                    <h4 className="text-lg font-medium">Labels & Forms</h4>
                  </div>
                  <div>
                    <span className="text-sm pt-1 text-textLink">
                      10 Seats Minimum
                    </span>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-sm text-textLink text-right mb-2">
                    Seats
                  </h3>
                  <div className="flex items-center relative max-w-[120px]">
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaMinus className="text-secondary" />}
                      size="md"
                      className="absolute left-1"
                      disabled={planSeats === 0}
                      onClick={() => setPlanSeats(planSeats - 1)}
                    />
                    <Input
                      size="sm"
                      value={planSeats}
                      readOnly={true}
                      className="px-[36px] text-center"
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaPlus className="text-secondary" />}
                      size="md"
                      className="absolute right-1"
                      onClick={() => setPlanSeats(planSeats + 1)}
                    />
                  </div>
                  <p className="text-accent-primary pt-2 text-sm text-right">
                    $20/mo Per User
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <h3 className="font-medium">Automations Total</h3>
                <p className="font-medium text-secondary ml-1">$270.00</p>
              </div>
            </div>
            <div className="text-center pt-8">
              <p className="text-[20px] leading-[24px] font-semibold text-textLink p-3 mb-3 flex justify-center items-center">
                <span className="text-3xl text-accent mr-[10px]">$20/mo</span>
                billed annually
              </p>
              <p className="text-sm text-textLink">
                at{" "}
                <span className="text-[20px] leading-[24px] font-semibold">
                  $5670
                </span>{" "}
                <span className="text-accent-primary text-[20px] leading-[24px] font-semibold">
                  $4800/yr
                </span>{" "}
                <br /> with an annual commitment
              </p>
              <Button
                variant="primary"
                className="mt-8 rounded-full p-4 h-auto w-full"
              >
                Next: Summary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
