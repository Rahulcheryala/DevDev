import { createNotificationQueue } from "~/utils/notification";
import { schedules } from "@trigger.dev/sdk/v3";

export const notificationTrigger = schedules.task({
  id: "notification-trigger",
  run: async (payload: any) => {
    try {
      const response = await createNotificationQueue(
        payload.externalId as string,
      );
      if (response.isExpired) {
        await schedules.del(response.scheduleId as string);
      }
    } catch (err) {
      // TODO: How do we want to handle error?
    }
  },
});
