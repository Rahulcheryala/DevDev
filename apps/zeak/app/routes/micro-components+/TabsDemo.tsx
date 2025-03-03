import { FileText, Share, Star } from "lucide-react";
import { TabsComponent } from "@zeak/react";

export default function TabsDemo() {
    const tabItems = [
        { label: 'All', value: 'all', icon: FileText },
        { label: 'Text', value: 'text', icon: FileText },
        { label: 'Shared', value: 'shared', icon: Share },
        { label: 'Favorites', value: 'favorites', icon: Star },
        { label: 'Disabled', value: 'disabled', disabled: true },
        { label: 'Disabled', value: 'disabled2', disabled: true },
        { label: 'Disabled', value: 'disabled3', disabled: true },
    ]

    const underlineTabItems = [
        { label: 'Text', value: 'text' },
        { label: 'Text', value: 'text2' },
        { label: 'Text', value: 'text3' },
        { label: 'Text', value: 'text4' },
        { label: 'Text', value: 'text5' },
        { label: 'Text', value: 'text6' },
        { label: 'Text', value: 'text7' },
        { label: 'Text', value: 'text8' },
        { label: 'Text', value: 'text9' },
        { label: 'Text', value: 'text10' },
    ]

    return <div className="bg-white rounded-xl p-6 flex flex-col gap-16 w-full">
        <div>
            <h3 className="text-lg font-medium mb-4">Default Variant</h3>
            <TabsComponent variant="default" items={tabItems} />
        </div>

        <div>
            <h3 className="text-lg font-medium mb-4">Alphabet Variant</h3>
            <TabsComponent variant="alphabet" items={[]} />
        </div>

        <div>
            <h3 className="text-lg font-medium mb-4">Underline Variant</h3>
            <TabsComponent variant="underline" items={underlineTabItems} />
        </div>
    </div>
}   