import { useSortable } from "@dnd-kit/sortable";
import { DragIcon } from "@zeak/icons";

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });
  return (
    <button className="px-2" {...attributes} {...listeners}>
      <DragIcon className="h-4 w-4 cursor-pointer text-white hover:text-gray-500" />
    </button>
  );
};

export default RowDragHandleCell;
