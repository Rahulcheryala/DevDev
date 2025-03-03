import { ValidatedForm } from "@zeak/remix-validated-form";
import type { TableProps } from "./Table";
import { z } from "zod";
import { EditableTable } from "./EditableTable";

const schema = z.object({
  entries: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      // width: z.string().min(1, "Width is required"),
      // height: z.string().min(1, "Height is required")
    }),
  ),
});

interface EditableColumn {
  editable?: boolean;
  type?: string;
  // Add other custom properties here if needed
}

interface EditableProps<T extends object> extends TableProps<T> {
  columns: (TableProps<T>["columns"][number] & EditableColumn)[];
}

export const TableWrapper = <T extends object>(props: EditableProps<T>) => {
  return (
    <>
      <ValidatedForm id="usefieldarray-example-form" validator={schema}>
        <EditableTable {...props} />
      </ValidatedForm>
    </>
  );
};
