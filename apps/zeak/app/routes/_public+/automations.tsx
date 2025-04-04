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
import {
  IoCheckmark,
  IoChevronDown,
  IoChevronUp,
  IoClose,
} from "react-icons/io5";
import { BlueYellowBadge } from "~/modules/pricing/ui/badge";
import {
  BuyAdditionsCredits,
  CardHeadersWithImage,
  CoreFeaturesCard,
} from "~/modules/pricing/ui/cards";

export default function Automations() {
  return <AutomationsContent />;
}
const AutomationsContent = () => {
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
  const [labelsSeeMore, setLabelsSeeMore] = useState(true);
  return (
    <>
      <div>
        <div className="w-[calc(100%_-_500px)] mb-8">
          <h3 className="text-3xl font-semibold">Automations</h3>
          <p className="text-textLink">
            We believe Project-X should be accessible to all companies, no
            matter the size. Pick your plan today to get started!
          </p>
        </div>
      </div>
      <div className="flex -mx-[30px]">
        <div className="px-[30px] w-[calc(100%_-_500px)]">
          <div>
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
              <CardHeadersWithImage
                src="/images/pricing/labels-reports.jpg"
                title="Labels and Forms"
                badge={<BlueYellowBadge label="Beta" className="ml-3" />}
                subTitle="We believe Project-X should be accessible to all companies, no matter the size. Pick your plan today to get started!"
              />
              <ul className="grid grid-cols-2 gap-x-10 mt-10">
                {coreFeaturePoints.map((point, index) => (
                  <li key={point.id} className="flex items-center py-[6px]">
                    <IoCheckmark className="text-accent-green" />
                    <span className="text-textLink ml-3">{point.title}</span>
                  </li>
                ))}
                {labelsSeeMore &&
                  coreFeaturePoints.map((point, index) => (
                    <li key={point.id} className="flex items-center py-[6px]">
                      <IoCheckmark className="text-accent-green" />
                      <span className="text-textLink ml-3">{point.title}</span>
                    </li>
                  ))}
              </ul>
              <BuyAdditionsCredits
                title="Buy Additional Credits"
                dropdownTitle="See all Add-ons"
              />
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
                    Increase your included API call volume for your integrations
                    between your HubSpot account and other services to up to
                    1,000,000 calls per day.
                  </p>
                </div>
              </div>
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
            <h4 className="text-textLink font-semibold mb-4">Bundles</h4>
            <div className="border border-stroke rounded-sm p-4 relative">
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
                          14-day Free trial
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
              <div className="pt-4">
                <Button
                  variant="ghost"
                  className="p-0 flex items-center text-accent-primary"
                >
                  {" "}
                  <FaPlus className="text-accent-primary mr-2" /> Add-ons
                </Button>
              </div>
            </div>
          </div>
          <div className="py-6 px-8 border shadow-sm border-stroke rounded-sm text-center">
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
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
