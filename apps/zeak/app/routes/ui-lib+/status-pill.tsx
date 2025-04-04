import { StatusPill, type StatusType } from "@zeak/ui";
import { BsRecord2 } from "react-icons/bs";
import { useState } from "react";
import { Copy, Check, Code, Shield, Badge, Palette, PenTool, Maximize2, ToggleLeft, Settings, Layers, List } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { StatusPill } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
import { StatusPill } from "@zeak/ui";

export default function MyComponent() {
  return (
    <div className="space-y-2">
      <StatusPill status="active" />
      <StatusPill status="inactive" />
    </div>
  );
}`;

const CUSTOM_ICONS_CODE = `
import { StatusPill } from "@zeak/ui";
import { CheckCircle, XCircle } from "some-icon-library";

export default function MyComponent() {
  return (
    <div className="space-y-2">
      <StatusPill 
        status="completed" 
        icon={<CheckCircle className="w-4 h-4" />} 
      />
      <StatusPill 
        status="blocked" 
        icon={<XCircle className="w-4 h-4" />} 
      />
    </div>
  );
}`;

const CUSTOM_STYLING_CODE = `
<StatusPill 
  status="active" 
  className="bg-green-100 px-2 rounded-full" 
/>

<StatusPill 
  status="pending" 
  className="bg-orange-100 px-2 rounded-md" 
/>`;

const NO_CAPITALIZE_CODE = `
// When uppercase is true, text is displayed in UPPERCASE
<StatusPill 
  status="draft" 
  uppercase={true} 
/>
// Text is displayed normally with first letter capitalized
<StatusPill 
  status="in progress" 
  uppercase={false} 
/>`;

const CUSTOM_STATUS_CODE = `
// The component will use gray as fallback for unknown statuses
<StatusPill status="reviewing" textColor="text-purple-500" iconColor="text-pink-500"/>
<StatusPill status="needs attention" textColor="text-red-500" iconColor="text-yellow-500"/>
<StatusPill status="reviewing" textColor="text-blue-500" iconColor="text-green-500"/>`;

export default function StatusPillDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);

  // Array of all predefined statuses
  const statuses: StatusType[] = [
    "active",
    "inactive",
    "blocked",
    "draft",
    "pending",
    "completed",
  ];

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data array
  const componentProps = [
    {
      name: "status",
      type: "StatusType",
      required: "Yes",
      defaultValue: "-",
      description: "The status to display (determines the color)"
    },
    {
      name: "textColor",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Color of the status text"
    },
    {
      name: "icon",
      type: "React.ReactNode",
      required: "No",
      defaultValue: "BsRecord2",
      description: "Custom icon component to show before the status text"
    },
    {
      name: "iconColor",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Color of the icon"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Additional className for the container"
    },
    {
      name: "uppercase",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "When true, capitalizes first letter. When false, displays text in UPPERCASE."
    }
  ];

  // Sort props to show required ones first
  const sortedProps = [...componentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Status Colors
  const statusColors = statuses.map(status => {
    let colorClass = '';
    switch (status) {
      case "active": colorClass = "text-green-500"; break;
      case "inactive": colorClass = "text-gray-400"; break;
      case "blocked": colorClass = "text-red-500"; break;
      case "draft": colorClass = "text-yellow-500"; break;
      case "pending": colorClass = "text-orange-400"; break;
      case "completed": colorClass = "text-blue-500"; break;
      default: colorClass = "text-gray-500";
    }
    return {
      status,
      colorClass,
    };
  });

  // Feature items with icons
  const features = [
    {
      icon: <Badge className="h-3 w-3 text-white" />,
      text: "Predefined color schemes for common statuses"
    },
    {
      icon: <Palette className="h-3 w-3 text-white" />,
      text: "Customizable text and icon colors"
    },
    {
      icon: <PenTool className="h-3 w-3 text-white" />,
      text: "Customizable styling via className"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Configurable uppercase/lowercase text formatting"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Support for custom icons"
    },
    {
      icon: <ToggleLeft className="h-3 w-3 text-white" />,
      text: "Handles custom status types with fallback styling"
    }
  ];

  // Use cases with icons
  const useCases = [
    {
      icon: <List className="h-3 w-3 text-white" />,
      text: "Displaying item/entity status in tables or lists"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Status indicators in dashboards"
    },
    {
      icon: <Badge className="h-3 w-3 text-white" />,
      text: "Filter badges for search results"
    },
    {
      icon: <Code className="h-3 w-3 text-white" />,
      text: "Task or issue status indicators"
    },
    {
      icon: <Badge className="h-3 w-3 text-white" />,
      text: "User permission or role indicators"
    }
  ];

  // Accessibility features
  const accessibilityFeatures = [
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Uses semantic role=\"status\" for proper screen reader identification"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "High contrast color combinations for better visibility"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Text and icon are properly aligned for visual consistency"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Status Pill Component
        </h1>
        <p className="text-gray-600 text-lg">
          A simple, customizable component for displaying status indicators with
          colored pills.
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
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statuses.map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <StatusPill status={status} />
                </div>
              ))}
            </div>
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
        <h2 className="text-2xl font-semibold mb-6">Custom Styling</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <StatusPill
                  status="active"
                  className="bg-green-100 px-2 rounded-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <StatusPill
                  status="pending"
                  className="bg-orange-100 px-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_STYLING_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_STYLING_CODE, "styling")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "styling" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Text Capitalization</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <StatusPill status="draft" uppercase={false} />
                <span className="text-sm text-gray-500">
                  (Displayed normally)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status="in progress" uppercase={true} />
                <span className="text-sm text-gray-500">
                  (Displayed in UPPERCASE)
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{NO_CAPITALIZE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(NO_CAPITALIZE_CODE, "capitalize")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "capitalize" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Custom Statuses</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatusPill
                status="reviewing"
                textColor="text-purple-500"
                iconColor="text-pink-500"
              />
              <StatusPill
                status="needs attention"
                textColor="text-red-500"
                iconColor="text-yellow-500"
              />
              <StatusPill
                status="reviewing"
                textColor="text-blue-500"
                iconColor="text-green-500"
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: Custom statuses not defined in the StatusColors object will
              use the gray color by default.
            </p>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_STATUS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_STATUS_CODE, "custom")}
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
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Custom Icons</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <StatusPill
                  status="completed"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  }
                />
                <span className="text-sm text-gray-500">(Check icon)</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill
                  status="blocked"
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" />
                    </svg>
                  }
                />
                <span className="text-sm text-gray-500">(Block icon)</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_ICONS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_ICONS_CODE, "icons")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "icons" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Default Icon</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <StatusPill status="active" />
            <div className="text-sm">
              Default icon:{" "}
              <code className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">BsRecord2</code>{" "}
              from react-icons/bs
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop Name", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedProps.map((prop, index) => (
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
        <h2 className="text-2xl font-semibold mb-6">Predefined Status Colors</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-3">
            {["Status", "Color Class", "Preview"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {statusColors.map((item, index) => (
              <div key={index} className="grid grid-cols-3 hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.status}</div>
                <div className="px-6 py-4 whitespace-nowrap text-sm font-mono">{item.colorClass}</div>
                <div className="px-6 py-4">
                  <StatusPill status={item.status} />
                </div>
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
