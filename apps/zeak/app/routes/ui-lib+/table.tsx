import { Table } from "@zeak/ui";
import { useState } from "react";
import { Copy, Check, Columns, Grid, ArrowUpDown, LayoutGrid, MousePointerClick, Settings, Code, FileText, Shield } from "lucide-react";

// Example data
const HEADERS = [
  { label: "Name", key: "name", width: "30%" },
  { label: "Email", key: "email", width: "30%" },
  { label: "Status", key: "status", width: "20%" },
  { label: "Role", key: "role", width: "20%" },
];

const ROWS = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    role: "Admin"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Inactive",
    role: "User"
  },
  {
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "Active",
    role: "Editor"
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Pending",
    role: "Viewer"
  },
];

// Code samples
const IMPORT_CODE = `import { Table } from '@zeak/ui';`;

const BASIC_USAGE_CODE = `
// Define table headers
const headers = [
  { label: "Name", key: "name", width: "30%" },
  { label: "Email", key: "email", width: "30%" },
  { label: "Status", key: "status", width: "20%" },
  { label: "Role", key: "role", width: "20%" },
];

// Define table rows
const rows = [
  { 
    name: "John Doe", 
    email: "john.doe@example.com",
    status: "Active",
    role: "Admin"
  },
  { 
    name: "Jane Smith", 
    email: "jane.smith@example.com",
    status: "Inactive",
    role: "User"
  },
  // Additional rows...
];

// Render the table
<Table 
  headers={headers}
  rows={rows}
/>`;

const CUSTOM_RENDER_CODE = `
// Custom renderer for specific cell types
const renderCell = (key, value, row) => {
  if (key === 'status') {
    return (
      <span 
        className={
          value === 'Active' 
            ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs'
            : value === 'Inactive'
              ? 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs'
              : 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs'
        }
      >
        {value}
      </span>
    );
  }
  
  if (key === 'email') {
    return <a className="text-blue-600 hover:underline">{value}</a>;
  }
  
  return value;
};

<Table 
  headers={headers}
  rows={rows}
  renderCell={renderCell}
/>`;

const STYLES_AND_VARIANTS_CODE = `
// Striped, hoverable, compact table with rounded corners
<Table 
  headers={headers}
  rows={rows}
  isStriped={true}
  isHoverable={true}
  isCompact={true}
  isRounded={true}
/>

// Table without dividers
<Table 
  headers={headers}
  rows={rows}
  showDividers={false}
/>

// Full-width table with fixed layout
<Table 
  headers={headers}
  rows={rows}
  isFullWidth={true}
  isFixedLayout={true}
/>`;

const CLICK_HANDLER_CODE = `
const handleRowClick = (row) => {
  console.log('Row clicked:', row);
  // Open details modal, navigate to details page, etc.
};

<Table 
  headers={headers}
  rows={rows}
  isHoverable={true}
  onRowClick={handleRowClick}
/>`;

