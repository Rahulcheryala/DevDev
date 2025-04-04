import { useState } from "react";
import { Image } from "@zeak/ui";
import { Copy, Check, Code, Image as ImageIcon, Shield, Eye, RefreshCw, Palette } from "lucide-react";

// Code samples
const IMPORT_CODE = `import { Image } from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
<Image 
  src="https://example.com/image.jpg" 
  alt="Profile picture of John Doe" 
  className="w-16 h-16 rounded-full"
/>`;

const FALLBACK_USAGE_CODE = `
// With invalid src - will show fallback with initials
<Image 
  src="https://invalid-url.com/image.jpg" 
  alt="John Doe" 
  className="w-16 h-16 rounded-full"
/>

// Without src - will always show fallback
<Image 
  alt="Jane Smith" 
  className="w-16 h-16 rounded-full"
/>`;

export default function ImageDocumentation() {
  const [imgSrc, setImgSrc] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleImageSrc = () => {
    setImgSrc(imgSrc ? "" : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80");
  };

  // Component props data
  const componentProps = [
    {
      name: "alt",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Alt text for the image and used to generate initials for fallback"
    },
    {
      name: "src",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "URL of the image to display"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom CSS class applied to both image and fallback"
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
      icon: <RefreshCw className="h-3 w-3 text-white" />,
      text: "Automatic fallback to user initials when image fails to load"
    },
    {
      icon: <Palette className="h-3 w-3 text-white" />,
      text: "Deterministic background colors based on the alt text"
    },
    {
      icon: <ImageIcon className="h-3 w-3 text-white" />,
      text: "Server-side rendering compatible"
    },
    {
      icon: <Eye className="h-3 w-3 text-white" />,
      text: "Proper loading and error handling"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Accessible with proper ARIA attributes"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Image Component
        </h1>
        <p className="text-gray-600 text-lg">
          An enhanced image component with built-in fallback handling that displays user initials when the image fails to load.
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
            <div className="flex items-center gap-6">
              <Image
                src={imgSrc}
                alt="Alex Johnson"
                className="w-16 h-16 rounded-full"
              />
              <div className="space-y-2">
                <button
                  onClick={toggleImageSrc}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {imgSrc ? "Show Fallback" : "Show Image"}
                </button>
                <p className="text-sm text-gray-500">
                  Click the button to toggle between image and fallback
                </p>
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
        <h2 className="text-2xl font-semibold mb-6">Fallback Behavior</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <p className="text-sm mb-4">
              When an image fails to load or no src is provided, the component displays a colored background with the user's initials.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="https://invalid-url.com/image.jpg"
                  alt="John Doe"
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-sm">Invalid URL</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Image
                  alt="Jane Smith"
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-sm">No src provided</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Image
                  alt="Robert Johnson"
                  className="w-16 h-16 rounded-full"
                />
                <span className="text-sm">Different name</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{FALLBACK_USAGE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(FALLBACK_USAGE_CODE, "fallback")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "fallback" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Different Shapes</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <Image
                src={imgSrc}
                alt="Alex Johnson"
                className="w-16 h-16 rounded-full"
              />
              <span className="text-sm">Circle</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Image
                src={imgSrc}
                alt="Alex Johnson"
                className="w-16 h-16 rounded-md"
              />
              <span className="text-sm">Rounded</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Image
                src={imgSrc}
                alt="Alex Johnson"
                className="w-16 h-16"
              />
              <span className="text-sm">Square</span>
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
          Note: The Image component also accepts all standard HTML attributes for the img element.
        </p>
      </section>
    </div>
  );
}
