import React from "react";
import { Space, Divider } from "antd";
import PropTypes from "prop-types";

type StatusOptionProps = {
  label: string;
  onClick: () => void;
};

const StatusOption: React.FC<StatusOptionProps> = ({ label, onClick }) => {
  return (
    <>
      <a
        onClick={onClick}
        href="#"
        className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] 
        block rounded-[10px] text-[14px] text-accent-primary tracking-wider 
        leading-5 font-suisseIntl font-light hover:text-[#19110B]"
      >
        <Space>{label}</Space>
      </a>
      <Divider className="my-[2px] border-[rgba(0,_0,_0,_0.06)]" />
    </>
  );
};

StatusOption.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StatusOption;
