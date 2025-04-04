import { toast } from "@zeak/ui";
import { Button } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Code, Shield, MessageSquare, Bell, Clock, Settings, Info, AlertCircle, CheckCircle, AlertTriangle, XCircle, Terminal, List } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { toast, Toaster } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
// Add the Toaster component to your layout
// This only needs to be done once in your app
import { Toaster } from "@zeak/ui";

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}

// Then use toast anywhere in your app
import { toast } from "@zeak/ui";

function MyComponent() {
  return (
    <button 
      onClick={() => toast.success(
        "SUCCESS MESSAGE", 
        "Your action was completed successfully"
      )}
    >
      Show Toast
    </button>
  );
}`;

const SUCCESS_TOAST_CODE = `
toast.success(
  "SUCCESS MESSAGE GOES", 
  "Lorem Ipsum Text that expands 2 Lines",
  {
    actions: [
      {
        label: "Action 1",
        onClick: () => console.log("Action 1 clicked")
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action 2 clicked")
      }
    ]
  }
);`;

const ERROR_TOAST_CODE = `
toast.error(
  "ERROR MESSSAGE", 
  "Lorem Ipsum Text that expands 2 Lines",
  {
    actions: [
      {
        label: "Action 1",
        onClick: () => console.log("Action 1 clicked")
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action 2 clicked")
      }
    ]
  }
);`;

const WARNING_TOAST_CODE = `
toast.warning(
  "WARNING MESSAGE GOES", 
  "Lorem Ipsum Text that expands 2 Lines",
  {
    actions: [
      {
        label: "Action 1",
        onClick: () => console.log("Action 1 clicked")
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action 2 clicked")
      }
    ]
  }
);`;

const INFO_TOAST_CODE = `
toast.info(
  "INFO MESSAGE GOES", 
  "Lorem Ipsum Text that expands 2 Lines",
  {
    actions: [
      {
        label: "Action 1",
        onClick: () => console.log("Action 1 clicked")
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action 2 clicked")
      }
    ]
  }
);`;

const SPECIAL_ERROR_CODE = `
toast.errorWithColoredActions(
  "ERROR MESSAGE GOES", 
  "Lorem Ipsum Text that expands 2 Lines",
  {
    actions: [
      {
        label: "Action 1", 
        onClick: () => console.log("Action 1 clicked"),
      },
      {
        label: "Action 2",
        onClick: () => console.log("Action 2 clicked")
      }
    ]
  }
);`;

const DURATION_CODE = `
// Toast will auto-dismiss after 10 seconds
toast.success(
  "Success", 
  "This will stay longer",
  { duration: 10000 }
);`;

export default function ToastDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // API Methods data array
  const apiMethods = [
    {
      name: "toast.success",
      parameters: "(title, description, options?)",
      options: "actions, duration, dismissible",
      description: "Shows a success toast with green styling"
    },
    {
      name: "toast.error",
      parameters: "(title, description, options?)",
      options: "actions, duration, dismissible",
      description: "Shows an error toast with red styling"
    },
    {
      name: "toast.info",
      parameters: "(title, description, options?)",
      options: "actions, duration, dismissible",
      description: "Shows an info toast with blue styling"
    },
    {
      name: "toast.warning",
      parameters: "(title, description, options?)",
      options: "actions, duration, dismissible",
      description: "Shows a warning toast with yellow styling"
    },
    {
      name: "toast.errorWithColoredActions",
      parameters: "(title, description, options?)",
      options: "actions, duration, dismissible",
      description: "Special error toast with green/red action buttons on white background"
    }
  ];

  // Options data array
  const optionsProps = [
    {
      name: "actions",
      type: "ToastAction[]",
      required: "No",
      defaultValue: "[ ]",
      description: "Up to 2 action buttons that can be displayed in the toast"
    },
    {
      name: "duration",
      type: "number",
      required: "No",
      defaultValue: "5000",
      description: "Duration in milliseconds that the toast will be displayed"
    },
    {
      name: "dismissible",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the toast can be manually dismissed with a close button"
    }
  ];

  // Action Props data array
  const actionProps = [
    {
      name: "label",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "The text displayed on the action button"
    },
    {
      name: "onClick",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Function to execute when the action button is clicked"
    }
  ];

  // Feature items with icons
  const features = [
    {
      icon: <CheckCircle className="h-3 w-3 text-white" />,
      text: "Success, error, info, and warning toast types"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Configurable auto-dismiss duration"
    },
    {
      icon: <Bell className="h-3 w-3 text-white" />,
      text: "Support for up to 2 action buttons per toast"
    },
    {
      icon: <MessageSquare className="h-3 w-3 text-white" />,
      text: "Distinctive styling for different notification types"
    },
    {
      icon: <Terminal className="h-3 w-3 text-white" />,
      text: "Simple API with just a few methods"
    },
    {
      icon: <XCircle className="h-3 w-3 text-white" />,
      text: "Manual dismiss option with close button"
    }
  ];

  // Accessibility features
  const accessibilityFeatures = [
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Close button has an appropriate ARIA label for screen readers"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Action buttons are keyboard navigable and focused when they appear"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Color contrast ratios meet WCAG guidelines"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Toasts can be dismissed manually or automatically after a configurable duration"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Toast notifications don't block interaction with the rest of the page"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Font sizes and spacing are optimized for readability"
    }
  ];

  // Use cases with icons
  const useCases = [
    {
      icon: <CheckCircle className="h-3 w-3 text-white" />,
      text: "Confirming successful form submissions or data operations"
    },
    {
      icon: <AlertCircle className="h-3 w-3 text-white" />,
      text: "Alerting users about errors or validation issues"
    },
    {
      icon: <Bell className="h-3 w-3 text-white" />,
      text: "Notifying about background process completion"
    },
    {
      icon: <AlertTriangle className="h-3 w-3 text-white" />,
      text: "Providing warnings before destructive actions"
    },
    {
      icon: <Clock className="h-3 w-3 text-white" />,
      text: "Displaying session timeout notifications"
    },
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Informing users about system status changes"
    },
    {
      icon: <Bell className="h-3 w-3 text-white" />,
      text: "Announcing new features or updates"
    },
    {
      icon: <List className="h-3 w-3 text-white" />,
      text: "Providing optional action buttons for immediate response"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Toast Component
        </h1>
        <p className="text-gray-600 text-lg">
          A customizable toast notification system with support for different message types, actions, and styling.
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-indigo-500" />
          <h2 className="text-2xl font-semibold">Installation</h2>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
          <code className="font-mono text-sm">{IMPORT_CODE}</code>
          <button
            onClick={() => copyToClipboard(IMPORT_CODE, "import")}
            className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Copy code"
          >
            {copied === "import" ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
        <p className="text-gray-700 mb-4">
          First, add the <code className="bg-indigo-100 text-indigo-800 px-1 rounded-md">Toaster</code> component to your app's layout, then use the <code className="bg-indigo-100 text-indigo-800 px-1 rounded-md">toast</code> methods anywhere in your application.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Button
              onClick={() =>
                toast.success(
                  "Success",
                  "Your action was completed successfully"
                )
              }
            >
              Show Simple Toast
            </Button>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{BASIC_USAGE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(BASIC_USAGE_CODE, "basic")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "basic" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Toast Types</h2>
        <p className="text-gray-700 mb-4">
          The toast component supports four types of notifications: success, error, info, and warning.
          Each type has its own styling and icon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Success Toast
            </h3>
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button
                  onClick={() =>
                    toast.success(
                      "SUCCESS MESSAGE GOES",
                      "Lorem Ipsum Text that expands 2 Lines",
                      {
                        actions: [
                          {
                            label: "Action 1",
                            onClick: () => console.log("Action 1 clicked")
                          },
                          {
                            label: "Action 2",
                            onClick: () => console.log("Action 2 clicked")
                          }
                        ]
                      }
                    )
                  }
                >
                  Show Success Toast
                </Button>
              </div>
              <div className="bg-gray-50 relative">
                <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{SUCCESS_TOAST_CODE}</pre>
                <button
                  onClick={() => copyToClipboard(SUCCESS_TOAST_CODE, "success")}
                  className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copied === "success" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Error Toast
            </h3>
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button
                  variant="destructive"
                  onClick={() =>
                    toast.error(
                      "ERROR MESSSAGE",
                      "Lorem Ipsum Text that expands 2 Lines",
                      {
                        actions: [
                          {
                            label: "Action 1",
                            onClick: () => console.log("Action 1 clicked")
                          },
                          {
                            label: "Action 2",
                            onClick: () => console.log("Action 2 clicked")
                          }
                        ]
                      }
                    )
                  }
                >
                  Show Error Toast
                </Button>
              </div>
              <div className="bg-gray-50 relative">
                <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{ERROR_TOAST_CODE}</pre>
                <button
                  onClick={() => copyToClipboard(ERROR_TOAST_CODE, "error")}
                  className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copied === "error" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Warning Toast
            </h3>
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.warning(
                      "WARNING MESSAGE GOES",
                      "Lorem Ipsum Text that expands 2 Lines",
                      {
                        actions: [
                          {
                            label: "Action 1",
                            onClick: () => console.log("Action 1 clicked")
                          },
                          {
                            label: "Action 2",
                            onClick: () => console.log("Action 2 clicked")
                          }
                        ]
                      }
                    )
                  }
                >
                  Show Warning Toast
                </Button>
              </div>
              <div className="bg-gray-50 relative">
                <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{WARNING_TOAST_CODE}</pre>
                <button
                  onClick={() => copyToClipboard(WARNING_TOAST_CODE, "warning")}
                  className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copied === "warning" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Info Toast
            </h3>
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast.info(
                      "INFO MESSAGE GOES",
                      "Lorem Ipsum Text that expands 2 Lines",
                      {
                        actions: [
                          {
                            label: "Action 1",
                            onClick: () => console.log("Action 1 clicked")
                          },
                          {
                            label: "Action 2",
                            onClick: () => console.log("Action 2 clicked")
                          }
                        ]
                      }
                    )
                  }
                >
                  Show Info Toast
                </Button>
              </div>
              <div className="bg-gray-50 relative">
                <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{INFO_TOAST_CODE}</pre>
                <button
                  onClick={() => copyToClipboard(INFO_TOAST_CODE, "info")}
                  className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Copy code"
                >
                  {copied === "info" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Special Error with Colored Actions</h2>
        <p className="text-gray-700 mb-4">
          A special error toast with green/red action buttons matching the design in the image.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Button
              onClick={() =>
                toast.errorWithColoredActions(
                  "ERROR MESSAGE GOES",
                  "Lorem Ipsum Text that expands 2 Lines",
                  {
                    actions: [
                      {
                        label: "Action 1",
                        onClick: () => console.log("Action 1 clicked")
                      },
                      {
                        label: "Action 2",
                        onClick: () => console.log("Action 2 clicked")
                      }
                    ]
                  }
                )
              }
            >
              Show Special Error Toast
            </Button>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{SPECIAL_ERROR_CODE}</pre>
            <button
              onClick={() => copyToClipboard(SPECIAL_ERROR_CODE, "special")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "special" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Action Buttons</h2>
        <p className="text-gray-700 mb-4">
          Toasts can include up to 2 action buttons. Each button can have a custom label and onClick function.
          The first action in the array is automatically styled as the primary button, while the second action has a lighter style.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <Button
            onClick={() =>
              toast.success(
                "Success",
                "Your document has been saved.",
                {
                  actions: [
                    {
                      label: "View",
                      onClick: () => console.log("View clicked")
                    },
                    {
                      label: "Dismiss",
                      onClick: () => console.log("Dismissed")
                    }
                  ]
                }
              )
            }
          >
            Toast with Actions
          </Button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Custom Duration</h2>
        <p className="text-gray-700 mb-4">
          You can customize how long the toast appears on screen by setting the duration in milliseconds.
          The default duration is 5000ms (5 seconds).
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Button
              onClick={() =>
                toast.info(
                  "Long Duration",
                  "This toast will stay for 10 seconds",
                  { duration: 10000 }
                )
              }
            >
              Long Duration Toast (10s)
            </Button>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{DURATION_CODE}</pre>
            <button
              onClick={() => copyToClipboard(DURATION_CODE, "duration")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "duration" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">API Reference</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-4">
            {["Method", "Parameters", "Options", "Description"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {apiMethods.map((method, index) => (
              <div key={index} className="grid grid-cols-4 hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{method.name}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{method.parameters}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm">{method.options}</div>
                <div className="px-6 py-4 text-sm">{method.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Options</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Option", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {optionsProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg ${prop.required === "Yes" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}>
                    {prop.required}
                  </span>
                </div>
                <div className="px-6 py-4 text-sm">{prop.defaultValue}</div>
                <div className="px-6 py-4 text-sm">{prop.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Action Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {actionProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg ${prop.required === "Yes" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}>
                    {prop.required}
                  </span>
                </div>
                <div className="px-6 py-4 text-sm">{prop.defaultValue}</div>
                <div className="px-6 py-4 text-sm">{prop.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Features</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                  {feature.icon}
                </div>
                <span className="ml-3 text-gray-700">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Accessibility</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <ul className="space-y-3">
            {accessibilityFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                  {feature.icon}
                </div>
                <span className="ml-3 text-gray-700">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <ul className="space-y-3">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                  {useCase.icon}
                </div>
                <span className="ml-3 text-gray-700">{useCase.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
} 