import { InfoTooltip } from "@zeak/ui";
import { useState } from "react";
import {
  Copy, Check, Code, Info, Settings, Shield, HelpCircle,
  Lightbulb, Eye, MousePointer, Keyboard, RefreshCw, Palette,
  MessageSquare, FileText, Users, AlertTriangle
} from "lucide-react";

// Code samples
const IMPORT_CODE = `import { InfoTooltip } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
<InfoTooltip 
  title="Optional Field" 
  subtext="This field is not required to submit the form."
/>`;

const CUSTOM_STYLING_CODE = `
<InfoTooltip 
  title="Custom Styled Tooltip" 
  subtext="This tooltip has custom styling applied to it."
  className="w-64 bg-purple-900"
  iconSize="24px"
  iconColor="#6366F1"
/>`;

const RICH_CONTENT_CODE = `
<InfoTooltip 
  title={
    <div className="flex items-center gap-2">
      <AlertTriangle className="h-4 w-4" />
      <span>Advanced Settings</span>
    </div>
  }
  subtext={
    <div className="space-y-2">
      <p>These settings can affect system performance:</p>
      <ul className="list-disc pl-5 text-sm">
        <li>Memory allocation</li>
        <li>Processing priority</li>
        <li>Storage options</li>
      </ul>
      <p className="text-amber-300 text-xs mt-2">Use with caution!</p>
    </div>
  }
  className="w-80 bg-gray-900"
/>`;

export default function InfoTooltipDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data
  const componentProps = [
    {
      name: "title",
      type: "string | ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The title displayed at the top of the tooltip"
    },
    {
      name: "subtext",
      type: "string | ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The content displayed in the body of the tooltip"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "\"\"",
      description: "Custom CSS class for the tooltip content container"
    },
    {
      name: "iconSize",
      type: "string",
      required: "No",
      defaultValue: "\"20px\"",
      description: "Size of the information icon"
    },
    {
      name: "iconColor",
      type: "string",
      required: "No",
      defaultValue: "\"#9BA2AC\"",
      description: "Color of the information icon"
    }
  ];

  // Sort props to show required ones first
  const sortedProps = [...componentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Features with icons
  const features = [
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Displays helpful information on hover"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Customizable icon size and color"
    },
    {
      icon: <MessageSquare className="h-3 w-3 text-white" />,
      text: "Supports rich content with React components in both title and body"
    },
    {
      icon: <Palette className="h-3 w-3 text-white" />,
      text: "Custom tooltip styling through className prop"
    },
    {
      icon: <Keyboard className="h-3 w-3 text-white" />,
      text: "Accessible via keyboard navigation"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Built on Radix UI's Tooltip primitive for robust accessibility"
    }
  ];

  // Accessibility features
  const accessibilityFeatures = [
    {
      icon: <Keyboard className="h-3 w-3 text-white" />,
      text: "Tooltips are accessible via keyboard navigation"
    },
    {
      icon: <MessageSquare className="h-3 w-3 text-white" />,
      text: "The tooltip content is announced by screen readers"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Follows WAI-ARIA best practices for tooltips"
    },
    {
      icon: <MousePointer className="h-3 w-3 text-white" />,
      text: "Supports focus management for keyboard users"
    }
  ];

  // Use cases with icons
  const useCases = [
    {
      icon: <FileText className="h-3 w-3 text-white" />,
      text: "Form field explanation"
    },
    {
      icon: <Users className="h-3 w-3 text-white" />,
      text: "Pricing information"
    },
    {
      icon: <Lightbulb className="h-3 w-3 text-white" />,
      text: "Feature explanation"
    },
    {
      icon: <HelpCircle className="h-3 w-3 text-white" />,
      text: "Additional context for UI elements"
    },
    {
      icon: <Eye className="h-3 w-3 text-white" />,
      text: "Explanation of data visualization"
    },
    {
      icon: <AlertTriangle className="h-3 w-3 text-white" />,
      text: "Warnings with structured content and formatted text"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          InfoTooltip Component
        </h1>
        <p className="text-gray-600 text-lg">
          A tooltip component that displays additional information when users hover over an information icon.
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
            <div className="flex items-center gap-2">
              <span>Hover over the icon:</span>
              <InfoTooltip
                title="Optional Field"
                subtext="This field is not required to submit the form."
              />
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
            <div className="flex items-center gap-2">
              <span>Custom icon size and color:</span>
              <InfoTooltip
                title="Custom Styled Tooltip"
                subtext="This tooltip has custom styling applied to it."
                className="w-64 bg-purple-900"
                iconSize="24px"
                iconColor="#6366F1"
              />
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_STYLING_CODE}</pre>
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
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Rich Content</h2>
        <p className="text-gray-700 mb-4">
          Both the title and subtext props accept React elements, allowing you to create rich, formatted content with icons, lists, and custom styling.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span>Hover to see rich content:</span>
              <InfoTooltip
                title={
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Advanced Settings</span>
                  </div>
                }
                subtext={
                  <div className="space-y-2">
                    <p>These settings can affect system performance:</p>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Memory allocation</li>
                      <li>Processing priority</li>
                      <li>Storage options</li>
                    </ul>
                    <p className="text-amber-300 text-xs mt-2">Use with caution!</p>
                  </div>
                }
                className="w-80 bg-gray-900"
              />
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{RICH_CONTENT_CODE}</pre>
            <button
              onClick={() => copyToClipboard(RICH_CONTENT_CODE, "rich")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "rich" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[180px]">Form field explanation:</span>
                <InfoTooltip
                  title="Password Requirements"
                  subtext="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[180px]">Pricing information:</span>
                <InfoTooltip
                  title="Pricing Details"
                  subtext="All prices are in USD and exclude applicable taxes. Subscription renews automatically."
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium min-w-[180px]">Feature explanation:</span>
                <InfoTooltip
                  title="Auto-save"
                  subtext="Your work is automatically saved every 30 seconds. You can also manually save using Ctrl+S."
                />
              </div>
            </div>
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
        <h2 className="text-2xl font-semibold mb-6">Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedProps.map((prop, index) => (
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