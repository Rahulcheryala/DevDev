import React, { useCallback, useMemo } from "react";
import { Input } from "@zeak/react";
import SearchableDropdown from "./searchableDropdown";

interface Condition {
  column: string;
  operator: string;
  value: string;
}

interface RadioBlockQuoteProps {
  colOptions?: any[];
  onChange: (selectedOption: Condition) => void;
  condition: Condition;
}

const RadioBlockQuoteComponent: React.FC<RadioBlockQuoteProps> = React.memo(
  ({ colOptions, onChange, condition }) => {
    const handleChange = useCallback(
      (field: keyof Condition, value: string) => {
        onChange({ ...condition, [field]: value });
      },
      [condition, onChange],
    );

    const selectedOperator = useMemo(() => {
      return condition.operator
        ? [{ value: condition.operator, name: condition.operator }]
        : [];
    }, [condition.operator]);

    const operatorOptions = useMemo(
      () => [
        { value: "equals", name: "Equals" },
        { value: "not_equals", name: "Not Equals" },
        { value: "greater_than", name: "Greater Than" },
        { value: "less_than", name: "Less Than" },
        { value: "case_sensitive", name: "Case sensitive" },
      ],
      [],
    );

    return (
      <div className="w-full mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="bg-white border-l-4 border-blue-500 shadow-md p-4 flex">
            <div className="flex flex-col justify-between gap-2 my-1 w-full border-gray-500">
              <p className="self-start">Where</p>
              {colOptions && colOptions.length > 0 && (
                <SearchableDropdown
                  options={colOptions}
                  isMultiSelect={false}
                  onChange={(selected) =>
                    handleChange("column", selected[0]?.value || "")
                  }
                  value={[{ value: condition.column, name: condition.column }]}
                />
              )}
              <SearchableDropdown
                options={operatorOptions}
                onChange={(selected) =>
                  handleChange("operator", selected[0]?.value || "")
                }
                value={selectedOperator}
              />
              <Input
                value={condition.value}
                onChange={(e) => handleChange("value", e.target.value)}
                placeholder="Enter value"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.condition) ===
        JSON.stringify(nextProps.condition) &&
      JSON.stringify(prevProps.colOptions) ===
        JSON.stringify(nextProps.colOptions)
    );
  },
);

// Add display name to the component
RadioBlockQuoteComponent.displayName = "RadioBlockQuoteComponent";

export default RadioBlockQuoteComponent;
