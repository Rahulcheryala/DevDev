import { useState } from "react";
import { ToggleSwitch } from "@zeak/ui";
import { Copy, Check, Code, Info, Settings, Layers, Shield, ToggleLeft, Bell, Moon, Eye } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { ToggleSwitch } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
import { ToggleSwitch } from "@zeak/ui";
import { useState } from "react";

export default function MyComponent() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <ToggleSwitch
      isOn={isEnabled}
      onChange={setIsEnabled}
      label="Notifications"
    />
  );
}`;

const SIZES_CODE = `
<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Small"
  size="sm"
/>

<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Medium (Default)"
  size="md"
/>

<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Large"
  size="lg"
/>`;

const WITH_TEXT_CODE = `
<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Show Notifications"
  showText={true}
/>

// With custom on/off text
<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Enable Feature"
  showText={true}
  onText="Enabled"
  offText="Disabled"
/>`;

const CUSTOM_COLORS_CODE = `
<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Custom Purple"
  activeColor="bg-purple-600"
/>

<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Custom Red/Gray"
  activeColor="bg-red-500"
  inactiveColor="bg-gray-400"
/>`;

const DISABLED_CODE = `
<ToggleSwitch
  isOn={true}
  onChange={() => {}}
  label="Disabled (On)"
  disabled={true}
/>

<ToggleSwitch
  isOn={false}
  onChange={() => {}}
  label="Disabled (Off)"
  disabled={true}
/>`;

const LABEL_POSITION_CODE = `
<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Label Above (Default)"
  labelFirst={true}
/>

<ToggleSwitch
  isOn={isEnabled}
  onChange={setIsEnabled}
  label="Label Inline"
  labelFirst={false}
