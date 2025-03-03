import { useState } from "react";
import type {
  NotificationDeliveryForm,
  NotificationEditDeliveryRequest,
  NotificationRecurrence,
} from "../_types";
import type { SelectChangeEvent } from "~/components/Form/Select";
import {
  newNotificationValidator,
  notificationDeliveryFormValidator,
} from "../_model";
import NotificationLayout from "~/modules/notifications/layout";
import {
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import { path } from "~/utils/path";
import { requirePermissions } from "~/services/auth/auth.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { assertIsPost } from "~/utils/http";
import {
  getNotification,
  updateNotification,
} from "~/modules/notifications/service";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

import NotificationDeliveryFormComponent from "~/modules/notifications/edit/delivery";
import { generateCronPattern } from "~/utils/notification";
import { schedules } from "@trigger.dev/sdk/v3";
import { notificationTrigger } from "~/triggers/notification.trigger";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId, client } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(
    notificationDeliveryFormValidator,
  ).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    const requestBody =
      validation.submittedData as NotificationEditDeliveryRequest;
    const _body = {
      isWebDelivery: requestBody.isWebDelivery === "1",
      isSMSDelivery: requestBody.isSMSDelivery === "1",
      isEmailDelivery: requestBody.isEmailDelivery === "1",
      webContent: requestBody.webContent,
      emailContent: requestBody.emailContent,
      smsContent: requestBody.smsContent,
      webConfig: requestBody.webConfigPosition
        ? { position: requestBody.webConfigPosition }
        : {},
      emailConfig: requestBody.emailConfigSubject
        ? { subject: requestBody.emailConfigSubject }
        : {},
      modifiedBy: userId,
    };
    await updateNotification(client, requestBody.id, _body);
    const notification = await getNotification(client, requestBody.id);
    const recurrence = notification.data.recurrence as NotificationRecurrence;
    const cron = generateCronPattern(
      recurrence,
      notification.data.startDateTime,
    );

    let scheduleId = notification.data.scheduleId;
    if (scheduleId == null) {
      const schedule = await schedules.create({
        task: notificationTrigger.id,
        cron: cron,
        externalId: notification.data.id,
        deduplicationKey: notification.data.id,
        timezone: "Asia/Calcutta",
      });
      scheduleId = schedule.id;
    } else {
      schedules.update(scheduleId, {
        cron: cron,
        task: notificationTrigger.id,
      });
    }

    await client
      .from("notfMaster" as any)
      .update({ scheduleId: scheduleId, status: "active" })
      .eq("id", notification.data.id);

    return redirect(path.to.notificationList);
  } catch (err: any) {}
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    update: "users",
  });
  const { notificationId } = params;
  const notification = await getNotification(client, notificationId!);

  if (notification.error) {
    throw redirect(path.to.notificationCreate);
  }

  return json({
    id: notification.data.id,
    isWebDelivery: notification.data.isWebDelivery ? "1" : "0",
    isEmailDelivery: notification.data.isEmailDelivery ? "1" : "0",
    isSMSDelivery: notification.data.isSMSDelivery ? "1" : "0",
    webContent: notification.data.webContent,
    webConfigPosition: notification.data.webConfig.position,
    emailContent: notification.data.emailContent,
    emailConfigSubject: notification.data.emailConfig.subject,
    smsContent: notification.data.smsContent,
  });
}

export default function NotificationDelivery() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { id, ...initialDetails }: any = useLoaderData<typeof loader>();
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationDeliveryForm>(initialDetails);

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in notificationDetails) {
      if (notificationDetails[key as never]) {
        formData.append(key, notificationDetails[key as never]);
      }
    }
    formData.append("id", id);
    fetcher.submit(formData, { method: "POST" });
  };

  const onBackClick = () => {
    return navigate(path.to.notificationEditAudience(id));
  };

  const onTextChange = (e: any) => {
    setNotificationDetails({
      ...notificationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectChange = (event: SelectChangeEvent | null) => {
    if (event) {
      setNotificationDetails({
        ...notificationDetails,
        [event.name]: event.value,
      });
    }
  };

  return (
    <ValidatedForm
      className="w-full flex space-x-2 h-full"
      method="post"
      validator={newNotificationValidator}
    >
      <NotificationLayout
        onBackClick={onBackClick}
        onNextClick={handleSubmit}
        id={4}
      >
        <NotificationDeliveryFormComponent
          notificationDetails={notificationDetails}
          onTextChange={onTextChange}
          onSelectChange={onSelectChange}
        />
      </NotificationLayout>
    </ValidatedForm>
  );
}
