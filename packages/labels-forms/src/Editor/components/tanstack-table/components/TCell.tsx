import React, { ReactNode, useEffect, useState } from "react";
import { Cell, Row } from "@tanstack/react-table";
import TEditableCell from "./TEditableCell";
import { Divider, Dropdown, Space } from "antd";
import { useStoreValue } from "@scena/react-store";
import { $selectedLayers } from "../../../stores/stores";
import { ScenaElementLayer } from "../../../types";
import { getColumnRef } from "../../../utils";

type TCellProps = {
  cell: Cell<any, any>;
  onCellClick: (cell: Cell<any, any>) => void;
  isActive?: boolean;
  styles?: React.CSSProperties;
  rowSpan?: number;
  colSpan?: number;
  cellColor?: string;
  width?: string | number;
  height?: string | number;
  row?: Row<any>;
  cellBorder?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    borderColor?: string;
    borderThickness?: string;
    borderOpacity?: number;
    borderStyle?: string;
  };
  changeCellColor?: (cellId: string, color: string) => void;
};

type MenuItemProps = {
  onClick?: () => void;
  children: ReactNode;
};

const containsTable = (htmlContent: string): boolean => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  return tempDiv.querySelector("table") !== null;
};

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => (
  <a
    onClick={onClick}
    href="#"
    className="px-[12px] py-[10px] w-full hover:bg-[rgba(54,_73,_255,_0.12)] 
              block rounded-[10px] text-accent-primary tracking-wider leading-5 
              font-suisseIntl font-medium text-[14px] hover:text-[#19110B]"
  >
    {children}
  </a>
);

const TCell: React.FC<TCellProps> = ({
  cell,
  onCellClick,
  isActive,
  rowSpan,
  colSpan,
  cellColor,
  width,
  height,
  cellBorder,
  row,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const selectedLayersStore = useStoreValue($selectedLayers);
  const [tableRef, setTableRef] = useState<any>(null);

  useEffect(() => {
    const tableRef = (selectedLayersStore.value[0] as ScenaElementLayer)?.jsx
      ?.props?.children?.ref;
    setTableRef(tableRef);
  }, [selectedLayersStore.value[0]]);

  const handleCellClick = () => {
    setIsEditMode(true);
  };

  const handleDelete = (field: "row" | "col") => {
    if (tableRef?.current) {
      field === "row"
        ? tableRef.current.deleteRow()
        : tableRef.current.deleteColumns();
    }
  };

  const handleAdd = (field: "row" | "col") => {
    if (tableRef?.current) {
      field === "row"
        ? tableRef.current.addRow("down")
        : tableRef.current.addColumns("right");
    }
  };

  const hexToRgb = (hex: string): string => {
    if (!hex || typeof hex !== "string") return "0, 0, 0";
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  const getBorderStyle = (
    side: "top" | "right" | "bottom" | "left",
  ): string => {
    if (isActive) {
      return `4px solid rgba(0, 0, 139, 1)`;
    } else if (cellBorder?.[side]) {
      return `${cellBorder.borderThickness || "2px"} ${
        cellBorder.borderStyle || "solid"
      } rgba(${hexToRgb(cellBorder.borderColor || "#000000")}, ${
        cellBorder.borderOpacity || 1
      })`;
    }
    return "1px solid #000000";
  };

  useEffect(() => {
    if (isActive && row) {
      const existingTableRef = getColumnRef(row.original, cell.column.id);

      if (existingTableRef?.current) {
        (cell.getContext().table.options.meta as any).setTableCellQuill(
          existingTableRef,
        );
      }
    }
  }, [cell, row]);

  const isTableContent = containsTable(cell.getValue());

  return (
    <Dropdown
      trigger={["contextMenu"]}
      dropdownRender={() => (
        <div className="custom-dropdown-menu">
          <MenuItem>
            <div className="flex flex-row space-x-[130px] space-between items-center w-[250px]">
              <div>Copy</div>
            </div>
          </MenuItem>
          <MenuItem>
            <Space className="flex flex-row space-x-[68px]">
              <div>Copy Formatting</div>
            </Space>
          </MenuItem>
          <MenuItem>
            <Space>Paste</Space>
          </MenuItem>
          <Divider className="my-[2px] border-[rgba(0,_0,_0,_0.06)]" />
          <MenuItem onClick={() => handleAdd("col")}>
            <Space>Add 1 column</Space>
          </MenuItem>
          <MenuItem onClick={() => handleDelete("col")}>
            <Space>Delete 1 column</Space>
          </MenuItem>
          <Divider className="my-[2px] border-[rgba(0,_0,_0,_0.06)]" />
          <MenuItem onClick={() => handleAdd("row")}>
            <Space>Add 1 line</Space>
          </MenuItem>
          <MenuItem onClick={() => handleDelete("row")}>
            <Space>Delete 1 line</Space>
          </MenuItem>
          <Divider className="my-[2px] border-[rgba(0,_0,_0,_0.06)]" />
          <MenuItem>
            <Space>Move the column to the right</Space>
          </MenuItem>
          <MenuItem>
            <Space>Move the line to the down</Space>
          </MenuItem>
        </div>
      )}
    >
      <td
        key={cell.id}
        className={`px-2 py-2 border-r h-full w-full text-wrap border-black ${
          isActive ? "active-cell-class" : ""
        }`}
        onDoubleClick={handleCellClick}
        onClick={() => onCellClick(cell)}
        rowSpan={rowSpan}
        colSpan={colSpan}
        style={{
          background: cellColor || "",
          color: "black",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          width: width || "100px",
          height: height || "50px",
          borderTop: getBorderStyle("top"),
          borderRight: getBorderStyle("right"),
          borderBottom: getBorderStyle("bottom"),
          borderLeft: getBorderStyle("left"),
        }}
      >
        {isEditMode && !isTableContent ? (
          <TEditableCell
            key={cell.id}
            cell={cell}
            getValue={cell.getValue}
            table={cell.getContext().table.options.meta as any}
            column={cell.column}
            row={cell.row}
            onBlur={() => setIsEditMode(false)}
            isActive={!!isActive}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: cell.getValue() }} />
        )}
      </td>
    </Dropdown>
  );
};

export default TCell;
