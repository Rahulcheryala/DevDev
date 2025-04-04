import { CreationTabs, Button } from "@zeak/ui";
import { useState, useMemo } from "react";
import { SaveButton, ModalDrawer } from "@zeak/ui";
import {
  Copy, Check, Code, Layers, Settings, Shield, Menu, ArrowRight,
  LayoutDashboard, Users, FileEdit, ListChecks, Workflow, SquareStack,
  ArrowRight as ArrowRightIcon, Table, Sliders, FormInput
} from "lucide-react";

// Code samples
const IMPORT_CODE = `import { CreationTabs } from "@zeak/ui";`;

const DEPENDENCIES_CODE = `
import { SaveButton, ModalDrawer } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
import { CreationTabs } from "@zeak/ui";
import { useState, useMemo } from "react";

// Define tabs content
const tabs = [
  {
    id: "1",
    title: "General",
    value: "general",
    containerClassName: "overflow-auto",
    component: <div>General information form goes here</div>
  },
  {
    id: "2",
    title: "Users",
    value: "users",
    containerClassName: "overflow-auto",
    component: <div>User management form goes here</div>
  }
];

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("general");

  // Main action button
  const mainButton: ButtonProps = useMemo(() => {
    switch (selectedTab) {
      case "general":
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setSelectedTab("users"),
        };
      case "users":
        return {
          label: "Save & Finish",
          id: "save",
          onClickHandler: (action: string) => onSubmit(action as ButtonTypes),
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setSelectedTab("general"),
        };
    }
  }, [selectedTab]);

  // Optional additional actions
  const optionButtons: ButtonProps[] = useMemo(() => {
    switch (selectedTab) {
      case "general":
        return [
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
        ];
      case "users":
        return [
          {
            label: "Save & Add New User",
            id: "save_add_new_user",
            onClickHandler: (mode: string) => {
              openConnectionDrawer("create");
              onSubmit(mode as ButtonTypes);
            },
          },
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: (mode: string) => onSubmit(mode as ButtonTypes),
          },
        ];
      default:
        return [];
    }
  }, [selectedTab]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <CreationTabs
        isOpen={isOpen}
        label="Create New Item"
        tabs={tabs}
        selectedTab={selectedTab}
        mainButton={mainButton}
        optionButtons={optionButtons}
        closeDrawer={() => setIsOpen(false)}
        onTabChanged={(tab) => setSelectedTab(tab.value)}
      />
    </>
  );
}
`;

const CUSTOM_STYLING_CODE = `
<CreationTabs
  isOpen={isOpen}
  label={<span className="text-blue-600">Custom Label with <em>HTML</em></span>}
  labelClassName="font-bold"
  backButtonClassName="bg-gray-100"
  tabs={tabs}
  selectedTab={selectedTab}
  mainButton={mainButton}
  optionButtons={optionButtons}
  closeDrawer={() => setIsOpen(false)}
  onTabChanged={(tab) => setSelectedTab(tab.value)}
/>
`;

