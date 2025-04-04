export type NotificationStepType = {
  id: number;
  label: string;
  title: string;
  subTitle: string;
  isActive: boolean;
  isCompleted: boolean;
};

const stepsList: NotificationStepType[] = [
  {
    id: 1,
    title: "General",
    subTitle:
      "The General section configures key notification details, ensuring correct triggers and associations.",
    isActive: true,
    isCompleted: false,
    label: "1",
  },
  {
    id: 2,
    title: "Frequency and Effectivity",
    subTitle:
      "Frequency applies to time- and event-based notifications. Set the start, end times, and frequency.",
    isActive: false,
    isCompleted: false,
    label: "2",
  },
  {
    id: 3,
    title: "Target Audience",
    subTitle:
      "Defines the specific users or groups who will receive the notification, ensuring it reaches the right audience.",
    isActive: false,
    isCompleted: false,
    label: "3",
  },
  {
    id: 4,
    title: "Notification Delivery Method",
    subTitle:
      "Specifies the channels through which notifications are sent, ensuring timely and effective communication.",
    isActive: false,
    isCompleted: false,
    label: "4",
  },
];

export const getStepsList = (id: number) => {
  return stepsList.map((step) => {
    if (step.id === id) {
      step.isActive = true;
    } else {
      if (step.id < id) {
        step.isCompleted = true;
      }
    }

    return step;
  });
};
