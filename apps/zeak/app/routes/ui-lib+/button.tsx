import { Button } from "@zeak/ui";
import { useState } from "react";
import { ImSpinner } from "react-icons/im";
import { Copy, Check, Code, Info, Shield, Settings, Layers, Palette, Maximize2, MousePointer } from "lucide-react";

// Example icons
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Code samples
const IMPORT_CODE = `import { Button } from '@zeak/ui';`;

const BASIC_USAGE_CODE = `
<Button onClick={handleClick}>
  Click Me
</Button>`;

const VARIANTS_CODE = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`;

const SIZES_CODE = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

const ICONS_CODE = `<Button leftIcon={<PlusIcon />}>
  Add Item
</Button>

<Button rightIcon={<ArrowRightIcon />}>
  Next Step
</Button>`;

const LOADING_CODE = `<Button isLoading>Loading...</Button>
<Button isLoading variant="outline">Submitting</Button>`;

export default function ButtonDocumentation() {
  const [clickCount, setClickCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleButtonClick = () => {
    setClickCount(count => count + 1);
  };

  // Component props data
  const componentProps = [
    {
      name: "children",
      type: "React.ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The content to display inside the button"
    },
    {
      name: "onClick",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Click handler function"
    },
    {
      name: "bgColor",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom background color class (overrides variant)"
    },
    {
      name: "textColor",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom text color class (overrides variant)"
    },
    {
      name: "leftIcon",
      type: "React.ReactNode",
      required: "No",
      defaultValue: "-",
      description: "Optional icon to display before text"
    },
    {
      name: "rightIcon",
      type: "React.ReactNode",
      required: "No",
      defaultValue: "-",
      description: "Optional icon to display after text"
    },
    {
      name: "variant",
      type: "ButtonVariant",
      required: "No",
      defaultValue: "'primary'",
      description: "Button style variant"
    },
    {
      name: "size",
      type: "ButtonSize",
      required: "No",
      defaultValue: "'md'",
      description: "Button size"
    },
    {
      name: "isLoading",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the button is in loading state"
    },
    {
      name: "spinner",
      type: "React.ReactNode",
      required: "No",
      defaultValue: "-",
      description: "Custom loading spinner component"
    },
    {
      name: "isFullWidth",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the button takes full width of its container"
    },
    {
      name: "disabled",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the button is disabled"
    },
    {
      name: "type",
      type: "'button' | 'submit' | 'reset'",
      required: "No",
      defaultValue: "'button'",
      description: "HTML button type attribute"
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
      icon: <Palette className="h-3 w-3 text-white" />,
      text: "Six style variants: primary, secondary, outline, ghost, destructive, and link"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Three size options: small, medium, and large"
    },
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Support for left and right icons"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Loading state with customizable spinner"
    },
    {
      icon: <Maximize2 className="h-3 w-3 text-white" />,
      text: "Full width option and disabled state styling"
    },
    {
      icon: <MousePointer className="h-3 w-3 text-white" />,
      text: "Accessible focus states and keyboard navigation"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Button Component
        </h1>
        <p className="text-gray-600 text-lg">
          A versatile button component with support for different variants, sizes, icons, and loading states.
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
            <div className="flex items-center gap-4">
              <Button onClick={handleButtonClick}>Click Me</Button>
              <div className="text-sm">
                Clicked: <span className="font-mono bg-gray-300 px-2 py-1 rounded">{clickCount} times</span>
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
        <h2 className="text-2xl font-semibold mb-6">Variants</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={() => { }}>Primary</Button>
              <Button variant="secondary" onClick={() => { }}>Secondary</Button>
              <Button variant="outline" onClick={() => { }}>Outline</Button>
              <Button variant="ghost" onClick={() => { }}>Ghost</Button>
              <Button variant="destructive" onClick={() => { }}>Destructive</Button>
              <Button variant="link" onClick={() => { }}>Link</Button>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{VARIANTS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(VARIANTS_CODE, "variants")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "variants" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Sizes</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center flex-wrap gap-4">
              <Button size="sm" onClick={() => { }}>Small</Button>
              <Button size="md" onClick={() => { }}>Medium</Button>
              <Button size="lg" onClick={() => { }}>Large</Button>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{SIZES_CODE}</pre>
            <button
              onClick={() => copyToClipboard(SIZES_CODE, "sizes")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "sizes" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">With Icons</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <Button leftIcon={<PlusIcon />} onClick={() => { }}>
                Add Item
              </Button>
              <Button rightIcon={<ArrowRightIcon />} onClick={() => { }}>
                Next Step
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{ICONS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(ICONS_CODE, "icons")}
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
        <h2 className="text-2xl font-semibold mb-6">Loading State</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <Button isLoading onClick={() => { }}>Loading...</Button>
              <Button isLoading variant="outline" onClick={() => { }}>Submitting</Button>
              <Button isLoading variant="secondary" onClick={() => { }} spinner={<ImSpinner />}>Processing</Button>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{LOADING_CODE}</pre>
            <button
              onClick={() => copyToClipboard(LOADING_CODE, "loading")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "loading" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
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
        <p className="text-sm text-gray-600 italic mt-4">
          Note: The Button component also accepts all standard HTML button attributes.
        </p>
      </section>
    </div>
  );
} 