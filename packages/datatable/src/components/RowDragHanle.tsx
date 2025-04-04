import { useSortable } from "@dnd-kit/sortable";
import { DragIcon } from "@zeak/icons";
import { cn } from "@zeak/react";

const RowDragHandleCell = ({ rowId, isSelected }: { rowId: string, isSelected?: boolean }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button className="px-2" {...attributes} {...listeners}>
      <DragIcon className={cn("h-4 w-4 cursor-pointer text-white hover:text-gray-500", isSelected && "text-gray-500")} />
    </button>
  );
};

export default RowDragHandleCell;
