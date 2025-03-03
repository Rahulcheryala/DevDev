import { MenuIcons } from '~/components/Common/icons/menu-icons'
import type { MenuItem } from '~/components/Globals/ActionMenu';
import ActionMenu from '~/components/Globals/ActionMenu'

export default function ActionMenuDemo() {
    const menuItems: MenuItem[] = [
        {
            id: 'Homeboard',
            label: 'Homeboard',
            shortLabel: 'H',
            icon: <MenuIcons.Homeboard />,
            hoverIcon: <MenuIcons.HomeboardHover />,
            subItems: [
                { label: 'Overview', href: '#' },
                { label: 'Analytics', href: '#' },
                { label: 'Reports', href: '#' }
            ]
        },
        {
            id: 'Tasks',
            label: 'Tasks',
            shortLabel: 'T',
            icon: <MenuIcons.Tasks />,
            hoverIcon: <MenuIcons.TasksHover />,
            subItems: [
                { label: 'All Tasks', href: '#' },
                { label: 'Assigned to Me', href: '#' },
                { label: 'Created by Me', href: '#' }
            ]
        },
        {
            id: 'Favorites',
            label: 'Favorites',
            shortLabel: 'F',
            icon: <MenuIcons.Favorites />,
            hoverIcon: <MenuIcons.FavoritesHover />
        },
        {
            id: 'Recent',
            label: 'Recent',
            shortLabel: 'R',
            icon: <MenuIcons.Recent />,
            hoverIcon: <MenuIcons.RecentHover />
        },
        {
            id: 'Automations',
            label: 'Automations',
            shortLabel: 'A',
            icon: <MenuIcons.Automations />,
            hoverIcon: <MenuIcons.AutomationsHover />
        },
        {
            id: 'LabelsAndForms',
            label: 'Labels & Forms',
            shortLabel: 'LF',
            icon: <MenuIcons.LabelsAndForms />,
            hoverIcon: <MenuIcons.LabelsAndFormsHover />
        },
        {
            id: 'Settings',
            label: 'Settings',
            shortLabel: 'S',
            icon: <MenuIcons.Settings />,
            hoverIcon: <MenuIcons.SettingsHover />
        }
    ]

    const helpContent = {
        title: 'Need help?',
        slides: [
            "Our team is just a click away, ready to ensure you get the best possible experience.",
            "Get instant support from our dedicated team whenever you need it.",
            "We're here to help you succeed with our platform."
        ]
    }

    return <ActionMenu
        items={menuItems}
        helpContent={helpContent}
        onActiveChange={(id) => console.log('Active item changed:', id)}
    />
}