import type { NotificationAudience } from "~/routes/x+/notifications+/_types";
import { sections } from "./business";
import AudienceItem from "./AudienceItem";

type Props = {
  selected: NotificationAudience;
  onChange: (audience: NotificationAudience) => void;
};

const NotificationAudienceFormComponent = (props: Props) => {
  return (
    <div className="space-y-10">
      {sections.map((section, index) => (
        <AudienceItem {...section} {...props} key={index} />
      ))}
    </div>
  );
};

export default NotificationAudienceFormComponent;
