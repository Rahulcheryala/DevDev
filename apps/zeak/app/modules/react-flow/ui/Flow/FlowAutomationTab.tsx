import { IconButton } from "@zeak/react";
import { WebArrowCircleLeft, WebArrowCircleRight, WebPlay } from "@zeak/icons";

export const FlowAutomationTab = () => {
  return (
    <div className="bg-background">
      <div className="rounded-tl-[10px] bg-white overflow-y-auto overflow-x-hidden py-4 px-5 flex items-center">
        <div className="flex gap-4">
          <IconButton
            icon={<WebArrowCircleLeft />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebArrowCircleRight />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
        </div>
        <span className="ml-7 text-[#8A8A8F] mr-4">Test automation</span>
        <IconButton
          icon={<WebPlay />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
      </div>
    </div>
  );
};
