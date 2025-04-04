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
import { ClearableInput, Select } from "~/components/Form";
import { ClientOnly } from "remix-utils/client-only";
import "react-quill/dist/quill.snow.css";
import { reminderEmailTemplate } from "~/utils/onboarding-node";
import { CgSandClock } from "react-icons/cg";

const ReactQuill = lazy(() => import("react-quill"));

interface Props {
  isModalOpen: boolean;
  setIsTriggerModalOpen: (value: boolean) => void;
}

const WaitModal = (props: Props) => {
  const handleClose = () => {
    props.setIsTriggerModalOpen(false);
  };
  const [content, setContent] = useState(reminderEmailTemplate);
  const [inactivityReminderTime, setInactivityReminderTime] = useState<{
    label: string;
    value: string;
  }>({ label: "15 Minutes", value: "15" });
  const [responsesTimeLimit, setResponsesTimeLimit] = useState<{
    label: string;
    value: string;
  }>({ label: "15 Minutes", value: "15" });

  const inactivityTimeOptions = [
    { label: "15 Minutes", value: "15" },
    { label: "30 Minutes", value: "30" },
    { label: "45 Minutes", value: "45" },
    { label: "60 Minutes", value: "60" },
  ];
  const responsesTimeLimitOptions = [
    { label: "15 Minutes", value: "15" },
    { label: "30 Minutes", value: "30" },
    { label: "45 Minutes", value: "45" },
    { label: "60 Minutes", value: "60" },
  ];

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
                      <CgSandClock className="text-white" />
                    </div>
                    <span className="text-accent-green text-sm font-medium ml-3">
                      Wait Properties
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
                  <ValidatedForm validator={[]}>
                    <div className="space-y-4">
                      <Select
                        label="Responses time limit"
                        name="responsesTimeLimit"
                        options={responsesTimeLimitOptions}
                        onChange={(option) => {
                          if (option?.label && option?.value) {
                            setResponsesTimeLimit({
                              label: option.label,
                              value: option.value,
                            });
                          }
                        }}
                        defaultValue={responsesTimeLimitOptions[0].value}
                      />
                      <Select
                        label="Inactivity Reminder Time"
                        name="inactivityTimeOptions"
                        options={inactivityTimeOptions}
                        onChange={(option) => {
                          if (option?.label && option?.value) {
                            setInactivityReminderTime({
                              label: option.label,
                              value: option.value,
                            });
                          }
                        }}
                        defaultValue={inactivityTimeOptions[0].value}
                      />

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Inactivity Email Content
                        </label>
                        <Tabs defaultValue="edit" className="w-full">
                          <TabsList>
                            <TabsTrigger value="edit">Edit</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                          </TabsList>

                          <TabsContent value="edit" className="pt-2">
                            <ClientOnly fallback={<div>Loading editor...</div>}>
                              {() => (
                                <Suspense
                                  fallback={<div>Loading editor...</div>}
                                >
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
                </div>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button size="lg" variant="destructive" onClick={handleClose}>
                    Cancel
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button size="lg" variant="secondary">
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

export default WaitModal;

const EmailContent = () => {
  const defaultEmailTemplate = `
<h2>Welcome to <strong>[Your Company Name]</strong> – Vendor Onboarding Process</h2>
<p>Dear <strong>[Vendor Name]</strong>,</p>
<p>We are excited to welcome you as a valued partner of <strong>[Your Company Name]</strong>. To streamline our collaboration and ensure a smooth start, we’ve outlined the onboarding process below.</p>

<h3>Step 1: Complete Your Profile</h3>
<p>Please click the link below to access your vendor profile setup:</p>
<p><a href="#" target="_blank"><strong>Set Up My Profile</strong></a></p>

<h3>Step 2: Submit Required Documents</h3>
<p>To comply with regulatory requirements and ensure efficient processing, please upload the following documents:</p>
<ul>
  <li>Business Registration Certificate</li>
  <li>Tax Identification Documents</li>
  <li>Bank Account Details (for payment processing)</li>
  <li>[Other relevant documents]</li>
</ul>
<p>Upload your documents securely via this link: <a href="#" target="_blank"><strong>Upload Documents</strong></a>.</p>

<h3>Step 3: Review and Sign Agreements</h3>
<p>We require your review and electronic signature on the following agreements:</p>
<ol>
  <li>Vendor Agreement</li>
  <li>Data Privacy Policy</li>
</ol>
<p>Access and sign the agreements here: <a href="#" target="_blank"><strong>Review Agreements</strong></a>.</p>

<h3>Step 4: Schedule an Introductory Call</h3>
<p>To better understand your services and align expectations, please schedule an introductory call with our team. Use the link below to book a convenient time:</p>
<p><a href="#" target="_blank"><strong>Book a Call</strong></a></p>

<p>If you encounter any issues or have questions, don’t hesitate to reach out to us at <a href="mailto:[support email address]">[support email address]</a> or call us at <strong>[support phone number]</strong>.</p>

<p>We’re excited to embark on this partnership with you and look forward to achieving great success together!</p>

<p>Best regards,</p>
<p><strong>[Your Full Name]</strong><br/>
[Your Job Title]<br/>
[Your Company Name]<br/>
[Contact Information]</p>
`;

  const [subject, setSubject] = useState(
    `Welcome to {{custom.companyName}} - Vendor Onboarding Process`,
  );
  const [content, setContent] = useState(defaultEmailTemplate);

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
