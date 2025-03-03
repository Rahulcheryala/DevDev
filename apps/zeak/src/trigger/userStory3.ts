import { fetchSalesOrders } from "~/utils/dynamic-data.server";
import { registerScheduledTask } from "../taskRegistry";

export const userStory3 = registerScheduledTask({
  id: "user-story-3",
  name: "User Story 3",
  description:
    "A combo of a time-based task to fetch sales orders as per a desired schedule, trigger an email and push (toast) notification to the user with a summary of sales orders fetched from Dynamics 365, and the ability to edit the Sales Order in Zeak and push the updated data to Dynamics 365 immediately and display a resultant toast notification to the user",
  priority: "High",
  createdBy: "Yash Santani, Anupam Appar",
  isActive: true,
  scheduleId: "sch-user-story-3", // The scheduleId can be dynamically generated during schedule creation
  run: async (payload) => {
    const email = payload.externalId as string;

    const salesOrders = await fetchSalesOrders(email);

    console.log("Fetched sales orders for email:", email);
    console.log("Sales orders data:", JSON.stringify(salesOrders, null, 2));
    if (salesOrders === undefined || salesOrders === null) {
      console.error(
        "Sales orders is undefined - check if fetchSalesOrders is returning data correctly",
      );
    }
  },
});
