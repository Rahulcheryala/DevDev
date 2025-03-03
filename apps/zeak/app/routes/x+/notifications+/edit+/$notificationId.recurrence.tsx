import { useCallback, useEffect, useState } from "react";
import type {
  NotificationEditRecurrenceRequest,
  NotificationRecurrenceForm,
} from "../_types";
import { NotificationRecurrence } from "../_types";
import type { SelectChangeEvent } from "~/components/Form/Select";
import {
  newNotificationValidator,
  notificationRecurrenceFormValidator,
} from "../_model";
import NotificationLayout from "~/modules/notifications/layout";
import {
  ValidatedForm,
  validationError,
  validator,
} from "@zeak/remix-validated-form";
import { path } from "~/utils/path";
import NotificationRecurrenceSection from "~/modules/notifications/edit/recurrence";
import { requirePermissions } from "~/services/auth/auth.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { assertIsPost } from "~/utils/http";
import {
  buildDateTime,
  getDate,
  getNotification,
  getTime,
} from "~/modules/notifications/service";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { success } from "~/utils/result";
import { flash } from "~/services/session.server";

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
    startDate: getDate(notifcation.data.startDateTime),
    startTime: getTime(notifcation.data.startDateTime),
    startTimezone: notifcation.data.startDateTimezone,
    endDate: getDate(notifcation.data.endDateTime),
    endTime: getTime(notifcation.data.endDateTime),
    endTimezone: notifcation.data.endDateTimezone,
    recurrence: notifcation.data.recurrence,
    occurences: notifcation.data.occurences,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);
  const { userId } = await requirePermissions(request, {
    update: ["settings", "users"],
  });
  const formData = await request.formData();
  const validation = await validator(
    notificationRecurrenceFormValidator,
  ).validate(formData);

  if (validation.error) {
    return validationError(validation.error);
  }
  try {
    const requestBody =
      validation.submittedData as NotificationEditRecurrenceRequest;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _body = {
      startDateTime: buildDateTime(
        requestBody.startDate,
        requestBody.startTime,
      ),
      // One time will end date time equal to start date time.
      endDateTime:
        requestBody.recurrence === NotificationRecurrence.ONE_TIME
          ? buildDateTime(requestBody.startDate, requestBody.startTime)
          : buildDateTime(requestBody.endDate, requestBody.endTime),
      occurences: requestBody.occurences,
      startDateTimezone: requestBody.startTimezone,
      endDateTimezone: requestBody.endTimezone,
      recurrence: requestBody.recurrence,
      modifiedBy: userId,
    };
    // const response = await updateNotification(client, requestBody.id, _body);
    return redirect(
      path.to.notificationEditAudience(requestBody.id),
      await flash(request, success("Notification  updated successfully")),
    );
  } catch (err: any) { }
}

export default function NotfRecurrence() {
  const fetcher = useFetcher();
  const { id, ...initialDetails }: any = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [endType, setEndType] = useState("date");
  const [isIndefinite, setIsIndefinite] = useState(false);
  const [notificationDetails, setNotificationDetails] =
    useState<NotificationRecurrenceForm>(initialDetails);

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

  const removeEndFields = useCallback(() => {
    setNotificationDetails({
      ...notificationDetails,
      endTime: undefined,
      endDate: undefined,
      endTimezone: undefined,
      occurences: undefined,
    });
    setEndType("");
  }, [notificationDetails, setNotificationDetails, setEndType]);

  useEffect(() => {
    if (
      isIndefinite ||
      notificationDetails.recurrence === NotificationRecurrence.ONE_TIME
    ) {
      removeEndFields();
    } else {
      setEndType("date");
    }
  }, [isIndefinite, notificationDetails.recurrence, removeEndFields]);

  useEffect(() => {
    if (endType === "date") {
      setNotificationDetails({
        ...notificationDetails,
        occurences: undefined,
      });
    }
    if (endType === "occurences") {
      setNotificationDetails({
        ...notificationDetails,
        endDate: undefined,
        endTime: undefined,
        endTimezone: undefined,
      });
    }
  }, [endType, notificationDetails, setNotificationDetails]);

  const onBackClick = () => {
    return navigate(path.to.notificationEditDetails(id));
  };

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

  return (
    <ValidatedForm
      className="flex space-x-2 h-full"
      method="post"
      validator={newNotificationValidator}
    >
      <NotificationLayout
        onBackClick={onBackClick}
        onNextClick={handleSubmit}
        id={2}
      >
        <NotificationRecurrenceSection
          notificationDetails={notificationDetails}
          selectedType={endType}
          isIndefinite={isIndefinite}
          onSelectChange={onSelectChange}
          onTextChange={onTextChange}
          setEndType={setEndType}
          setIsIndefinite={setIsIndefinite}
        />
      </NotificationLayout>
    </ValidatedForm>
  );
}