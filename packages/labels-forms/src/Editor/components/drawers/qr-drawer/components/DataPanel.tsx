import React from "react";

type DataPanelProps = {
  label: string;
  icon: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const DataPanel: React.FC<DataPanelProps> = ({
  label,
  icon,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="py-[24px] px-[20px] border-b border-stroke-secondary">
      <p className="text-sm leading[20px] text-accent-primary font-suisseIntl mr-auto mb-[20px]">
        {label}
      </p>
      <div className="flex justify-between gap-2 w-full">
        <div
          className="relative border border-stroke-secondary 
        rounded-[10px] w-full flex items-center px-[12px] py-[10px] h-[40px]"
        >
          <span className="w-[16px] mr-[8px]">
            <img src={icon} alt="icon" />
          </span>
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-[14px] leading-[20px] outline-none px-[8px] 
            border-0 rounded-0 border-l border-[#DCDCE0]"
          />
        </div>
      </div>
    </div>
  );
};

export default DataPanel;
