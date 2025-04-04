import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "@zeak/react";
import {
  BiCalendar,
  BiAlignJustify,
  BiCheckSquare,
  BiChevronDown,
  BiListCheck,
  BiText,
  BiUpload,
  BiTimeFive,
} from "react-icons/bi";
import type { FieldType } from "~/types/form";

interface AddFieldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddField: (type: FieldType) => void;
}

const FIELD_TYPES = [
  { type: "text", icon: BiText, label: "Text Box" },
  { type: "textarea", icon: BiAlignJustify, label: "Text Area" },
  { type: "multipleChoice", icon: BiListCheck, label: "Multiple Choice" },
  { type: "checkbox", icon: BiCheckSquare, label: "Checkboxes" },
  { type: "dropdown", icon: BiChevronDown, label: "Dropdown" },
  { type: "date", icon: BiCalendar, label: "Date" },
  { type: "time", icon: BiTimeFive, label: "Time" },
  { type: "file", icon: BiUpload, label: "File Upload" },
] as const;

export function AddFieldDialog({
  open,
  onOpenChange,
  onAddField,
}: AddFieldDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {FIELD_TYPES.map(({ type, icon: Icon, label }) => (
            <Button
              key={type}
              variant="secondary"
              className="flex flex-col h-[100px] hover:text-card"
              onClick={() => onAddField(type as FieldType)}
            >
              <Icon className="h-6 w-6 mb-2" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
