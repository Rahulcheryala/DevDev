export type FieldType =
  | "text"
  | "textarea"
  | "multipleChoice"
  | "checkbox"
  | "dropdown"
  | "date"
  | "time"
  | "file";

export interface FormField {
  id: string;
  type: FieldType;
  question: string;
  required: boolean;
  options?: string[];
  maxLength?: number;
  allowedFileTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number;
}

export interface FormData {
  id: string;
  title: string;
  fields: FormField[];
}
