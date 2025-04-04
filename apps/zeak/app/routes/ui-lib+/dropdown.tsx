import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuGroup,
  DropdownMenuIcon
} from "@zeak/ui";
import {
  Copy,
  Check,
  Code,
  Layers,
  ChevronRight,
  Circle,
  CheckCircle,
  PanelRight,
  Keyboard,
  PanelLeftOpen,
  MousePointerClick,
  Menu,
  ListChecks,
  ArrowDownCircle
} from "lucide-react";
import { Button } from "@zeak/ui";

// Code samples
const IMPORT_CODE = `import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuCheckboxItem, 
  DropdownMenuRadioItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuShortcut, 
  DropdownMenuSub, 
  DropdownMenuSubTrigger, 
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuGroup,
  DropdownMenuIcon
} from "@zeak/ui";`;

const BASIC_USAGE_CODE = `
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
      New Tab
      <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      New Window
      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Settings
      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const CHECKBOX_RADIO_CODE = `
// Checkbox items
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuCheckboxItem checked={isChecked} onCheckedChange={setIsChecked}>
      Show Status Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>

// Radio items
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`;

const NESTED_DROPDOWN_CODE = `
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Main Item</DropdownMenuItem>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        More Options
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
        <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`;

export default function DropdownDocumentation() {
  const [open, setOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [checked, setChecked] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Define component props
  const dropdownMenuProps = [
    {
      name: "defaultOpen",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the dropdown menu is open by default (uncontrolled)"
    },
    {
      name: "open",
      type: "boolean",
      required: "No",
      defaultValue: "-",
      description: "Controlled open state of the dropdown menu"
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      required: "No",
      defaultValue: "-",
      description: "Callback when the open state changes"
    },
    {
      name: "modal",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the dropdown should behave like a modal (blocks interaction with the rest of the page)"
    }
  ];

  const dropdownMenuContentProps = [
    {
      name: "align",
      type: "'start' | 'center' | 'end'",
      required: "No",
      defaultValue: "'start'",
      description: "Alignment of the dropdown menu content relative to the trigger"
    },
    {
      name: "sideOffset",
      type: "number",
      required: "No",
      defaultValue: "4",
      description: "Distance between the dropdown menu and the trigger"
    },
    {
      name: "alignOffset",
      type: "number",
      required: "No",
      defaultValue: "0",
      description: "Offset along the main axis"
    },
    {
      name: "avoidCollisions",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether to avoid collisions with the viewport edges"
    },
    {
      name: "collisionPadding",
      type: "number | { top, right, bottom, left }",
      required: "No",
      defaultValue: "0",
      description: "Padding between the dropdown content and the viewport edges when avoidCollisions is true"
    }
  ];

  // Sort props to show required ones first
  const sortedDropdownMenuContentProps = [...dropdownMenuContentProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Features with icons
  const features = [
    {
      icon: <MousePointerClick className="h-3 w-3 text-white" />,
      text: "Fully keyboard navigable with support for arrow keys, Enter, and Escape"
    },
    {
      icon: <PanelLeftOpen className="h-3 w-3 text-white" />,
      text: "Support for nested submenus with automatic positioning"
    },
    {
      icon: <Layers className="h-3 w-3 text-white" />,
      text: "Checkbox and radio item variants for selection interfaces"
    },
    {
      icon: <ChevronRight className="h-3 w-3 text-white" />,
      text: "Customizable positioning with various alignment options"
    },
    {
      icon: <Check className="h-3 w-3 text-white" />,
      text: "Built on Radix UI's DropdownMenu primitive for accessibility"
    },
    {
      icon: <Keyboard className="h-3 w-3 text-white" />,
      text: "Support for keyboard shortcuts display with each menu item"
    }
  ];

  // Sub-components to document
  const subComponents = [
    {
      name: "DropdownMenu",
      description: "Root component that manages the dropdown state"
    },
    {
      name: "DropdownMenuTrigger",
      description: "Element that triggers the dropdown to open"
    },
    {
      name: "DropdownMenuContent",
      description: "Container for the dropdown's content with positioning options"
    },
    {
      name: "DropdownMenuItem",
      description: "Selectable item within the dropdown menu"
    },
    {
      name: "DropdownMenuCheckboxItem",
      description: "Checkbox item for toggling options on/off"
    },
    {
      name: "DropdownMenuRadioGroup",
      description: "Container for radio items to create mutually exclusive options"
    },
    {
      name: "DropdownMenuRadioItem",
      description: "Radio item for selecting one option from a group"
    },
    {
      name: "DropdownMenuLabel",
      description: "Non-interactive label for grouping menu items"
    },
    {
      name: "DropdownMenuSeparator",
      description: "Visual separator between menu items"
    },
    {
      name: "DropdownMenuShortcut",
      description: "Displays keyboard shortcuts for menu items"
    },
    {
      name: "DropdownMenuSub",
      description: "Container for creating nested dropdown menus"
    },
    {
      name: "DropdownMenuSubTrigger",
      description: "Trigger element for a nested dropdown menu"
    },
    {
      name: "DropdownMenuSubContent",
      description: "Content container for a nested dropdown menu"
    },
    {
      name: "DropdownMenuGroup",
      description: "Groups related menu items together"
    },
    {
      name: "DropdownMenuIcon",
      description: "Helper component for displaying icons in menu items"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
          Dropdown Menu Component
        </h1>
        <p className="text-gray-600 text-lg">
          A flexible dropdown menu component built on Radix UI primitives with support for items, checkboxes, radio items, nested submenus, and keyboard shortcuts.
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-5 w-5 text-purple-500" />
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
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button onClick={() => setOpen(true)}>Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  New Tab
                  <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  New Window
                  <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        <h2 className="text-2xl font-semibold mb-6">Checkbox and Radio Items</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-4">Checkbox Items</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button onClick={() => setOpen(true)} variant="outline">Options</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={checked}
                    onCheckedChange={setChecked}>
                    Show Status Bar
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-4">Radio Items</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button onClick={() => setOpen(true)} variant="outline">Select</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="option2">Option 2</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="option3">Option 3</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CHECKBOX_RADIO_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CHECKBOX_RADIO_CODE, "checkbox-radio")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "checkbox-radio" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Nested Dropdowns</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button onClick={() => setOpen(true)}>Main Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Main Item 1</DropdownMenuItem>
                <DropdownMenuItem>Main Item 2</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{NESTED_DROPDOWN_CODE}</pre>
            <button
              onClick={() => copyToClipboard(NESTED_DROPDOWN_CODE, "nested")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "nested" ? (
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
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center mt-0.5">
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
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white grid grid-cols-2">
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
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{component.name}</div>
                <div className="px-4 py-4 text-sm">{component.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">DropdownMenuContent Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white grid grid-cols-[10%_30%_10%_20%_20%]">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedDropdownMenuContentProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-[10%_30%_10%_20%_20%] hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{prop.name}</div>
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
        <h2 className="text-2xl font-semibold mb-6">DropdownMenu Props</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white grid grid-cols-5">
            {["Prop", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {dropdownMenuProps.map((prop, index) => (
              <div key={index} className="grid grid-cols-5 hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{prop.name}</div>
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
              <h3 className="font-medium">Application Menus</h3>
              <p className="text-sm text-gray-600">Create traditional dropdown menus for navigation or actions in web applications.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Selection Interfaces</h3>
              <p className="text-sm text-gray-600">Build interfaces for selecting from multiple options using checkbox or radio items.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Context Menus</h3>
              <p className="text-sm text-gray-600">Implement right-click context menus for advanced interactions.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Filter Menus</h3>
              <p className="text-sm text-gray-600">Create dropdown filters for sorting or filtering content on a page.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Settings Controls</h3>
              <p className="text-sm text-gray-600">Build interfaces for adjusting application settings with grouped options.</p>
            </li>
            <li className="space-y-1">
              <h3 className="font-medium">Multi-level Navigation</h3>
              <p className="text-sm text-gray-600">Create nested dropdown menus for complex navigation hierarchies.</p>
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
              <span className="ml-3 text-gray-700">Keyboard navigation with <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">↑</kbd>, <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">↓</kbd>, <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">→</kbd>, <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">←</kbd>, <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">Enter</kbd>, and <kbd className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-xs">Space</kbd></span>
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
              <span className="ml-3 text-gray-700">Focus is managed within the dropdown when open</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">Type-ahead functionality for quick navigation to items</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="ml-3 text-gray-700">ARIA attributes for enhanced screen reader support</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
} 