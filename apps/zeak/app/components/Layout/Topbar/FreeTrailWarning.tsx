import { Link } from "@remix-run/react";
import { HStack } from "@zeak/react";
import { WebGift, WebRightExternal } from "@zeak/icons";

export const FreeTrailWarning = () => {
  return (
    <div className="bg-gradient-to-r from-[#13C2C2] to-[#3649FF] h-[32px] px-[24px] flex items-center justify-center">
      <HStack className="space-x-8 items-center justify-center">
        <p className="flex items-center text-white text-sm leading-[18px] tracking-wider [&>svg]:mr-[8px]">
          <WebGift />{" "}
          <span className="relative top-[1px]">
            Free trial ends in 7 days
          </span>
        </p>
        <Link
          to={"/"}
          className="flex items-center text-white underline text-sm leading-[20px] tracking-wider [&>svg]:ml-[8px]"
        >
          Upgrade Now <WebRightExternal />
        </Link>
      </HStack>
    </div>
  );
};