export default function TableDocumentation() {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);

  // Custom cell renderer function
  const renderCustomCell = (key: string, value: any, row: Record<string, any>) => {
    if (key === 'status') {
      return (
        <span
          className={
            value === 'Active'
              ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs'
              : value === 'Inactive'
                ? 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs'
                : 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs'
          }
        >
          {value}
        </span>
      );
    }

    if (key === 'email') {
      return <a href={`mailto:${value}`} className="text-blue-600 hover:underline">{value}</a>;
    }

    return value;
  };

  const handleRowClick = (row: Record<string, any>) => {
    setSelectedRow(row);
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopied(section);
    setTimeout(() => setCopied(null), 2000);
  };

  // Component props data array
  const tableProps = [
    {
      name: "headers",
      type: "TableHeader[]",
      required: "Yes",
      defaultValue: "-",
      description: "Array of header objects defining the table columns"
    },
    {
      name: "rows",
      type: "Record<string, any>[]",
      required: "Yes",
      defaultValue: "-",
      description: "Array of data objects for the table rows"
    },
    {
      name: "renderCell",
      type: "function",
      required: "No",
      defaultValue: "-",
      description: "Custom renderer for table cells"
    },
    {
      name: "containerClassName",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Custom class for the table container"
    },
    {
      name: "tableClassName",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Custom class for the table element"
    },
    {
      name: "headerClassName",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Custom class for the table header"
    },
    {
      name: "rowClassName",
      type: "string",
      required: "No",
      defaultValue: "''",
      description: "Custom class for table rows"
    },
    {
      name: "isHoverable",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether table rows should have hover effect"
    },
    {
      name: "isCompact",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether the table should use a compact layout"
    },
    {
      name: "showDividers",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether to show divider lines between rows"
    },
    {
      name: "isStriped",
      type: "boolean",
      required: "No",
      defaultValue: "false",
      description: "Whether to use zebra striping for rows"
    },
    {
      name: "isFullWidth",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the table should take full width of container"
    },
    {
      name: "emptyState",
      type: "React.ReactNode",
      required: "No",
      defaultValue: "Default UI",
      description: "Content to display when there are no rows"
    },
    {
      name: "isFixedLayout",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the table has a fixed layout"
    },
    {
      name: "isRounded",
      type: "boolean",
      required: "No",
      defaultValue: "true",
      description: "Whether the table has rounded corners"
    },
    {
      name: "onRowClick",
      type: "function",
      required: "No",
      defaultValue: "-",
      description: "Handler function called when a row is clicked"
    }
  ];

  // TableHeader properties
  const headerProps = [
    {
      name: "label",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Text to display in the header column"
    },
    {
      name: "key",
      type: "string",
      required: "Yes",
      defaultValue: "-",
      description: "Key to match with the row data object"
    },
    {
      name: "width",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Width of the column (e.g., \"100px\", \"20%\")"
    },
    {
      name: "className",
      type: "string",
      required: "No",
      defaultValue: "-",
      description: "Custom styling for this specific header cell"
    }
  ];

  // Sort props to show required ones first
  const sortedTableProps = [...tableProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  const sortedHeaderProps = [...headerProps].sort((a, b) => {
    if (a.required === "Yes" && b.required !== "Yes") return -1;
    if (a.required !== "Yes" && b.required === "Yes") return 1;
    return 0;
  });

  // Feature items with icons
  const features = [
    {
      icon: <Columns className="h-3 w-3 text-white" />,
      text: "Customizable header columns with support for width specification"
    },
    {
      icon: <Grid className="h-3 w-3 text-white" />,
      text: "Custom cell rendering for different data types"
    },
    {
      icon: <Settings className="h-3 w-3 text-white" />,
      text: "Multiple styling options: striped, hoverable, compact, rounded"
    },
    {
      icon: <MousePointerClick className="h-3 w-3 text-white" />,
      text: "Support for row click handlers"
    },
    {
      icon: <LayoutGrid className="h-3 w-3 text-white" />,
      text: "Configurable dividers and layout options"
    },
    {
      icon: <FileText className="h-3 w-3 text-white" />,
      text: "Custom empty state for tables with no data"
    },
    {
      icon: <ArrowUpDown className="h-3 w-3 text-white" />,
      text: "Fully responsive design"
    },
    {
      icon: <Shield className="h-3 w-3 text-white" />,
      text: "Type-safe with TypeScript"
    }
  ];

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
          Table Component
        </h1>
        <p className="text-gray-600 text-lg">
          A flexible and customizable table component for displaying structured data with various styling options.
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
            <Table
              headers={HEADERS}
              rows={ROWS}
            />
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
        <h2 className="text-2xl font-semibold mb-6">Custom Cell Rendering</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <Table
              headers={HEADERS}
              rows={ROWS}
              renderCell={renderCustomCell}
            />
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CUSTOM_RENDER_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CUSTOM_RENDER_CODE, "custom")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "custom" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Styling Options</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200 space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Striped, Hoverable, and Compact</h3>
              <Table
                headers={HEADERS}
                rows={ROWS}
                isStriped={true}
                isHoverable={true}
                isCompact={true}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Without Dividers</h3>
              <Table
                headers={HEADERS}
                rows={ROWS}
                showDividers={false}
              />
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{STYLES_AND_VARIANTS_CODE}</pre>
            <button
              onClick={() => copyToClipboard(STYLES_AND_VARIANTS_CODE, "styles")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "styles" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Row Click Handler</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] gap-2">
              <div>
                <Table
                  headers={HEADERS}
                  rows={ROWS}
                  isHoverable={true}
                  onRowClick={handleRowClick}
                />
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Selected Row Data</h3>
                {selectedRow ? (
                  <div className="space-y-2">
                    {Object.entries(selectedRow).map(([key, value]) => (
                      <div key={key} >
                        <span className="font-semibold">{key}:</span>{" "}
                        <span>{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Click on a row to see its data</p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 relative">
            <pre className="bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto p-4">{CLICK_HANDLER_CODE}</pre>
            <button
              onClick={() => copyToClipboard(CLICK_HANDLER_CODE, "click")}
              className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Copy code"
            >
              {copied === "click" ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Empty State</h2>
        <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="p-6">
            <Table
              headers={HEADERS}
              rows={[]}
              emptyState={
                <div className="p-8 text-center">
                  <p className="text-gray-500 mb-2">No data available</p>
                  <p className="text-sm text-gray-400">Try adjusting your filters or adding new data</p>
                </div>
              }
            />
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
            {sortedTableProps.map((prop, index) => (
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
        <h2 className="text-2xl font-semibold mb-6">TableHeader Properties</h2>
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white grid grid-cols-5">
            {["Property", "Type", "Required", "Default", "Description"].map((header, index) => (
              <div key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {header}
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200 bg-white">
            {sortedHeaderProps.map((prop, index) => (
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
    </div>
  );
} 