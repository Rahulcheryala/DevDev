import React, { useState } from "react";
// To be used later
// import Footer from "./uis/EditorFooter";
import { Dropdown, Space } from "antd";
import { ArrowLeftIcon, DropdownArrow } from "../drawers/icons";
import { PrinterOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useEditor } from "../../context/EditorContext";

type PreviewProps = {
  onBackToDesigner: () => void;
};

const Preview: React.FC<PreviewProps> = ({ onBackToDesigner }) => {
  const [triggerDropdown, setTriggerDropdown] = useState<boolean>(false);
  const { previewThumbnail, documentName } = useEditor();

  return (
    <>
      <div className="px-[28px] py-[16px] border-b border-stroke-primary">
        <div className="flex items-center mx-[-5px] justify-between">
          <div className="w-[25%]  px-[5px]">
            <button
              className="text-base text-accent-primary flex items-center 
              h-[40px] p-0 font-suisseIntl hover:text-accent-primary"
            >
              <span onClick={onBackToDesigner} className="mr-2 cursor-pointer">
                <ArrowLeftIcon />
              </span>{" "}
              Designer
            </button>
          </div>
          <div className="px-[5px]">
            <p
              className="text-xl text-accent-primary font-suisseIntl 
            font-semibold leading-[0.5px] flex items-center justify-center h-[40px]"
            >
              {documentName}
            </p>
          </div>
          <div className="px-[5px]">
            <div className="flex flex-row justify-end items-center space-x-[12px]">
              <Dropdown
                trigger={["click"]}
                dropdownRender={() => (
                  <div className="rounded-[10px] bg-white p-[8px] shadow">
                    <a
                      href="#"
                      className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] 
                                  block rounded-[10px] text-accent-primary tracking-wider leading-5 
                                  font-suisseIntl font-light text-[14px] hover:text-[#19110B]"
                    >
                      <Space>Actual size (100%)</Space>
                    </a>
                    <a
                      href="#"
                      className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] 
                                  block rounded-[10px] text-accent-primary tracking-wider leading-5 
                                  font-suisseIntl font-light text-[14px] hover:text-[#19110B]"
                    >
                      <Space>Actual size (70%)</Space>
                    </a>
                    <a
                      href="#"
                      className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] 
                                  block rounded-[10px] text-accent-primary tracking-wider leading-5 
                                  font-suisseIntl font-light text-[14px] hover:text-[#19110B]"
                    >
                      <Space>Actual size (50%)</Space>
                    </a>
                  </div>
                )}
                open={triggerDropdown}
                onOpenChange={(flag) => setTriggerDropdown(flag)}
                className="cursor-pointer"
              >
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setTriggerDropdown(true);
                  }}
                  className="min-w-[40px] h-[40px] flex items-center justify-center p-[15px] 
                  text-[14px] text-accent-primary tracking-wider leading-5 font-suisseIntl font-normal 
                  rounded-[10px] border border-stroke-primary"
                >
                  <Space>
                    Actual size (100%) <DropdownArrow />
                  </Space>
                </div>
              </Dropdown>
              <button
                className="text-sm font-suisseIntl text-accent-primary 
              border border-stroke-primary rounded-[100px] py-[5px] px-[28px] h-[40px]"
              >
                <ShareAltOutlined className="mr-[5px] text-base" /> Share
              </button>
              <button
                className="text-sm font-suisseIntl text-accent-primary 
              border border-stroke-primary rounded-[100px] py-[5px] px-[28px] h-[40px] min-w-[160px]"
              >
                <PrinterOutlined className="mr-[5px] text-base" /> Print
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-background-primary h-[calc(100vh_-_136px)] 
      flex items-center justify-center overflow-y-auto p-[20px]"
      >
        <div className="w-[100%] h-[100%] flex items-center justify-center">
          <img
            alt=""
            src={previewThumbnail}
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
      </div>
      {/* <div
        className={`w-full bg-white h-[56px] flex flex-grow items-center border-t-[1px] border-gray-200`}
      >
        <Footer />
      </div> */}
    </>
  );
};

export default Preview;
