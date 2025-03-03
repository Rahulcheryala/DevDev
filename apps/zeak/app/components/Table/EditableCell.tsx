import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@zeak/react";
import { useMemo, useState } from "react";
import { useField } from "@zeak/remix-validated-form";

export const EditableCell = ({
  onChange,
  accessorKey,
  id,
  name,
  defaultValue,
  save,
  getValue,
  row,
  column,
  table,
  type,
  options,
}: any) => {
  const { error, validate } = useField(name);
  const [value, setValue] = useState(defaultValue);

  const control = useMemo(() => {
    switch (type) {
      case "text":
        return (
          <Input
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            size="sm"
            name={name}
            value={value}
            onChange={(e) => {
              onChange();
              setValue(e.target.value);
              validate();
            }}
            onBlur={(e) => {
              if (!error) {
                save && save(value);
              }
            }}
            style={{
              border: error ? "1px solid red" : "1px solid #ccc",
            }}
          />
        );

      case "number":
        return (
          <Input
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            size="sm"
            type="number"
            name={name}
            value={value}
            onChange={(e) => {
              onChange();
              setValue(Number(e.target.value));
              validate();
            }}
            onBlur={(e) => {
              if (!error) {
                save && save(value);
              }
            }}
            style={{
              border: error ? "1px solid red" : "1px solid #ccc",
            }}
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => {
              onChange();
              setValue(val);
              if (!error) {
                save(val);
              }
            }}
          >
            <SelectTrigger className="w-full h-[40px] px-[16px] py-[14px] text-accent text-sm">
              <div className="flex items-center">{value}</div>
            </SelectTrigger>
            <SelectContent position="popper">
              {options.map((o: string, index: number) => (
                <SelectItem value={o} key={index}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
    }
  }, [error, value, save, name, onChange, options, type, validate]);

  return (
    <Tooltip>
      <TooltipTrigger>{control}</TooltipTrigger>
      {error && (
        <TooltipContent>
          <span style={{ color: "red" }}>{error}</span>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