export default function CreationTabsDocumentation() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("general");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Define tabs for the demo
  const tabs = [
    {
      id: "1",
      title: "General",
      value: "general",
      containerClassName: "overflow-auto",
      component: (
        <div className="space-y-4 px-8 py-6">
          <h3 className="text-lg font-medium">General Information</h3>
          <p>
            This is the general information tab content. In a real application,
            this would contain forms for entering basic details.
          </p>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              className="border rounded p-2"
              placeholder="Enter name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="border rounded p-2"
              placeholder="Enter description"
              rows={3}
            />
          </div>
        </div>
      ),
    },
    {
      id: "2",
      title: "Users",
      value: "users",
      containerClassName: "overflow-auto",
      component: (
        <div className="space-y-4 px-8 py-6">
          <h3 className="text-lg font-medium">User Management</h3>
          <p>
            This tab would typically contain user assignment or permission
            controls.
          </p>
          <div className="space-y-2">
            <div className="flex items-center p-2 border rounded">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
            <div className="flex items-center p-2 border rounded">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-500">Editor</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Main action button
  const mainButton = useMemo(() => {
    switch (selectedTab) {
      case "general":
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setSelectedTab("users"),
        };
      case "users":
        return {
          label: "Save & Finish",
          id: "save",
          onClickHandler: () => console.log("saving the data"),
        };
      default:
        return {
          label: "Next",
          id: "next",
          onClickHandler: () => setSelectedTab("general"),
        };
    }
  }, [selectedTab]);

  // Optional additional actions
  const optionButtons = useMemo(() => {
    switch (selectedTab) {
      case "general":
        return [
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: () => console.log("saving as draft"),
          },
        ];
      case "users":
        return [
          {
            label: "Save & Add New User",
            id: "save_add_new_user",
            onClickHandler: () => console.log("adding new user"),
          },
          {
            label: "Save as Draft",
            id: "draft",
            onClickHandler: () => console.log("saving as draft"),
          },
        ];
      default:
        return [];
    }
  }, [selectedTab]);

  // CreationTabs component props
  const creationTabsProps = [
    {
      name: "isOpen",
      type: "boolean",
      required: "Yes",
      defaultValue: "-",
      description: "Controls the visibility of the modal drawer"
    },
    {
      name: "label",
      type: "string | ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The label displayed at the top of the modal"
    },
    {
      name: "tabs",
      type: "Array<ITab>",
      required: "Yes",
      defaultValue: "-",
      description: "Array of tab objects defining each tab's content and properties"
    },
    {
      name: "selectedTab",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Currently selected tab value"
    },
    {
      name: "closeDrawer",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Function to close the modal drawer"
    },
    {
      name: "mainButton",
      type: "ButtonProps",
      required: "Yes",
      defaultValue: "-",
      description: "Configuration for the main action button"
    },
    {
      name: "onTabChanged",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Callback when tab selection changes"
    },
    {
      name: "optionButtons",
      type: "Array<ButtonProps>",
      required: "No",
      defaultValue: "-",
      description: "Additional buttons shown in dropdown"
    },
    {
      name: "labelClassName",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional class for styling the label"
    },
    {
      name: "backButtonClassName",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional class for styling the back button"
    }
  ];

  // Tab object props
  const tabProps = [
    {
      name: "id",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Unique identifier for the tab"
    },
    {
      name: "title",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Tab title displayed in the UI"
    },
    {
      name: "value",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Value used for tab selection"
    },
    {
      name: "component",
      type: "ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "Content to render when this tab is active"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional class for the tab trigger"
    },
    {
      name: "activeClassName",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional class for the active tab indicator"
    },
    {
      name: "containerClassName",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional class for the content container"
    }
  ];

  // SaveButton props
  const saveButtonProps = [
    {
      name: "id",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Unique identifier for the button"
    },
    {
      name: "label",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "The text to display on the button"
    },
    {
      name: "onClickHandler",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Function that handles the button click, receives the button ID as parameter"
    },
    {
      name: "options",
      type: "Array<ButtonProps>",
      required: "No",
      defaultValue: "-",
      description: "Configuration for dropdown options shown when clicking the dropdown trigger"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom class names to apply to the button"
    }
  ];

  // Sort props to show required ones first
  const sortedCreationTabsProps = [...creationTabsProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  const sortedTabProps = [...tabProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  const sortedSaveButtonProps = [...saveButtonProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Features with icons
  const features = [
    {
      icon: <Table className="h-3 w-3 text-white" />,
      text: "Multi-step form workflows with tabbed navigation"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Slide-in modal drawer for focused user experience"
    },
    {
      icon: <Sliders className="h-3 w-3 text-white" />,
      text: "Customizable primary and secondary action buttons"
    },
    {
      icon: <ArrowRightIcon className="h-3 w-3 text-white" />,
      text: "Integrated navigation between steps with state management"
    },
    {
      icon: <FormInput className="h-3 w-3 text-white" />,
      text: "Flexible content area for different form components"
    }
  ];

  // Accessibility features
  const accessibilityFeatures = [
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Proper ARIA attributes for tabs and tab panels"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Keyboard navigation support between tabs"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Focus management for modal elements"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Proper contrast ratios for text and UI elements"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Screen reader support for modal and tabs interaction"
    }
  ];

  // Use cases
  const useCases = [
    {
      icon: <FileEdit className="h-3 w-3 text-white" />,
      text: "Multi-step form workflows for creating resources"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Configuration wizards with several sections"
    },
    {
      icon: <SquareStack className="h-3 w-3 text-white" />,
      text: "Detailed object editing with categorized fields"
    },
    {
      icon: <Users className="h-3 w-3 text-white" />,
      text: "User onboarding processes"
    },
    {
      icon: <ListChecks className="h-3 w-3 text-white" />,
      text: "Complex data entry with validation between steps"
    }
  ];

  // Dependencies
  const dependencies = [
    {
      icon: <LayoutDashboard className="h-3 w-3 text-white" />,
      text: "ModalDrawer - Provides the slide-in container and backdrop for the creation interface"
    },
    {
      icon: <Menu className="h-3 w-3 text-white" />,
      text: "SaveButton - Handles the main action button and optional dropdown actions"
    },
    {
      icon: <Table className="h-3 w-3 text-white" />,
      text: "Tabs - Manages tab state and rendering of tabbed content"
    },
    {
      icon: <ArrowRight className="h-3 w-3 text-white" />,
      text: "Button - Used for the back button and within other components"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          CreationTabs Component
        </h1>
        <p className="text-gray-600 text-lg">
          A comprehensive modal drawer with tabbed interface for multi-step
          creation flows.
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
        <div className="flex items-center gap-2 mb-4">
          <SquareStack className="h-5 w-5 text-indigo-500" />
          <h2 className="text-2xl font-semibold">Dependencies</h2>
        </div>
        <p className="text-gray-700 mb-4">
          The CreationTabs component relies on several internal components to
          function properly:
        </p>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <ul className="space-y-3">
            {dependencies.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                  {item.icon}
                </div>
                <span className="ml-3 text-gray-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-700 mb-4">
          These components are all bundled with the CreationTabs export, so you
          don't need to import them separately.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
          <code className="font-mono text-sm">{DEPENDENCIES_CODE}</code>
          <button
            onClick={() => copyToClipboard(DEPENDENCIES_CODE, "dependencies")}
            className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Copy code"
          >
            {copied === "dependencies" ? (
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
          The CreationTabs component provides a drawer with tabs for multi-step
          processes.
        </p>

        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-center">
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Open CreationTabs Demo
            </Button>

            <CreationTabs
              isOpen={isOpen}
              label="Create New Item"
              tabs={tabs}
              selectedTab={selectedTab}
              mainButton={mainButton}
              optionButtons={optionButtons}
              closeDrawer={() => setIsOpen(false)}
              onTabChanged={(tab) => setSelectedTab(tab.value)}
            />
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
        <h2 className="text-2xl font-semibold mb-6">Customization</h2>
        <p className="text-gray-700 mb-4">
          You can customize the appearance with additional className props.
        </p>

        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
          <pre className="font-mono text-sm overflow-x-auto">{CUSTOM_STYLING_CODE}</pre>
          <button
            onClick={() => copyToClipboard(CUSTOM_STYLING_CODE, "custom")}
            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Copy code"
          >
            {copied === "custom" ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400" />
            )}
          </button>
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
        <h2 className="text-2xl font-semibold mb-6">CreationTabs Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedCreationTabsProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg ${prop.required === "Yes" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}>
                    {prop.required}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm">{prop.defaultValue}</div>
                <div className="px-4 py-4 text-sm">{prop.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Tab Object Props (ITab)</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedTabProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg ${prop.required === "Yes" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}>
                    {prop.required}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm">{prop.defaultValue}</div>
                <div className="px-4 py-4 text-sm">{prop.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">SaveButton Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedSaveButtonProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg ${prop.required === "Yes" ? "text-green-900 bg-green-100" : "text-red-900 bg-red-100"}`}>
                    {prop.required}
                  </span>
                </div>
                <div className="px-4 py-4 text-sm">{prop.defaultValue}</div>
                <div className="px-4 py-4 text-sm">{prop.description}</div>
              </div>
            ))}
          </div>
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
