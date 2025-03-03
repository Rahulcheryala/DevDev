import React from "react";
import { Space } from "antd";

type FileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
};

const FileMenuItem: React.FC<FileMenuItemProps> = ({
  icon,
  label,
  onClick,
  href,
}) => {
  return (
    <a
      href={href || "#"}
      onClick={onClick}
      className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] block rounded-[10px] 
                 text-accent-primary tracking-wider leading-5 font-suisseIntl 
                 font-light text-[14px] hover:text-[#19110B]"
    >
      <Space>
        {icon} {label}
      </Space>
    </a>
  );
};

export default FileMenuItem;
