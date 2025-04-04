import { Note } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Code, Info, AlertTriangle, HelpCircle, X, Shield, List, MessageSquare, FileText, ArrowDown, Eye, Lightbulb, Layers, Bell, Minimize, MinusCircle, RefreshCw } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { Note } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
// Basic usage
<Note 
  content="This is a simple informational note." 
/>

// With custom title
<Note 
  title="IMPORTANT" 
  content="This note has a custom title." 
/>

// Non-dismissible
<Note 
  content="This note cannot be dismissed." 
  dismissible={false} 
/>
`;

const TYPES_CODE = `
// Info note (default)
<Note 
  type="info" 
  content="This is an informational note." 
/>

// Warning note
<Note 
  type="warning" 
  content="This is a warning note. Please be careful!" 
/>

// Question note
<Note 
  type="question" 
  content="This is a question/help note to provide guidance." 
/>
`;

const TRUNCATE_CODE = `
<Note 
  type="question" 
  content="This is a longer note that will be truncated. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio."
  maxLines={2} 
/>
`;

const EVENT_HANDLER_CODE = `
// With onDismiss handler
const [isVisible, setIsVisible] = useState(true);

{isVisible && (
  <Note 
    content="This note will update the parent state when dismissed." 
    onDismiss={() => {
      setIsVisible(false);
      console.log('Note was dismissed!');
    }} 
  />
)}
`;

const COLLAPSIBLE_CODE = `
// With collapseOnDismiss option
<Note 
  type="info"
  title="COLLAPSIBLE NOTE"
  content="This note will transform into a button when dismissed instead of disappearing completely. Click the X to see it collapse, then click the icon button to expand it again."
  collapseOnDismiss={true}
