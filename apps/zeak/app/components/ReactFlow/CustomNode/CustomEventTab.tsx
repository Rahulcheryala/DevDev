import React, { useState, useCallback, useEffect, useRef } from "react";
// import DropdownComponent from "./DropdownComponent";
import { Input } from "@zeak/react";
import RadioButtonGroup from "./RadioButtonGroup";
import { FaMinus, FaPlus } from "react-icons/fa";
import RadioBlockQuoteComponent from "./CreateBlock";
import type { Option } from "./dropdown";
import { useFetcher } from "@remix-run/react";
import { path } from "~/utils/path";
import SearchableDropdown from "./searchableDropdown";

interface RadioOption {
  id: string;
  label: string;
}

interface RadioOption {
  id: string;
  label: string;
}

interface Condition {
  column: string;
  operator: string;
  value: string;
  logicOperator?: "AND" | "OR";
}

interface ConditionGroup {
  conditions: Condition[];
  subGroups: ConditionGroup[];
}

interface ColumnSelection {
  column: Option | null;
  value: string;
}

const CustomEventTab = ({
  setCustomData,
  tables,
  type,
}: {
  CustomData: any;
  setCustomData: (data: any) => void;
  tables?: any;
  type: any;
}) => {
  const [selectedWhenAction, setSelectedWhenAction] = useState<string | null>(
    null,
  );
  const [isConditionExpanded, setIsConditionExpanded] = useState(false);
  const [conditionGroups, setConditionGroups] = useState<ConditionGroup[]>([]);
  const [customName, setCustomName] = useState("");
  const [selectedTable, setSelectedTable] = useState<any[]>([]);
  const [columns, setColumns] = useState<Option[]>([]);
  const [columnSelections, setColumnSelections] = useState<ColumnSelection[]>([
    { column: null, value: "" },
  ]);
  const fetcher = useFetcher();

  const initialDataSet = useRef(false);

  useEffect(() => {
    if (columns && conditionGroups.length === 0) {
      setConditionGroups([
        {
          conditions: [{ column: "", operator: "", value: "" }],
          subGroups: [],
        },
      ]);
    }
  }, [columns, conditionGroups.length]);

  const updateCustomData = useCallback(
    (action?: string) => {
      const filteredColumnSelections = columnSelections
        .filter(
          (obj: ColumnSelection) => obj.value !== "" && obj.column !== null,
        )
        .map((obj: ColumnSelection) => ({
          name: obj.column!.name,
          value: obj.value,
        }));

      setCustomData({
        name: customName,
        condition: conditionGroups,
        action: action || selectedWhenAction,
        watch_table: selectedTable,
        column_values: filteredColumnSelections,
      });
    },
    [
      customName,
      conditionGroups,
      selectedWhenAction,
      selectedTable,
      columnSelections,
      setCustomData,
    ],
  );

  useEffect(() => {
    if (!initialDataSet.current) {
      updateCustomData();
      initialDataSet.current = true;
    }
  }, [updateCustomData]);

  useEffect(() => {
    updateCustomData();
  }, [columnSelections, updateCustomData]);

  const handleRadioChange = useCallback(
    (option: RadioOption) => {
      setSelectedWhenAction(option.id);
      updateCustomData(option.id); // Pass the new action directly to updateCustomData
    },
    [updateCustomData],
  );

  const handleConditionChange = useCallback(
    (
      groupIndex: number,
      conditionIndex: number,
      subGroupIndices: number[] = [],
      newData: Partial<Condition>,
    ) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.conditions[conditionIndex] = {
          ...targetGroup.conditions[conditionIndex],
          ...newData,
        };

        return newGroups;
      });
      updateCustomData();
    },
    [updateCustomData],
  );

  const addCondition = useCallback(
    (groupIndex: number, subGroupIndices: number[] = []) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.conditions.push({ column: "", operator: "", value: "" });

        return newGroups;
      });
      updateCustomData();
    },
    [updateCustomData],
  );

  const addConditionGroup = useCallback(
    (groupIndex: number, subGroupIndices: number[] = []) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.subGroups.push({
          conditions: [{ column: "", operator: "", value: "" }],
          subGroups: [],
        });

        return newGroups;
      });
      updateCustomData();
    },
    [updateCustomData],
  );

  const renderConditionGroup = (
    group: ConditionGroup,
    groupIndex: number,
    subGroupIndices: number[] = [],
    depth: number = 0,
  ) => (
    <div
      key={`group-${groupIndex}-${subGroupIndices.join("-")}`}
      style={{ marginLeft: `${depth * 20}px` }}
    >
      {group.conditions.map((condition, index) => (
        <div
          key={`condition-${groupIndex}-${subGroupIndices.join("-")}-${index}`}
        >
          {index > 0 && (
            <select
              onChange={(e) =>
                handleConditionChange(groupIndex, index, subGroupIndices, {
                  logicOperator: e.target.value as "AND" | "OR",
                })
              }
              value={condition.logicOperator || "AND"}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
          <RadioBlockQuoteComponent
            colOptions={columns}
            onChange={(data) =>
              handleConditionChange(groupIndex, index, subGroupIndices, data)
            }
            condition={condition}
          />
        </div>
      ))}
      {group.subGroups.map((subGroup, subIndex) =>
        renderConditionGroup(
          subGroup,
          groupIndex,
          [...subGroupIndices, subIndex],
          depth + 1,
        ),
      )}
      <div className="flex flex-row gap-2 mt-2">
        <button
          className="flex flex-row gap-2"
          onClick={() => addCondition(groupIndex, subGroupIndices)}
        >
          <FaPlus size={20} color="blue" />
          <p className="text-blue-600 font-normal text-sm">Add condition</p>
        </button>
        <button
          className="flex flex-row gap-2"
          onClick={() => addConditionGroup(groupIndex, subGroupIndices)}
        >
          <FaPlus size={20} color="blue" />
          <p className="text-blue-600 font-normal text-sm">
            Add condition group
          </p>
        </button>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogicOperatorChange = useCallback(
    (
      groupIndex: number,
      conditionIndex: number,
      subGroupIndices: number[] = [],
      logicOperator: string,
    ) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.conditions[conditionIndex].logicOperator = logicOperator;

        return newGroups;
      });
      updateCustomData();
    },
    [updateCustomData],
  );

  const handleTableChange = useCallback(
    (table: any) => {
      setSelectedTable(table);
      updateCustomData();

      fetcher.submit(
        { data: table[0]?.value, action: "getColumns" },
        {
          action: path.to.reactflowHomeTab,
          method: "post",
          encType: "application/json",
        },
      );
      setColumnSelections([{ column: null, value: "" }]);
    },
    [updateCustomData, fetcher],
  );

  const handleColumnChange = useCallback(
    (index: number, selectedColumn: Option | null) => {
      setColumnSelections((prev) => {
        const newSelections = [...prev];
        newSelections[index] = {
          ...newSelections[index],
          column: selectedColumn,
        };
        return newSelections;
      });
      updateCustomData();
    },
    [updateCustomData],
  );

  const handleValueChange = useCallback((index: number, value: string) => {
    setColumnSelections((prevSelections) => {
      const newSelections = prevSelections.map((selection, i) =>
        i === index ? { ...selection, value } : selection,
      );

      // Add a new empty selection if the last one is being edited
      if (index === prevSelections.length - 1 && value !== "") {
        newSelections.push({ column: null, value: "" });
      }

      return newSelections;
    });
  }, []);

  const handleNameChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const newName = evt.target.value;
      setCustomName(newName);
      updateCustomData();
    },
    [updateCustomData],
  );

  const transformColumnsData = (data: any) => {
    const transformedColumns =
      data?.columns.length > 0
        ? data?.columns.map((column: any) => ({
            value: column.columnName,
            name: column.columnName,
          }))
        : [];
    setColumns(transformedColumns);
  };

  useEffect(() => {
    if (fetcher?.data) {
      transformColumnsData(fetcher?.data);
    }
  }, [fetcher, tables]);

  const getAvailableColumns = (index: number) => {
    const selectedColumns = columnSelections
      .slice(0, index)
      .map((selection) => selection.column?.value);
    return columns.filter((column) => !selectedColumns.includes(column.value));
  };

  const renderContent = () => {
    switch (selectedWhenAction) {
      case "create":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <p className="text-sm font-normal self-start my-2">Data entity</p>
              <SearchableDropdown
                options={tables}
                onChange={handleTableChange}
                value={selectedTable}
              />
            </div>
            {renderColumnSelections()}
          </div>
        );
      case "update":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <p className="text-sm font-normal self-start my-2">Data entity</p>
              <SearchableDropdown
                options={tables}
                onChange={handleTableChange}
                value={selectedTable}
              />
            </div>
            {renderExpandableConditions()}
            {renderColumnSelections()}
          </div>
        );
      case "delete":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <p className="text-sm font-normal self-start my-2">Data entity</p>
              <SearchableDropdown
                options={tables}
                onChange={handleTableChange}
                value={selectedTable}
              />
            </div>
            {renderExpandableConditions()}
          </div>
        );
      default:
        return null;
    }
  };

  const renderExpandableConditions = () => (
    <div className="flex flex-col gap-2 mt-4">
      <button
        className="flex flex-row items-center gap-2"
        onClick={() => setIsConditionExpanded(!isConditionExpanded)}
      >
        {isConditionExpanded ? (
          <FaMinus size={20} color="blue" />
        ) : (
          <FaPlus size={20} color="blue" />
        )}
        <p className="text-blue-600 font-normal text-sm">
          {isConditionExpanded ? "Hide conditions" : "Show conditions"}
        </p>
      </button>
      {isConditionExpanded &&
        conditionGroups.map((group, index) =>
          renderConditionGroup(group, index),
        )}
    </div>
  );

  const renderColumnSelections = () => (
    <div className="flex flex-col">
      {columnSelections.map((selection, index) => (
        <div key={index} className="flex flex-row justify-between mb-2">
          <div className="flex flex-col w-6/12">
            <p className="text-sm font-normal self-start my-2">
              Data entity column
            </p>
            <SearchableDropdown
              options={getAvailableColumns(index)}
              onChange={(selected) => handleColumnChange(index, selected[0])}
              value={selection.column ? [selection.column] : []}
            />
          </div>
          <div className="flex flex-col w-6/12">
            <p className="text-sm font-normal self-start my-2">Value</p>
            <Input
              value={selection.value}
              onChange={(e) => handleValueChange(index, e.target.value)}
              placeholder="Enter value"
              size="sm"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="bg-yellow-100 text-center w-full h-4">
          <p className="text-sm font-light">
            This trigger will fire when this event happens
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-normal self-start">Name</p>
          <div className="relative my-2">
            <Input
              value={customName}
              onChange={handleNameChange}
              placeholder={"Get New Customer Info"}
              size={"sm"}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-normal self-start my-2">
            event happens on
          </p>
          <RadioButtonGroup onChange={handleRadioChange} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CustomEventTab;
