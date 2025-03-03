import React, { useEffect, useRef, useState } from "react";
import { Column, Row, TableMeta } from "@tanstack/react-table";
import ReactQuill from "react-quill";
import { getColumnRef } from "../../../utils";

interface ExtendedTableMeta extends TableMeta<any> {
  updateData: (
    rowIndex: number,
    columnId: string,
    value: any,
    quillRef: React.RefObject<ReactQuill>,
  ) => void;
  setTableCellQuill: (quillRef: React.RefObject<ReactQuill>) => void;
}

export interface EditableTableCellProps {
  getValue: () => any;
  row: Row<any>;
  column: Column<any>;
  table: ExtendedTableMeta;
  style?: React.CSSProperties;
  cell: any;
  isActive: boolean;
  onBlur?: () => void; // Made optional with ?
  setCellQuill?: (quill: React.RefObject<ReactQuill>) => void; // Made optional with ?
}

const TEditableCell: React.FC<EditableTableCellProps> = ({
  getValue,
  row,
  column,
  table,
  cell,
  isActive,
  onBlur,
  setCellQuill,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (isActive) {
      const existingCellRef = getColumnRef(row?.original, cell.column.id);
      const currentQuillRef = existingCellRef?.current
        ? existingCellRef
        : quillRef;
      if (currentQuillRef.current) {
        table.setTableCellQuill(currentQuillRef);
        setCellQuill?.(currentQuillRef); // Optional chaining for setCellQuill
      }
    }
  }, [cell.column.id]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      const existingCellRef = getColumnRef(row?.original, cell.column.id);
      const currentQuillRef = existingCellRef?.current
        ? existingCellRef
        : quillRef;

      if (currentQuillRef?.current) {
        const editor = currentQuillRef.current.getEditor();
        const quillValue = editor.root.innerHTML;
        table.updateData(row.index, column.id, quillValue, currentQuillRef);
      }

      setValue(newValue);
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      modules={{ toolbar: false }}
      style={{ width: "100%", height: "100%" }}
      value={value}
      onChange={handleChange}
      onBlur={onBlur} // Added onBlur handler
      className="barcode-quill-text"
    />
  );
};

export default TEditableCell;
