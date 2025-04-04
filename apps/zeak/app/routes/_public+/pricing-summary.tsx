import {
  Button,
  Input,
  IconButton,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@zeak/react";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import * as Accordion from "@radix-ui/react-accordion";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CardHeadersWithImage } from "~/modules/pricing/ui/cards";
import { CiCalendarDate } from "react-icons/ci";

export default function PricingSummary() {
  return <PricingSummaryContent />;
}
const PricingSummaryContent = () => {
  const [priceFrequency, setPriceFrequency] = useState("yearly");
  const [planSeats, setPlanSeats] = useState(13);
  return (
    <>
      <div>
        <div className="w-[calc(100%_-_500px)] mb-8">
          <h3 className="text-3xl font-semibold">Plan Summary</h3>
          <p className="text-textLink">
            We believe Project-X should be accessible to all companies, no
            matter the size. Pick your plan today to get started!
          </p>
        </div>
      </div>
      <div className="flex -mx-[30px]">
        <div className="px-[30px] w-[calc(100%_-_500px)]">
          <div>
            <div className="py-4 mb-8">
              <h3 className="text-2xl font-semibold">Products</h3>
            </div>

            <div className="p-8 border shadow-sm border-stroke rounded-sm mb-8 relative">
              <div className="flex justify-between">
                <CardHeadersWithImage
                  src="/images/pricing/labels-reports.jpg"
                  title="Automation "
                  subTitle="Enterprise Plan"
                  seats="10 Seats Minimum"
                />
                <div className="min-w-[120px] ml-3">
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
                    />
                    <Input
                      size="sm"
                      value={3}
                      readOnly={true}
                      className="px-[36px] text-center"
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaPlus className="text-secondary" />}
                      size="md"
                      className="absolute right-1"
                    />
                  </div>
                  <p className="text-secondary pt-2 text-sm text-right">
                    $240.00
                  </p>
                </div>
              </div>
              <Accordion.Root
                className="AccordionRoot"
                type="single"
                defaultValue="item-1"
                collapsible
              >
                <Accordion.Item className="AccordionItem" value="item-1">
                  <Accordion.Trigger className="w-full flex justify-between items-center font-medium text-accent-primary">
                    Add-ons Selected
                    {true ? (
                      <IoChevronDown className="ml-2 text-accent-primary text-center" />
                    ) : (
                      <IoChevronUp className="ml-2 text-accent-primary text-center" />
                    )}
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div className="pt-2 border-t border-stroke">
                      <div className="p-4 border shadow-sm border-stroke rounded-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-semibold mb-1">Listeners</h4>
                            <p className="text-secondary">
                              $10/Per Listener monthly
                            </p>
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
                          Increase your included API call volume for your
                          integrations between your HubSpot account and other
                          services to up to 1,000,000 calls per day.
                        </p>
                      </div>
                      <div className="p-4 border shadow-sm border-stroke rounded-sm mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-semibold mb-1">Disk Space</h4>
                            <p className="text-secondary">Starts form $10</p>
                          </div>
                          <div className="flex items-center relative max-w-[120px]">
                            <div className="pt-4">
                              <Select
                                defaultValue="100"
                                onValueChange={(value) => console.log(value)}
                              >
                                <SelectTrigger className="h-10 min-w-[120px]">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                  <SelectItem value="100">100 GB</SelectItem>
                                  <SelectItem value="200">200 GB</SelectItem>
                                  <SelectItem value="300">300 GB</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-tertiary mt-[6px]">
                          Increase your included API call volume for your
                          integrations between your HubSpot account and other
                          services to up to 1,000,000 calls per day.
                        </p>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <div className="border-t border-stroke flex justify-between items-center pt-4 mt-8">
                <h3 className="font-medium">Automations Total</h3>
                <p className="font-medium text-[20px] leading-[30px] text-secondary ml-1">
                  $270.00
                </p>
              </div>
            </div>
            <div className="p-8 border shadow-sm border-stroke rounded-sm mb-8 relative">
              <div className="flex justify-between">
                <CardHeadersWithImage
                  src="/images/pricing/labels-reports.jpg"
                  title="Labels and Forms"
                  subTitle="Enterprise Plan"
                  seats="10 Seats Minimum"
                />
                <div className="min-w-[120px] ml-3">
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
                    />
                    <Input
                      size="sm"
                      value={3}
                      readOnly={true}
                      className="px-[36px] text-center"
                    />
                    <IconButton
                      variant="ghost"
                      aria-label="Clear"
                      icon={<FaPlus className="text-secondary" />}
                      size="md"
                      className="absolute right-1"
                    />
                  </div>
                  <p className="text-secondary pt-2 text-sm text-right">
                    $240.00
                  </p>
                </div>
              </div>
              <Accordion.Root
                className="AccordionRoot"
                type="single"
                defaultValue="item-1"
                collapsible
              >
                <Accordion.Item className="AccordionItem" value="item-1">
                  <Accordion.Trigger className="w-full flex justify-between items-center font-medium text-accent-primary">
                    Add-ons Selected
                    {true ? (
                      <IoChevronDown className="ml-2 text-accent-primary text-center" />
                    ) : (
                      <IoChevronUp className="ml-2 text-accent-primary text-center" />
                    )}
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <div className="pt-2 border-t border-stroke">
                      <div className="p-4 border shadow-sm border-stroke rounded-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-semibold mb-1">Listeners</h4>
                            <p className="text-secondary">
                              $10/Per Listener monthly
                            </p>
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
                          Increase your included API call volume for your
                          integrations between your HubSpot account and other
                          services to up to 1,000,000 calls per day.
                        </p>
                      </div>
                      <div className="p-4 border shadow-sm border-stroke rounded-sm mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-semibold mb-1">Disk Space</h4>
                            <p className="text-secondary">Starts form $10</p>
                          </div>
                          <div className="flex items-center relative max-w-[120px]">
                            <div className="pt-4">
                              <Select
                                defaultValue="100"
                                onValueChange={(value) => console.log(value)}
                              >
                                <SelectTrigger className="h-10 min-w-[120px]">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                  <SelectItem value="100">100 GB</SelectItem>
                                  <SelectItem value="200">200 GB</SelectItem>
                                  <SelectItem value="300">300 GB</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-tertiary mt-[6px]">
                          Increase your included API call volume for your
                          integrations between your HubSpot account and other
                          services to up to 1,000,000 calls per day.
                        </p>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
              <div className="border-t border-stroke flex justify-between items-center pt-4 mt-8">
                <h3 className="font-medium">Automations Total</h3>
                <p className="font-medium text-[20px] leading-[30px] text-secondary ml-1">
                  $270.00
                </p>
              </div>
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
          <div
            className="p-6 border shadow-sm border-accent-yellow rounded-sm mb-4"
            style={{ backgroundColor: "hsla(48, 100%, 50%, 0.03)" }}
          >
            <div className="mb-8">
              <h3 className="text-[20px] leading-[22px] font-medium flex items-center">
                <CiCalendarDate className="text-accent-yellow w-8 h-8 mr-4" />
                Plan Details
              </h3>
              <div className="gap-y-6 grid mt-8">
                <div className="flex justify-between">
                  <h3 className="font-medium mr-2 min-w-[150px]">
                    Billing Frequency
                  </h3>
                  <div>
                    <p className="text-textLink text-right">Monthly</p>
                    <p className="text-secondary mt-1 text-right">
                      1st of every month
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium mr-2 min-w-[150px]">
                    Commitment Term
                  </h3>
                  <div>
                    <p className="text-textLink text-right">1 month </p>
                    <p className="text-secondary mt-1 text-right">
                      Cancel anytime, Minimum billing period is 1 month
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium mr-2 min-w-[150px]">
                    Plan Start Date
                  </h3>
                  <div>
                    {false && (
                      <p className="text-textLink text-right">Monthly</p>
                    )}
                    <p className="text-secondary mt-1 text-right">
                      Aug 5, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-6 px-8 border shadow-sm border-stroke rounded-sm text-center">
            <div>
              <h4 className="text-lg text-left">Plan Summary:</h4>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Automations
                  </h4>
                  <p className="text-secondary text-sm text-left">$240.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">
                    Text Notifications
                  </h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">Storage</h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Label and Forms
                  </h4>
                  <p className="text-secondary text-sm text-left">$240.00</p>
                </div>
                <div className="flex items-center justify-between mb-2 pl-3 relative">
                  <span className="w-1 h-1 rounded-full bg-secondary absolute top-2 left-1"></span>
                  <h4 className="text-secondary text-sm text-left">
                    Print Anywhere
                  </h4>
                  <p className="text-secondary text-sm text-left">$10.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-secondary text-sm text-left">
                    Customer Service Automation
                  </h4>
                  <p className="text-secondary text-sm text-left">$120.00</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-left">Plan Discount </h4>
                    <p className="text-secondary text-sm text-left mt-1">
                      You have been offered special pricing
                    </p>
                  </div>
                  <p className="text-3xl text-accent-green font-bold">18%</p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Sub Total </h4>
                  <p className="text-lg font-medium">12 seats</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Tax</h4>
                  <p className="text-sm font-medium">$0.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[20px] font-medium">Order total</h4>
                  <p className="text-[20px] font-medium">$648.00</p>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              className="mt-8 rounded-full p-4 h-auto w-full"
            >
              Next: Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
