import { XCloseIcon } from "@zeak/icons";
import {
  Button,
  IconButton,
  TabsList,
  Tabs,
  TabsTrigger,
  TabsContent,
  DropdownMenuLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import React, { useState, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { ClearableInput } from "~/components/Form";
import { ClientOnly } from "remix-utils/client-only";
import "react-quill/dist/quill.snow.css";
import { contractEmailTemplate } from "~/utils/onboarding-node";

const ReactQuill = lazy(() => import("react-quill"));

type FormData = {
  emailSubject: string;
  emailContent: string;
};
interface Props {
  isModalOpen: boolean;
  setIsTriggerModalOpen: (value: boolean) => void;
}

const CommunicationNodeModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const defaultTab = "emailContent";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  const tabsLinks = [
    {
      id: 1,
      title: "EmailContent",
      value: "emailContent",
      content: <EmailContent />,
    },
    {
      id: 2,
      title: "Recipients",
      value: "recipients",
      content: <RecipientsContent />,
    },
    {
      id: 3,
      title: "Advanced",
      value: "advanced",
      content: " <AllCompaniesContent />",
    },
  ];

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const handleClose = () => {
    props.setIsTriggerModalOpen(false);
  };
  return (
    <>
      {props.isModalOpen && (
        <React.Fragment>
          <div
            id="default-modal"
            aria-hidden="true"
            className={`overflow-y-auto overflow-x-hidden bg-[hsl(var(--foreground),_0.5)] fixed top-1/2 left-1/2 translate-1/2 z-50 justify-center items-center w-full md:inset-0 max-h-full ${props.isModalOpen ? "flex" : "hidden"}`}
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-sm flex justify-center items-center">
                      <MdEmail className="text-white" />
                    </div>
                    <span className="text-accent-green text-sm font-medium ml-3">
                      Contract Communication Properties
                    </span>
                  </div>
                  <IconButton
                    variant="ghost"
                    aria-label="closeModal"
                    onClick={handleClose}
                    icon={<XCloseIcon />}
                  />
                </div>
                <div className="p-5">
                  <Tabs
                    defaultValue={currentTab}
                    onValueChange={handleTabChange}
                    value={currentTab}
                    className="w-full"
                  >
                    <TabsList aria-label="List of tabs" className="">
                      {tabsLinks.map((tab, index) => (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.value}
                          className="text-accent"
                        >
                          {tab.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {tabsLinks.map((content, index) => (
                      <TabsContent
                        key={content.id}
                        value={content.value}
                        className="pt-4 px-0 pb-0"
                      >
                        {content.content}
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button size="lg" variant="destructive" onClick={handleClose}>
                    Cancel
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button size="lg" variant="ghost">
                      Test Email
                    </Button>
                    <Button size="lg" variant="primary">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
};

export default CommunicationNodeModal;

const EmailContent = () => {
  const [subject, setSubject] = useState(
    `Action Required: {{custom.companyName}} - Review and Sign Your Vendor Contract`,
  );
  const [content, setContent] = useState(contractEmailTemplate);

  return (
    <ValidatedForm validator={[]}>
      <div className="space-y-4">
        <div className="relative">
          <ClearableInput
            name="Subject"
            label="Subject"
            placeholder="Enter email subject here"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="absolute top-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                <Button
                  variant="ghost"
                  className="p-0 text-sm h-auto text-left justify-between text-secondary"
                >
                  <span className="text-accent-primary">Form Fields</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px]">
                <DropdownMenuLabel>Field 1</DropdownMenuLabel>
                <DropdownMenuLabel>Field 2</DropdownMenuLabel>
                <DropdownMenuLabel>Field 3</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Content</label>
          <Tabs defaultValue="edit" className="w-full">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="edit" className="pt-2">
              <ClientOnly fallback={<div>Loading editor...</div>}>
                {() => (
                  <Suspense fallback={<div>Loading editor...</div>}>
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      className="h-[300px] mb-12"
                    />
                  </Suspense>
                )}
              </ClientOnly>
            </TabsContent>

            <TabsContent value="preview" className="pt-2">
              <div
                className="prose max-w-none p-4 border rounded-md min-h-[200px]"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ValidatedForm>
  );
};

const RecipientsContent = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      senderName: "",
      replyToEmail: "",
      recipientEmail: "",
    },
  });

  return (
    <ValidatedForm validator={[]}>
      <div className="space-y-4">
        <ClearableInput
          {...register("senderName", {
            required: "Sender name is required",
          })}
          name="senderName"
          label="Sender Name"
          placeholder="Enter sender name"
          value={watch("senderName")}
          onChange={(e) => setValue("senderName", e.target.value)}
        />
        <ClearableInput
          {...register("replyToEmail", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          name="replyToEmail"
          label="Reply To Email"
          placeholder="Enter reply to email"
          value={watch("replyToEmail")}
          onChange={(e) => setValue("replyToEmail", e.target.value)}
        />
        {errors.replyToEmail?.type === "pattern" && (
          <p className="text-red-500">{errors.replyToEmail.message}</p>
        )}

        {errors.replyToEmail?.type === "required" && (
          <p className="text-red-500">{errors.replyToEmail.message}</p>
        )}
        <div className="relative">
          <ClearableInput
            {...register("recipientEmail", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            name="recipientEmail"
            label="Recipient Email"
            placeholder="Enter recipient email"
            value={watch("recipientEmail")}
            onChange={(e) => setValue("recipientEmail", e.target.value)}
          />
          <div className="absolute top-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
                <Button
                  variant="ghost"
                  className="p-0 text-sm h-auto text-left justify-between text-secondary"
                >
                  <span className="text-accent-primary">Form Fields</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px]">
                <DropdownMenuLabel>Field 1</DropdownMenuLabel>
                <DropdownMenuLabel>Field 2</DropdownMenuLabel>
                <DropdownMenuLabel>Field 3</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </ValidatedForm>
  );
};
