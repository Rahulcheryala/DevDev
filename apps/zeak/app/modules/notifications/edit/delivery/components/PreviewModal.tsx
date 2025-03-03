import {
  BellOutlineIcon1,
  EyeIcon,
  MailOutlineIcon4,
  MessageTextOutline,
} from "@zeak/icons";
import { useState } from "react";
import InAppContent from "./InAppContent";
import EmailContent from "./EmailContent";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import SMSContent from "./SMSContent";
import type { NotificationDeliveryForm } from "~/routes/x+/notifications+/_types";

type Props = {
  enabled: boolean;
  notificationDetails: NotificationDeliveryForm;
};

const PreviewModal = ({ enabled, notificationDetails }: Props) => {
  const defaultTab = "inApp";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => setCurrentTab(tabName);
  const tabsLinks = [
    {
      id: 1,
      title: (
        <>
          <span className="flex items-center whitespace-nowrap">
            <BellOutlineIcon1 className="mr-4" />
            In-App
          </span>
        </>
      ),
      value: "inApp",
      content: (
        <InAppContent
          userName="Admin"
          content={notificationDetails.webContent!}
        />
      ),
    },
    {
      id: 2,
      title: (
        <>
          <span className="flex items-center whitespace-nowrap">
            <MailOutlineIcon4 className="mr-4" />
            Email
          </span>
        </>
      ),
      value: "Email",
      content: (
        <EmailContent
          subject={notificationDetails.emailConfigSubject!}
          content={notificationDetails.emailContent!}
        />
      ),
    },
    {
      id: 3,
      title: (
        <>
          <span className="flex items-center whitespace-nowrap">
            <MessageTextOutline className="mr-4" />
            SMS
          </span>
        </>
      ),
      value: "SMS",
      content: <SMSContent content={notificationDetails.smsContent!} />,
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          disabled={!enabled}
          className={`${
            enabled
              ? "hover:text-accent-primary text-accent-primary"
              : "text-tertiary hover:text-tertiary"
          } diabled:opacity-1`}
        >
          <EyeIcon
            color={
              enabled ? "hsl(var(--accent-primary))" : "hsl(var(--tertiary))"
            }
            className="me-2"
          />{" "}
          Preview
        </Button>
      </DrawerTrigger>
      <DrawerContent size="lg">
        <DrawerHeader className="px-10 py-4 border-none">
          <div className="pr-[30px]">
            <h3 className="text-3xl font-semibold">Preview</h3>
          </div>
          <DrawerCloseButton className="top-4 right-6 cursor-pointer z-10" />
        </DrawerHeader>
        <DrawerBody className="px-10 py-0">
          <div className="-mx-10">
            <Tabs
              defaultValue={currentTab}
              onValueChange={handleTabChange}
              value={currentTab}
              className="w-full"
            >
              <TabsList
                aria-label="List of tabs"
                className="hide-scrollbar px-10"
              >
                {tabsLinks.map((tab, index) => (
                  <TabsTrigger key={tab.id} value={tab.value}>
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabsLinks.map((content, index) => (
                <TabsContent
                  key={content.id}
                  value={content.value}
                  className="px-10 py-10"
                >
                  {content.content}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </DrawerBody>
        <DrawerFooter className="px-6 py-4 sm:justify-between">
          <Button className="rounded-sm bg-card" size="xl" variant="secondary">
            Cancel
          </Button>
          <Button className="rounded-sm" size="xl" variant="primary">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PreviewModal;
