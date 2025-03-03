import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { requireAuthSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId } = await requireAuthSession(request);
  const supabase = getSupabaseServiceRole();
  const url = new URL(request.url);
  const integrationId = url.searchParams.get("integrationId");

  if (!integrationId) {
    return json({ error: "Integration ID is required" }, { status: 400 });
  }

  try {
    // Get table mapping for this integration
    const { data: tableMapping, error: mappingError } = await supabase
      .from("integrationTableMappings")
      .select("id")
      .eq("integrationId", integrationId)
      .single();

    if (mappingError || !tableMapping) {
      throw new Error("Table mapping not found");
    }

    // Get column mappings
    const { data: columnMappings, error: columnsError } = await supabase
      .from("integrationColumnMappings")
      .select(
        `
        sourceColumnName,
        displayName,
        dataType,
        isVisible,
        sortOrder
      `,
      )
      .eq("tableMappingId", tableMapping.id)
      .order("sortOrder");

    if (columnsError) throw columnsError;

    // Define default columns if no mappings exist
    const defaultColumns = [
      "SalesOrderNumber",
      "SalesOrderName",
      "OrderCreationDateTime",
      "SalesOrderStatus",
      "OrderTotalAmount",
      "CurrencyCode",
      "InvoiceCustomerAccountNumber",
    ];

    // Get sales orders with JSONB data
    const { data: salesOrders, error: ordersError } = await supabase
      .from("SalesOrders")
      .select("id, data")
      .eq("userId", userId);

    if (ordersError) throw ordersError;

    // Transform data using column mappings or default columns
    const transformedData = salesOrders.map((order) => {
      const rowData: Record<string, any> = { id: order.id };
      const columnsToUse =
        columnMappings.length > 0
          ? columnMappings
          : defaultColumns.map((col) => ({
              sourceColumnName: col,
              displayName: col,
              dataType: getDataType(order.data[col]),
              isVisible: true,
            }));

      columnsToUse.forEach((col) => {
        if (col.isVisible && order.data) {
          const value = order.data[col.sourceColumnName];
          rowData[col.sourceColumnName] = formatValue(value, col.dataType);
        }
      });

      return rowData;
    });

    // Format columns for the data table
    const columns = (
      columnMappings.length > 0
        ? columnMappings
        : defaultColumns.map((col) => ({
            sourceColumnName: col,
            displayName: col,
            dataType: "string",
            isVisible: true,
          }))
    ).map((col) => ({
      field: col.sourceColumnName,
      headerName: col.displayName || col.sourceColumnName,
      width: getColumnWidth(col.sourceColumnName),
      type: col.dataType?.toLowerCase() || "string",
      valueFormatter: (params: any) => formatValue(params.value, col.dataType),
    }));

    return json({ columns, data: transformedData });
  } catch (error) {
    console.error("Error fetching sales orders:", error);
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

// Helper functions
function getDataType(value: any): string {
  if (value === null || value === undefined) return "string";
  if (value.toString().includes("T") && !isNaN(Date.parse(value)))
    return "datetime";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  return "string";
}

function formatValue(value: any, dataType?: string): any {
  if (value === null || value === undefined) return "";
  if (dataType === "datetime" && value.includes("T")) {
    return new Date(value).toLocaleString();
  }
  return value;
}

function getColumnWidth(columnName: string): number {
  const widths: Record<string, number> = {
    SalesOrderNumber: 150,
    SalesOrderName: 200,
    OrderCreationDateTime: 180,
    SalesOrderStatus: 130,
    OrderTotalAmount: 130,
    CurrencyCode: 100,
    InvoiceCustomerAccountNumber: 200,
  };
  return widths[columnName] || 150;
}

export const action: ActionFunction = async ({ request }) => {
  const { userId } = await requireAuthSession(request);
  const supabase = getSupabaseServiceRole();
  const body = await request.json();
  const { method, rowId, column, value, integrationId, companyId } = body;

  try {
    switch (method) {
      case "GET": {
        console.log("The method is:", method);
        const { data: order, error: fetchError } = await supabase
          .from("SalesOrders")
          .select("salesOrderId")
          .eq("id", rowId)
          .eq("userId", userId)
          .single();
        console.log("The order is:", order);
        if (fetchError) throw fetchError;
        return json({ success: true, data: order });
      }

      case "PUT": {
        const { data: order, error: fetchError } = await supabase
          .from("SalesOrders")
          .select("data")
          .eq("id", rowId)
          .eq("userId", userId)
          .single();

        if (fetchError) throw fetchError;

        const updatedData = {
          ...order.data,
          [column]: value,
        };

        const { error: updateError } = await supabase
          .from("SalesOrders")
          .update({ data: updatedData })
          .eq("id", rowId)
          .eq("userId", userId);

        if (updateError) throw updateError;
        return json({ success: true });
      }

      case "DELETE": {
        const { error: deleteError } = await supabase
          .from("SalesOrders")
          .delete()
          .eq("id", rowId)
          .eq("userId", userId);

        if (deleteError) throw deleteError;
        return json({ success: true });
      }

      case "POST": {
        if (!companyId) {
          return json({ error: "Company ID is required" }, { status: 400 });
        }

        const { data: newRow, error: insertError } = await supabase
          .from("SalesOrders")
          .insert([
            {
              id: crypto.randomUUID(),
              userId,
              companyId,
              integrationId,
              data: {},
              insertedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              processed: false,
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        return json({ success: true, data: newRow });
      }

      default:
        return json({ error: "Invalid method" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing sales order operation:", error);
    return json(
      {
        error: error instanceof Error ? error.message : "Operation failed",
      },
      { status: 500 },
    );
  }
};
