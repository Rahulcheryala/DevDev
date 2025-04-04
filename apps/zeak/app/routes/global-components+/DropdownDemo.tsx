import { AddIcon, DropDownEditIcon } from "@zeak/icons"
import Dropdown from "~/components/Globals/Dropdown"

const dropdownItems = [
    {
        icon: DropDownEditIcon,
        label: 'Edit',
        onClick: () => alert('Edit clicked')
    },
    {
        icon: DropDownEditIcon,
        label: 'Duplicate',
        onClick: () => alert('Duplicate clicked')
    },
    {
        icon: DropDownEditIcon,
        label: 'View',
        onClick: () => alert('View clicked')
    },
    {
        icon: DropDownEditIcon,
        label: 'Disable',
        onClick: () => alert('Disable clicked')
    },
    {
        icon: AddIcon,
        label: 'NEW',
        onClick: () => alert('New clicked'),
        variant: 'primary' as const
    }
]

const DropdownDemo = () => {
    return (
        <Dropdown items={dropdownItems} />
    )
}

export default DropdownDemo;


