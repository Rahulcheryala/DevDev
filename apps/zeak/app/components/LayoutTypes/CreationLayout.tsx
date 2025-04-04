  import { Button } from "@zeak/react";
import { Link } from "@remix-run/react";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxSlash } from "react-icons/rx";
import SettingsList from "~/modules/shared/ui/SettingsList";

export interface IProps {
  innerView: JSX.Element;
  createTitle: string;
}
export default function CreationLayout({ innerView, createTitle }: IProps) {
  const [rightBanner, setRightBanner] = useState<boolean>(false);
  return (
    <>
      <div className="bg-accent-bgHoverNew flex h-full">
        <div
          className={`h-full ${
            rightBanner ? "w-[calc(100%_-_400px)]" : "w-full"
          }`}
        >
          <div className="pt-[25px] px-[60px] bg-white w-full mb-2 rounded-md">
            {/* New Breadcumbs */}
            <ul className="grid grid-flow-col auto-cols-max gap-1">
              <li>
                <Link
                  to={"/"}
                  className="text-textLink text-sm leading-[20px] tracking-wider"
                >
                  Settings
                </Link>
              </li>
              <li>
                <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
                  <RxSlash />
                </span>
              </li>
              <li>
                <span className="text-accent text-sm leading-[20px] tracking-wider">
                  Notifications
                </span>
              </li>
            </ul>
            {/* New Breadcumbs */}
            <h1 className="text-2xl font-medium">{createTitle}</h1>
          </div>
          <div className="flex space-x-2 h-full max-h-[calc(100vh_-_219px)]">
            {innerView}
          </div>
        </div>
        {rightBanner && (
          <div className="w-[400px] pl-2 h-full">
            <div className=" py-[52px] px-[60px] bg-white rounded-md relative  h-full">
              <Button
                className="p-0 absolute right-4 top-2"
                variant="ghost"
                onClick={() => setRightBanner(false)}
              >
                <IoCloseOutline size={32} />
              </Button>
              <div className="grid grid-cols-1 gap-10">
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
                <div className="w-full h-[280px] bg-stroke rounded-[24px]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
