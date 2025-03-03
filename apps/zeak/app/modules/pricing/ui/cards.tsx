import { Button } from "@zeak/react";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";
export const CoreFeaturesCard = (props: any) => {
  return (
    <div className="p-8 border shadow-sm border-stroke rounded-sm mb-8 relative">
      {props.badge}
      <div className="mb-10">
        <h4 className="text-2xl font-semibold mb-8">{props.title}</h4>
        {props.subTitle && <p className="text-textLink">{props.subTitle}</p>}
      </div>
      <ul className="grid grid-cols-2 gap-x-10 ">
        {props.pointsList.map((point: any) => (
          <li key={point.id} className="flex items-center py-[6px]">
            <IoCheckmark className="text-accent-green" />
            <span className="text-textLink ml-3">{point.title}</span>
          </li>
        ))}
      </ul>
      <div>
        <Button
          variant="ghost"
          className="mt-6 text-textLink font-normal text-center w-full"
        >
          See all features{" "}
          {props.isActive ? (
            <IoChevronUp className="ml-2 text-textLink text-center" />
          ) : (
            <IoChevronDown className="ml-2 text-textLink text-center" />
          )}
        </Button>
      </div>
    </div>
  );
};

export const CardHeadersWithImage = (props: any) => {
  return (
    <div className="flex mb-10">
      <div className="w-[56px] min-w-[56px] min-h-[56px] h-[56px] mr-6">
        <img
          src={props.src}
          className="w-full h-full object-contain"
          alt="..."
        />
      </div>
      <div>
        <h3 className="text-2xl flex items-center font-semibold">
          {props.title} {props.badge}
        </h3>
        {props.subTitle && (
          <p className="text-sm text-secondary font-medium pt-2">
            {props.subTitle}
          </p>
        )}
        {props.seats && (
          <p className="text-sm text-secondary mt-1">{props.seats}</p>
        )}
      </div>
    </div>
  );
};

export const BuyAdditionsCredits = (props: any) => {
  return (
    <div className="px-6 py-[16px] flex justify-between border shadow-sm border-stroke rounded-sm mt-10">
      <Button
        variant="ghost"
        className="text-accent-primary font-normal h-auto p-0"
      >
        {props.title}
      </Button>
      <Button variant="ghost" className="text-textLink font-normal h-auto p-0">
        {props.dropdownTitle}
        <IoChevronDown className="ml-2 text-textLink text-center" />
      </Button>
    </div>
  );
};
