import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Input } from "@zeak/react";
import RadioButtonGroup from "./RadioButtonGroup";
import { FaPlus, FaMinus } from "react-icons/fa";
import RadioBlockQuoteComponent from "./CreateBlock";
import type { Option } from "./dropdown";
import { useFetcher } from "@remix-run/react";
import { path } from "~/utils/path";
import SearchableDropdown from "./searchableDropdown";

interface RadioOption {
  id: string;
  label: string;
}

interface Condition {
  column: string;
  operator: string;
  value: string;
}

interface ConditionGroup {
  conditions: Condition[];
  subGroups: ConditionGroup[];
  logicalOperator: "AND" | "OR";
}

const EventTab = ({
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
  const [selectedCols, setSelectedCol] = useState<Option[]>([]);
  const [columns, setColumns] = useState<any>();
  const fetcher = useFetcher();

  const initialDataSet = useRef(false);

  useEffect(() => {
    if (columns && conditionGroups.length === 0) {
      setConditionGroups([
        {
          conditions: [{ column: "", operator: "", value: "" }],
          subGroups: [],
          logicalOperator: "AND",
        },
      ]);
    }
  }, [columns, conditionGroups.length]);

  const updateCustomData = useCallback(() => {
    const data = {
      name: customName,
      condition: conditionGroups,
      action: selectedWhenAction,
      watch_table: selectedTable,
    };
    setCustomData(data);
  }, [
    customName,
    conditionGroups,
    selectedWhenAction,
    selectedTable,
    setCustomData,
  ]);

  useEffect(() => {
    if (!initialDataSet.current) {
      updateCustomData();
      initialDataSet.current = true;
    }
  }, [updateCustomData]);

  const handleRadioChange = useCallback((option: RadioOption) => {
    setSelectedWhenAction(option.id);
  }, []);

  const handleConditionChange = useCallback(
    (
      groupIndex: number,
      conditionIndex: number,
      subGroupIndices: number[] = [],
      newData: Condition,
    ) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.conditions[conditionIndex] = newData;
        return newGroups;
      });
    },
    [],
  );

  const handleLogicalOperatorChange = useCallback(
    (
      groupIndex: number,
      subGroupIndices: number[] = [],
      newOperator: "AND" | "OR",
    ) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          targetGroup = targetGroup.subGroups[index];
        }

        targetGroup.logicalOperator = newOperator;

        return newGroups;
      });
    },
    [],
  );

  const addCondition = useCallback(
    (groupIndex: number, subGroupIndices: number[] = []) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          if (!targetGroup.subGroups[index]) {
            targetGroup.subGroups[index] = {
              conditions: [],
              subGroups: [],
              logicalOperator: "AND",
            };
          }
          targetGroup = targetGroup.subGroups[index];
        }

        if (!targetGroup.conditions) {
          targetGroup.conditions = [];
        }

        targetGroup.conditions.push({ column: "", operator: "", value: "" });

        return newGroups;
      });
    },
    [],
  );

  const addConditionGroup = useCallback(
    (groupIndex: number, subGroupIndices: number[] = []) => {
      setConditionGroups((prevGroups) => {
        const newGroups = JSON.parse(JSON.stringify(prevGroups));
        let targetGroup = newGroups[groupIndex];

        for (const index of subGroupIndices) {
          if (!targetGroup.subGroups[index]) {
            targetGroup.subGroups[index] = {
              conditions: [],
              subGroups: [],
              logicalOperator: "AND",
            };
          }
          targetGroup = targetGroup.subGroups[index];
        }

        if (!targetGroup.subGroups) {
          targetGroup.subGroups = [];
        }

        targetGroup.subGroups.push({
          conditions: [{ column: "", operator: "", value: "" }],
          subGroups: [],
          logicalOperator: "AND",
        });

        return newGroups;
      });
    },
    [],
  );

  const renderConditionGroup = useCallback(
    (
      group: ConditionGroup,
      groupIndex: number,
      subGroupIndices: number[] = [],
    ) => (
      <div key={`group-${groupIndex}-${subGroupIndices.join("-")}`}>
        {group.conditions.map((condition, index) => (
          <React.Fragment
            key={`condition-${groupIndex}-${subGroupIndices.join(
              "-",
            )}-${index}`}
          >
            {index > 0 && (
              <select
                value={group.logicalOperator}
                onChange={(e) =>
                  handleLogicalOperatorChange(
                    groupIndex,
                    subGroupIndices,
                    e.target.value as "AND" | "OR",
                  )
                }
                className="my-2"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            )}
            <RadioBlockQuoteComponent
              key={`radio-block-${groupIndex}-${subGroupIndices.join(
                "-",
              )}-${index}`}
              colOptions={columns}
              onChange={(data) =>
                handleConditionChange(groupIndex, index, subGroupIndices, data)
              }
              condition={condition}
            />
          </React.Fragment>
        ))}
        {group.subGroups.map((subGroup, subIndex) =>
          renderConditionGroup(subGroup, groupIndex, [
            ...subGroupIndices,
            subIndex,
          ]),
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
    ),
    [
      columns,
      handleLogicalOperatorChange,
      handleConditionChange,
      addCondition,
      addConditionGroup,
    ],
  );

  const handleTableChange = useCallback(
    (table: any) => {
      setSelectedTable(table);
      fetcher.submit(
        { data: table[0]?.value, action: "getColumns" },
        {
          action: path.to.reactflowHomeTab,
          method: "post",
          encType: "application/json",
        },
      );
      setSelectedCol([]);
    },
    [fetcher],
  );

  const handleColChange = useCallback((cols: Option[]) => {
    setSelectedCol(cols);
  }, []);

  const handleNameChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setCustomName(evt.target.value);
    },
    [],
  );

  const transformColumnsData = useCallback((data: any) => {
    const transformedColumns =
      data?.columns.length > 0
        ? data?.columns.map((column: any) => ({
            value: column.columnName,
            name: column.columnName,
          }))
        : [];
    setColumns(transformedColumns);
  }, []);

  useEffect(() => {
    if (fetcher?.data) {
      transformColumnsData(fetcher?.data);
    }
  }, [fetcher?.data, transformColumnsData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateCustomData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    customName,
    conditionGroups,
    selectedWhenAction,
    selectedTable,
    selectedCols,
    updateCustomData,
  ]);

  const memoizedConditionGroups = useMemo(
    () => conditionGroups,
    [conditionGroups],
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
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-full">
            <p className="text-sm font-normal self-start my-2">Data entity</p>
            <SearchableDropdown
              options={tables}
              onChange={handleTableChange}
              value={selectedTable}
            />
          </div>
          {type === "trigger" ? (
            <></>
          ) : (
            <div className="flex flex-col w-6/12">
              {columns && columns.length > 0 && (
                <>
                  <p className="text-sm font-normal self-start my-2">
                    Data entity columns
                  </p>
                  <SearchableDropdown
                    options={columns}
                    onChange={handleColChange}
                    value={selectedCols}
                    isMultiSelect
                  />
                </>
              )}
            </div>
          )}
        </div>
        <button
          className="flex flex-row gap-2 items-center"
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
        {isConditionExpanded && (
          <div className="flex flex-col w-full">
            {memoizedConditionGroups.map((group, index) =>
              renderConditionGroup(group, index),
            )}
            <div className="flex flex-row gap-2 mt-4">
              <button
                className="flex flex-row gap-2"
                onClick={() => addCondition(conditionGroups.length - 1)}
              >
                <FaPlus size={20} color="blue" />
                <p className="text-blue-600 font-normal text-sm">
                  Add condition
                </p>
              </button>
              <button
                className="flex flex-row gap-2"
                onClick={() => addConditionGroup(conditionGroups.length - 1)}
              >
                <FaPlus size={20} color="blue" />
                <p className="text-blue-600 font-normal text-sm">
                  Add condition group
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTab;
