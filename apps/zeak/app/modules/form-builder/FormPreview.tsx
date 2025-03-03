import { useForm, Controller } from "react-hook-form";
import { FileUploadField } from "./fields/FileUploadField";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@zeak/react";
import type { FormData, FormField } from "~/types/form";
import { TimeField } from "./fields/TimeField";

interface FormPreviewProps {
  formData: FormData;
  onClose: () => void;
}

export function FormPreview({ formData, onClose }: FormPreviewProps) {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const renderField = (field: FormField) => {
    const { id, type, question, required, options } = field;

    switch (type) {
      case "textarea":
        return (
          <Textarea
            {...register(id, { required })}
            placeholder="Your answer"
            rows={4}
            maxLength={300}
          />
        );

      case "multipleChoice":
        return (
          <RadioGroup {...register(id, { required })}>
            {options?.map((option: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${id}-${index}`} />
                <label htmlFor={`${id}-${index}`}>{option}</label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {options?.map((option: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${id}-${index}`}
                  {...register(`${id}.${option}`, { required })}
                />
                <label htmlFor={`${id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        );

      case "dropdown":
        return (
          <Select {...register(id, { required })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option: any, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Controller
            control={control}
            name={id}
            render={({ field }) => <DatePicker {...field} />}
          />
        );

      case "time":
        return (
          <Controller
            control={control}
            name={id}
            render={({ field }) => <TimeField {...field} />}
          />
        );

      case "file":
        return <FileUploadField />;

      default:
        return (
          <Input {...register(id, { required })} placeholder="Your answer" />
        );
    }
  };

  console.log(formData);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-8">{formData.title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {formData.fields.map((field: FormField) => (
            <div key={field.id} className="space-y-2">
              <label className="text-lg font-medium">
                {field.question}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline-primary" onClick={onClose}>
              Close Preview
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
