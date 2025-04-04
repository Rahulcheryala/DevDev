import React, { useEffect, useRef, useState } from "react";

import "./index.css";
import { Collapse, MenuProps } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { useLayers } from "../../../context/LayersContext";
import { useStoreStateSetValue, useStoreValue } from "@scena/react-store";
import { $selectedLayers, $tableSkin } from "../../../stores/stores";
import {
  BorderStyleKey,
  CellSpacing,
  ITableCellText,
  ScenaElementLayer,
} from "../../../types";

import { DownArrowIcon } from "../icons";
import useQuillManager from "../../../hooks/useQuillManager";
import {
  Direction,
  defaultCellBorderStyles,
  defaultTextProperties,
  imageOptions,
  quillFontSizes,
  tableCSS,
} from "../../../consts";
import {
  CellFillPanel,
  CellFormattingPanel,
  CellSpacingPanel,
  TableBorderPanel,
  TableFormattingPanel,
  TableSkins,
  TableStrokePanel,
  TextFormattingPanel,
} from "./components";

const TableDrawer = () => {
  const [tableRef, setTableRef] = useState<any>();
  const { setTableCssProperties } = useLayers();
  const selectedLayersStore = useStoreValue($selectedLayers);
  const [tableTextProperties, setTableTextProperties] =
    useState<ITableCellText>(defaultTextProperties);
  const setTableSkin = useStoreStateSetValue($tableSkin);

  const { formatText } = useQuillManager();
  const quillTextRef = useRef<any>();
  const quillTextPropertiesRef = useRef<ITableCellText>(defaultTextProperties);
  const [cellSpacing, setCellSpacing] = useState<CellSpacing>({
    cellWidth: 0,
    cellHeight: 0,
  });
  const fontSizeOptions = quillFontSizes?.map((font: string) => ({
    value: font,
    label: font,
  }));
  // Table border styles
  const [cellBorderStyles, setCellBorderStyles] = useState(
    defaultCellBorderStyles,
  );

  const items: MenuProps["items"] = [
    {
      label: <button onClick={() => handleBorderStyles("solid")}>Solid</button>,
      key: "0",
    },
    {
      label: (
        <button onClick={() => handleBorderStyles("dashed")}>Dashed</button>
      ),
      key: "1",
    },
    {
      label: (
        <button onClick={() => handleBorderStyles("dotted")}>Dotted</button>
      ),
      key: "2",
    },
  ];

  // Applying text formatting on table cell text
  useEffect(() => {
    if (tableRef?.current) {
      // Fetch active cells using the imperative handle method
      const activeCells = tableRef.current.selectedCells();

      if (activeCells && activeCells.length > 0) {
        const activeCell = activeCells[0]; // Assuming only 1 active cell for now
        const textRef = tableRef.current.getTextRef();
        if (textRef) {
          const activeQuillRef = quillTextRef?.current
            ? quillTextRef.current
            : textRef;

          // Apply formatting using the formatText function
          formatText(
            activeQuillRef, // Pass the Quill reference
            tableTextProperties, // The formatting properties
          );

          // Get the updated content from Quill after formatting
          const quill = activeQuillRef.getEditor();
          const updatedHTML = quill.root.innerHTML;

          // Update the respective cell in the table using updateData
          const { rowIdx, columnId } = activeCell;

          tableRef.current.updateData(
            rowIdx,
            columnId,
            updatedHTML,
            activeQuillRef,
          );
        }
      }
    }
  }, [
    tableTextProperties, // Re-run effect when text properties change
    quillTextPropertiesRef.current, // Re-run effect when Quill ref changes
  ]);

  //Mapping table header to sidebar
  useEffect(() => {
    const tableRef = (selectedLayersStore.value[0] as ScenaElementLayer)?.jsx
      ?.props?.children?.ref;
    if (tableRef && tableRef.current) {
      setTableRef(tableRef);
    }
  }, [selectedLayersStore.value[0]]);

  useEffect(() => {
    // run tablecell border code here
    if (tableRef?.current) {
      tableRef.current.applyBorderPropertiesToSelectedCells(cellBorderStyles);
    }
  }, [cellBorderStyles]);

  const handleCssChange = (value: number) => {
    const cssObject = tableCSS[value];
    if (tableRef) {
      tableRef.current.updateTableCss(cssObject);
      setTableCssProperties(cssObject);
      setTableSkin(cssObject);
    }
  };

  const handleMergeCells = () => {
    tableRef.current.mergeCells();
  };

  const handleDemergeCells = () => {
    tableRef.current.demergeCells();
  };
  const handleAddColumn = (position: Direction.Right | Direction.Left) => {
    tableRef.current.addColumns(position);
  };

  const handleAddRow = (position: Direction.Down | Direction.Up) => {
    tableRef.current.addRow(position);
  };

  const handleSetCellFill = (color: string) => {
    const selectedCells = tableRef.current.selectedCells();
    const selectedCellIds = selectedCells?.map((val: any) => val.cellId);
    tableRef.current.setCellBgColor(selectedCellIds, color);
  };

  const resizeCell = (value: number, target: string) => {
    if (tableRef.current) {
      const valueInString = value.toString();
      const selectedCells = tableRef.current.selectedCells();
      if (selectedCells.length) {
        if (target === "width") {
          tableRef.current.resizeCell(
            selectedCells[0].cellId,
            `${valueInString}px`,
            "",
          );
          setCellSpacing({
            ...cellSpacing,
            cellWidth: value,
          });
        } else {
          tableRef.current.resizeCell(
            selectedCells[0].cellId,
            "",
            `${valueInString}px`,
          );

          setCellSpacing({
            ...cellSpacing,
            cellHeight: value,
          });
        }
      }
    }
  };

  const handleTableBorder = (target: string) => {
    tableRef.current.applyBorderToSelectedCells(target);
  };

  const handleTableClearBorder = () => {
    tableRef.current.clearAllBorders();
  };

  const borderFormattingMap = {
    borderColor: (borderColor: string) => handleBorderColor(borderColor),
    borderOpacity: (borderOpacity: string) =>
      handleBorderOpacity(borderOpacity),
    borderThickness: (borderThickness: string) =>
      handleBorderThickness(borderThickness),
    borderStyles: (borderStyle: string) => handleBorderStyles(borderStyle),
  };

  const handleBorderFormatting = (style: BorderStyleKey, value: string) => {
    if (!style || !value) return;
    borderFormattingMap[style](value as string);
    setCellBorderStyles({
      ...cellBorderStyles,
    });
  };

  const handleBorderStyles = (borderStyle: string) => {
    setCellBorderStyles({
      ...cellBorderStyles,
      borderStyle,
    });
  };

  const handleBorderColor = (borderColor: string) => {
    setCellBorderStyles({
      ...cellBorderStyles,
      borderColor,
    });
  };
  const handleBorderThickness = (borderThickness: string) => {
    setCellBorderStyles({
      ...cellBorderStyles,
      borderThickness,
    });
  };
  const handleBorderOpacity = (borderOpacity: string) => {
    setCellBorderStyles({
      ...cellBorderStyles,
      borderOpacity,
    });
  };

  const clearTableFormatting = () => {
    if (!tableRef.current) {
      return;
    }
    tableRef.current.clearAllFormatting();
  };

  return (
    <div className="h-[calc(100vh_-_10em)] overflow-auto">
      <div className="h-full pb-6">
        <div className="h-full custom-scrollbar overflow-x-hidden overflow-y-auto">
          <Collapse
            defaultActiveKey={["1"]}
            className="custom-collapse"
            expandIcon={() => <DownArrowIcon />}
            expandIconPosition={"end"}
          >
            {/* Table styles */}
            <CollapsePanel header="Table Styles" key="1">
              <div className="px-[24px] pb-[16px]">
                <div className="flex flex-wrap mx-[-4px]">
                  {imageOptions.map((option, index) => (
                    <TableSkins
                      key={index}
                      src={option.src}
                      alt={option.alt}
                      onClick={() => handleCssChange(index)}
                    />
                  ))}
                </div>
              </div>
            </CollapsePanel>

            {/* Table formatting */}
            <CollapsePanel header="Table formatting" key="2">
              <TableFormattingPanel
                resizeCell={resizeCell}
                handleAddColumn={handleAddColumn}
                handleAddRow={handleAddRow}
                clearTableFormatting={clearTableFormatting}
              />
            </CollapsePanel>

            {/* Cell formatting */}
            <CollapsePanel header="Cell formatting" key="3">
              <CellFormattingPanel
                handleDemergeCells={handleDemergeCells}
                handleMergeCells={handleMergeCells}
              />
            </CollapsePanel>

            {/* Table border */}
            <CollapsePanel header="Table Border" key="4">
              <TableBorderPanel
                handleTableBorder={handleTableBorder}
                handleTableClearBorder={handleTableClearBorder}
              />
            </CollapsePanel>

            {/* Table stroke */}
            <CollapsePanel header=" Table Stroke" key="5">
              <TableStrokePanel
                handleBorderFormatting={handleBorderFormatting}
                items={items}
              />
            </CollapsePanel>

            {/* Cell fill */}
            <CollapsePanel header="Cell Fill" key="6">
              <CellFillPanel handleSetCellFill={handleSetCellFill} />
            </CollapsePanel>

            {/* cell spacing */}
            <CollapsePanel header="Spacing between cells" key="7">
              <CellSpacingPanel
                resizeCell={resizeCell}
                cellSpacing={cellSpacing}
              />
            </CollapsePanel>

            {/* Text formatting */}
            <CollapsePanel header="Text" key="8">
              <TextFormattingPanel
                tableTextProperties={tableTextProperties}
                setTableTextProperties={setTableTextProperties}
                fontSizeOptions={fontSizeOptions}
              />
            </CollapsePanel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default TableDrawer;
