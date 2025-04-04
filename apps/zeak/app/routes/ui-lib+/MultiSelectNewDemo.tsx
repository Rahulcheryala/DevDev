import { useState } from "react";
import { MultiSelectNew, type Item } from "@zeak/ui";

export default function MultiSelectNewDocumentation() {
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [supervisor, setSupervisor] = useState<Item | null>(null);

    // Demo data
    const demoItems: Item[] = Array.from({ length: 10 }, (_, i) => ({
        id: `item-${i}`,
        title: `Ryan ${String.fromCharCode(65 + i)}azos`,
        subtitle: `ryanpazos${i}@pfizerus.com`,
        avatar: 'https://github.com/shadcn.png'
    }));

    return (
        <div className="container mx-auto p-6">
            <header className="space-y-3 mb-12 border-l-4 border-indigo-600 pl-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">MultiSelectNew Component</h1>
                <p className="text-gray-600 text-lg">
                    An enhanced multi-selection component with supervisor selection capability and avatar support.
                </p>
            </header>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Installation</h2>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 font-mono text-sm">
                    <code>import {"{"} MultiSelectNew, type Item {"}"} from '@zeak/ui';</code>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Basic Usage</h2>
                <div className="flex flex-col gap-6 p-6 bg-white rounded-lg border border-gray-200">
                    <div>
                        <MultiSelectNew
                            items={demoItems}
                            selectedItems={selectedItems}
                            onItemSelect={setSelectedItems}
                            supervisor={demoItems[0]}
                            onSupervisorChange={setSupervisor}
                            title="Select one or more users to add to the department"
                            selectedItemsTitle="Users Added"
                            supervisorTitle="Select a Supervisor"
                            supervisorDescription="A Supervisor is also a member of the department, by default."
                            showNewItemButton={true}
                            onNewItemClick={() => console.log('New user clicked')}
                            newItemButtonText="NEW USER"
                        />
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800">
                            Selected Items: {selectedItems.length} <br />
                            Supervisor: {supervisor ? supervisor.title : 'None'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Select multiple items from a list</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Designate a supervisor/primary item</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Rich item display with avatars, titles, and subtitles</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Option to add new items via button</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Searchable item list</span>
                    </li>
                    <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                        <span>Customizable section titles and descriptions</span>
                    </li>
                </ul>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Props</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 border-b pb-3 pt-3 px-4 font-medium bg-gray-50 text-gray-700">
                        <div>Prop</div>
                        <div>Type</div>
                        <div>Required</div>
                        <div>Default</div>
                        <div>Description</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">items</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Item[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Array of selectable items</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">selectedItems</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Item[]</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Currently selected items</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onItemSelect</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(items: Item[]) {'=>'} void</code></div>
                        <div className="text-green-600 font-medium">Yes</div>
                        <div>-</div>
                        <div>Handler for item selection changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">supervisor</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">Item | null</code></div>
                        <div>No</div>
                        <div>null</div>
                        <div>The designated supervisor/primary item</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onSupervisorChange</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">(item: Item | null) {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Handler for supervisor selection changes</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">title</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Select items"</div>
                        <div>Main component title</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">selectedItemsTitle</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Selected items"</div>
                        <div>Title for the selected items section</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">supervisorTitle</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Select supervisor"</div>
                        <div>Title for the supervisor selection section</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">supervisorDescription</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Description text for the supervisor selection</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">showNewItemButton</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">boolean</code></div>
                        <div>No</div>
                        <div>false</div>
                        <div>Whether to show the "Add New" button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">onNewItemClick</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">() {'=>'} void</code></div>
                        <div>No</div>
                        <div>-</div>
                        <div>Handler for "Add New" button click</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">newItemButtonText</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>"Add New"</div>
                        <div>Text for the "Add New" button</div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 py-3 px-4 border-b hover:bg-gray-50 transition-colors">
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-indigo-600">className</code></div>
                        <div><code className="bg-gray-100 px-2 py-1 rounded text-purple-600">string</code></div>
                        <div>No</div>
                        <div>""</div>
                        <div>Additional CSS classes</div>
                    </div>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Item Type</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`type Item = {
  id: string;
  title: string;
  subtitle?: string;
  avatar?: string;
};`}</pre>
                </div>
            </section>

            <section className="space-y-5 mb-12 bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 before:content-[''] before:w-2 before:h-8 before:bg-indigo-600 before:rounded-md">Implementation Example</h2>
                <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm shadow-md">
                    <pre>{`import { useState, useEffect } from "react";
import { MultiSelectNew, type Item } from "@zeak/ui";
import { Button } from "@zeak/react";

const DepartmentUserSelector = () => {
  const [users, setUsers] = useState<Item[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Item[]>([]);
  const [supervisor, setSupervisor] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate loading user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUsers: Item[] = [
          {
            id: "user-1",
            title: "Jane Cooper",
            subtitle: "jane.cooper@example.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "user-2",
            title: "Michael Foster",
            subtitle: "michael.foster@example.com",
            avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "user-3",
            title: "Dries Vincent",
            subtitle: "dries.vincent@example.com",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "user-4",
            title: "Lindsay Walton",
            subtitle: "lindsay.walton@example.com",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            id: "user-5",
            title: "Courtney Henry",
            subtitle: "courtney.henry@example.com",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    // In a real app, this would open a modal or redirect to a form
    alert("This would open a form to create a new user");
  };

  const handleSave = () => {
    // In a real app, this would save the selection to the backend
    console.log("Selected users:", selectedUsers);
    console.log("Supervisor:", supervisor);
    alert(\`Saved department with \${selectedUsers.length} users and supervisor \${supervisor?.title || "none"}\`);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Department Setup</h2>
      
      <MultiSelectNew
        items={users}
        selectedItems={selectedUsers}
        onItemSelect={setSelectedUsers}
        supervisor={supervisor}
        onSupervisorChange={setSupervisor}
        title="Select users to add to this department"
        selectedItemsTitle="Department Members"
        supervisorTitle="Department Supervisor"
        supervisorDescription="The supervisor will have management privileges for this department."
        showNewItemButton={true}
        onNewItemClick={handleCreateUser}
        newItemButtonText="CREATE USER"
      />
      
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={selectedUsers.length === 0}>
          Save Department
        </Button>
      </div>
    </div>
  );
};`}</pre>
                </div>
            </section>
        </div>
    );
} 