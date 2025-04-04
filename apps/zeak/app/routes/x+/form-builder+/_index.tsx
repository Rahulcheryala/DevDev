"use client";
import { IconButton, Input, toast } from "@zeak/react";
import { useState } from "react";
import { BiPlus, BiRefresh, BiShare } from "react-icons/bi";
import type {
  FormField as IFormField,
  FormData,
  FieldType,
} from "~/types/form";
import { AddFieldDialog, FormField } from "~/modules/form-builder";
import { MdOutlinePreview } from "react-icons/md";
import { FormPreview } from "~/modules/form-builder/FormPreview";
import { Reorder } from "framer-motion";

const useLocalStorage = <T,>(key: string, initialValue: T) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

const FormBuilder = () => {
  const [formData, setFormData] = useLocalStorage<FormData>("formData", {
    id: "1",
    title: "Untitled Form",
    fields: [],
  });
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleAddField = (type: FieldType) => {
    const newField: IFormField = {
      id: crypto.randomUUID(),
      type,
      question: "Untitled Question",
      required: false,
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));
    setIsAddFieldOpen(false);
  };

  const handleUpdateField = (updatedField: IFormField) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === updatedField.id ? updatedField : field,
      ),
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
  };

  const handleClearForm = () => {
    if (
      confirm("Are you sure you want to clear the form? This cannot be undone.")
    ) {
      // First, remove the item from localStorage
      window.localStorage.removeItem("formData");

      // Then update the state with initial values
      setFormData({
        id: crypto.randomUUID(), // Generate a new ID instead of hardcoding "1"
        title: "Untitled Form",
        fields: [],
      });
      toast.success("Form cleared successfully");
    }
  };

  const handleCopyFormLink = () => {
    console.log("sdf");

    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Form link copied to clipboard");
  };

  // const moveField = (dragIndex: number, hoverIndex: number) => {
  //   const fields = [...formData.fields];
  //   const dragField = fields[dragIndex];
  //   fields.splice(dragIndex, 1);
  //   fields.splice(hoverIndex, 0, dragField);
  //   setFormData((prev) => ({ ...prev, fields }));
  // };

  if (isPreviewOpen) {
    return (
      <FormPreview
        formData={formData}
        onClose={() => setIsPreviewOpen(false)}
      />
    );
  }

  return (
    <div className="max-w-3xl min-h-full border-x border-stoke mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="text-3xl font-bold w-full border-none focus:outline-none focus:ring-0"
          />
        </div>

        <div className="relative">
          <Reorder.Group
            axis="y"
            values={formData.fields}
            onReorder={(newOrder) =>
              setFormData((prev) => ({ ...prev, fields: newOrder }))
            }
            className="space-y-4"
          >
            {formData.fields.map((field: IFormField) => (
              <Reorder.Item key={field.id} value={field}>
                <FormField
                  field={field}
                  onUpdate={handleUpdateField}
                  onDelete={handleDeleteField}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <div className="flex flex-col gap-2 sticky bottom-8 -ml-[100px]">
            <IconButton
              className="w-[56px]"
              size="xl"
              aria-label="Add Question"
              onClick={() => {
                console.log("sdfsdf");
                if (formData.fields?.length > 18) {
                  toast.error("You can only add up to 18 questions");
                  return;
                }
                setIsAddFieldOpen(true);
              }}
              icon={<BiPlus className="h-4 w-4 mr-2" />}
            />
            <IconButton
              className="w-[56px]"
              size="xl"
              aria-label="Preview Form"
              disabled={formData.fields?.length === 0}
              onClick={() => setIsPreviewOpen(true)}
              icon={<MdOutlinePreview className="h-6 w-6 mr-2" />}
            />
            <IconButton
              className="w-[56px]"
              aria-label="Share Form"
              size="xl"
              onClick={handleCopyFormLink}
              icon={<BiShare />}
            />
            <IconButton
              variant="destructive"
              aria-label="Clear Form"
              disabled={formData.fields?.length === 0}
              size="xl"
              className="w-[56px]"
              onClick={handleClearForm}
              icon={<BiRefresh />}
            />
          </div>
        </div>
      </div>
      {isAddFieldOpen && (
        <AddFieldDialog
          open={isAddFieldOpen}
          onOpenChange={setIsAddFieldOpen}
          onAddField={handleAddField}
        />
      )}
    </div>
  );
};

export default FormBuilder;
