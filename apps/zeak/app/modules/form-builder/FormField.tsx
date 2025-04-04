import { Controller, useForm } from "react-hook-form";
import { BiCalendar, BiPencil, BiTime, BiTrash } from "react-icons/bi";
import { IconButton, Input } from "@zeak/react";
import type { FormField as IFormField } from "~/types/form";
import { FileUploadField } from "./fields/FileUploadField";
import { TbGripHorizontal } from "react-icons/tb";
import { OptionsField } from "./fields/OptionsField";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface FormFieldProps {
  field: IFormField;
  onUpdate: (field: IFormField) => void;
  onDelete: (id: string) => void;
}

export function FormField({ field, onUpdate, onDelete }: FormFieldProps) {
  const [inputValue, setInputValue] = useState(field.question);
  const [requiredValue, setRequiredValue] = useState(field.required);
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      ...field,
      options: field.options || ["Option 1"],
    },
  });

  const isEditing = watch("isEditing") || false;

  const onSubmit = (data: any) => {
    onUpdate({ ...field, ...data, isEditing: false });
  };

  const handleOptionsChange = (options: string[]) => {
    setValue("options", options);
    handleSubmit(onSubmit)();
  };

  const renderFieldInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <p className="border-b border-stroke py-2 inline-block">
            Long answer text
          </p>
        );

      case "multipleChoice":
        return (
          <div className="space-y-4">
            {!isEditing && (
              <ul>
                {field.options?.map((option, index) => (
                  <div key={index}>
                    <li className="flex items-center">
                      {" "}
                      <span className="h-4 w-4 rounded-full inline-block border border-stroke mr-2"></span>
                      <span>{option || `Option-${index + 1}`}</span>
                    </li>
                  </div>
                ))}
              </ul>
            )}
            {isEditing && (
              <OptionsField
                options={field.options || []}
                onChange={handleOptionsChange}
                isEditing={isEditing}
              />
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-4">
            {!isEditing && (
              <ul className="">
                {field.options?.map((option, index) => (
                  <ul key={index}>
                    <li className="flex items-center">
                      {" "}
                      <span className="h-4 w-4 rounded-sm inline-block border border-stroke mr-2"></span>
                      <span>{option || `Option-${index + 1}`}</span>
                    </li>
                  </ul>
                ))}
              </ul>
            )}
            {isEditing && (
              <OptionsField
                options={field.options || []}
                onChange={handleOptionsChange}
                isEditing={isEditing}
              />
            )}
          </div>
        );

      case "dropdown":
        return (
          <div className="space-y-4">
            {!isEditing && (
              <ol className="list-decimal pl-5">
                {field.options?.map((option, index) => (
                  <li key={index}>{option || `Option-${index + 1}`}</li>
                ))}
              </ol>
            )}
            {isEditing && (
              <OptionsField
                options={field.options || []}
                onChange={handleOptionsChange}
                isEditing={isEditing}
              />
            )}
          </div>
        );

      case "date":
        return (
          <React.Fragment>
            <p className="border-b border-stroke py-2 inline-flex items-center gap-2 inline-block">
              Month, day, year <BiCalendar />
            </p>
          </React.Fragment>
        );

      case "time":
        return (
          <p className="border-b border-stroke py-2 inline-flex items-center gap-2 inline-block">
            Hour, minute <BiTime />
          </p>
        );

      case "file":
        return (
          <FileUploadField
            showUpload={false}
            disabled={!isEditing}
            allowedTypes={field.allowedFileTypes || []}
            maxFiles={field.maxFiles || 1}
            maxFileSize={field.maxFileSize || 10}
            onChange={(fileConfig) => {
              console.log(field, fileConfig);

              onUpdate({
                ...field,
                allowedFileTypes: fileConfig.allowedTypes,
                maxFiles: fileConfig.maxFiles,
                maxFileSize: fileConfig.maxFileSize,
              });
            }}
          />
        );

      default:
        return (
          <p className="border-b border-stroke py-2 inline-block">
            Short answer text
          </p>
        );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-4 bg-card rounded-lg shadow-sm border relative group ${
        isEditing ? "border-l-[5px] border-accent-primary" : "border-stroke"
      }`}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
        <TbGripHorizontal className="h-5 w-5 text-accent-dark" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          {isEditing ? (
            <Controller
              control={control}
              name="question"
              render={({ field: { onChange, ...restField } }) => (
                <Input
                  {...restField}
                  onChange={(e) => {
                    onChange(e);
                    setInputValue(e.target.value); // Update local state
                    onUpdate({ ...field, question: e.target.value }); // Update field.question
                  }}
                  placeholder="Enter your question"
                  className="text-lg font-medium"
                />
              )}
            />
          ) : (
            <h3 className="text-lg font-medium">{field.question}</h3>
          )}

          <div className="flex items-center gap-2">
            <IconButton
              aria-label="edit"
              variant="primary"
              className="flex items-center justify-center"
              icon={<BiPencil className="h-4 w-4" />}
              onClick={() => setValue("isEditing", !isEditing)}
            />
            <IconButton
              aria-label="remove"
              variant="primary"
              className="flex items-center justify-center"
              icon={<BiTrash className="h-4 w-4" />}
              onClick={() => onDelete(field.id)}
            />
          </div>
        </div>

        {renderFieldInput()}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("required")}
              onChange={(e) => {
                setRequiredValue(e.target.checked);
                onUpdate({ ...field, required: e.target.checked }); // Update field.required
              }}
              placeholder="Enter your required"
              className="text-lg font-medium"
            />
            {/* <Switch {...register("required")} id={`required-${field.id}`} /> */}
            <label
              htmlFor={`required-${field.id}`}
              className="text-sm text-gray-600"
            >
              Required
            </label>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
