import {
  ValidatedForm,
  useFieldArray,
  useFormContext,
} from "@zeak/remix-validated-form";
import type { TableProps } from "./Table";
import Table from "./Table";
import { z } from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EditableCell } from "./EditableCell";
import { path } from "~/utils/path";
import type { ValidationConfig } from "./table-validation";
import { getSchemaFromConfig } from "./table-validation";
import { toast } from "@zeak/react";
import axios from "axios";

interface EditableColumn {
  editable?: boolean;
  type?: string;
  validations?: ValidationConfig;
}

interface EditableProps<T extends object> extends TableProps<T> {
  columns: (TableProps<T>["columns"][number] & EditableColumn)[];
}

export function EditableTable<T extends object>(props: EditableProps<T>) {
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const [isSaved, setIsSaved] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const { isValid } = useFormContext("usefieldarray-example-form");

  // const fetcher = useFetcher();

  const [editMode, setEditMode] = useState(false);

  const { data, columns } = props;

  const [items, { push }] = useFieldArray("entries", {
    formId: "usefieldarray-example-form",
  });
  console.log(items);

  useEffect(() => {
    data.forEach((d: any) => {
      const obj: any = {};
      columns.forEach((c: any) => {
        if (c.editable) {
          obj[c.accessorKey] = d[c.accessorKey];
        }
      });
      push(obj);
    });
    console.log("CD: ", data, columns);
  }, [data, columns, push]);

  const save = useCallback(
    async (accessorKey: string, value: any, row: any, index: number) => {
      const formData = new FormData();
      row = { ...row };
      // delete row.id;
      delete row[accessorKey];
      Object.keys(row).forEach((key) => {
        formData.append(key, row[key]);
      });
      formData.append(accessorKey, value);
      try {
        setIsSaving(true);
        await axios({
          method: "post",
          url: path.to.labelsreportsLabelView(row.id),
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const copy = { ...errors };
        delete copy[row.id];
        setErrors(copy);
      } catch (err: any) {
        toast.error(err.message);
        setErrors({ ...errors, [row.id]: { index, error: err } });
        console.log(errors);
      } finally {
        setIsSaving(false);
      }
      setIsSaved(true);
    },
    [setErrors, setIsSaving, errors],
  );

  const onCellValueChange = useCallback(
    (accessorKey: string, value: any, row: any, id: string) => {},
    [],
  );

  const schema = useMemo(() => {
    const config: Record<string, ValidationConfig & { type: string }> =
      columns.reduce(
        (acc, c: any) => {
          if (c.validations) {
            acc[c.accessorKey] = {
              ...c.validations,
              type:
                c.type === "text"
                  ? "string"
                  : c.type === "number"
                    ? "number"
                    : "string",
            };
          }
          return acc;
        },
        {} as Record<string, ValidationConfig & { type: string }>,
      );
    return z.object({
      entries: z.array(getSchemaFromConfig(config)),
    });
  }, [columns]);

  const editableColumnsDef = useMemo<
    Array<TableProps<T>["columns"][number]>
  >(() => {
    return columns.map((c, index) => {
      if (c.editable) {
        return {
          ...c,
          cell: (item: any) =>
            editMode ? (
              <EditableCell
                key={c.accessorKey}
                {...item}
                options={c.options}
                onChange={(e: any) =>
                  onCellValueChange(e, item.row.original, index)
                }
                save={(value: any) =>
                  save(c.accessorKey, value, item.row.original, index)
                }
                accessorKey={c.accessorKey}
                defaultValue={item.getValue()}
                name={`entries[${item.row.index}].${c.accessorKey}`}
                type={c.type}
              />
            ) : (
              c.cell && c.cell(item)
            ),
        };
      } else {
        return c;
      }
    });
  }, [columns, editMode, onCellValueChange, save]);

  // useEffect(() => {
  //     if (fetcher.state === "loading") { }
  //     if (fetcher.state === "loading" && fetcher.data?.data) {
  //     } else if (fetcher.state === "idle" && fetcher.data?.error) {
  //     }
  // }, [fetcher.data, fetcher.state]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <ValidatedForm id="usefieldarray-example-form" validator={schema}>
        <Table<T> {...props} columns={editableColumnsDef} />
      </ValidatedForm>
      <button onClick={() => setEditMode(!editMode)}>
        {editMode ? "Exit Edit" : "Edit"}
      </button>
      <p>
        {!isValid && (
          <span style={{ color: "red" }}>
            Table contains errors. Please fix.
          </span>
        )}
      </p>
      <p>
        {isSaved && isValid && !isSaving ? (
          <span style={{ color: "green" }}>Saved</span>
        ) : (
          ""
        )}
      </p>
      <p>{isSaving && <span>Saving...</span>}</p>
    </>
  );
}
