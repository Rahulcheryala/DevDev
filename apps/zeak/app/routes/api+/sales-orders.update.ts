import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { updateSalesOrder } from "~/utils/dynamic-data.server";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.json();
  console.log("Request body:", body); // Debug log

  // if (!body.payload) {
  //   return json({
  //     success: false,
  //     error: "Missing payload"
  //   }, { status: 400 });
  // }

  const { salesOrderNumber, changes, integrationId } = body;
  console.log("Parsed payload:", { salesOrderNumber, changes, integrationId }); // Debug log

  try {
    const result = await updateSalesOrder(
      salesOrderNumber,
      changes,
      integrationId,
    );
    return json({
      success: true,
      salesOrderNumber,
      changes,
      result,
    });
  } catch (error) {
    console.error("Failed to update sales order:", error);
    return json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update sales order",
      },
      { status: 500 },
    );
  }
};
