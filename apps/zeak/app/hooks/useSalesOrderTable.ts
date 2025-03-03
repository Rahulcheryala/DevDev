import { useState } from "react";
import { toast } from "sonner";

export function useSalesOrderTable(integrationId: string) {
  const [isLoading, setIsLoading] = useState(false);

  const fetchTableData = async () => {
    if (!integrationId) {
      toast.error("Integration ID is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/sales-orders?integrationId=${integrationId}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch table data");
      }

      return {
        columns: data.columns || [],
        data: data.data || [],
      };
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch table data",
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCell = async (rowId: string, column: string, value: any) => {
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "PUT",
          rowId,
          column,
          value,
          integrationId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update cell");
      }

      toast.success("Updated successfully");
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update cell",
      );
      return false;
    }
  };

  const getSalesOrderId = async (rowId: string) => {
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "GET",
          rowId,
        }),
      });
      const data = await response.json();
      console.log("The data is", data);
      return data.data.salesOrderId;
    } catch (error) {
      return null;
    }
  };

  const deleteRow = async (rowId: string) => {
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "DELETE",
          rowId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete row");
      }

      toast.success("Row deleted");
      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete row",
      );
      return false;
    }
  };

  const addRow = async (integrationId: string) => {
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "POST",
          integrationId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add row");
      }

      toast.success("New row added");
      return data.data;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add row");
      return null;
    }
  };

  return {
    isLoading,
    fetchTableData,
    updateCell,
    deleteRow,
    addRow,
    getSalesOrderId,
  };
}
