import { fetchSalesOrders } from "~/utils/dynamic-data.server";
import { registerScheduledTask } from "../taskRegistry";

export const fetchSalesOrdersWorkflow = registerScheduledTask({
  id: "fetch-sales-orders",
  name: "Fetch Sales Orders Workflow",
  description: "A scheduled task to fetch sales orders every minute",
  priority: "High",
  createdBy: "Yash Sagar",
  isActive: true,
  scheduleId: "sch-fecth-sale-orders", // The scheduleId can be dynamically generated during schedule creation
  run: async (payload) => {
    const email = payload.externalId as string;

    const salesOrders = await fetchSalesOrders(email);

    console.log("Fetched sales orders for email:", email, salesOrders);
  },
});
