import { useState } from "react";
import CreateNotificationSection from "~/modules/notifications/new";
import type {
  NotificationCreateForm,
  NotificationCreateRequest,
} from "../_types";
import { NotificationType } from "../_types";
import type { SelectChangeEvent } from "~/components/Form/Select";
import { newNotificationValidator } from "../_model";
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
import {
  getNotification,
  updateNotification,
} from "~/modules/notifications/service";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { assertIsPost } from "~/utils/http";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId, client } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(newNotificationValidator).validate(
    formData,
  );

  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    const requestBody = validation.submittedData as NotificationCreateRequest;
    const _body = {
      name: requestBody.name,
      description: requestBody.description,
      type: requestBody.type,
      purpose: requestBody.purpose,
      priority: requestBody.priority,
      color: requestBody.color,
      updatedBy: userId,
    };
    console.log("_body :", _body);
    console.log("requestBody.id :", requestBody.id);
    await updateNotification(client, requestBody.id!, _body);
    return redirect(
      requestBody.type === NotificationType.MANUAL
        ? path.to.notificationEditAudience(requestBody.id!)
        : path.to.notificationEditRecurrence(requestBody.id!),
    );
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
    name: notification.data.name,
    description: notification.data.description,
    priority: notification.data.priority,
    purpose: notification.data.purpose,
    type: notification.data.type,
    color: notification.data.color,
  });
}

export default function NotificationDetailsEdit() {
  const fetcher = useFetcher();
  const { id, ...initialDetails }: any = useLoaderData<typeof loader>();
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationCreateForm>(initialDetails);

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

  const handleSubmit = async () => {
    const formData = new FormData();

    for (const key in notificationDetails) {
      if (notificationDetails[key as never]) {
        formData.append(key, notificationDetails[key as never]);
      }
    }
    formData.append("id", id);
    await fetcher.submit(formData, { method: "POST" });
  };

  return (
    <ValidatedForm
      className="flex space-x-2 h-full"
      method="post"
      validator={newNotificationValidator}
    >
      <NotificationLayout onNextClick={handleSubmit} id={1}>
        <CreateNotificationSection
          notificationDetails={notificationDetails}
          onSelectChange={onSelectChange}
          onTextChange={onTextChange}
        />
      </NotificationLayout>
    </ValidatedForm>
  );
}
