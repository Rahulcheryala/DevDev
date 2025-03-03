import type { PropsWithChildren } from "react";
import { EndIcon, StartIcon } from "@zeak/icons";

type Props = {
  title: string;
  description: string;
};

const Layout = ({ title, description, children }: PropsWithChildren<Props>) => {
  return (
    <div className="flex py-[60px] first:pt-0 last:pb-0 border-b border-stroke last:border-none">
      <div className="w-[280px] pr-[20px]">
        {title === "Start" ? (
          <StartIcon size="40" className="mb-6" />
        ) : (
          <EndIcon size="40" className="mb-6" />
        )}
        <h4 className="text-lg text-accent-dark mb-2">{title}</h4>
        <p className="text-sm text-textLink">{description}</p>
      </div>
      <div className="w-[calc(100%_-_280px)] pl-[24px] xxl:pl-[94px]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
