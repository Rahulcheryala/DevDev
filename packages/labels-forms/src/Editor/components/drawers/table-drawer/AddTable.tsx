import React, { createRef, useEffect, useState } from "react";
import { useEditor } from "../../../context/EditorContext";
import { tableCSS, toolBarItems, undoActionType } from "../../../consts";
import { ColumnDef } from "@tanstack/react-table";
import TableV2 from "../../tanstack-table/TableV2";
import { ScenaElementLayer } from "../../../types";
import { createLayer } from "../../managers/LayerManager";
import { useStoreStateValue } from "@scena/react-store";
import { $editor, $layerManager } from "../../../stores/stores";
import useUndoRedo from "../../../hooks/useUndoRedo";

type ColumnValue = string | number | boolean | null;

type DataRow = {
  [key: string]: ColumnValue;
};

type AddTableProps = {
  onClose: (value: boolean) => void;
};

const AddTable = ({ onClose }: AddTableProps) => {
  const { setSelectedTool } = useEditor();
  const editorRef = useStoreStateValue($editor);
  const layerManager = useStoreStateValue($layerManager);
  const componentRef = createRef<HTMLDivElement>();
  const { addToUndo } = useUndoRedo();

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);

  const handleBoxClick = (rowIndex: number, columnIndex: number): void => {
    setSelectedRow(rowIndex);
    setSelectedColumn(columnIndex);
  };

  const isHighlighted = (rowIndex: number, columnIndex: number): boolean => {
    if (selectedRow !== null && selectedColumn !== null) {
      return rowIndex <= selectedRow && columnIndex <= selectedColumn;
    }
    return false;
  };

  const handleTableClick = async (): Promise<void> => {
    const numRows = selectedRow !== null ? selectedRow + 1 : 0;
    const numColumns = selectedColumn !== null ? selectedColumn + 1 : 0;

    const initialColumns: Array<ColumnDef<DataRow, ColumnValue>> = Array.from(
      { length: numColumns },
      (_, colIndex) => ({
        id: `col${colIndex + 1}`,
        header: `Column ${colIndex + 1}`,
        enableResizing: true,
        accessorKey: `col${colIndex + 1}`,
      }),
    );

    const initialData: DataRow[] = Array.from({ length: numRows }, () => {
      const row: DataRow = {};
      for (let colIndex = 0; colIndex < numColumns; colIndex++) {
        row[`col${colIndex + 1}`] = "";
      }
      return row;
    });

    const layers: ScenaElementLayer[] = [
      createLayer({
        metaData: {
          isHeaderVisible: true,
        },
        type: "table",
        title: "table",
        style: {
          width: "auto",
          height: "auto",
        },
        jsx: (() => {
          const tableRef = createRef<HTMLDivElement>();

          return (
            <div className="absolute h-auto w-auto">
              <TableV2
                ref={tableRef}
                columns={initialColumns}
                rows={initialData}
                tableCss={tableCSS[3]}
              />
            </div>
          );
        })(),
      }),
    ];

    await editorRef.current!.setLayers([...layerManager.layers, ...layers]);
    await editorRef.current!.setSelectedLayers(layers);

    addToUndo({ operation: undoActionType.ADD, addedLayer: layers[0] });
    setSelectedTool(toolBarItems.TABLE);
    onClose(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        onClose(false);
        setSelectedTool("");
      }
    };

    if (typeof document !== "undefined" && typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [onClose, componentRef, setSelectedTool]);

  return (
    <div
      ref={componentRef}
      className={`bg-white rounded-[10px] p-[16px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] 
      top-[100%] left-[360px] absolute w-[300px]`}
    >
      <p className="text-[14px] font-medium leading-[20px] mb-[8px]">
        Add table
      </p>

      <div className="flex flex-wrap mx-[-4px]">
        {Array.from({ length: 60 }, (_, index) => {
          const rowIndex = Math.floor(index / 10);
          const columnIndex = index % 10;
          const highlight = isHighlighted(rowIndex, columnIndex);

          return (
            <div className="px-[4px] w-[calc(100%_/_10)]" key={index}>
              <button
                type="button"
                className={`w-[20px] h-[20px] border rounded-[4px] border-[#E9E9EE] 
                ${
                  highlight
                    ? "bg-[#0E77D3] border-[#0E77D3]"
                    : "hover:bg-[rgba(14,_119,_211,_0.08)] hover:border-[#0E77D3]"
                }`}
                onClick={handleTableClick}
                onMouseEnter={() => handleBoxClick(rowIndex, columnIndex)}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddTable;
