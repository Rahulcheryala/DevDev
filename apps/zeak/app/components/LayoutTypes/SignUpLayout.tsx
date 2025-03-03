import { IconButton } from "@zeak/react";
import { Link } from "@remix-run/react";
import { TfiClose } from "react-icons/tfi";

export interface IProps {
  innerView: JSX.Element;
}

export default function SignUpLayout({ innerView }: IProps) {
  return (
    <div className="px-[60px] pt-10 pb-2 bg-white min-h-screen max-h-screen overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="w-[300px] flex items-center">
          <Link to="#" className="inline-block">
            <img src="/images/Logo-black.svg" width="130" alt="Project X" />
          </Link>
        </div>
        <div>
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<TfiClose className="text-secondary" />}
            size="md"
          />
        </div>
      </div>
      {innerView}
      <div className="pb-10 pt-2 text-center sticky z-[1] left-0 -bottom-2 bg-white">
        <Link to="#" className="text-accent-primary text-sm font-normal">
          Need help?
        </Link>
      </div>
    </div>
  );
}
