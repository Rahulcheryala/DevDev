import { LabelledInput } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Info, AlertCircle, Type, Layers, Maximize2, Code, Shield } from "lucide-react";

// Code samples as string literals to avoid JSX encoding issues
const IMPORT_CODE = "import { LabelledInput } from '@zeak/ui';";
const DEPENDENCIES_CODE = `import { Input } from "../micro/Input";
import InfoTooltip from "../micro/InfoTooltip";
import Label from "../micro/Label";`;

const BASIC_USAGE_CODE = `import { LabelledInput } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [inputValue, setInputValue] = useState("");
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  
  return (
    <LabelledInput
      label="User Name"
      id="username"
      name="username"
      value={inputValue}
      onChange={handleChange}
      placeholder="Enter your username"
    />
  );
};`;

const REQUIRED_FIELD_CODE = `<LabelledInput
  label="Email Address"
  id="email"
  name="email"
  value={email}
  onChange={handleChange}
  onBlur={handleBlur}
  placeholder="Enter your email"
  isRequired={true}
  errorMessage={errors.email}
  isInvalid={!!errors.email}
/>`;

const TOOLTIP_USAGE_CODE = `<LabelledInput
  label="Integration Name"
  id="integrationName"
  name="integrationName"
  value={integrationName}
  onChange={handleChange}
  placeholder="Enter Integration name"
  isRequired={true}
  showTooltip={true}
  tooltipTitle="Required, unique"
  tooltipContent="Enter a unique name for the Integration. The Integration name must be distinct and cannot be duplicated within the company"
/>`;

const CODE_EDITING_CODE = `<LabelledInput
  label="Integration Code"
  id="integrationCode"
  name="integrationCode"
  value={integrationCode}
  onChange={(e) => setIntegrationCode(e.target.value)}
  placeholder="Enter integration code"
  isCode={true}
/>`;

const NUMBER_INPUT_NONE_CODE = `<LabelledInput
  label="Retry Delay (in Seconds)"
  id="retryDelay"
  name="retryDelay"
  value={retryDelay}
  onChange={(e) => setRetryDelay(Number(e.target.value))}
  type="number"
  showNoneForZero={true}
/>`;

export default function LabeledInputDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [integrationName, setIntegrationName] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [retryDelay, setRetryDelay] = useState<number>(0);
  const [integrationCode, setIntegrationCode] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (emailValue && !emailValue.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  }

  const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntegrationName(e.target.value);
  };

  const handleRetryDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      setRetryDelay(0);
    } else {
      setRetryDelay(Math.abs(value));
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Define component props for the table
  const componentProps = [
    {
      name: "label",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Text label for the input field"
    },
    {
      name: "id",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "ID attribute for the input field and htmlFor in label"
    },
    {
      name: "name",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Name attribute for the input field"
    },
    {
      name: "value",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Current value of the input field"
    },
    {
      name: "onChange",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Callback function when input value changes"
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
      description: "Error message to display below the input"
    },
    {
      name: "isInvalid",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the input is in an error state"
    },
    {
      name: "size",
      type: "'xs'|'sm'|'md'|'lg'",
      required: "No",
      defaultValue: '"md"',
      description: "Size variant for the input"
    },
    {
      name: "containerClassName",
      type: "string",
      required: "No",
      defaultValue: '""',
      description: "Additional CSS classes for the container"
    },
    {
      name: "showNoneForZero",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "For number inputs, displays \"None\" when the value is 0"
    },
    {
      name: "isCode",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether to display the code editing option"
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
      text: "Combined input field with label in a single component"
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
      icon: <Maximize2 className="h-3 w-3 text-white" />,
      text: "Special number input display with \"None\" for zero values"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Customizable styling for all parts (container, label, input)"
    },
    {
      icon: <Check className="h-3 w-3 text-white" />,
      text: "Support for different input sizes"
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
          Labeled Input Component
        </h1>
        <p className="text-gray-600 text-lg">
          A reusable input component with label, required field indicator, tooltip support, and error handling.
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
        <h2 className="text-2xl font-semibold mb-6">Basic Usage</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabelledInput
                  label="User Name"
                  id="username"
                  name="username"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                />
                <div className="mt-4 text-sm">
                  Current value: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{inputValue || "(empty)"}</span>
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
                <LabelledInput
                  label="Email Address"
                  id="email"
                  name="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  isRequired={true}
                  errorMessage={emailError}
                  isInvalid={!!emailError}
                />
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
                <LabelledInput
                  label="Integration Name"
                  id="integrationName"
                  name="integrationName"
                  value={integrationName}
                  onChange={handleIntegrationChange}
                  placeholder="Enter integration name"
                  isRequired={true}
                  showTooltip={true}
                  tooltipTitle="Required, unique"
                  tooltipContent="Enter a unique name for the department. The department name must be distinct and cannot be duplicated within the company"
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
        <h2 className="text-2xl font-semibold mb-6">Code Editing Option</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabelledInput
                  label="Integration Code"
                  id="integrationCode"
                  name="integrationCode"
                  value={integrationCode}
                  onChange={(e: any) => setIntegrationCode(e.target.value)}
                  placeholder="Enter integration code"
                  isRequired={true}
                  isCode={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CODE_EDITING_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CODE_EDITING_CODE, "code")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "code" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Number Input with "None" Display</h2>
        <div className="bg-gray-200 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <LabelledInput
                  label="Retry Delay (in Seconds)"
                  id="retryDelay"
                  name="retryDelay"
                  value={retryDelay}
                  onChange={handleRetryDelayChange}
                  type="number"
                  min={0}
                  showNoneForZero={true}
                />
                <div className="mt-4 text-sm">
                  Current value: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{retryDelay}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{NUMBER_INPUT_NONE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(NUMBER_INPUT_NONE_CODE, "number")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "number" ? (
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
              <span className="ml-3 text-gray-700">Proper label association with input fields</span>
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
              <span className="ml-3 text-gray-700">Proper keyboard navigation support</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Screen reader compatible with ARIA attributes</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
} 