import { LabeledTextArea } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Info, AlertCircle, Type, Layers, Maximize2, Code, Shield } from "lucide-react";

// Code samples as string literals to avoid JSX encoding issues
const IMPORT_CODE = "import { LabeledTextArea } from '@zeak/ui';";
const DEPENDENCIES_CODE = `import InfoTooltip from "../micro/InfoTooltip";
import Label from "../micro/Label";`;

const BASIC_USAGE_CODE = `import { LabeledTextArea } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [textValue, setTextValue] = useState("");
  
  const handleChange = (e) => {
    setTextValue(e.target.value);
  };
  
  return (
    <LabeledTextArea
      label="Description"
      id="description"
      name="description"
      value={textValue}
      onChange={handleChange}
      placeholder="Enter description..."
    />
  );
};`;

const REQUIRED_FIELD_CODE = `<LabeledTextArea
  label="Project Requirements"
  id="requirements"
  name="requirements"
  value={requirements}
  onChange={handleChange}
  placeholder="Enter project requirements..."
  isRequired={true}
  errorMessage={errors.requirements}
  isInvalid={!!errors.requirements}
/>`;

const TOOLTIP_USAGE_CODE = `<LabeledTextArea
  label="Additional Notes"
  id="notes"
  name="notes"
  value={notes}
  onChange={handleChange}
  placeholder="Enter any additional information..."
  isRequired={false}
  showTooltip={true}
  tooltipTitle="Optional"
  tooltipContent="Add any relevant details that would help us understand your request better"
/>`;

const NON_EXPANDABLE_CODE = `<LabeledTextArea
  label="Fixed Height Textarea"
  id="fixedHeight"
  name="fixedHeight"
  value={fixedText}
  onChange={handleChange}
  placeholder="This textarea has a fixed height..."
  minHeight="120px"
  isExpandable={false}
/>`;

export default function LabeledTextAreaDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [fixedText, setFixedText] = useState<string>("");
  const [reqError, setReqError] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleRequirementsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRequirements(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length < 10) {
      setReqError("Requirements must be at least 10 characters long");
    } else {
      setReqError("");
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleFixedTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFixedText(e.target.value);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data array
  const componentProps = [
    {
      name: "label",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Text label for the textarea"
    },
    {
      name: "id",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "ID attribute for the textarea and htmlFor in label"
    },
    {
      name: "name",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Name attribute for the textarea"
    },
    {
      name: "value",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Current value of the textarea"
    },
    {
      name: "onChange",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Callback function when textarea value changes"
    },
    {
      name: "onBlur",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Callback function when input loses focus"
    },
    {
      name: "isRequired",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether to display the required field indicator (red asterisk)"
    },
    {
      name: "showTooltip",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether to display the tooltip icon next to the label"
    },
    {
      name: "tooltipTitle",
      type: "string",
      required: "No",
      defaultValue: '""',
      description: "Title text for the tooltip"
    },
    {
      name: "tooltipContent",
      type: "string",
      required: "No",
      defaultValue: '""',
      description: "Description text for the tooltip"
    },
    {
      name: "errorMessage",
      type: "string",
      required: "No",
      defaultValue: '""',
      description: "Error message to display below the textarea"
    },
    {
      name: "isInvalid",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the textarea is in an error state"
    },
    {
      name: "isExpandable",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the textarea should expand/collapse based on content and focus"
    },
    {
      name: "minHeight",
      type: "string",
      required: "No",
      defaultValue: '"56px"',
      description: "Minimum height for the textarea"
    }
  ];

  // Sort props to show required ones first
  const sortedProps = [...componentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Feature items with icons
  const features = [
    {
      icon: <Type className="h-3 w-3 text-white" />,
      text: "Combined textarea with label in a single component"
    },
    {
      icon: <Maximize2 className="h-3 w-3 text-white" />,
      text: "Auto-expanding textarea that adjusts to content height"
    },
    {
      icon: <AlertCircle className="h-3 w-3 text-white" />,
      text: "Option to mark fields as required with a red asterisk"
    },
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Built-in tooltip support for field descriptions"
    },
    {
      icon: <AlertCircle className="h-3 w-3 text-white" />,
      text: "Integrated error handling with message display"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Customizable styling for all parts (container, label, textarea)"
    },
    {
      icon: <Maximize2 className="h-3 w-3 text-white" />,
      text: "Configurable fixed or expandable behavior"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Compatible with form libraries and validation systems"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Labeled TextArea Component
        </h1>
        <p className="text-gray-600 text-lg">
          A reusable textarea component with label, required field indicator,
          tooltip support, and expandable functionality.
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
          <Layers className="h-5 w-5 text-indigo-500" />
          <h2 className="text-2xl font-semibold">Dependencies</h2>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
          <pre className="font-mono text-sm">{DEPENDENCIES_CODE}</pre>
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
        <h2 className="text-2xl font-semibold mb-6">Basic Usage (Expandable)</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabeledTextArea
                  label="Description"
                  id="description"
                  name="description"
                  value={textValue}
                  onChange={handleTextChange}
                  placeholder="Enter description..."
                />
                <div className="mt-4 text-sm">
                  Current value: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{textValue || "(empty)"}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  The textarea will expand as you type more content, and will collapse when not focused.
                </div>
              </div>
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
        <h2 className="text-2xl font-semibold mb-6">Required Field with Error Handling</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabeledTextArea
                  label="Project Requirements"
                  id="requirements"
                  name="requirements"
                  value={requirements}
                  onChange={handleRequirementsChange}
                  onBlur={handleBlur}
                  placeholder="Enter project requirements..."
                  isRequired={true}
                  errorMessage={reqError}
                  isInvalid={!!reqError}
                />
                <div className="mt-2 text-xs text-gray-500">
                  Type less than 10 characters to see validation error.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{REQUIRED_FIELD_CODE}</pre>
            <button
              onClick={() => copyToClipboard(REQUIRED_FIELD_CODE, "required")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "required" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">With Tooltip</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabeledTextArea
                  label="Additional Notes"
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Enter any additional information..."
                  isRequired={false}
                  showTooltip={true}
                  tooltipTitle="Optional"
                  tooltipContent="Add any relevant details that would help us understand your request better"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{TOOLTIP_USAGE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(TOOLTIP_USAGE_CODE, "tooltip")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "tooltip" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Non-Expandable TextArea</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabeledTextArea
                  label="Fixed Height Textarea"
                  id="fixedHeight"
                  name="fixedHeight"
                  value={fixedText}
                  onChange={handleFixedTextChange}
                  placeholder="This textarea has a fixed height..."
                  minHeight="120px"
                  isExpandable={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{NON_EXPANDABLE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(NON_EXPANDABLE_CODE, "fixed")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "fixed" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
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
                <div className="px-6 py-4 text-sm">
                  {prop.description}
                  {prop.name === 'onBlur' && (
                    <span className="text-xs text-orange-500 ml-1">(Important for validation purposes)</span>
                  )}
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
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Proper label association with textarea fields</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Clear visual feedback for error states</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Proper keyboard navigation and focus management</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Screen reader compatible with appropriate ARIA attributes</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
