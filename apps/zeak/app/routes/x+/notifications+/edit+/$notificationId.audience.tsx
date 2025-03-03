import { useState } from "react";
import type {
  NotificationAudienceForm,
  NotificationCustomizedAudience,
  NotificationEditAudienceRequest,
} from "../_types";
import { NotificationAudience } from "../_types";
import {
  newNotificationValidator,
  notificationAudienceFormValidator,
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
import { success } from "~/utils/result";
import { flash } from "~/services/session.server";
import NotificationAudienceFormComponent from "~/modules/notifications/edit/audience";

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId, client } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(
    notificationAudienceFormValidator,
  ).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }

  try {
    const requestBody =
      validation.submittedData as NotificationEditAudienceRequest;
    const _body = {
      audience: requestBody.audience,
      modifiedBy: userId,
    };
    await updateNotification(client, requestBody.id, _body);

    if (requestBody.audience === NotificationAudience.CUSTOMIZED) {
      const customizedAudiences = JSON.parse(
        requestBody.customizedAudience as string,
      ) as NotificationCustomizedAudience[];
      const audiences = customizedAudiences.map((audience) => ({
        notificationId: requestBody.id,
        entityType: audience.entityType,
        entityId: audience.entityId,
      }));
      await client.from("notfCustomizedAudience" as any).insert(audiences);
    }
    return redirect(
      path.to.notificationEditDelivery(requestBody.id),
      await flash(request, success("Notification  updated successfully")),
    );
  } catch (err: any) {}
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    update: "users",
  });
  const { notificationId } = params;
  const notifcation = await getNotification(client, notificationId!);

  if (notifcation.error) {
    throw redirect(path.to.notificationCreate);
  }

  return json({
    id: notifcation.data.id,
    audience: notifcation.data.audience,
  });
}

export default function NotificationAudienceComponent() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { id, ...initialDetails }: any = useLoaderData<typeof loader>();
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationAudienceForm>(initialDetails);
  const onChange = (audience: NotificationAudience) => {
    setNotificationDetails({
      audience,
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("audience", notificationDetails.audience);
    formData.append("id", id);
    await fetcher.submit(formData, { method: "POST" });
  };

  const onBackClick = () => {
    return navigate(path.to.notificationEditDetails(id));
  };

  return (
    <ValidatedForm
      className="flex space-x-2 h-full"
      method="post"
      validator={newNotificationValidator}
    >
      <NotificationLayout
        onBackClick={onBackClick}
        onNextClick={handleSubmit}
        id={3}
      >
        <NotificationAudienceFormComponent
          selected={notificationDetails.audience}
          onChange={onChange}
        />
      </NotificationLayout>
    </ValidatedForm>
  );
}
