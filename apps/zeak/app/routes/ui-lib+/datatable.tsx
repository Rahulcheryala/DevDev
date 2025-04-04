import { useState } from "react";
import { DataTable } from "@zeak/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@zeak/react";
import { DataTableView } from "@zeak/datatable";
import { TbTable } from "react-icons/tb";

export default function DataTableDocumentation() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">DataTable Component</h1>
          <p className="text-muted-foreground mt-2">
            A powerful, feature-rich table implementation built on top of TanStack Table with sorting, filtering, pagination, and more.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <div className="bg-muted p-4 rounded-md">
            <code>import {"{"} DataTable {"}"} from '@zeak/datatable';</code>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Basic Usage</h2>
          <div className="bg-muted p-4 rounded-md overflow-x-auto">
            <pre>
              {`import { DataTable } from '@zeak/datatable';
import { columns } from './columns';

const MyTable = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    // ...more data
  ];

  return <DataTable columns={columns} data={data} />;
};`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Required</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>data</code></td>
                  <td className="py-3 px-4"><code>TData[]</code></td>
                  <td className="py-3 px-4">Yes</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Array of data objects to display in the table. Each object must have an <code>id</code> property.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>columns</code></td>
                  <td className="py-3 px-4"><code>ColumnDef&lt;TData&gt;[]</code></td>
                  <td className="py-3 px-4">Yes</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Array of column definitions for the table. See <a href="https://tanstack.com/table/latest/docs/guide/column-defs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TanStack Table Column Defs</a> for more details.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>addNewText</code></td>
                  <td className="py-3 px-4"><code>string</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Text to display on the "Add New" button.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>onClickNewBtn</code></td>
                  <td className="py-3 px-4"><code>() =&gt; void</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Function to call when the "Add New" button is clicked.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>topTitle</code></td>
                  <td className="py-3 px-4"><code>string</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Title to display at the top of the table.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>addNewRowForm</code></td>
                  <td className="py-3 px-4"><code>React.ReactNode</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Form component to display when adding a new row. This can be any React component that will be rendered when <code>showAddNewRowForm</code> is true.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>showAddNewRowForm</code></td>
                  <td className="py-3 px-4"><code>boolean</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4"><code>false</code></td>
                  <td className="py-3 px-4">Whether to show the add new row form. Controls the visibility of the <code>addNewRowForm</code> component.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>toolBarVariant</code></td>
                  <td className="py-3 px-4"><code>"side" | "main"</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4"><code>"main"</code></td>
                  <td className="py-3 px-4">Variant of the toolbar to display.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>dataTableView</code></td>
                  <td className="py-3 px-4"><code>React.ReactNode</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Component to display different table views. Use the <code>DataTableView</code> component to provide switchable views for the table.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>selectedView</code></td>
                  <td className="py-3 px-4"><code>string</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">The currently selected view value. Used to control which view is active.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>listViews</code></td>
                  <td className="py-3 px-4"><code>Array&lt;{"{"}name: string, component: ReactNode{"}"}&gt;</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Array of view components to display based on the selected view name.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Column Definition</h2>
          <p>
            The <code>columns</code> prop accepts an array of column definitions that follow the TanStack Table <code>ColumnDef</code> interface. Here's an example:
          </p>
          <div className="bg-muted p-4 rounded-md overflow-x-auto">
            <pre>
              {`import { ColumnDef } from "@tanstack/react-table";

type Person = {
  id: string | number;
  name: string;
  age: number;
  email: string;
  isActive: boolean;
};

const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "text",
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: "number",
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: (info) => (info.getValue() ? "Active" : "Inactive"),
    meta: {
      filterVariant: "boolean",
    },
  },
];`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Column Meta Options</h2>
          <p>
            You can add additional metadata to columns using the <code>meta</code> property:
          </p>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-md border">
                <div className="font-semibold mb-2">filterVariant</div>
                <div className="text-sm text-muted-foreground mb-1"><code>"text" | "number" | "range" | "select" | "boolean" | "date" | "enum"</code></div>
                <div className="text-sm">Type of filter to use for this column.</div>
              </div>

              <div className="bg-card p-4 rounded-md border">
                <div className="font-semibold mb-2">name</div>
                <div className="text-sm text-muted-foreground mb-1"><code>string</code></div>
                <div className="text-sm">Display name for the column.</div>
              </div>

              <div className="bg-card p-4 rounded-md border">
                <div className="font-semibold mb-2">dataType</div>
                <div className="text-sm text-muted-foreground mb-1"><code>string</code></div>
                <div className="text-sm">Type of data in the column.</div>
              </div>

              <div className="bg-card p-4 rounded-md border">
                <div className="font-semibold mb-2">isEditable</div>
                <div className="text-sm text-muted-foreground mb-1"><code>boolean</code></div>
                <div className="text-sm">Whether the column is editable.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">DataTableView Component</h2>
          <p>
            The <code>DataTableView</code> component allows users to switch between different predefined views of the table.
          </p>
          <div className="bg-muted p-4 rounded-md overflow-x-auto">
            <pre>
              {`import { DataTableView } from '@zeak/datatable';
import { TbTable } from "react-icons/tb";

<DataTableView 
  options={[
    {
      value: "default",
      label: "Default View",
      icon: <TbTable className="h-5 w-5" />
    },
    {
      value: "admin-view",
      label: "Admin View",
      icon: <TbTable className="h-5 w-5" />
    }
  ]} 
  defaultValue="default" 
  width="w-[200px]" 
  onChange={(value) => setSelectedView(value)}
/>`}
            </pre>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Prop</th>
                  <th className="text-left py-3 px-4 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Required</th>
                  <th className="text-left py-3 px-4 font-semibold">Default</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>options</code></td>
                  <td className="py-3 px-4"><code>Array&lt;{"{"}value: string, label: string, icon?: ReactNode{"}"}&gt;</code></td>
                  <td className="py-3 px-4">Yes</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Array of view options with value, label, and optional icon.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>defaultValue</code></td>
                  <td className="py-3 px-4"><code>string</code></td>
                  <td className="py-3 px-4">Yes</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">The default selected view value.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>width</code></td>
                  <td className="py-3 px-4"><code>string</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4"><code>"w-full"</code></td>
                  <td className="py-3 px-4">CSS width class for the component.</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4"><code>onChange</code></td>
                  <td className="py-3 px-4"><code>(value: string) {"=>"} void</code></td>
                  <td className="py-3 px-4">No</td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">Callback function that is called when the selected view changes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
          <ul className="space-y-2 list-disc pl-6">
            <li><strong>Sorting:</strong> Click on column headers to sort data.</li>
            <li><strong>Filtering:</strong> Filter data by column values.</li>
            <li><strong>Pagination:</strong> Navigate through pages of data.</li>
            <li><strong>Row Selection:</strong> Select rows using checkboxes.</li>
            <li><strong>Column Resizing:</strong> Resize columns by dragging the column edges.</li>
            <li><strong>Column Reordering:</strong> Drag and drop columns to reorder them.</li>
            <li><strong>Row Reordering:</strong> Drag and drop rows to reorder them.</li>
            <li><strong>Column Visibility:</strong> Show/hide columns.</li>
            <li><strong>Column Pinning:</strong> Pin columns to the left or right.</li>
            <li><strong>Row Expansion:</strong> Expand rows to show additional details.</li>
            <li><strong>Compact Mode:</strong> Toggle between compact and normal view.</li>
            <li><strong>Multiple Views:</strong> Switch between different table views using the DataTableView component.</li>
            <li><strong>Custom View Components:</strong> Display different components based on the selected view.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Live Example</h2>
          <LiveExample />
        </section>
      </div>
    </div>
  );
}

