import type { ZodType, ZodSchema } from "zod";
import { z } from "zod";

export interface ValidationConfig {
  required?: boolean;
  minLength?: number;
  min?: number;
  max?: number;
  maxLength?: number;
  email?: boolean;
  customMessage?: string;
}

export function getSchemaFromConfig(
  config: Record<string, ValidationConfig & { type: string }>,
): ZodSchema<any> {
  const schemaObject: Record<string, ZodType<any>> = {};

  Object.keys(config).forEach((field) => {
    const fieldConfig = config[field];

    let fieldSchema: any;

    if (fieldConfig.type === "string") {
      fieldSchema = z.string();
    }

    if (fieldConfig.type === "number") {
      fieldSchema = z.number();
    }

    if (fieldConfig.required) {
      fieldSchema = fieldSchema.min(
        1,
        fieldConfig.customMessage || `${field} is required`,
      );
    }

    schemaObject[field] = fieldSchema;
  });

  return z.object(schemaObject);
}
