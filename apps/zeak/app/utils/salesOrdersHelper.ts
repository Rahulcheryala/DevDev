import { getSupabaseServiceRole } from "~/lib/supabase";

export async function insertSalesOrdersIntoStaging(
  salesOrders: any[],
  userId: string,
  companyId: string,
) {
  const supabase = getSupabaseServiceRole();
  for (const order of salesOrders) {
    const { error: insertError } = await supabase
      .from("SalesOrdersStaging")
      .insert({
        salesOrderId: order.SalesOrderNumber,
        customerAccount: order.OrderingCustomerAccountNumber,
        orderDate: new Date(order.OrderCreationDateTime),
        modifiedDateTime: new Date(order.ModifiedDateTime),
        data: order,
        insertedAt: new Date(),
        processed: false,
        userId: userId,
        companyId: companyId,
      });

    if (insertError) {
      console.error("Error inserting sales order into staging:", insertError);
    }
  }
}

export async function processSalesOrdersFromStaging(
  userId: string,
  companyId: string,
) {
  const supabase = getSupabaseServiceRole();
  const { data: stagingRecords, error: selectError } = await supabase
    .from("SalesOrdersStaging")
    .select("*")
    .eq("processed", false);

  if (selectError) {
    console.error("Error fetching unprocessed staging records:", selectError);
    throw selectError;
  }

  for (const record of stagingRecords) {
    try {
      // Upsert into the main SalesOrders table
      const { error: upsertError } = await supabase.from("SalesOrders").upsert(
        {
          id: record.id,
          salesOrderId: record.salesOrderId,
          customerAccount: record.customerAccount,
          orderDate: new Date(record.orderDate),
          modifiedDateTime: new Date(record.modifiedDateTime),
          data: record.data,
          insertedAt: new Date(),
          updatedAt: new Date(),
          userId: userId,
          companyId: companyId,
        },
        { onConflict: ["salesOrderId"] },
      );

      if (upsertError) {
        console.error("Error upserting SalesOrder:", upsertError);
        throw upsertError;
      }

      // Mark the staging record as processed
      await supabase
        .from("SalesOrdersStaging")
        .update({ processed: true })
        .eq("id", record.id);
    } catch (e) {
      console.error("Error processing record:", e);
    }
  }
}
