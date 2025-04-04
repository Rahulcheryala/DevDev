import { Link } from "@remix-run/react";
import { TfiClose } from "react-icons/tfi";

export interface IProps {
  innerView: JSX.Element;
}

export default function ProjectXLayout({ innerView }: IProps) {
  return (
    <div className="min-h-full">
      <div className="md:h-screen flex flex-wrap">
        <div className="flex items-center justify-center md:block w-full lg:w-[38%] bg-leftAbstractBg bg-no-repeat bg-cover bg-center p-10">
          <Link to="#" className="inline-block">
            <img src="/images/projectXLogo.png" alt="Project X" />
            {/* <Image src={ProjectXLogo} alt="" /> */}
          </Link>
        </div>
        <div
          className="w-full h-full lg:w-[62%] py-5 md:py-10 px-[20px] md:px-[40px] lg:px-[60px] bg-white overflow-y-auto"
          id="project-x-layout"
        >
          <div className="flex flex-col h-full">
            <div className="pb-[20px] md:grow flex items-start justify-end">
              {/* <button className="text-[14px] leading-[20px]">Back</button> */}
              <div className="ml-[10px] cursor-pointer">
                <TfiClose size={18} className="text-accent-dark" />
              </div>
            </div>
            {innerView}
            {false && (
              <div className="pt-[20px] text-center">
                <Link
                  to="/"
                  className="text-[#0477d3] text-[14px] landing-[26px] inline-block font-medium"
                >
                  Need help?
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
