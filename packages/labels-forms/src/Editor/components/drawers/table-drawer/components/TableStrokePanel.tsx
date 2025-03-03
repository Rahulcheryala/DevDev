import React from "react";
import {
  BarIcon,
  DopplerIcon,
  DropdownArrow,
  AngleUpIcon,
  AngleDownIcon,
} from "../../icons";
import TableButton from "./TableButton";

import { ColorPicker, Dropdown, MenuProps, Space } from "antd";
import { NumericInput } from "../../../shared";
import { CellBorderStyles } from "../../../../consts";
import { BorderStyleKey } from "../../../../types";

interface TableStrokePanelProps {
  handleBorderFormatting: (style: BorderStyleKey, value: string) => void;
  items: MenuProps["items"];
}

const TableStrokePanel: React.FC<TableStrokePanelProps> = ({
  handleBorderFormatting,
  items,
}) => {
  // Array to dynamically render buttons and inputs
  const inputs = [
    {
      type: "dropdown",
      content: (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Solid
              <DropdownArrow />
            </Space>
          </a>
        </Dropdown>
      ),
    },
    {
      type: "numeric",
      icon: <BarIcon />,
      onChange: (value: number) => {
        const thickness = `${value}px`;
        handleBorderFormatting(CellBorderStyles.BorderThickness, thickness);
      },
      min: 0,
    },
  ];

  return (
    <div className="px-[24px] pb-[16px]">
      <div className="flex flex-wrap mx-[-4px]">
        {inputs.map((input, index) => (
          <div
            className={`w-${index === 0 ? "2/4" : "2/4"} mb-[4px] px-[4px]`}
            key={index}
          >
            {input.type === "dropdown" ? (
              <div className="dropdown-menu h-[40px]">{input.content}</div>
            ) : (
              <NumericInput
                value={0}
                onChange={input.onChange ?? (() => {})}
                min={input.min}
                iconBeforeInput={input.icon}
                incrementIcon={<AngleUpIcon />}
                decrementIcon={<AngleDownIcon />}
              />
            )}
          </div>
        ))}

        {/* ColorPicker and Opacity Input */}
        <div className="w-full mb-[8px] px-[4px]">
          <div className="flex mx-[-4px]">
            <div className="w-[52px] h-[40px] px-[4px]">
              <TableButton onClick={() => {}} icon={<DopplerIcon />} />
            </div>
            <div className="w-[calc(100%_-_134px)] pr-[14px]">
              <ColorPicker
                showText
                style={{
                  padding: "3px 8px",
                  height: 40,
                  width: "100%",
                  borderRadius: 10,
                  justifyContent: "flex-start",
                }}
                onChange={(_, hex) =>
                  handleBorderFormatting(CellBorderStyles.BorderColor, hex)
                }
              />
            </div>
            <div
              className="relative 
                        flex items-center px-[8px] py-[8px] w-[100px] h-[40px]"
            >
              <NumericInput
                value={0.5}
                onChange={(value) =>
                  handleBorderFormatting(
                    CellBorderStyles.BorderOpacity,
                    value.toString(),
                  )
                }
                min={0}
                max={1}
                step={0.1}
                iconBeforeInput={null}
                incrementIcon={<AngleUpIcon />}
                decrementIcon={<AngleDownIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableStrokePanel;
