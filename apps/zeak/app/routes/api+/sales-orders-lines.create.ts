import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_ANON_PUBLIC!
);

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { error: tableError } = await supabase.rpc(
      "create_table_with_columns",
      {
        table_name: "salesOrdersLinesStaging",
        column_definitions: [
          {
            name: "id",
            type: "uuid",
            default_value: "uuid_generate_v4()",
          },
          {
            name: "salesOrderId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "lineItemNumber",
            type: "int",
            default_value: null,
          },
          {
            name: "productId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "productDescription",
            type: "varchar(255)",
            default_value: null,
          },
          {
            name: "quantity",
            type: "decimal(15, 3)",
            default_value: null,
          },
          {
            name: "quantityUnit",
            type: "varchar(10)",
            default_value: null,
          },
          {
            name: "netPrice",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "grossPrice",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "discount",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "taxAmount",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "lineItemTotal",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "deliveryDate",
            type: "date",
            default_value: null,
          },
          {
            name: "plant",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "storageLocation",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "itemCategory",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "billingBlock",
            type: "boolean",
            default_value: null,
          },
          {
            name: "deliveryBlock",
            type: "boolean",
            default_value: null,
          },
          {
            name: "createdAt",
            type: "timestamp with time zone not null default CURRENT_TIMESTAMP",
            default_value: "now()",
          },
          {
            name: "createdBy",
            type: "uuid",
            default_value: null,
          },
          {
            name: "updatedAt",
            type: "timestamp with time zone",
            default_value: null,
          },
          {
            name: "lastUpdatedBy",
            type: "uuid",
            default_value: null,
          },
          {
            name: "syncToken",
            type: "uuid",
            default_value: null,
          },
          {
            name: "deletedAt",
            type: "timestamp with time zone",
            default_value: null,
          },
          {
            name: "deletedBy",
            type: "uuid",
            default_value: null,
          },
        ],
        foreign_keys: [
          {
            column_name: "salesOrderId",
            referenced_table: "salesOrdersHeadersStaging",
            referenced_column: "id",
          },
          {
            column_name: "productId",
            referenced_table: "products",
            referenced_column: "id",
          },
        ],
      }
    );

    if (tableError) {
      console.error("Error creating table:", tableError);
      return json({ error: "Failed to create table" }, { status: 500 });
    }

    // Track schema changes
    await supabase.functions.invoke("track-schema-changes");

    return json(
      {
        message: "Table created successfully",
        table: "salesOrdersLinesStaging",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
