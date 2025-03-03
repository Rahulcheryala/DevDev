import { Button } from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import { path } from "~/utils/path";
import { LoaderFunctionArgs } from "@remix-run/node";

const freeTrialOptions = [
  {
    title: "Free templates",
    available: true,
  },
  {
    title: "Unlimited Labels",
    available: false,
  },
  {
    title: "Free templates",
    available: true,
  },
  {
    title: "Unlimited Labels",
    available: false,
  },
];
const enterpriseOptions = [
  {
    title: "Access all templates",
    available: true,
  },
  {
    title: "Unlimited Labels",
    available: true,
  },
  {
    title: "Free templates",
    available: true,
  },
  {
    title: "Unlimited Labels",
    available: true,
  },
];

export default function ChooseSubscription() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    console.log("Navigation triggered");
    console.log("Target path:", path.to.authenticatedRoot);
    
    try {
      navigate(path.to.authenticatedRoot);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  return (
    <div className="grow flex items-center justify-center">
      <div className="max-w-[800px] flex items-center justify-center">
        <div className="pb-[90px]">
          <h1 className="text-[28px] leading-[31px] font-semibold text-center 2xl:text-left">
            Choose your subscription
          </h1>

          <div className="mt-10 flex flex-col xl:flex-row  gap-10 items-stretch justify-center 2xl:justify-start">
            <div className="border bg-white text-accent border-stroke rounded-[10px] p-5 space-y-[67px] sm:min-w-[360px] 2xl:min-w-[380px]">
              <span className="font-bold text-[28px] leading-[1px]">
                Free trial
              </span>

              <div className="flex flex-col">
                <span className=" font-semibold text-base leading-[18px]">
                  $ 0 / 14 days
                </span>
                <span className="font-normal text-sm leading-[15px]">
                  up to 10 users
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {freeTrialOptions?.map((item, i) => (
                  <li className="flex items-center gap-2.5" key={`${item?.title}-${i}`}>
                    <span
                      className={
                        item.available ? "text-accent-green" : "text-accent-red"
                      }
                    >
                      {item.available ? (
                        <IoIosCheckmarkCircleOutline />
                      ) : (
                        <IoIosCloseCircleOutline />
                      )}
                    </span>
                    <span className="text-xs leading-[18px]">{item.title}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Button
                  className="w-full h-[56px] rounded-[56px] text-[14px] bg-accent border border-[#E9E9EE] text-white leading-[20px] tracking-[0.5px] flex items-center shadow-none font-normal"
                  onClick={handleNavigation}
                >
                  Choose
                </Button>
                <p className=" text-sm leading-[16px] text-center mt-3">
                  Everything you need to start creating.
                </p>
              </div>
            </div>

            <div className="relative border bg-accent text-white border-stroke rounded-[10px] p-5 space-y-[67px] sm:min-w-[360px] 2xl:min-w-[380px] overflow-hidden">
              <span className="absolute top-0 right-0 bg-accent-green text-white text-[10px] leading-[11px] p-[4px_16px] rounded-bl-[10px]">
                Recommended
              </span>
              <span className="font-bold text-[28px] leading-[1px]">
                Enterprise plan
              </span>

              <div className="flex flex-col">
                <span className=" font-semibold text-base leading-[18px]">
                  $ 29 / month
                </span>
                <span className="font-normal text-sm leading-[15px]">
                  per user
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {enterpriseOptions?.map((item, i) => (
                  <li className="flex items-center gap-2.5" key={`${item?.title}-${i}`}>
                    <span
                      className={
                        item.available ? "text-accent-green" : "text-accent-red"
                      }
                    >
                      {item.available ? (
                        <IoIosCheckmarkCircleOutline />
                      ) : (
                        <IoIosCloseCircleOutline />
                      )}
                    </span>
                    <span className="text-xs leading-[18px]">{item.title}</span>
                  </li>
                ))}
              </ul>

              <div>
                <Button
                  className="w-full h-[56px] rounded-[56px] bg-white text-[14px] text-black border border-[#E9E9EE]  leading-[20px] tracking-[0.5px] flex items-center shadow-none font-normal hover:bg-white"
                  onClick={handleNavigation}
                >
                  Choose
                </Button>
                <p className=" text-sm leading-[16px] text-center mt-3">
                  For business and agencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Choose subscription route mounted");
  return null;
}
