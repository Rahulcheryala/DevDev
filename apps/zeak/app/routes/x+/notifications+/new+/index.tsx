import { useState } from "react";
import type { NotificationCreateForm } from "../_types";
import type { SelectChangeEvent } from "~/components/Form/Select";
import { initialNotificationState, newNotificationValidator } from "../_model";

import { path } from "~/utils/path";
import { axiosApiCall } from "~/utils/helper";
import { useRouteData } from "~/hooks";
import type { Company } from "~/modules/settings";
import { useNavigate } from "@remix-run/react";
import { CreateNotificationSidebar, CreateNotificationForm } from "~/modules/notifications";

export default function NewNotification() {
  // const routeData = useRouteData<{ company: Company }>(
  //   path.to.authenticatedRoot,
  // );
  // const [notificationDetails, setNotificationDetails] =
  //   useState<NotificationCreateForm>(initialNotificationState as any);
  // const [companyIds] = useState([routeData?.company.id]);
  // const navigate = useNavigate();

  // const onTextChange = (e: any) => {
  //   setNotificationDetails({
  //     ...notificationDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

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

    // Append form data
    for (const key in notificationDetails) {
      formData.append(key, notificationDetails[key as never].toUpperCase());
    }

    formData.append("companyIdStr", JSON.stringify(companyIds));

    // Log the FormData content for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await axiosApiCall(
      "POST",
      path.to.api.createNotification,
      formData,
    );
    navigate(response.url);
  };

  return (
    // <ValidatedForm
    //   className="flex space-x-2 h-full"
    //   method="post"
    //   validator={newNotificationValidator}
    // >
    <div className="flex w-full gap-4 min-h-screen bg-[#F0F4FD]">
      <CreateNotificationSidebar />
      <CreateNotificationForm />
    </div>


    // </ValidatedForm>
  );
}
