// "use client"

import { Button } from "./Button";
import { MdClose } from "react-icons/md";

interface IProps {
  children: any;
  title: string;
  callback?: (event?: any) => void;
  CTA?: string;
  CTACallback?: (event?: any) => void;
}

const SideBar = ({
  children,
  title,
  callback,
  CTA = "",
  CTACallback,
}: IProps) => {
  const hideSideBar = () => {
    if (callback) callback();
  };

  return (
    <div className=" overflow-y-scroll fixed right-0 top-0 w-3/5 min-h-screen h-screen z-[1000] py-[70px] px-16 flex flex-col bg-white shadow-[rgba(0,0,15,0.5)_-1px_0px_23px_0px]">
      <div className="w-full flex justify-between items-center mb-8">
        <p className="text-[#19110B] text-3xl font-semibold">{title}</p>
        <div className="flex items-center">
          {CTA && (
            <Button onClick={CTACallback} variant={"ghost"}>
              {CTA}
            </Button>
          )}
          <Button onClick={hideSideBar} variant={"ghost"}>
            <MdClose className="h-5 w-5" size={20} />
          </Button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SideBar;
