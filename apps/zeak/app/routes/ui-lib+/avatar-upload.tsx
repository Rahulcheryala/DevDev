import { AvatarUpload } from "@zeak/ui";
import { useState } from "react";
import { Code, Copy, Check, Camera, Info, Upload, Shield } from "lucide-react";

// Code samples as string literals
const IMPORT_CODE = "import { AvatarUpload } from '@zeak/ui';";
const DEPENDENCIES_CODE = "import DUploadIcon from '../micro/DUploadIcon';\nimport Image from '../micro/Image';\nimport Label from '../micro/Label';";
const BASIC_USAGE_CODE = `import { AvatarUpload } from '@zeak/ui';
import { useState } from 'react';

const MyComponent = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  
  const handleFileSelect = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    // Any other functions like: Uploading the file to your server or process as needed
  };
  
  return (
    <AvatarUpload
      imageUrl={previewUrl}
      altText="User Avatar"
      onFileSelect={handleFileSelect}
    />
  );
};`;

const CUSTOM_USAGE_CODE = `<AvatarUpload
  imageUrl={logoUrl}
  altText="Company Logo"
  labelText="Company Logo"
  descriptionText="Upload your company logo (SVG preferred)"
  uploadButtonText="Choose Logo"
  maxSizeMB={5}
  onFileSelect={handleLogoSelect}
/>`;

export default function AvatarUploadDocumentation() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string>("");

  // Component props data array
  const componentProps = [
    {
      name: "imageUrl",
      type: "string",
      required: "No",
      default: "-",
      description: "URL of the current avatar image",
    },
    {
      name: "altText",
      type: "string",
      required: "Yes",
      default: "-",
      description: "Alt text for the image used for fallback image when imageUrl is not provided",
    },
    {
      name: "onFileSelect",
      type: "(file: File) => void",
      required: "Yes",
      default: "-",
      description: "Callback function called when file is selected",
    },
    {
      name: "labelText",
      type: "string",
      required: "No",
      default: '"Profile Picture"',
      description: "Label text displayed above upload button",
    },
    {
      name: "descriptionText",
      type: "string",
      required: "No",
      default: '"PNG, JPEG, SVG (Max 2MB)"',
      description: "Description text below the label",
    },
    {
      name: "maxSizeMB",
      type: "number",
      required: "No",
      default: "2",
      description: "Maximum file size in MB",
    },
    {
      name: "acceptedFileTypes",
      type: "string",
      required: "No",
      default: "image/png, image/jpg, image/jpeg, image/svg",
      description: "Accepted file types for the upload",
    },
    {
      name: "uploadButtonText",
      type: "string",
      required: "No",
      default: '"Upload"',
      description: "Text displayed on the upload button",
    },
    {
      name: "UploadIcon",
      type: "React.ComponentType",
      required: "No",
      default: "undefined",
      description: "Icon component to be displayed on the upload button",
    },
  ];

  // Sort props - required ones first
  const sortedProps = [...componentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Feature items with icons
  const features = [
    {
      icon: <Camera className="h-3 w-3 text-white" />,
      text: "Simple and intuitive avatar upload interface",
    },
    {
      icon: <Check className="h-3 w-3 text-white" />,
      text: "Customizable labels, descriptions, and button text",
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "File size validation with customizable limit",
    },
    {
      icon: <Upload className="h-3 w-3 text-white" />,
      text: "File type filtering for security and consistency",
    },
    {
      icon: <Info className="h-3 w-3 text-white" />,
      text: "Fallback display for when no image is provided",
    },
    {
      icon: <Check className="h-3 w-3 text-white" />,
      text: "Support for custom upload icon",
    },
    {
      icon: <Check className="h-3 w-3 text-white" />,
      text: "Accessible input elements with proper labeling",
    },
  ];

  // Accessibility features
  const accessibilityFeatures = [
    "Proper alt text for images to assist screen readers",
    "Keyboard navigable upload functionality",
    "Clear visual feedback for interactive elements",
    "Proper form labeling for screen reader compatibility",
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedSection(section);
    setTimeout(() => {
      setCopied(false);
      setCopiedSection("");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          AvatarUpload Component
        </h1>
        <p className="text-gray-600 text-lg">
          A customizable component for uploading and displaying profile/avatar
          images with file validation and preview functionality.
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
            {copied && copiedSection === "import" ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-indigo-500" />
          <h2 className="text-2xl font-semibold">Dependencies</h2>
        </div>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-xl relative">
          <pre className="font-mono text-sm">{DEPENDENCIES_CODE}</pre>
          <button
            onClick={() => copyToClipboard(DEPENDENCIES_CODE, "dependencies")}
            className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Copy code"
          >
            {copied && copiedSection === "dependencies" ? (
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
            <div className="flex justify-center">
              <AvatarUpload
                imageUrl={previewUrl}
                altText="User Avatar"
                onFileSelect={handleFileSelect}
              />
            </div>
            {selectedFile && (
              <div className="mt-4 text-center text-sm">
                <span>Selected file: </span>
                <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">
                  {selectedFile.name}
                </span>
                <span className="ml-2">
                  ({Math.round(selectedFile.size / 1024)} KB)
                </span>
              </div>
            )}
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{BASIC_USAGE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(BASIC_USAGE_CODE, "basic")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Copy code"
            >
              {copied && copiedSection === "basic" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Customization</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-center">
              <AvatarUpload
                imageUrl={previewUrl}
                altText="Company Logo"
                labelText="Company Logo"
                descriptionText="Upload your company logo (SVG preferred)"
                uploadButtonText="Choose Logo"
                maxSizeMB={5}
                onFileSelect={handleFileSelect}
              />
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_USAGE_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_USAGE_CODE, "custom")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 transition-colors"
              aria-label="Copy code"
            >
              {copied && copiedSection === "custom" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-500" />
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
                <div className="px-6 py-4 text-sm">{prop.default}</div>
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
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="ml-3 text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