// Example component with live DataTable
function LiveExample() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedView, setSelectedView] = useState("default");
  const [showSideVariantAddForm, setShowSideVariantAddForm] = useState(false);

  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
    joinDate: string;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      meta: {
        filterVariant: "text",
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: {
        filterVariant: "text",
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      meta: {
        filterVariant: "select",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (info.getValue() ? "Active" : "Inactive"),
      meta: {
        filterVariant: "boolean",
      },
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      meta: {
        filterVariant: "date",
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline" className="text-red-500">Delete</Button>
        </div>
      ),
    },
  ];

  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: true,
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: true,
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: false,
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "User",
      status: true,
      joinDate: "2023-04-05",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Viewer",
      status: false,
      joinDate: "2023-05-12",
    },
  ];

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleSideVariantAddNew = () => {
    setShowSideVariantAddForm(true);
  };

  const AddNewForm = () => (
    <tr>
      <td colSpan={6}>
        <div className="p-4 bg-muted space-y-4">
          <h3 className="font-semibold">Add New User</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full p-2 border rounded">
                <option>Admin</option>
                <option>User</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full p-2 border rounded">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button>Save User</Button>
          </div>
        </div>
      </td>
    </tr>
  );

  const SideVariantAddNewForm = () => (
    <tr>
      <td colSpan={6}>
        <div className="p-4 bg-muted space-y-4">
          <h3 className="font-semibold">Add New User (Side Variant)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select className="w-full p-2 border rounded">
                <option>Admin</option>
                <option>User</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full p-2 border rounded">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowSideVariantAddForm(false)}>Cancel</Button>
            <Button>Save User</Button>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-card">
          <h3 className="text-xl font-semibold mb-4">User Management Example (Main Toolbar)</h3>
          <DataTable
            columns={columns}
            dataTableView={<DataTableView options={[
              {
                value: "default",
                label: "Default View",
                icon: <TbTable className="h-5 w-5" />
              },
              {
                value: "admin-view",
                label: "Admin View",
                icon: <TbTable className="h-5 w-5" />
              }

            ]} defaultValue="default" width="w-[200px]" onChange={(value) => setSelectedView(value)} />}
            data={users}
            addNewText="Add User"
            onClickNewBtn={handleAddNew}
            topTitle="User Management"
            addNewRowForm={<AddNewForm />}
            showAddNewRowForm={showAddForm}
            toolBarVariant="main"
            selectedView={selectedView}
            listViews={[
              {
                name: "admin-view",
                component: <div className="p-4 bg-muted">Admin View Content</div>
              }
            ]}
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-card">
          <h3 className="text-xl font-semibold mb-4">User Management Example (Side Toolbar)</h3>
          <DataTable
            columns={columns}
            data={users}
            addNewText="Add User"
            onClickNewBtn={handleSideVariantAddNew}
            topTitle="User Management"
            addNewRowForm={<SideVariantAddNewForm />}
            showAddNewRowForm={showSideVariantAddForm}
            toolBarVariant="side"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-card">
          <h4 className="font-semibold mb-2">Code Example:</h4>
          <div className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            <pre>
              {`import React, { useState } from "react";
import { DataTable, DataTableView } from "@zeak/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@zeak/react";
import { TbTable } from "react-icons/tb";

const UsersTable = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedView, setSelectedView] = useState("default");
  
  type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: boolean;
    joinDate: string;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      meta: { filterVariant: "text" },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: { filterVariant: "text" },
    },
    {
      accessorKey: "role",
      header: "Role",
      meta: { filterVariant: "select" },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (info.getValue() ? "Active" : "Inactive"),
      meta: { filterVariant: "boolean" },
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      meta: { filterVariant: "date" },
    },
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
        </div>
      ),
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: true,
      joinDate: "2023-01-15",
    },
    // ... more users
  ];

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const AddNewForm = () => (
    <tr>
      <td colSpan={6}>
        <div className="p-4 bg-muted">
          <h3 className="font-semibold">Add New User</h3>
          {/* Form fields would go here */}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button>Save User</Button>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <DataTable
      columns={columns}
      data={users}
      dataTableView={<DataTableView 
        options={[
          {
            value: "default",
            label: "Default View",
            icon: <TbTable className="h-5 w-5" />
          },
          {
            value: "admin-view",
            label: "Admin View",
            icon: <TbTable className="h-5 w-5" />
          }
        ]} 
        defaultValue="default" 
        width="w-[200px]" 
        onChange={(value) => setSelectedView(value)} 
      />}
      addNewText="Add User"
      onClickNewBtn={handleAddNew}
      topTitle="User Management"
      addNewRowForm={<AddNewForm />}
      showAddNewRowForm={showAddForm}
      toolBarVariant="main"
      selectedView={selectedView}
      listViews={[
        {
          name: "admin-view",
          component: <div className="p-4 bg-gray-50">Admin View Content</div>
        }
      ]}
    />
  );
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
