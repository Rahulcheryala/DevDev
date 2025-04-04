import type { Json } from "@zeak/database";
import { Checkbox, Enumerable, HStack } from "@zeak/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "~/components";
import { DataType } from "~/modules/shared";
import { usePeople } from "~/stores";
import { useCustomFieldsSchema } from "./useCustomFieldsSchema";

export function useCustomColumns<T extends { customFields: Json }>(
  table: string,
) {
  const customFieldsSchemas = useCustomFieldsSchema();
  const schema = customFieldsSchemas?.[table];

  const customColumns: ColumnDef<T>[] = [];
  const [people] = usePeople();

  schema?.forEach((field) => {
    customColumns.push({
      accessorKey: `customFields.${field.id}`,
      header: field.name,
      cell: (item) => {
        switch (field.dataTypeId) {
          case DataType.Boolean:
            return isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields ? (
              <Checkbox
                isChecked={item.row.original?.customFields[field.id] === "on"}
              />
            ) : (
              <Checkbox isChecked={false} />
            );
          case DataType.Date:
            return isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields
              ? item.row.original?.customFields[field.id]
              : null;
          case DataType.List:
            return isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields ? (
              <Enumerable value={item.getValue<string>()} />
            ) : null;
          case DataType.Numeric:
            return isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields
              ? item.row.original?.customFields[field.id]
              : null;
          case DataType.Text:
            return isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields
              ? item.row.original?.customFields[field.id]
              : null;
          case DataType.User:
            if (
              isObject(item.row.original.customFields) &&
              field.id in item.row.original.customFields
            ) {
              const personId = item.row.original?.customFields[
                field.id
              ] as string;
              const person = people.find((person) => person.id === personId);
              if (!person) return null;

              return (
                <HStack>
                  <Avatar
                    size="sm"
                    name={person.name}
                    path={person.avatarUrl}
                  />
                  <p>{person.name}</p>
                </HStack>
              );
            } else {
              return null;
            }

          default:
            return null;
        }
      },
    });
  });

  return customColumns as ColumnDef<T>[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}
