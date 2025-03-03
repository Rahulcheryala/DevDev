import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  Button,
  Table,
  Tbody as TableBody,
  Thead as TableHeader,
  Th as TableHead,
  Td as TableCell,
  Tr as TableRow,
} from "@zeak/react";
import { motion } from "framer-motion";
import { LuPlus, LuTrash2, LuLoader2, LuX } from "react-icons/lu";
import { useSalesOrderTable } from "~/hooks/useSalesOrderTable";
import { toast } from "sonner";
import { tasks } from "@trigger.dev/sdk/v3";
import { useUser } from "~/hooks/useUser";
import { path } from "~/utils/path";
import { getSupabase, getSupabaseServiceRole } from "~/lib/supabase";

interface DataTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  integrationId: string;
}

export function DataTableModal({
  isOpen,
  onClose,
  integrationId,
}: DataTableModalProps) {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    column: string;
    value: any;
    originalValue: any;
  } | null>(null);

  const supabase = getSupabase();
  const user = useUser();
  const {
    isLoading,
    fetchTableData,
    updateCell,
    deleteRow,
    addRow,
    getSalesOrderId,
  } = useSalesOrderTable(integrationId);

  useEffect(() => {
    if (isOpen && integrationId) {
      loadTableData();
    }
  }, [isOpen, integrationId]);

  const loadTableData = async () => {
    try {
      const { columns: mappedColumns, data: tableData } =
        await fetchTableData();

      // Transform columns to match the expected format
      const formattedColumns = mappedColumns.map((col: any) => ({
        sourceColumnName: col.field,
        displayName: col.headerName || col.field,
        isVisible: true,
        sortOrder: col.sortOrder || 0,
      }));

      setColumns(formattedColumns);
      setData(tableData);
      console.log("Formatted Columns:", formattedColumns);
      console.log("Table Data:", tableData);
    } catch (error) {
      console.error("Error loading table data:", error);
    }
  };

  const handleCellEdit = async (rowId: string, column: string, value: any) => {
    try {
      // Get current user context

      console.log("The user is", user);

      // Verify the row exists and get its salesOrderId
      const salesOrderId = await getSalesOrderId(rowId);

      console.log("The Sales Order ID is", salesOrderId);

      if (!salesOrderId) {
        throw new Error("Sales order not found or access denied");
      }

      const success = await updateCell(rowId, column, value);
      if (success) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === rowId ? { ...row, [column]: value } : row,
          ),
        );

        const response = await fetch(path.to.api.salesOrderUpdate, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: "sales-order-update",
            payload: {
              email: user.email,
              salesOrderNumber: salesOrderId,
              changes: { [column]: value },
              integrationId,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to trigger update task");
        }
      }
    } catch (error) {
      console.error("Failed to update:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update sales order",
      );
    }
    setEditingCell(null);
  };

  const handleDeleteRow = async (rowId: string) => {
    try {
      const success = await deleteRow(rowId);
      if (success) {
        setData((prevData) => prevData.filter((row) => row.id !== rowId));

        const response = await fetch(path.to.api.salesOrderUpdate, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: "sales-order-update",
            payload: {
              email: user.email,
              orderId: rowId,
              changes: { isDeleted: true },
            },
          }),
        });
        if (!response.ok) {
          toast.error("Failed to delete sales order");
          throw new Error("Failed to trigger update task");
        }
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete sales order");
    }
  };

  const handleAddRow = async () => {
    const newRow = await addRow(integrationId);
    if (newRow) {
      setData((prevData) => [...prevData, newRow]);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent className="w-full max-w-5xl bg-black/80 backdrop-blur-sm text-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleAddRow}
                variant="ghost"
                size="md"
                className="border border-white/20 text-white hover:bg-white/10"
              >
                <LuPlus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>
            <h2 className="text-xl font-semibold text-center flex-1 text-white">
              Sales Orders
            </h2>
          </div>

          <div className="rounded-lg border border-white/10">
            <div className="relative">
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-black z-50">
                    <tr className="border-b border-white/10">
                      {columns.map((column) => (
                        <th
                          key={column.sourceColumnName}
                          style={{
                            minWidth: getColumnWidth(column.sourceColumnName),
                          }}
                          className="px-4 py-3 text-white font-medium border-r border-white/10 last:border-r-0 text-center"
                        >
                          {column.displayName}
                        </th>
                      ))}
                      <th className="w-[100px] text-center text-white px-4 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <TableRow
                        key={row.id}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.sourceColumnName}
                            className="cursor-pointer text-center px-4 py-3 text-white/80 border-r border-white/10 last:border-r-0"
                            onClick={() =>
                              setEditingCell({
                                rowId: row.id,
                                column: column.sourceColumnName,
                                value: row[column.sourceColumnName],
                                originalValue: row[column.sourceColumnName],
                              })
                            }
                          >
                            {editingCell?.rowId === row.id &&
                            editingCell?.column === column.sourceColumnName ? (
                              <input
                                autoFocus
                                className="w-full bg-black/50 p-1 rounded border border-white/20 text-center text-white"
                                value={editingCell?.value ?? ""}
                                onChange={(e) =>
                                  setEditingCell((prev) => ({
                                    ...prev!,
                                    value: e.target.value,
                                  }))
                                }
                                onBlur={() => {
                                  // Revert to original value if not committed with Enter
                                  setEditingCell(null);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCellEdit(
                                      editingCell.rowId,
                                      column.sourceColumnName,
                                      editingCell.value,
                                    );
                                  } else if (e.key === "Escape") {
                                    setEditingCell(null);
                                  }
                                }}
                              />
                            ) : (
                              formatCellValue(row[column.sourceColumnName])
                            )}
                          </TableCell>
                        ))}
                        <TableCell className="text-center border-r border-white/10 last:border-r-0">
                          <Button
                            variant="ghost"
                            size="md"
                            onClick={() => handleDeleteRow(row.id)}
                            className="hover:text-red-400 text-white/70"
                          >
                            <LuTrash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}

// Helper functions
function formatCellValue(value: any): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function getColumnWidth(columnName: string): number {
  const widths: Record<string, number> = {
    SalesOrderNumber: 150,
    SalesOrderName: 200,
    OrderCreationDateTime: 180,
    SalesOrderStatus: 130,
    OrderTotalAmount: 130,
    CurrencyCode: 100,
  };
  return widths[columnName] || 150;
}
