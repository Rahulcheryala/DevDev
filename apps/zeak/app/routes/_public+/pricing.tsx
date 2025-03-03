import { Button, Input, IconButton } from "@zeak/react";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

export default function Pricing() {
  const [priceFrequency, setPriceFrequency] = useState("yearly");
  const [selectedBundle, setSelectedBundle] = useState("free");
  const [planSeats, setPlanSeats] = useState(13);
  const tierPointsList = [
    { id: 1, title: "Access to all basic features", available: true },
    { id: 2, title: "Up to 5 individual users", available: true },
    { id: 3, title: "20GB individual data each user", available: true },
    { id: 4, title: "20GB individual data each user", available: true },
    { id: 5, title: "SEO optimization", available: true },
    { id: 6, title: "Basic chat and email support", available: true },
    { id: 7, title: "20GB individual data each user", available: true },
    { id: 8, title: "SEO optimization", available: true },
    { id: 9, title: "Basic chat and email support", available: true },
    { id: 10, title: "Access to all basic features", available: true },
  ];
  return (
    <>
      <div className="w-[calc(100%_-_500px)] mb-8">
        <h3 className="text-3xl font-semibold">
          Select a Bundle with all Products
        </h3>
        <p className="text-textLink">
          We believe Project-X should be accessible to all companies, no matter
          the size. Pick your plan today to get started!
        </p>
      </div>
      <div className="flex -mx-[30px]">
        <div className="px-[30px] w-[calc(100%_-_500px)]">
          <div className="grid grid-cols-2 gap-x-10">
            <div
              onClick={() => setSelectedBundle("free")}
              className={`pt-[42px] relative px-5 pb-8 border shadow-sm hover:shadow-lg ${
                selectedBundle === "free"
                  ? "border-accent-primary"
                  : "border-stroke"
              } rounded-sm`}
            >
              <div className="">
                {false && (
                  <span className="py-1 px-4 absolute top-1 right-1 rounded-bl-[10px] rounded-tr-sm bg-success font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-3xl text-secondary font-light mb-4">
                  <span className="text-4xl text-accent-primary font-medium">
                    $00
                  </span>
                  /month
                </p>
                <span className="text-textLink">
                  Analyze bundle performance to make data-driven decisions.
                </span>
                <h3 className="text-2xl font-medium mb-4 mt-6">
                  Free Trial
                  <span className="text-base ml-5 font-normal">
                    14 day trial.
                  </span>
                </h3>
                {false && (
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      className="text-accent-primary font-medium mt-1"
                    >
                      Buy Additional Credits
                    </Button>
                  </div>
                )}
              </div>
              <div className="pt-4">
                <ul>
                  {tierPointsList.map((point, index) => (
                    <li key={point.id} className="flex items-center py-[6px]">
                      <IoCheckmark className="text-accent-green" />
                      <span className="text-textLink ml-3">{point.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              onClick={() => setSelectedBundle("enterprise")}
              className={`pt-[42px] relative px-5 pb-8 border shadow-sm hover:shadow-lg ${
                selectedBundle === "enterprise"
                  ? "border-accent-primary"
                  : "border-stroke"
              } rounded-sm`}
            >
              <div className="">
                {true && (
                  <span className="py-1 px-4 absolute top-1 right-1 rounded-bl-[10px] rounded-tr-sm bg-success font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <p className="text-3xl text-secondary font-light mb-4">
                  <span className="text-4xl text-accent-primary font-medium">
                    $20
                  </span>
                  /month
                </p>
                <span className="text-textLink">
                  Analyze bundle performance to make data-driven decisions.
                </span>
                <h3 className="text-2xl font-medium mb-4 mt-6">
                  Enterprise Plan
                </h3>
                <div className="text-center">
                  <Button
                    variant="ghost"
                    className="text-accent-primary font-medium mt-1"
                  >
                    Buy Additional Credits
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                <ul>
                  {tierPointsList.map((point, index) => (
                    <li key={point.id} className="flex items-center py-[6px]">
                      <IoCheckmark className="text-accent-green" />
                      <span className="text-textLink ml-3">{point.title}</span>
                    </li>
                  ))}
                </ul>
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
            <div className="flex justify-between border border-stroke rounded-sm p-4">
              <div className="flex flex-col w-[50%]">
                <div className="grow">
                  {" "}
                  <h4 className="text-lg font-medium">Enterprise Plan</h4>
                  <p className="text-xs ext-secondary">
                    Analyze bundle performance to make data-driven decisions.
                  </p>
                </div>
                <div>
                  <span className="text-sm pt-1 text-textLink">
                    10 Seats Minimum
                  </span>
                </div>
              </div>
              <div className="">
                <h3 className="text-sm text-textLink text-right mb-2">Seats</h3>
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
}
