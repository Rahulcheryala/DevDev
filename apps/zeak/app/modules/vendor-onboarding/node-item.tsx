import { EyeIcon, SettingsIcon } from "@zeak/icons";
import { IconButton } from "@zeak/react";
import { LuZap } from "react-icons/lu";
import { nodeModalValues } from "~/utils/onboarding-node";

interface Props {
  setModalOpenValue: (value: string) => void;
  handleSetting: () => void;
  nodeInfo: any;
}

const Nodeitem = (props: Props) => {
  const { setModalOpenValue, nodeInfo, handleSetting } = props;
  return (
    <>
      <div className="flex">
        <div
          className="rounded-lg overflow-hidden shadow-6large"
          onClick={() => setModalOpenValue(nodeModalValues.trigger)}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen border border-accent-green rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-500 h-[70px] w-[70px] p-4 flex justify-center items-center">
                <nodeInfo.icon color="#ffffff" size={24} />
              </div>
              <div className="text-left p-4">
                <p className="truncate text-accent-green text-sm font-normal">
                  {nodeInfo.title}
                </p>
                <span className=""> {nodeInfo.subtitle}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`grid items-center grid-cols-1 gap-1 ml-2`}>
          <IconButton
            className="p-0"
            icon={<SettingsIcon color="hsl(var(--background))" />}
            aria-label="Setting"
            onClick={handleSetting}
          />
          {/* <IconButton
            className="p-0"
            icon={<EyeIcon color="hsl(var(--background))" />}
            aria-label="Setting"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Nodeitem;
