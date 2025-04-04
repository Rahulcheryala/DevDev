import { validationError, validator } from "@zeak/remix-validated-form";
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { requirePermissions } from "~/services/auth/auth.server";
import { assertIsPost } from "~/utils/http";
import type { NotificationCreateRequest } from "../x+/notifications+/_types";
import { NotificationType } from "../x+/notifications+/_types";
import { newNotificationValidator } from "../x+/notifications+/_model";
import { path } from "~/utils/path";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { client, userId } = await requirePermissions(request, {
    create: "users",
  });

  const requestBody = await request.json();
  console.log("Request Body:", requestBody);

  const validation = await validator(newNotificationValidator).validate(
    requestBody,
  );

  if (validation.error) {
    console.error("Validation Error:", validation.error);
    return validationError(validation.error);
  }

  // Check for existing notification with this name
  const { data: existingNotification } = await client
    .from("notfMaster" as any)
    .select("id")
    .eq("name", requestBody.name)
    .single();

  const _notification = getNotificationBody(requestBody, userId);
  const companyIds = JSON.parse(requestBody.companyIdStr) as string[];

  let notification;

  if (existingNotification) {
    // Update existing notification
    notification = await client
      .from("notfMaster" as any)
      .update(_notification)
      .eq("id", existingNotification.id)
      .select("*")
      .single();

    // Delete existing company mappings
    await client
      .from("notfCompanyMapping" as any)
      .delete()
      .eq("notificationId", existingNotification.id);
  } else {
    // Create new notification
    notification = await client
      .from("notfMaster" as any)
      .insert([_notification])
      .select("*")
      .single();
  }

  // Insert company mappings
  await client.from("notfCompanyMapping" as any).insert(
    companyIds.map((id) => ({
      companyId: id,
      notificationId: notification.data.id,
    })),
  );

  return json({
    notificationId: notification.data?.id,
    url:
      requestBody.type === NotificationType.MANUAL
        ? path.to.notificationEditAudience(notification.data?.id)
        : path.to.notificationEditRecurrence(notification.data?.id),
  });
}

const getNotificationBody = (body: any, createdBy: string) => {
  return {
    name: body.name,
    description: body.description,
    type: body.type,
    purpose: body.purpose,
    priority: body.priority,
    color: body.color,
    version: 1,
    createdBy: createdBy,
    webContent: body.webContent,
    isWebDelivery: body.isWebDelivery === "1",
    isEmailDelivery: body.isEmailDelivery === "1",
    isSMSDelivery: body.isSMSDelivery === "1",
    recurrence: body.recurrence,
    audience: body.audience,
    startDateTime: body.startDateTime
      ? new Date(body.startDateTime!)
      : undefined,
    endDateTime: body.endDateTime ? new Date(body.endDateTime!) : undefined,
    occurences: body.ocurrences,
    emailConfig: {
      recipients: body.recipients || [],
    },
  };
};
