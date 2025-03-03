import { MultiSelectInput } from "~/components/Globals/Input";
import type { Option } from "~/components/Common/types/multi-select-input-types";

const MultiSelectDemo = () => {
    const companies: Option[] = [
        { id: '1', value: '1', label: 'Pfizer USA', isPrimary: true },
        { id: '2', value: '2', label: 'Pfizer India' },
        { id: '3', value: '3', label: 'Pfizer Argentina' },
        { id: '4', value: '4', label: 'Pfizer Canada' },
        { id: '5', value: '5', label: 'Pfizer Brazil' },
        { id: '6', value: '6', label: 'Pfizer Mexico' },
        { id: '7', value: '7', label: 'Pfizer Chile' },
    ];

    const handleChange = (selected: Option[]) => {
        console.log('Selected:', selected);
    };

    return (
        <MultiSelectInput
            options={companies}
            onChange={handleChange}
        />
    );
}

export default MultiSelectDemo;