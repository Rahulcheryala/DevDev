import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { FormField as IFormField } from "~/types/form";
import { FormField } from "./FormField";

interface DraggableFormFieldProps {
  field: IFormField;
  index: number;
  onUpdate: (field: IFormField) => void;
  onDelete: (id: string) => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}

export function DraggableFormField({
  field,
  index,
  onUpdate,
  onDelete,
  moveField,
}: DraggableFormFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "FORM_FIELD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "FORM_FIELD",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`transition-opacity ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <FormField field={field} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}
