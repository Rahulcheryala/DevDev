import type { NotificationDeliveryForm } from "~/routes/x+/notifications+/_types";
import Layout from "./layout";
import InAppDelivery from "./components/InAppDelivery";
import type { SelectChangeEvent } from "~/components/Form/Select";
import EmailDelivery from "./components/EmailDelivery";
import SMSDelivery from "./components/SMSDelivery";

type Props = {
  notificationDetails: NotificationDeliveryForm;
  onTextChange: (e: any) => void;
  onSelectChange: (option: SelectChangeEvent | null) => void;
};

const NotificationDeliveryFormComponent = ({
  onSelectChange,
  notificationDetails,
  onTextChange,
}: Props) => {
  return (
    <div className="p-6 rounded-md border border-stroke bg-accent-gray mb-10 last:mb-0">
      <Layout
        label="In-App"
        notificationDetails={notificationDetails}
        value="isWebDelivery"
        onSelectChange={onSelectChange}
      >
        <InAppDelivery
          onSelectChange={onSelectChange}
          notificationDetails={notificationDetails}
        />
      </Layout>
      <Layout
        label="Email"
        notificationDetails={notificationDetails}
        value="isEmailDelivery"
        onSelectChange={onSelectChange}
      >
        <EmailDelivery
          onTextChange={onTextChange}
          onSelectChange={onSelectChange}
          notificationDetails={notificationDetails}
        />
      </Layout>
      <Layout
        label="SMS"
        notificationDetails={notificationDetails}
        value="isSMSDelivery"
        onSelectChange={onSelectChange}
      >
        <SMSDelivery
          onSelectChange={onSelectChange}
          notificationDetails={notificationDetails}
        />
      </Layout>
    </div>
  );
};

export default NotificationDeliveryFormComponent;
