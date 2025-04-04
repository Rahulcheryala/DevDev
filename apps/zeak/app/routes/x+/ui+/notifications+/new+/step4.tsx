import {
  BellOutlineIcon1,
  EyeIcon,
  MailOutlineIcon4,
  MessageTextOutline,
} from "@zeak/icons";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  IconButton,
  Input,
  QuillEditor,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
} from "@zeak/react";
import { PiBracketsCurly } from "react-icons/pi";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { LuTrash, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { MdInfo } from "react-icons/md";
import { TbCircleCheckFilled, TbPencilMinus } from "react-icons/tb";
import { Select } from "~/components/Form";
import { CreationWizardItem } from "~/modules/access-settings/ui/creation-wizard";

const NotificationStep4 = () => {
  const navigate = useNavigate();

  const stepsList = [
    {
      id: 1,
      title: "General",
      subTitle:
        "The General section configures key notification details, ensuring correct triggers and associations.",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Frequency and Effectivity",
      subTitle:
        "Frequency applies to time- and event-based notifications. Set the start, end times, and frequency.",
      isActive: false,
      isCompleted: true,
      label: "2",
    },
    {
      id: 3,
      title: "Target Audience",
      subTitle:
        "Defines the specific users or groups who will receive the notification, ensuring it reaches the right audience.",
      isActive: false,
      isCompleted: true,
      label: "3",
    },
    {
      id: 4,
      title: "Notification Delivery Method",
      subTitle:
        "Specifies the channels through which notifications are sent, ensuring timely and effective communication.",
      isActive: true,
      isCompleted: false,
      label: "4",
    },
  ];
  const handleReview = () => {
    navigate("/x/ui/notifications");
  };

  return (
    <>
      <div className="xxxl:w-[500px] w-[360px] bg-white p-[60px] rounded-tl-md rounded-tr-md max-h-[calc(100vh_-_218px)] overflow-y-auto">
        <div className="grid grid-cols-1 gap-y-4">
          {stepsList.map((step) => (
            <>
              <CreationWizardItem stepItem={step} />
            </>
          ))}
        </div>
      </div>
      <div className="xxxl:w-[calc(100%_-_500px)] w-[calc(100%_-_360px)] bg-white rounded-tl-md rounded-tr-md flex flex-col">
        <div className="grow max-h-[calc(100vh_-_302px)] overflow-y-auto">
          <div className="flex items-center justify-between py-6 px-[60px] border-b border-stroke">
            <div className="">
              <span className="text-accent-pink text-xs mb-2">Step 4 of 4</span>
              <h4 className="text-xl text-accent-dark font-medium">
                Delivery Method
              </h4>
            </div>
            <div className="flex items-center space-x-4">
              <IconButton
                variant="ghost"
                aria-label="in-progress"
                icon={false ? <TbCircleCheckFilled /> : <MdInfo size={24} />}
                className={`${
                  false ? "text-accent-green" : "text-accent-accentYellow"
                } p-0`}
              />
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-8 h-8 flex justify-center items-center hover:bg-background rounded-full">
                  <BsThreeDots />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[100px]">
                  <DropdownMenuItem className="p-0">
                    <Button
                      variant="secondary"
                      className={`p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none ${
                        true ? "bg-stroke hover:bg-stroke" : ""
                      }`}
                    >
                      <TbPencilMinus size={20} className="mr-4" />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-0">
                    <Button
                      variant="secondary"
                      className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                    >
                      <LuTrash size={20} className="mr-4" />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="px-[60px] py-10">
            <ValidatedForm validator={[]} className="">
              <DeliveryMethodContent />
            </ValidatedForm>
          </div>
        </div>
        <div className="py-4 px-[60px] flex justify-between items-center sticky bottom-0 left-0 bg-card border-t border-stroke">
          <Button variant="ghost" className="px-8 py-4 h-auto text-secondary">
            Back
          </Button>
          <Button
            variant="primary"
            className="px-8 py-4 h-auto rounded-sm min-w-[160px]"
            onClick={handleReview}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotificationStep4;

const DeliveryMethodContent = () => {
  const MethodsListDummy = [
    {
      id: "1",
      name: "In-App",
      content: <InAppDeliveryContent />,
      enabled: true,
    },
    {
      id: "2",
      name: "E-Mail",
      content: <EmailDeliveryContent />,
      enabled: false,
    },
    {
      id: "3",
      name: "SMS",
      content: <SMSDeliveryContent />,
      enabled: false,
    },
  ];

  const [methodsList, setMethodsList] = useState(MethodsListDummy);

  const handleUpdateMethod = (id: string) => {
    setMethodsList((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method,
      ),
    );
  };
  return (
    <>
      <div>
        {methodsList.map((method, index) => (
          <div
            key={method.id}
            className="p-6 rounded-md border border-stroke bg-accent-gray mb-10 last:mb-0"
          >
            <div className="space-y-10">
              <div className="flex justify-between items-center">
                <Toggle
                  label={method.name}
                  // isDisabled={true}
                  onChange={() => handleUpdateMethod(method.id)}
                  isOn={method.enabled}
                />
                <PreviewModal enabled={method} />
              </div>
              {method.enabled && <>{method.content}</>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const PreviewModal = (props: any) => {
  const { method } = props;
  const defaultTab = "inApp";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
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
      content: <InAppContent />,
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
      content: <EmailContent />,
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
      content: <SMSContent />,
    },
  ];
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          disabled={!method.enabled}
          className={`${
            method.enabled
              ? "hover:text-accent-primary text-accent-primary"
              : "text-tertiary hover:text-tertiary"
          } diabled:opacity-1`}
        >
          <EyeIcon
            color={
              method.enabled
                ? "hsl(var(--accent-primary))"
                : "hsl(var(--tertiary))"
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

export const statusOptions = [
  {
    label: "Save as Active (Default)",
    value: "default",
  },
];

const InAppContent = () => {
  return (
    <>
      <div className="space-y-10">
        <SearchForm />
        <div className="rounded-md border border-stroke py-6 pl-[88px] pr-[60px] relative">
          <span className="w-3 absolute right-6 top-6 inline-block h-3 rounded-full bg-accent-primary ring-[6px] ring ring-[hsl(var(--accent-primary),_0.2)]"></span>
          <div className="absolute left-6 top-4">
            <Avatar
              size="ten"
              src="https://www.w3schools.com/howto/img_avatar.png"
            />
            <span className="bottom-0 left-7 absolute flex justify-center items-center  w-4 h-4 bg-accent-dark rounded-full">
              <BellOutlineIcon1 color="#ffffff" size="10" />
            </span>
          </div>
          <div className="mb-5">
            <h4 className="text-textLink">
              <span className="font-semibold">Zeak Admin</span> sent you a
              notification
            </h4>
            <p className="text-sm text-tertiary">Just now</p>
          </div>
          <div className="p-4 border border-stroke bg-accent-gray rounded-md mb-8">
            <p className="text-sm text-tertiary">
              Welcome $First_Name$ $Last_Name$, Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Quis lobortis nisl cursus bibendum
              sit nulla accumsan sodales ornare. At urna viverra non suspendisse
              neque, lorem. Pretium condimentum pellentesque gravida id etiam
              sit sed arcu euismod. Rhoncus proin orci duis scelerisque molestie
              cursus tincidunt aliquam.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="primary"
              className="px-[18px] py-2 h-10 rounded-sm"
            >
              View Now
            </Button>
            <Button
              variant="ghost"
              className="py-[18px] py-2 h-10 rounded-sm hover:text-accent-primary text-accent-primary"
            >
              Mark as Read
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const SearchForm = () => {
  return (
    <>
      <form>
        <div className="flex justify-between items-center">
          <div className="w-[calc(100%_-_182px)]">
            <DropdownMenu>
              <DropdownMenuTrigger className="max-w-full w-full outline-none focus-visible:outline-none p-0 h-auto flex justify-between items-center">
                <div className="relative w-full">
                  <Input
                    className="pl-[52px] rounded-md"
                    placeholder="Search for Users, Teams or Departments"
                  />
                  <BiSearch
                    size="20"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-tertiary"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-full min-w-[652px]"
              >
                <div className="py-4 px-8">
                  <p className="text-sm text-accent-dark">
                    {" "}
                    <span className="text-accent-primary">
                      8 Suggestions
                    </span>{" "}
                    based on your search
                  </p>
                </div>
                {/* Add table for the list */}
                <div className="px-8 py-4 pb-6">
                  <Button variant="outline-primary" className="w-full h-[56px]">
                    Select
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            variant="outline-primary"
            className="min-w-[142px] min-h-[56px]"
            size="lg"
          >
            Send Test
          </Button>
        </div>
      </form>
    </>
  );
};

const EmailContent = () => {
  return (
    <>
      <div className="space-y-10 grid grid-cols-1">
        <SearchForm />
        <div className="relative h-full bg-[hsl(var(--stroke-primary),_0.5)] p-6 rounded-md">
          <div className="mb-10">
            <h4 className="text-sm mb-3 text-accent-dark">
              <span className="font-medium me-1">To:</span>Example contact
            </h4>
            <h4 className="text-sm text-accent-dark">
              <span className="font-medium me-1">Subject:</span>Sample
            </h4>
          </div>
          <p className="text-textLink text-sm">
            Welcome $First_Name$ $Last_Name$, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Quis lobortis nisl cursus bibendum sit
            nulla accumsan sodales ornare. At urna viverra non suspendisse
            neque, lorem. Pretium condimentum pellentesque gravida id etiam sit
            sed arcu euismod. Rhoncus proin orci duis scelerisque molestie
            cursus tincidunt aliquam.
            <br />
            <br />
            Best, <br />
            John Doe
            <br />
            <br />
            Eugen Esanu <br />
            Apollo <br />
            535 Mission St, Suite 1100, San Francisco, California 94105, US
          </p>
        </div>
      </div>
    </>
  );
};
const SMSContent = () => {
  return (
    <>
      <div className="space-y-10">
        <SearchForm />
        <div className="relative bg-[hsl(var(--gray-2),_0.2)] py-4 px-6 rounded-md">
          <p className="text-accent-dark text-sm">
            Welcome $first_name$, Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla
            accumsan sodales ornare. At urna viverra non suspendisse neque,
            lorem. Pretium condimentum pellentesque gravida id etiam sit sed
            arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus
            tincidunt aliquam. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Quis lobortis nisl cursus bibendum sit nulla
            accumsan sodales ornare. At urna viverra non suspendisse neque,
            lorem. Pretium condimentum pellentesque gravida id etiam sit sed
            arcu euismod. Rhoncus proin orci duis scelerisque molestie cursus
            tincidunt aliquam.
          </p>
          <img
            src="/images/message-arrow.svg"
            alt="..."
            className="absolute -left-[6px] bottom-0"
          />
        </div>
      </div>
    </>
  );
};

const InAppDeliveryContent = () => {
  return (
    <>
      <ValidatedForm validator={[]} className="">
        <div className="grid grid-cols-2 gap-y-10 gap-x-[60px]">
          <div>
            <Select
              value=""
              name="timezone"
              placeholder="Select an Template"
              label="Event Type"
              options={templatesOptions}
            />
          </div>
          <div>
            <Select
              placeholder="Select an display position"
              name="deplayPosition"
              label="Display and Position"
              options={deplayPostionOptions}
            />
          </div>
          <div className="col-span-2">
            <div className="has-variable-dropdown">
              <QuillEditor />
              <div className="variable-dropdown">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                    <Button
                      variant="secondary"
                      className="py-2 px-3 text-sm bg-white hover:bg-white text-accent-primary h-auto text-left justify-between text-secondary"
                    >
                      <PiBracketsCurly className="text-accent-primary" />
                      <span className="text-accent-primary mx-2">
                        Variable
                      </span>{" "}
                      {true ? (
                        <LuChevronDown className="text-accent-primary" />
                      ) : (
                        <LuChevronUp className="text-accent-primary" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[162px]">
                    <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </ValidatedForm>
    </>
  );
};

const EmailDeliveryContent = () => {
  return (
    <>
      <ValidatedForm validator={[]} className="">
        <div className="grid grid-cols-2 gap-y-10 gap-x-[60px]">
          <div>
            <Select
              value=""
              name="timezone"
              placeholder="Select an Template"
              label="Event Type"
              options={templatesOptions}
            />
          </div>
          <div className="col-span-2">
            <div className="has-variable-dropdown">
              <QuillEditor />
              <div className="variable-dropdown">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                    <Button
                      variant="secondary"
                      className="py-2 px-3 text-sm bg-white hover:bg-white text-accent-primary h-auto text-left justify-between text-secondary"
                    >
                      <PiBracketsCurly className="text-accent-primary" />
                      <span className="text-accent-primary mx-2">
                        Variable
                      </span>{" "}
                      {true ? (
                        <LuChevronDown className="text-accent-primary" />
                      ) : (
                        <LuChevronUp className="text-accent-primary" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[162px]">
                    <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </ValidatedForm>
    </>
  );
};

const SMSDeliveryContent = () => {
  return (
    <>
      <ValidatedForm validator={[]} className="">
        <div className="grid grid-cols-2 gap-y-10 gap-x-[60px]">
          <div>
            <Select
              value=""
              name="timezone"
              placeholder="Select an Template"
              label="Event Type"
              options={templatesOptions}
            />
          </div>
          <div>
            <Select
              placeholder="Select an display position"
              name="deplayPosition"
              label="Display and Position"
              options={deplayPostionOptions}
            />
          </div>
          <div className="col-span-2">
            <div className="has-variable-dropdown">
              <QuillEditor />
              <div className="variable-dropdown">
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                    <Button
                      variant="secondary"
                      className="py-2 px-3 text-sm bg-white hover:bg-white text-accent-primary h-auto text-left justify-between text-secondary"
                    >
                      <PiBracketsCurly className="text-accent-primary" />
                      <span className="text-accent-primary mx-2">
                        Variable
                      </span>{" "}
                      {true ? (
                        <LuChevronDown className="text-accent-primary" />
                      ) : (
                        <LuChevronUp className="text-accent-primary" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[162px]">
                    <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </ValidatedForm>
    </>
  );
};
export const templatesOptions = [
  {
    label: "Template 1",
    value: "Template1",
  },
  {
    label: "Template 2",
    value: "Template2",
  },
];

export const deplayPostionOptions = [
  {
    label: "Banner",
    value: "Banner",
  },
  {
    label: "Bottom Right",
    value: "BottomRight",
  },
];
