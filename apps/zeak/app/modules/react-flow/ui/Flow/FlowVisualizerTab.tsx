import { IconButton } from "@zeak/react";
import {
  WebArrowTop,
  WebGoLeftPlay,
  WebGoRightPlay,
  WebPause,
  WebPlayBold,
  WebStop,
} from "@zeak/icons";

export const FlowVisualizerTab = () => {
  return (
    <div className="flex justify-between w-full rounded-tl-[10px] bg-white overflow-y-auto overflow-x-hidden py-4 px-5 flex items-center">
      <span className="text-xl font-medium">Visualizer</span>
      <div className="flex ">
        <IconButton
          icon={<WebPlayBold />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
        <IconButton
          icon={<WebPause />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
        <IconButton
          icon={<WebGoLeftPlay />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
        <IconButton
          icon={<WebGoRightPlay />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
        <IconButton
          icon={<WebStop />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0"
          aria-label={""}
        />
        <IconButton
          icon={<WebArrowTop />}
          variant="ghost"
          type="submit"
          className="w-[40px] h-[40px] text-secondary p-0 ml-10"
          aria-label={""}
        />
      </div>
    </div>
  );
};
