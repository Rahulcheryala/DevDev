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
    const { error: enumError } = await supabase.rpc("create_enum", {
      enum_name: "salesOrderType",
      values: ["Domestic", "International"],
    });

    const { error: enumError2 } = await supabase.rpc("create_enum", {
      enum_name: "outSourceType",
      values: ["EDI", "Web", "Manual", "Upload"],
    });

    const { error: enumError3 } = await supabase.rpc("create_enum", {
      enum_name: "salesOrderStatus",
      values: ["Draft", "Confirmed", "In Progress", "Completed", "Cancelled"],
    });

    const { error: tableError } = await supabase.rpc(
      "create_table_with_columns",
      {
        table_name: "salesOrdersHeadersStaging",
        column_definitions: [
          {
            name: "id",
            type: "uuid",
            default_value: "uuid_generate_v4()",
          },
          {
            name: "salesOrderNumber",
            type: "varchar(50)",
            default_value: null,
          },
          {
            name: "customerId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "orderSourceId",
            type: "outSourceType",
            default_value: null,
          },
          {
            name: "shipfromAddressId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "soldToPartyId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "shipToAddressId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "billToPartyId",
            type: "uuid",
            default_value: null,
          },
          {
            name: "salesOrganization",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "distributionChannel",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "orderPriority",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "orderType",
            type: "salesOrderType",
            default_value: null,
          },
          {
            name: "orderReason",
            type: "varchar(20)",
            default_value: null,
          },
          {
            name: "customerPONumber",
            type: "varchar(50)",
            default_value: null,
          },
          {
            name: "customerPODate",
            type: "date",
            default_value: null,
          },
          {
            name: "requestedDeliveryDate",
            type: "date",
            default_value: null,
          },
          {
            name: "notes",
            type: "text",
            default_value: null,
          },
          {
            name: "paymentTerms",
            type: "varchar(50)",
            default_value: null,
          },
          {
            name: "incoTerms",
            type: "varchar(50)",
            default_value: null,
          },
          {
            name: "currency",
            type: "varchar(10)",
            default_value: null,
          },
          {
            name: "netValue",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "taxValue",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "grossValue",
            type: "decimal(15, 2)",
            default_value: null,
          },
          {
            name: "orderStatus",
            type: "salesOrderStatus",
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
            name: "deletedAt",
            type: "timestamp with time zone",
            default_value: null,
          },
          {
            name: "deletedBy",
            type: "uuid",
            default_value: null,
          },
          {
            name: "syncToken",
            type: "uuid",
            default_value: null,
          },
        ],
        primary_key: "id",
        foreign_keys: [
          {
            column: "customerId",
            references: "contactMaster(id)",
          },
          {
            column: "shipfromAddressId",
            references: "addressMaster(id)",
          },
          {
            column: "soldToPartyId",
            references: "contactMaster(id)",
          },
          {
            column: "billToPartyId",
            references: "contactMaster(id)",
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
        table: "salesOrdersHeadersStaging",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return json({ error: "Internal server error" }, { status: 500 });
  }
};
