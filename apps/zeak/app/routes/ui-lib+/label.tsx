import { Label } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Code, Tag, Shield, Accessibility, Layout, Users } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { Label } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
<Label htmlFor="email">Email address</Label>
<input id="email" type="email" />`;

const STYLED_LABEL_CODE = `
<Label 
  htmlFor="name" 
  className="text-blue-600 font-bold"
>
  Full Name
</Label>
<input id="name" type="text" />`;

const LABEL_WITH_REQUIRED_CODE = `
<Label htmlFor="password" className="flex items-center gap-1">
  Password <span className="text-red-500">*</span>
</Label>
<input id="password" type="password" required />`;

export default function LabelDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data
  const componentProps = [
    {
      name: "children",
      type: "React.ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The content to be displayed within the label"
    },
    {
      name: "htmlFor",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "The ID of the form element the label is associated with"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom CSS class for the label element"
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
      icon: <Tag className="h-3 w-3 text-white" />,
      text: "Built on Radix UI's Label primitive for accessibility"
    },
    {
      icon: <Layout className="h-3 w-3 text-white" />,
      text: "Consistent styling with the design system"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Properly associates with form controls using htmlFor"
    },
    {
      icon: <Accessibility className="h-3 w-3 text-white" />,
      text: "Follows WCAG 2.1 accessibility guidelines"
    },
    {
      icon: <Users className="h-3 w-3 text-white" />,
      text: "Increases clickable area for form controls"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Label Component
        </h1>
        <p className="text-gray-600 text-lg">
          A reusable label component built on Radix UI's Label primitive, providing accessible form labeling.
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
            <div className="flex flex-col gap-2 max-w-sm">
              <Label htmlFor="email-demo">Email address</Label>
              <input
                id="email-demo"
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 border border-gray-300 rounded-md"
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
        <h2 className="text-2xl font-semibold mb-6">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">Custom Styling</h3>
              <div className="flex flex-col gap-2 max-w-sm">
                <Label
                  htmlFor="name-demo"
                  className="text-blue-600 font-bold"
                >
                  Full Name
                </Label>
                <input
                  id="name-demo"
                  type="text"
                  placeholder="Enter your full name"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="bg-gray-50 relative">
              <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{STYLED_LABEL_CODE}</pre>
              <button
                onClick={() => copyToClipboard(STYLED_LABEL_CODE, "styled")}
                className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Copy code"
              >
                {copied === "styled" ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium mb-4">With Required Indicator</h3>
              <div className="flex flex-col gap-2 max-w-sm">
                <Label htmlFor="password-demo" className="flex items-center gap-1">
                  Password <span className="text-red-500">*</span>
                </Label>
                <input
                  id="password-demo"
                  type="password"
                  placeholder="Enter your password"
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="bg-gray-50 relative">
              <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{LABEL_WITH_REQUIRED_CODE}</pre>
              <button
                onClick={() => copyToClipboard(LABEL_WITH_REQUIRED_CODE, "required")}
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
          Note: The Label component also accepts all standard HTML attributes for the label element.
        </p>
      </section>
    </div>
  );
}
