import { useCustomFieldsSchema } from "~/hooks/useCustomFieldsSchema";
import { DataType } from "~/modules/shared";

import {
  Boolean,
  DatePicker,
  Employee,
  Input,
  Number,
  Select,
} from "~/components/Form";

type CustomFormFieldsProps = {
  table: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
};

const CustomFormFields = ({
  table,
  isReadOnly,
  isDisabled,
}: CustomFormFieldsProps) => {
  const customFormSchema = useCustomFieldsSchema();
  const tableFields = customFormSchema?.[table];

  if (!tableFields) return null;

  return (
    <>
      {tableFields
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((field) => {
          switch (field.dataTypeId) {
            case DataType.Boolean:
              return (
                <Boolean
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                />
              );
            case DataType.Date:
              return (
                <DatePicker
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                  isDisabled={isReadOnly || isDisabled}
                />
              );
            case DataType.List:
              return (
                <Select
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                  placeholder={`Select ${field.name}`}
                  options={
                    field.listOptions?.map((o) => ({
                      label: o,
                      value: o,
                    })) ?? []
                  }
                  isReadOnly={isReadOnly}
                />
              );
            case DataType.Numeric:
              return (
                <Number
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                />
              );
            case DataType.Text:
              return (
                <Input
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                  isReadOnly={isReadOnly}
                />
              );
            case DataType.User:
              return (
                <Employee
                  key={field.id}
                  name={getCustomFieldName(field.id)}
                  label={field.name}
                  isReadOnly={isReadOnly}
                  disabled={isDisabled}
                />
              );
            default:
              return null;
          }
        })}
    </>
  );
};

export default CustomFormFields;

function getCustomFieldName(id: string) {
  return `custom-${id}`;
}
