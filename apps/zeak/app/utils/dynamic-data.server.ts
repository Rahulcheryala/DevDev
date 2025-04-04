import { getSupabaseServiceRole } from "~/lib/supabase/client";
import { fetchUserIdAndCompanyId } from "../../src/taskHelpers"; // Import your helper method
import { ensureValidAccessToken } from "./msalTokenHelper";
import {
  insertSalesOrdersIntoStaging,
  processSalesOrdersFromStaging,
} from "./salesOrdersHelper";
import { path } from "~/utils/path";
import { checkDynamicsIntegration } from "./checkDynamicsIntegration";

export async function fetchSalesOrders(userEmail: string) {
  const supabase = getSupabaseServiceRole();

  // Fetch userId and companyId for the user initiating the task
  const { userId, companyId } = await fetchUserIdAndCompanyId(userEmail);

  console.log("UserId: " + userId);
  console.log("CompanyId: " + companyId);

  // Fetch the integration details for Dynamics F&O
  // const { data: integrationData, error } = await supabase
  //   .from("integrations")
  //   .select("integrationJson")
  //   .eq("integrationName", "Dynamics F&O")
  //   .eq("integrationJson->>email", 'yash.santani@xcelpros.com') // Fetch the correct user's integration
  //   .single();

  // if (error || !integrationData) {
  //   console.error("Error fetching integration data:", error);
  //   return;
  // }

  const { accessToken, dynamicsBaseUrl } = await ensureValidAccessToken(
    "yash.santani@xcelpros.com",
  );

  // console.log("The integration Json is:" + JSON.stringify(integrationData.integrationJson));
  console.log("The accessToken is" + accessToken);

  // Step 1: Fetch the last inserted sales order's timestamp from SalesOrdersStaging
  const { data: lastInsertedOrder, error: lastInsertError } = await supabase
    .from("SalesOrdersStaging")
    .select("insertedAt")
    .eq("companyId", companyId) // Ensure we check the records for the correct company
    .order("insertedAt", { ascending: false })
    .limit(1)
    .single();

  // Determine whether to filter by `ModifiedDateTime` or fetch all orders
  let queryUrl = `${dynamicsBaseUrl}/data/SalesOrderHeadersV2`;

  if (!lastInsertError && lastInsertedOrder) {
    // We found a record, use the `insertedAt` timestamp to fetch only new/modified sales orders
    const lastInsertTimestamp = new Date(
      lastInsertedOrder.insertedAt,
    ).toISOString();
    queryUrl += `?$filter=OrderCreationDateTime gt ${lastInsertTimestamp}`;
  } else {
    // No record found, fetch all sales orders without filtering
    console.log(
      `No records found in SalesOrdersStaging for companyId: ${companyId}. Fetching all sales orders.`,
    );
  }

  // Step 2: Query Sales Orders from Dynamics 365 F&O
  const response = await fetch(queryUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const salesOrders = await response.json();

  if (salesOrders.error) {
    console.error("Error fetching sales orders:", salesOrders.error);
    return;
  }

  console.log("Sales Orders Are: " + JSON.stringify(salesOrders));

  // Step 3: Insert fetched sales orders into the SalesOrdersStaging table

  if (Array.isArray(salesOrders.value)) {
    await insertSalesOrdersIntoStaging(salesOrders.value, userId, companyId);
  } else {
    console.error("No valid sales orders found in response.");
  }

  // Step 4: Process sales orders from SalesOrdersStaging table and insert into SalesOrders Table
  await processSalesOrdersFromStaging(userId, companyId);

  return { success: true, count: salesOrders.value.length };
}

export async function updateSalesOrder(
  salesOrderNumber: string,
  changes: Record<string, any>,
  integrationId: string,
) {
  const supabase = getSupabaseServiceRole();

  try {
    // 1. Get integration details
    const integration = await checkDynamicsIntegration(
      "yash.santani@xcelpros.com",
    );

    if (!integration.isIntegrated) {
      throw new Error("Integration not found");
    }

    // 2. Get access token
    const { accessToken, dynamicsBaseUrl } = await ensureValidAccessToken(
      "yash.santani@xcelpros.com",
    );

    console.log("The Sales Order Number is: " + salesOrderNumber);

    // 3. First, get the Dynamics record ID mapping
    // const { data: salesOrder, error: fetchError } = await supabase
    //   .from("SalesOrders")
    //   .select("SalesOrderNumber")
    //   .eq("SalesOrderNumber", salesOrderNumber)
    //   .single();

    //   if (fetchError || !salesOrder?.SalesOrderNumber) {
    //     console.error("Fetch error:", fetchError);
    //     console.error("Sales order data:", salesOrder);
    //     throw new Error("Failed to find Sales Order Number mapping");
    //   }

    // 4. Update in Dynamics using the correct ID format Customers(dataAreaId='usmf',CustomerAccount='DE-001')?cross-company=true
    const updateUrl = `${dynamicsBaseUrl}/data/SalesOrderHeadersV2(dataAreaId='USMF',SalesOrderNumber='${salesOrderNumber}')?cross-company=true`;
    console.log("Updating Dynamics at URL:", updateUrl);

    const dynamicsResponse = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "If-Match": "*",
        Prefer: "return=representation",
      },
      body: JSON.stringify(changes),
    });

    if (!dynamicsResponse.ok) {
      const errorText = await dynamicsResponse.text();
      console.error("Dynamics error response:", errorText);
      throw new Error(
        `Failed to update in Dynamics: ${dynamicsResponse.statusText}`,
      );
    }

    // 4. Update local SalesOrders table
    const { error: updateError } = await supabase
      .from("SalesOrders")
      .update(changes)
      .eq("SalesOrderNumber", salesOrderNumber);

    if (updateError) {
      throw new Error(`Failed to update local record: ${updateError.message}`);
    }

    return {
      success: true,
      salesOrderNumber,
      changes,
    };
  } catch (error) {
    console.error("Error updating sales order:", error);
    throw error;
  }
}
