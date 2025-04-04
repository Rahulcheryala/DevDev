import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton
} from "@zeak/ui";
import {
  Copy,
  Check,
  Code,
  Layers,
  ArrowRight,
  Layout,
  Shield,
  PanelLeftOpen,
  Maximize2,
  ArrowRightLeft,
  PanelTopOpen
} from "lucide-react";
import { Button } from "@zeak/ui";

// Code samples
const IMPORT_CODE = `import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerDescription, 
  DrawerBody, 
  DrawerFooter, 
  DrawerCloseButton 
} from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Drawer Title</DrawerTitle>
      <DrawerDescription>A description of the drawer content</DrawerDescription>
      <DrawerCloseButton />
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content goes here...</p>
    </DrawerBody>
    <DrawerFooter>
      <Button variant="outline" onClick={() => {}}>Cancel</Button>
      <Button onClick={() => {}}>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

const POSITIONS_CODE = `
// Right position (default)
<DrawerContent position="right" size="md">...</DrawerContent>

// Left position
<DrawerContent position="left" size="md">...</DrawerContent>

// Top position
<DrawerContent position="top" size="md">...</DrawerContent>

// Bottom position
<DrawerContent position="bottom" size="md">...</DrawerContent>`;

const SIZES_CODE = `
// Different size options
<DrawerContent size="sm">...</DrawerContent>
<DrawerContent size="md">...</DrawerContent>
<DrawerContent size="lg">...</DrawerContent>
<DrawerContent size="xl">...</DrawerContent>
<DrawerContent size="full">...</DrawerContent>
<DrawerContent size="content">...</DrawerContent>`;

export default function DrawerDocumentation() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Define component props
  const drawerContentProps = [
    {
      name: "position",
      type: "'top'|'right'|'bottom'|'left'",
      required: "No",
      defaultValue: "'right'",
      description: "Position of the drawer relative to the viewport"
    },
    {
      name: "size",
      type: "'content'|'sm'|'md'|'lg'|'xl'|'full'",
      required: "No",
      defaultValue: "'md'",
      description: "Size of the drawer (width or height depending on position)"
    },
    {
      name: "overlay",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether to show a backdrop overlay when drawer is open"
    },
    {
      name: "container",
      type: "HTMLElement",
      required: "No",
      defaultValue: "-",
      description: "Container element to render the drawer into"
    },
    {
      name: "children",
      type: "React.ReactNode",
      required: "Yes",
      defaultValue: "-",
      description: "Content to display inside the drawer"
    }
  ];

  const drawerProps = [
    {
      name: "defaultOpen",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the drawer is open by default (uncontrolled)"
    },
    {
      name: "open",
      type: "boolean",
      required: "No",
      defaultValue: "-",
      description: "Controlled open state of the drawer"
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: "No",
      defaultValue: "-",
      description: "Callback when the open state changes"
    }
  ];

  // Sort props to show required ones first
  const sortedDrawerContentProps = [...drawerContentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Features with icons
  const features = [
    {
      icon: <PanelLeftOpen className="h-3 w-3 text-white" />,
      text: "Multiple positions: top, right, bottom, left with animations"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Flexible sizing options: sm, md, lg, xl, full, and content"
    },
    {
      icon: <Layout className="h-3 w-3 text-white" />,
      text: "Structured layout components: header, body, footer"
    },
    {
      icon: <ArrowRightLeft className="h-3 w-3 text-white" />,
      text: "Controlled and uncontrolled usage options"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Built on Radix UI's Dialog primitive for accessibility"
    },
    {
      icon: <Maximize2 className="h-3 w-3 text-white" />,
      text: "Responsive design that adapts to different screen sizes"
    }
  ];

  // Sub-components to document
  const subComponents = [
    {
      name: "Drawer",
      description: "Main component that manages the drawer's state"
    },
    {
      name: "DrawerTrigger",
      description: "Element that triggers the drawer to open"
    },
    {
      name: "DrawerContent",
      description: "Container for the drawer's content with positioning and sizing"
    },
    {
      name: "DrawerHeader",
      description: "Container for the drawer's header with styling"
    },
    {
      name: "DrawerTitle",
      description: "Title component for the drawer"
    },
    {
      name: "DrawerDescription",
      description: "Description text component for the drawer"
    },
    {
      name: "DrawerBody",
      description: "Main content area of the drawer"
    },
    {
      name: "DrawerFooter",
      description: "Footer section for actions like buttons"
    },
    {
      name: "DrawerCloseButton",
      description: "Button to close the drawer"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Drawer Component
        </h1>
        <p className="text-gray-600 text-lg">
          A versatile side or edge panel component built on Radix UI's Dialog primitive with support for different positions, sizes, and animations.
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
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button onClick={() => setOpen(true)}>Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent className="rounded-t-xl max-w-md">
                <DrawerHeader>
                  <DrawerTitle>Example Drawer</DrawerTitle>
                  <DrawerDescription>This is a sample drawer implementation</DrawerDescription>
                  <DrawerCloseButton className="absolute right-4 top-4" />
                </DrawerHeader>
                <DrawerBody>
                  <p className="text-gray-700">
                    This drawer can be opened and closed using the button above.
                    It demonstrates the basic structure of the Drawer component.
                  </p>
                </DrawerBody>
                <DrawerFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={() => setOpen(false)}>Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
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
        <h2 className="text-2xl font-semibold mb-6">Positions</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div className="text-sm space-y-2">
                <p className="font-medium">The drawer can be positioned at any edge of the screen:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Right (default) - slides in from the right</li>
                  <li>Left - slides in from the left</li>
                  <li>Top - slides in from the top</li>
                  <li>Bottom - slides in from the bottom</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {["right", "left", "top", "bottom"].map((position) => (
                  <div key={position} className="flex flex-col items-center">
                    <div className={`w-20 h-20 bg-gray-300 relative flex items-center justify-center rounded border border-gray-400`}>
                      <div
                        className={`absolute bg-indigo-500 
                          ${position === "right" ? "right-0 h-full w-1/3" : ""} 
                          ${position === "left" ? "left-0 h-full w-1/3" : ""} 
                          ${position === "top" ? "top-0 w-full h-1/3" : ""} 
                          ${position === "bottom" ? "bottom-0 w-full h-1/3" : ""} 
                        `}
                      >
                        <ArrowRight
                          className={`h-4 w-4 text-white absolute 
                            ${position === "right" ? "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180" : ""} 
                            ${position === "left" ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" : ""} 
                            ${position === "top" ? "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rotate-90" : ""} 
                            ${position === "bottom" ? "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 -rotate-90" : ""} 
                          `}
                        />
                      </div>
                    </div>
                    <span className="mt-2 text-sm font-medium capitalize">{position}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{POSITIONS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(POSITIONS_CODE, "positions")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "positions" ? (
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
            <div className="space-y-4">
              <p className="text-sm">The drawer supports various sizes, which affect the width or height based on its position:</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Small (sm)</h3>
                  <p className="text-xs text-gray-500">
                    Top/Bottom: 25% of viewport height<br />
                    Left/Right: 25% of viewport width
                  </p>
                </div>
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Medium (md)</h3>
                  <p className="text-xs text-gray-500">
                    Top/Bottom: 33% of viewport height<br />
                    Left/Right: 33% of viewport width
                  </p>
                </div>
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Large (lg)</h3>
                  <p className="text-xs text-gray-500">
                    Top/Bottom: 50% of viewport height<br />
                    Left/Right: 50% of viewport width
                  </p>
                </div>
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Extra Large (xl)</h3>
                  <p className="text-xs text-gray-500">
                    Top/Bottom: 83% of viewport height<br />
                    Left/Right: variable width (100% on mobile, 60% on desktop)
                  </p>
                </div>
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Full</h3>
                  <p className="text-xs text-gray-500">
                    Top/Bottom: 100% of viewport height<br />
                    Left/Right: 100% of viewport width
                  </p>
                </div>
                <div className="border p-3 rounded-md">
                  <h3 className="font-medium mb-2">Content</h3>
                  <p className="text-xs text-gray-500">
                    Size based on content with max constraints<br />
                    (max-height or max-width of viewport)
                  </p>
                </div>
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
        <h2 className="text-2xl font-semibold mb-6">Sub-Components</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-2">
            <div className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Component
            </div>
            <div className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Description
            </div>
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {subComponents.map((component, index) => (
              <div key={index} className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{component.name}</div>
                <div className="px-4 py-4 text-sm">{component.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">DrawerContent Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-[10%_30%_10%_20%_20%]">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedDrawerContentProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-[10%_30%_10%_20%_20%] hover:bg-gray-50 transition-colors">
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
        <h2 className="text-2xl font-semibold mb-6">Drawer Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {drawerProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{prop.name}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm font-mono">{prop.type}</div>
                <div className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-lg text-red-900 bg-red-100`}>
                    No
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
        <h2 className="text-2xl font-semibold mb-6">Use Cases</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <ul className="space-y-4">
            <li className="space-y-1">
              <h3 className="font-medium">Side Navigation</h3>
              <p className="text-sm text-gray-600">Create responsive mobile navigation menus that slide in from the side.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Detail Panels</h3>
              <p className="text-sm text-gray-600">Display additional information or details about selected items without navigating away.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Form Submission</h3>
              <p className="text-sm text-gray-600">Create panels for submitting forms without disrupting the main workflow.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Filtering Interfaces</h3>
              <p className="text-sm text-gray-600">Provide complex filtering options in a panel that can be toggled on and off.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Mobile Configuration</h3>
              <p className="text-sm text-gray-600">Display settings or configuration options on mobile devices.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Task Panels</h3>
              <p className="text-sm text-gray-600">Show actionable task interfaces that can be dismissed when completed.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Accessibility</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Keyboard navigation with <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">Tab</kbd> and <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">Shift+Tab</kbd></span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Close with <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">Esc</kbd> key</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Focus is trapped within the drawer when open</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Screen reader announcements for drawer state changes</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">ARIA attributes for enhanced screen reader navigation</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
} 