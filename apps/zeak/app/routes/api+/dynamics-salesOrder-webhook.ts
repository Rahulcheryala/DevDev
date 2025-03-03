// File: app/routes/api/dynamics-salesOrder-webhook.ts

import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { fetchUserIdAndCompanyId } from "src/taskHelpers";
import { getSupabaseServiceRole } from "~/lib/supabase";
import { getAuthAccountByAccessToken } from "~/services/auth/auth.server";
import {
  insertSalesOrdersIntoStaging,
  processSalesOrdersFromStaging,
} from "~/utils/salesOrdersHelper";

const supabase = getSupabaseServiceRole()

// Helper function to verify user
async function verifyUser(accessToken: string): Promise<any> {
  const user = await getAuthAccountByAccessToken(accessToken);
  return user;
}

const isLoggedInAndActive = (data: any) => {
  const firstItem = Array.isArray(data) ? data[0] : data;
  return (
    firstItem?.status === "Logged In" && firstItem?.sessionActivity === "Active"
  );
};

// New function to verify session
async function verifySession(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("apiUserSession")
    .select("status, sessionActivity, createdOn")
    .eq("userId", userId)
    .order("createdOn", { ascending: false })
    .limit(1);

  if (error || !data) {
    console.error("Error verifying session:", error);
    return false;
  }

  return isLoggedInAndActive(data);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const {
      currencyCode,
      custAccount,
      deliveryDate,
      orderLines,
      salesId,
      salesName,
    } = body;

    const { token, ...salesOrderdata } = body;

    if (!token || !salesOrderdata) {
      return json(
        { error: "Missing required fields: Token or salesOrderdata" },
        { status: 400 },
      );
    }

    // Verify user
    const isValidUser = await verifyUser(token);
    if (!isValidUser) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userId, companyId } = await fetchUserIdAndCompanyId(
      isValidUser.email,
    );

    // Verify session
    const isValidSession = await verifySession(isValidUser.id);
    if (!isValidSession) {
      return json({ error: "Session expired or inactive" }, { status: 401 });
    }

    console.log(
      "The Received Sales Order Data is: " + JSON.stringify(salesOrderdata),
    );

    // Step 1: Insert sales orders into staging
    if (salesOrderdata.value && Array.isArray(salesOrderdata.value)) {
      console.log("Processing payload in new format", salesOrderdata);
      await insertSalesOrdersIntoStaging(
        salesOrderdata.value,
        userId,
        companyId,
      );
    } else if (currencyCode && custAccount && orderLines && salesId) {
      // Transform the new format into a structure that matches what `insertSalesOrdersIntoStaging` expects
      const transformedSalesOrder = [
        {
          SalesOrderNumber: salesId,
          OrderingCustomerAccountNumber: custAccount,
          OrderCreationDateTime: new Date().toISOString(),
          data: {
            currencyCode,
            salesName,
            deliveryDate,
            orderLines,
            customerAccount: custAccount,
            SalesOrderNumber: salesId,
          },
        },
      ];

      // Insert transformed sales orders into staging
      await insertSalesOrdersIntoStaging(
        transformedSalesOrder,
        userId,
        companyId,
      );
    } else {
      return json({ error: "Invalid sales order data" }, { status: 400 });
    }

    // Step 2: Process sales orders from staging
    await processSalesOrdersFromStaging(userId, companyId);

    return json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return json({ error: "Failed to insert data" }, { status: 500 });
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // const url = new URL(request.url);
    // const token = url.searchParams.get("token");

    // if (!token) {
    //   return json({ error: "Missing token" }, { status: 400 });
    // }

    // // Verify user
    // const isValidUser = await verifyUser(token);
    // if (!isValidUser) {
    //   return json({ error: "Unauthorized" }, { status: 401 });
    // }

    // // Verify session
    // const isValidSession = await verifySession(isValidUser.id);
    // if (!isValidSession) {
    //   return json({ error: "Session expired or inactive" }, { status: 401 });
    // }

    const { data, error } = await supabase
      .from("SalesOrdersStaging")
      .select("*");

    if (error) throw error;

    return json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