/>
`;

export default function NoteDocumentation() {
  const [isVisibleEvent, setIsVisibleEvent] = useState(true);
  const [counter, setCounter] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDismiss = () => {
    setIsVisibleEvent(false);
    setCounter(prev => prev + 1);
  };

  const resetVisibility = () => {
    setIsVisibleEvent(true);
  };

  // Component props data
  const componentProps = [
    {
      name: "content",
      type: "string | ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "The main content of the note"
    },
    {
      name: "title",
      type: "string",
      required: "No",
      defaultValue: "\"NOTE\"",
      description: "The title of the note, displayed at the top"
    },
    {
      name: "dismissible",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the note can be dismissed with a close button"
    },
    {
      name: "onDismiss",
      type: "function",
      required: "No",
      defaultValue: "-",
      description: "Callback function called when the note is dismissed"
    },
    {
      name: "type",
      type: "\"info\"|\"warning\"|\"question\"",
      required: "No",
      defaultValue: "\"info\"",
      description: "Type of note determining the icon and styling"
    },
    {
      name: "maxLines",
      type: "number",
      required: "No",
      defaultValue: "0",
      description: "Number of lines to show before truncating. 0 disables truncation."
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Additional CSS classes to apply to the note container"
    },
    {
      name: "collapseOnDismiss",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "When true, the note collapses to a button instead of disappearing when dismissed"
    }
  ];

  // Sort props to show required ones first
  const sortedProps = [...componentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Accessibility features with icons
  const accessibilityFeatures = [
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "The close button is properly sized for easy interaction"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Color contrasts meet WCAG standards"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Interactive elements are keyboard accessible"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Semantic HTML structure enhances screen reader compatibility"
    }
  ];

  // Use cases with icons
  const useCases = [
    {
      icon: <FileText className="h-3 w-3 text-white" />,
      text: "Displaying important information at the top of a form"
    },
    {
      icon: <HelpCircle className="h-3 w-3 text-white" />,
      text: "Providing help text or guidance for complex workflows"
    },
    {
      icon: <AlertTriangle className="h-3 w-3 text-white" />,
      text: "Warning users about potential issues or requirements"
    },
    {
      icon: <Bell className="h-3 w-3 text-white" />,
      text: "Highlighting new features or changes in the application"
    },
    {
      icon: <Lightbulb className="h-3 w-3 text-white" />,
      text: "Showing contextual information that can be dismissed once read"
    },
    {
      icon: <Minimize className="h-3 w-3 text-white" />,
      text: "Collapsing notes to icon buttons for space efficiency while keeping them accessible"
    }
  ];

  // Features with icons
  const features = [
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Three different note types: info, warning, and question"
    },
    {
      icon: <X className="h-3 w-3 text-white" />,
      text: "Dismissible with a close button (can be disabled)"
    },
    {
      icon: <ArrowDown className="h-3 w-3 text-white" />,
      text: "Content truncation with 'More' button for long messages"
    },
    {
      icon: <MessageSquare className="h-3 w-3 text-white" />,
      text: "Customizable title and content"
    },
    {
      icon: <Eye className="h-3 w-3 text-white" />,
      text: "Distinctive styling and icons for each note type"
    },
    {
      icon: <MinusCircle className="h-3 w-3 text-white" />,
      text: "Optional collapse-to-button mode for persistent but compact display"
    },
    {
      icon: <RefreshCw className="h-3 w-3 text-white" />,
      text: "Expandable from collapsed state with a simple click"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Note Component
        </h1>
        <p className="text-gray-600 text-lg">
          A flexible Note component for displaying informational messages, warnings, or help content.
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
          The Note component accepts content as a string or React node, and can be configured with various options.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-6">
              <Note content="This is a simple informational note." />

              <Note
                title="IMPORTANT"
                content="This note has a custom title."
              />

              <Note
                content="This note cannot be dismissed."
                dismissible={false}
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
        <h2 className="text-2xl font-semibold mb-6">Note Types</h2>
        <p className="text-gray-700 mb-4">
          The component supports three types of notes, each with its own styling and icon: info, warning, and question.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-1">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Info Note (Default)</span>
              </div>
              <Note
                type="info"
                content="This is an informational note."
              />

              <div className="flex items-center gap-2 mb-1 mt-4">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Warning Note</span>
              </div>
              <Note
                type="warning"
                content="This is a warning note. Please be careful!"
              />

              <div className="flex items-center gap-2 mb-1 mt-4">
                <HelpCircle className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium">Question Note</span>
              </div>
              <Note
                type="question"
                content="This is a question/help note to provide guidance."
              />
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{TYPES_CODE}</pre>
            <button
              onClick={() => copyToClipboard(TYPES_CODE, "types")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "types" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Truncating Long Content</h2>
        <p className="text-gray-700 mb-4">
          For longer content, you can set the maxLines prop to enable truncation with a "More" button.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Note
              type="question"
              content="This is a longer note that will be truncated. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio."
              maxLines={2}
            />
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{TRUNCATE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(TRUNCATE_CODE, "truncate")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "truncate" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Handling Dismiss Events</h2>
        <p className="text-gray-700 mb-4">
          You can provide an onDismiss callback to handle the dismiss event. This example updates a counter when the note is dismissed.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            {isVisibleEvent ? (
              <Note
                content="This note will update the parent state when dismissed. Try clicking the X button."
                onDismiss={handleDismiss}
              />
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-gray-700">
                  Note was dismissed! Dismiss counter: {counter}
                </p>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md w-fit hover:bg-blue-600 transition-colors"
                  onClick={resetVisibility}
                >
                  Show Note Again
                </button>
              </div>
            )}
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{EVENT_HANDLER_CODE}</pre>
            <button
              onClick={() => copyToClipboard(EVENT_HANDLER_CODE, "event")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "event" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Collapsible Notes</h2>
        <p className="text-gray-700 mb-4">
          Instead of completely removing a note when dismissed, you can set <code className="bg-gray-100 px-1 py-0.5 rounded">collapseOnDismiss</code> to <code className="bg-gray-100 px-1 py-0.5 rounded">true</code> to transform it into a compact button that can be clicked to expand the note again.
        </p>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Note
              type="info"
              title="COLLAPSIBLE NOTE"
              content="This note will transform into a button when dismissed instead of disappearing completely. Click the X to see it collapse, then click the icon button to expand it again."
              collapseOnDismiss={true}
            />
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{COLLAPSIBLE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(COLLAPSIBLE_CODE, "collapsible")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "collapsible" ? (
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