/>`;

export default function ToggleSwitchDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [featuresEnabled, setFeaturesEnabled] = useState(false);
  const [customEnabled, setCustomEnabled] = useState(true);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data array
  const componentProps = [
    {
      name: "isOn",
      type: "boolean",
      required: "Yes",
      defaultValue: "-",
      description: "Whether the toggle is in the on/active state"
    },
    {
      name: "onChange",
      type: "function",
      required: "Yes",
      defaultValue: "-",
      description: "Function called when the toggle state changes"
    },
    {
      name: "isRequired",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the toggle is required"
    },
    {
      name: "label",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "The label text displayed next to the toggle"
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      required: "No",
      defaultValue: "'md'",
      description: "Size of the toggle - small, medium, or large"
    },
    {
      name: "showText",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether to show the Yes/No text indicator"
    },
    {
      name: "onText",
      type: "string",
      required: "No",
      defaultValue: "'Yes'",
      description: "Custom text for the 'on' state"
    },
    {
      name: "offText",
      type: "string",
      required: "No",
      defaultValue: "'No'",
      description: "Custom text for the 'off' state"
    },
    {
      name: "disabled",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the toggle is disabled"
    },
    {
      name: "id",
      type: "string",
      required: "No",
      defaultValue: "auto-generated",
      description: "ID for the toggle (for accessibility)"
    },
    {
      name: "activeColor",
      type: "string",
      required: "No",
      defaultValue: "'bg-accent-brightGreen'",
      description: "Custom colors for the active state background"
    },
    {
      name: "inactiveColor",
      type: "string",
      required: "No",
      defaultValue: "'bg-gray-200'",
      description: "Custom colors for the inactive state background"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Custom className for the container"
    },
    {
      name: "labelFirst",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the label should be positioned before the toggle"
    },
    {
      name: "ariaLabel",
      type: "string",
      required: "No",
      defaultValue: "label prop",
      description: "ARIA label for accessibility"
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
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Multiple size options (small, medium, large)"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Custom active and inactive colors"
    },
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Optional text indicator with customizable labels"
    },
    {
      icon: <ToggleLeft className="h-3 w-3 text-white" />,
      text: "Disabled state styling"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Fully accessible via keyboard navigation and screen readers"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Flexible label positioning"
    },
    {
      icon: <Code className="h-3 w-3 text-white" />,
      text: "Seamless integration with form controls"
    },
    {
      icon: <Eye className="h-3 w-3 text-white" />,
      text: "Animated state transitions"
    }
  ];

  // Use cases with icons
  const useCases = [
    {
      icon: <ToggleLeft className="h-3 w-3 text-white" />,
      text: "Enabling/disabling features"
    },
    {
      icon: <Bell className="h-3 w-3 text-white" />,
      text: "Toggling notification settings"
    },
    {
      icon: <Moon className="h-3 w-3 text-white" />,
      text: "Switching between modes (e.g., light/dark)"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Setting boolean preferences"
    },
    {
      icon: <Code className="h-3 w-3 text-white" />,
      text: "Form controls for yes/no or true/false values"
    },
    {
      icon: <Eye className="h-3 w-3 text-white" />,
      text: "Showing/hiding UI elements"
    }
  ];

  // Accessibility features
  const accessibilityFeatures = [
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Implements WAI-ARIA switch role pattern"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Properly handles keyboard interactions (Enter/Space)"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Includes proper aria-checked and aria-disabled attributes"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Associated with label via htmlFor/id relationship"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Maintains focus states for keyboard navigation"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Color contrast meets WCAG 2.1 guidelines"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Toggle Switch Component
        </h1>
        <p className="text-gray-600 text-lg">
          A versatile and accessible toggle switch component for binary choices with customizable appearance and behavior.
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
            <div className="max-w-xl">
              <ToggleSwitch
                isOn={isEnabled}
                onChange={setIsEnabled}
                label="Notifications"
              />
              <div className="mt-4 text-sm">
                Current state: <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">{isEnabled ? "Enabled" : "Disabled"}</span>
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
        <h2 className="text-2xl font-semibold mb-6">Sizes</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <ToggleSwitch
                  isOn={isEnabled}
                  onChange={setIsEnabled}
                  label="Small"
                  size="sm"
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={isEnabled}
                  onChange={setIsEnabled}
                  label="Medium (Default)"
                  size="md"
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={isEnabled}
                  onChange={setIsEnabled}
                  label="Large"
                  size="lg"
                />
              </div>
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
        <h2 className="text-2xl font-semibold mb-6">With Text Indicator</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ToggleSwitch
                  isOn={notificationsEnabled}
                  onChange={setNotificationsEnabled}
                  label="Show Notifications"
                  showText={true}
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={featuresEnabled}
                  onChange={setFeaturesEnabled}
                  label="Enable Feature"
                  showText={true}
                  onText="Enabled"
                  offText="Disabled"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{WITH_TEXT_CODE}</pre>
            <button
              onClick={() => copyToClipboard(WITH_TEXT_CODE, "text")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "text" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Custom Colors</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ToggleSwitch
                  isOn={customEnabled}
                  onChange={setCustomEnabled}
                  label="Custom Purple"
                  activeColor="bg-purple-600"
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={customEnabled}
                  onChange={setCustomEnabled}
                  label="Custom Red/Gray"
                  activeColor="bg-red-500"
                  inactiveColor="bg-gray-400"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_COLORS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_COLORS_CODE, "colors")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "colors" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Disabled State</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ToggleSwitch
                  isOn={true}
                  onChange={() => { }}
                  label="Disabled (On)"
                  disabled={true}
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={false}
                  onChange={() => { }}
                  label="Disabled (Off)"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{DISABLED_CODE}</pre>
            <button
              onClick={() => copyToClipboard(DISABLED_CODE, "disabled")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "disabled" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Label Position</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ToggleSwitch
                  isOn={isEnabled}
                  onChange={setIsEnabled}
                  label="Label Above (Default)"
                  labelFirst={true}
                />
              </div>
              <div>
                <ToggleSwitch
                  isOn={isEnabled}
                  onChange={setIsEnabled}
                  label="Label Inline"
                  labelFirst={false}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{LABEL_POSITION_CODE}</pre>
            <button
              onClick={() => copyToClipboard(LABEL_POSITION_CODE, "position")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "position" ? (
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