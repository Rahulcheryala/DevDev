import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const Connector = ({
  onClick,
  onlyConnector = false,
}: {
  onClick: () => void;
  onlyConnector?: boolean;
}) => {
  return (
    <div
      className={
        onlyConnector
          ? ""
          : `relative -right-[50px] -top-[150px] items-center flex justify-center`
      }
    >
      <div className="flex-[1] whitespace-nowrap relative overflow-hidden after:content-[''] after:tracking-[1px] after:text-[10px] after:text-[#9cbfdb] after:inline-block"></div>
      <div
        className="h-[26px] w-[26px] rounded-[25%] bg-[#0E77D3] cursor-pointer flex fill-[white] text-[white] justify-center items-center"
        onClick={onClick}
      >
        <MdOutlineAdd />
      </div>
    </div>
  );
};

export default Connector;
