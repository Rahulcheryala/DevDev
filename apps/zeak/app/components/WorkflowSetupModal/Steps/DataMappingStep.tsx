import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuDatabase, LuLoader2, LuAlertCircle } from "react-icons/lu";
import { Button, Checkbox } from "@zeak/react";

interface DataMappingStepProps {
  integrationStatus: any;
  onComplete: () => void;
  savedConfig?: {
    hasMappings: boolean;
    mappings: Array<{
      sourceColumnName: string;
      displayName: string;
      dataType: string;
      isVisible: boolean;
      sortOrder: number;
    }>;
  };
}

export function DataMappingStep({
  integrationStatus,
  onComplete,
  savedConfig,
}: DataMappingStepProps) {
  const [columns, setColumns] = useState<string[]>([]);
  const [isMasterSelected, setIsMasterSelected] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set(savedConfig?.mappings?.map((m) => m.sourceColumnName) || []),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("The integration Status is ", integrationStatus);

  useEffect(() => {
    console.log("integrationId is ", integrationStatus?.integrationData?.id);
    fetchSchema();
  }, []);

  useEffect(() => {
    if (savedConfig?.hasMappings) {
      setIsMasterSelected(savedConfig.mappings.length === columns.length);
    }
  }, [columns, savedConfig]);

  const fetchSchema = async () => {
    try {
      const response = await fetch("/api/dynamics-schema");
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setColumns(data.columns);
      console.log("columns", data.columns);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch schema");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMapping = async () => {
    try {
      const formattedColumns = Array.from(selectedColumns).map(
        (columnName, index) => ({
          sourceColumnName: columnName,
          displayName: columnName,
          dataType: "string",
          isVisible: true,
          sortOrder: index,
        }),
      );

      console.log(
        "The integrationId sent to the save-column-mapping api is ",
        integrationStatus?.integrationId,
      );

      const response = await fetch("/api/save-column-mapping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          integrationId: integrationStatus?.integrationData?.id,
          tableName: "SalesOrderHeaderV2",
          columns: formattedColumns,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }

      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save mapping");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setIsMasterSelected(checked);
    setSelectedColumns(checked ? new Set(columns) : new Set());
  };

  const handleColumnChange = (checked: boolean, column: string) => {
    console.log("checked", checked);
    setSelectedColumns((prev) => {
      console.log("prev", prev);
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(column);
      } else {
        newSet.delete(column);
      }
      if (newSet.size === columns.length) {
        console.log("setting isMasterSelected to true");
        setIsMasterSelected(true);
      } else {
        console.log("setting isMasterSelected to false");
        setIsMasterSelected(false);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/5 mb-4"
        >
          <LuDatabase className="w-7 h-7 text-primary" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">
          Step 3: Select Data Fields
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose which fields you want to display in your sales orders table
        </p>
      </div>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 space-y-4"
        >
          <LuLoader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Fetching Columns from the Sales Order Table in Dynamics
          </p>
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 space-y-4"
        >
          <LuAlertCircle className="w-8 h-8 text-destructive" />
          <div className="text-center">
            <p className="text-sm font-medium text-destructive">
              Failed to fetch columns
            </p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          <Button
            variant="outline-primary"
            size="md"
            onClick={() => {
              setError(null);
              setIsLoading(true);
              fetchSchema();
            }}
          >
            Try Again
          </Button>
        </motion.div>
      ) : (
        <>
          <div className="border rounded-lg">
            <div className="p-4 border-b bg-muted/40">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={isMasterSelected}
                  onCheckedChange={handleSelectAll}
                />
                <label className="text-sm font-medium">
                  Select All Columns
                </label>
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto p-4">
              {columns.map((column) => (
                <div key={column} className="flex items-center space-x-2 py-2">
                  <Checkbox
                    checked={selectedColumns.has(column)}
                    onCheckedChange={(checked) =>
                      handleColumnChange(checked as boolean, column)
                    }
                  />
                  <label className="text-sm">{column}</label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSaveMapping}
            disabled={selectedColumns.size === 0}
            className="w-full mt-6"
          >
            Save Column Mapping
          </Button>
        </>
      )}
    </div>
  );
}
