import { serve } from "https://deno.land/std@0.175.0/http/server.ts";
import { format } from "https://deno.land/std@0.205.0/datetime/mod.ts";
// import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { DB, getConnectionPool, getDatabaseClient } from "../lib/database.ts";
import { corsHeaders } from "../lib/headers.ts";
import { getSupabaseServiceRole } from "../lib/supabase.ts";
// import type { Database } from "../lib/types.ts";
// import { credit, debit } from "../lib/utils.ts";
// import { getCurrentAccountingPeriod } from "../shared/get-accounting-period.ts";
// import {
//   getInventoryPostingGroup,
//   getPurchasingPostingGroup,
// } from "../shared/get-posting-group.ts";

const pool = getConnectionPool(1);
const db = getDatabaseClient<DB>(pool);

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { receiptId } = await req.json();
  const today = format(new Date(), "yyyy-MM-dd");

  try {
    if (!receiptId) throw new Error("Payload is missing receiptId");

    const client = getSupabaseServiceRole(req.headers.get("Authorization"));

    const [receipt, receiptLines] = await Promise.all([
      client.from("receipt").select("*").eq("id", receiptId).single(),
      client.from("receiptLine").select("*").eq("receiptId", receiptId),
    ]);

    if (receipt.error) throw new Error("Failed to fetch receipt");
    if (receiptLines.error) throw new Error("Failed to fetch receipt lines");

    const companyId = receipt.data?.companyId;

    const parts = await client
      .from("part")
      .select("id, partGroupId, partType")
      .in(
        "id",
        receiptLines.data.reduce<string[]>((acc, receiptLine) => {
          if (receiptLine.partId && !acc.includes(receiptLine.partId)) {
            acc.push(receiptLine.partId);
          }
          return acc;
        }, []),
      )
      .eq("companyId", companyId);
    if (parts.error) throw new Error("Failed to fetch part groups");

    // switch (receipt.data?.sourceDocument) {
    //   case "Purchase Order": {
    //     // if (!receipt.data.sourceDocumentId)
    //     //   throw new Error("Receipt has no sourceDocumentId");

    //     // const [purchaseOrder, purchaseOrderLines] = await Promise.all([
    //     //   client
    //     //     .from("purchaseOrder")
    //     //     .select("*")
    //     //     .eq("id", receipt.data.sourceDocumentId)
    //     //     .single(),
    //     //   client
    //     //     .from("purchaseOrderLine")
    //     //     .select("*")
    //     //     .eq("purchaseOrderId", receipt.data.sourceDocumentId),
    //     // ]);
    //     // if (purchaseOrder.error)
    //     //   throw new Error("Failed to fetch purchase order");
    //     // if (purchaseOrderLines.error)
    //     //   throw new Error("Failed to fetch purchase order lines");

    //     // const supplier = await client
    //     //   .from("supplier")
    //     //   .select("*")
    //     //   .eq("id", purchaseOrder.data.supplierId)
    //     //   .eq("companyId", companyId)
    //     //   .single();
    //     // if (supplier.error) throw new Error("Failed to fetch supplier");

    //     // const costLedgerInserts: Database["public"]["Tables"]["costLedger"]["Insert"][] =
    //     //   [];
    //     // const partLedgerInserts: Database["public"]["Tables"]["partLedger"]["Insert"][] =
    //     //   [];

    //     // const receiptLinesByPurchaseOrderLineId = receiptLines.data.reduce<
    //     //   Record<string, Database["public"]["Tables"]["receiptLine"]["Row"]>
    //     // >((acc, receiptLine) => {
    //     //   if (receiptLine.lineId) {
    //     //     acc[receiptLine.lineId] = receiptLine;
    //     //   }
    //     //   return acc;
    //     // }, {});

    //     // const purchaseOrderLineUpdates = purchaseOrderLines.data.reduce<
    //     //   Record<
    //     //     string,
    //     //     Database["public"]["Tables"]["purchaseOrderLine"]["Update"]
    //     //   >
    //     // >((acc, purchaseOrderLine) => {
    //     //   const receiptLine =
    //     //     receiptLinesByPurchaseOrderLineId[purchaseOrderLine.id];
    //     //   if (
    //     //     receiptLine &&
    //     //     receiptLine.receivedQuantity &&
    //     //     purchaseOrderLine.purchaseQuantity &&
    //     //     purchaseOrderLine.purchaseQuantity > 0
    //     //   ) {
    //     //     const recivedQuantityInPurchaseUnit =
    //     //       receiptLine.receivedQuantity /
    //     //       (receiptLine.conversionFactor ?? 1);

    //     //     const newQuantityReceived =
    //     //       (purchaseOrderLine.quantityReceived ?? 0) +
    //     //       recivedQuantityInPurchaseUnit;

    //     //     const receivedComplete =
    //     //       purchaseOrderLine.receivedComplete ||
    //     //       recivedQuantityInPurchaseUnit >=
    //     //         (purchaseOrderLine.quantityToReceive ??
    //     //           purchaseOrderLine.purchaseQuantity);

    //     //     return {
    //     //       ...acc,
    //     //       [purchaseOrderLine.id]: {
    //     //         quantityReceived: newQuantityReceived,
    //     //         receivedComplete,
    //     //       },
    //     //     };
    //     //   }

    //     //   return acc;
    //     // }, {});

    //     // save the posting groups in memory to avoid unnecessary queries
    //     const inventoryPostingGroups: Record<
    //       string,
    //       Database["public"]["Tables"]["postingGroupInventory"]["Row"] | null
    //     > = {};

    //     for await (const receiptLine of receiptLines.data) {
    //       let postingGroupInventory:
    //         | Database["public"]["Tables"]["postingGroupInventory"]["Row"]
    //         | null = null;

    //       const partType =
    //         parts.data.find((part) => part.id === receiptLine.partId)
    //           ?.partType ?? "Inventory";

    //       const partGroupId: string | null =
    //         parts.data.find((part) => part.id === receiptLine.partId)
    //           ?.partGroupId ?? null;
    //       const locationId = receiptLine.locationId ?? null;
    //       const supplierTypeId: string | null =
    //         supplier.data.supplierTypeId ?? null;

    //       // inventory posting group
    //       if (`${partGroupId}-${locationId}` in inventoryPostingGroups) {
    //         postingGroupInventory =
    //           inventoryPostingGroups[`${partGroupId}-${locationId}`];
    //       } else {
    //         const inventoryPostingGroup = await getInventoryPostingGroup(
    //           client,
    //           {
    //             partGroupId,
    //             locationId,
    //           }
    //         );

    //         if (inventoryPostingGroup.error || !inventoryPostingGroup.data) {
    //           throw new Error("Error getting inventory posting group");
    //         }

    //         postingGroupInventory = inventoryPostingGroup.data ?? null;
    //         inventoryPostingGroups[`${partGroupId}-${locationId}`] =
    //           postingGroupInventory;
    //       }

    //       if (!postingGroupInventory) {
    //         throw new Error("No inventory posting group found");
    //       }

    //       // purchasing posting group
    //       const purchasingPostingGroups: Record<
    //         string,
    //         Database["public"]["Tables"]["postingGroupPurchasing"]["Row"] | null
    //       > = {};

    //       let postingGroupPurchasing:
    //         | Database["public"]["Tables"]["postingGroupPurchasing"]["Row"]
    //         | null = null;

    //       if (`${partGroupId}-${supplierTypeId}` in purchasingPostingGroups) {
    //         postingGroupPurchasing =
    //           purchasingPostingGroups[`${partGroupId}-${supplierTypeId}`];
    //       } else {
    //         const purchasingPostingGroup = await getPurchasingPostingGroup(
    //           client,
    //           {
    //             partGroupId,
    //             supplierTypeId,
    //           }
    //         );

    //         if (purchasingPostingGroup.error || !purchasingPostingGroup.data) {
    //           throw new Error("Error getting purchasing posting group");
    //         }

    //         postingGroupPurchasing = purchasingPostingGroup.data ?? null;
    //         purchasingPostingGroups[`${partGroupId}-${supplierTypeId}`] =
    //           postingGroupPurchasing;
    //       }

    //       if (!postingGroupPurchasing) {
    //         throw new Error("No purchasing posting group found");
    //       }

    //       const purchaseOrderLine = purchaseOrderLines.data.find(
    //         (line) => line.id === receiptLine.lineId
    //       );

    //       const quantityReceived =
    //         (purchaseOrderLine?.quantityReceived ?? 0) *
    //         (purchaseOrderLine?.conversionFactor ?? 1);

    //       const quantityInvoiced =
    //         (purchaseOrderLine?.quantityInvoiced ?? 0) *
    //         (purchaseOrderLine?.conversionFactor ?? 1);

    //       const quantityToReverse = Math.max(
    //         0,
    //         Math.min(
    //           receiptLine.receivedQuantity ?? 0,
    //           quantityInvoiced - quantityReceived
    //         )
    //       );

    //       const quantityAlreadyReversed =
    //         quantityReceived < quantityInvoiced ? quantityReceived : 0;

    //       if (quantityToReverse > 0) {
    //         let reversedValue = 0;

    //         // create the cost ledger entry
    //         costLedgerInserts.push({
    //           partLedgerType: "Purchase",
    //           costLedgerType: "Direct Cost",
    //           adjustment: false,
    //           documentType: "Purchase Receipt",
    //           documentId: receipt.data?.id ?? undefined,
    //           externalDocumentId: receipt.data?.externalDocumentId ?? undefined,
    //           partId: receiptLine.partId,
    //           quantity: quantityToReverse,
    //           cost: reversedValue,
    //           costPostedToGL: reversedValue,
    //           companyId,
    //         });
    //       }

    //       if (partType === "Inventory") {
    //         partLedgerInserts.push({
    //           postingDate: today,
    //           partId: receiptLine.partId,
    //           quantity: receiptLine.receivedQuantity,
    //           locationId: receiptLine.locationId,
    //           shelfId: receiptLine.shelfId,
    //           entryType: "Positive Adjmt.",
    //           documentType: "Purchase Receipt",
    //           documentId: receipt.data?.id ?? undefined,
    //           externalDocumentId: receipt.data?.externalDocumentId ?? undefined,
    //           companyId,
    //         });
    //       }
    //     }

    //     // const accountingPeriodId = await getCurrentAccountingPeriod(
    //     //   client,
    //     //   companyId,
    //     //   db
    //     // );

    //     // await db.transaction().execute(async (trx) => {
    //     //   for await (const [purchaseOrderLineId, update] of Object.entries(
    //     //     purchaseOrderLineUpdates
    //     //   )) {
    //     //     await trx
    //     //       .updateTable("purchaseOrderLine")
    //     //       .set(update)
    //     //       .where("id", "=", purchaseOrderLineId)
    //     //       .execute();
    //     //   }

    //     //   const purchaseOrderLines = await trx
    //     //     .selectFrom("purchaseOrderLine")
    //     //     .select([
    //     //       "id",
    //     //       "purchaseOrderLineType",
    //     //       "invoicedComplete",
    //     //       "receivedComplete",
    //     //     ])
    //     //     .where("purchaseOrderId", "=", purchaseOrder.data.id)
    //     //     .execute();

    //     //   const areAllLinesInvoiced = purchaseOrderLines.every(
    //     //     (line) =>
    //     //       line.purchaseOrderLineType === "Comment" || line.invoicedComplete
    //     //   );

    //     //   const areAllLinesReceived = purchaseOrderLines.every(
    //     //     (line) =>
    //     //       line.purchaseOrderLineType === "Comment" || line.receivedComplete
    //     //   );

    //     //   let status: Database["public"]["Tables"]["purchaseOrder"]["Row"]["status"] =
    //     //     "To Receive and Invoice";
    //     //   if (areAllLinesInvoiced && areAllLinesReceived) {
    //     //     status = "Completed";
    //     //   } else if (areAllLinesInvoiced) {
    //     //     status = "To Receive";
    //     //   } else if (areAllLinesReceived) {
    //     //     status = "To Invoice";
    //     //   }

    //     //   await trx
    //     //     .updateTable("purchaseOrder")
    //     //     .set({
    //     //       status,
    //     //     })
    //     //     .where("id", "=", purchaseOrder.data.id)
    //     //     .execute();

    //     //   await trx
    //     //     .updateTable("purchaseOrderDelivery")
    //     //     .set({
    //     //       deliveryDate: today,
    //     //       locationId: receipt.data.locationId,
    //     //     })
    //     //     .where("id", "=", receipt.data.sourceDocumentId)
    //     //     .execute();

    //     //   if (partLedgerInserts.length > 0) {
    //     //     await trx
    //     //       .insertInto("partLedger")
    //     //       .values(partLedgerInserts)
    //     //       .returning(["id"])
    //     //       .execute();
    //     //   }

    //     //   if (costLedgerInserts.length > 0) {
    //     //     await trx
    //     //       .insertInto("costLedger")
    //     //       .values(costLedgerInserts)
    //     //       .returning(["id"])
    //     //       .execute();
    //     //   }

    //     //   await trx
    //     //     .updateTable("receipt")
    //     //     .set({
    //     //       status: "Posted",
    //     //       postingDate: today,
    //     //     })
    //     //     .where("id", "=", receiptId)
    //     //     .execute();
    //     // });
    //     break;
    //   }
    //   default: {
    //     break;
    //   }
    // }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error(err);
    if (receiptId) {
      const client = getSupabaseServiceRole(req.headers.get("Authorization"));
      client.from("receipt").update({ status: "Draft" }).eq("id", receiptId);
    }
    return new Response(JSON.stringify(err), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
