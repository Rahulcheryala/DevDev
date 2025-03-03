import React from "react";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  DownArrowIcon,
} from "../../icons";
import TableButton from "./TableButton";
import Select from "antd/es/select";
import Space from "antd/es/space";
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { ColorPickerPanel } from "../../barcode-drawer/components";
import { ITableCellText } from "../../../../types";

interface TextFormattingPanelProps {
  tableTextProperties: ITableCellText;
  setTableTextProperties: React.Dispatch<React.SetStateAction<ITableCellText>>;
  fontSizeOptions: Array<{ label: string; value: string }>;
}

const TextFormattingPanel: React.FC<TextFormattingPanelProps> = ({
  tableTextProperties,
  setTableTextProperties,
  fontSizeOptions,
}) => {
  // Text formatting buttons for bold, italic, underline, strike
  const textStyleButtons = [
    {
      icon: <BoldOutlined size={20} />,
      active: tableTextProperties.bold,
      onClick: () => {
        const newBoldValue = !tableTextProperties.bold;
        setTableTextProperties({ ...tableTextProperties, bold: newBoldValue });
      },
    },
    {
      icon: <ItalicOutlined size={20} />,
      active: tableTextProperties.italic,
      onClick: () => {
        const newItalicValue = !tableTextProperties.italic;
        setTableTextProperties({
          ...tableTextProperties,
          italic: newItalicValue,
        });
      },
    },
    {
      icon: <UnderlineOutlined size={20} />,
      active: tableTextProperties.underline,
      onClick: () => {
        const newUnderlineValue = !tableTextProperties.underline;
        setTableTextProperties({
          ...tableTextProperties,
          underline: newUnderlineValue,
        });
      },
    },
    {
      icon: <StrikethroughOutlined size={20} />,
      active: tableTextProperties.strike,
      onClick: () => {
        const newStrikeValue = !tableTextProperties.strike;
        setTableTextProperties({
          ...tableTextProperties,
          strike: newStrikeValue,
        });
      },
    },
  ];

  // Text alignment buttons for left, center, right, justify
  const alignmentButtons = [
    { icon: <AlignLeft />, align: "left" },
    { icon: <AlignCenter />, align: "center" },
    { icon: <AlignRight />, align: "right" },
    { icon: <AlignJustify />, align: "justify" },
  ];

  return (
    <div className="pb-[24px] px-[20px]">
      {/* Font Select */}
      <Select
        defaultValue="Sans Serif"
        style={{ height: 40, width: "100%" }}
        className="ant-custom-select"
        suffixIcon={<DownArrowIcon />}
      >
        <Space className="flex justify-between">
          <div>Montserrat</div>
        </Space>
      </Select>

      {/* Font weight and size select */}
      <div className="flex flex-row mt-[14px]">
        <div className="w-[calc(100%_-_88px)] pr-[14px]">
          <Select
            defaultValue="Bold"
            style={{ height: 40, width: "100%" }}
            className="ant-custom-select"
            suffixIcon={<DownArrowIcon />}
          />
        </div>
        <div className="w-[88px]">
          <Select
            options={fontSizeOptions}
            defaultValue="16px"
            style={{ height: 40, width: "100%" }}
            className="ant-custom-select"
            suffixIcon={<DownArrowIcon />}
          />
        </div>
      </div>

      {/* Text Formatting (Bold, Italic, Underline, Strike) */}
      <div className="flex flex-row flex-wrap mx-[-7px] mt-[14px]">
        {textStyleButtons.map((button, index) => (
          <div className="px-[7px] w-1/4" key={index}>
            <TableButton
              onClick={button.onClick}
              icon={button.icon}
              className={`${button.active ? "bg-black text-white" : ""}`}
            />
          </div>
        ))}
      </div>

      {/* Text Alignment */}
      <div className="flex flex-row flex-wrap mx-[-7px] mt-[14px]">
        {alignmentButtons.map((button, index) => (
          <div className="px-[7px] w-1/4" key={index}>
            <TableButton
              onClick={() =>
                setTableTextProperties({
                  ...tableTextProperties,
                  align: button.align,
                })
              }
              icon={button.icon}
            />
          </div>
        ))}
      </div>

      {/* Color picker */}
      <div className="flex mt-[14px] w-full">
        <ColorPickerPanel
          value={tableTextProperties.color}
          onChange={(hex) =>
            setTableTextProperties({ ...tableTextProperties, color: hex })
          }
          onNumericChange={() => {}}
          className="pl-0 w-full"
        />
      </div>
    </div>
  );
};

export default TextFormattingPanel;
