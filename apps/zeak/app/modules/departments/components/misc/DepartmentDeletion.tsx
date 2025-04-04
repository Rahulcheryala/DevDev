import { useDepartmentContext } from '../../context';
import { DeletionModal } from '../../../../components/Layout/Screen';

interface DepartmentDeletionProps {
    isOpen: boolean;
    onClose: () => void;
}

function DepartmentDeletion({ isOpen, onClose }: DepartmentDeletionProps) {
    const { state: { selectedDepartment } } = useDepartmentContext();
    const blockers = [
        {
            title: 'Assigned Users',
            count: selectedDepartment?.noOfUsers || 0,
            link: `/x/access-settings/departments/${selectedDepartment?.id}?t=users`
        }
    ]

    return <DeletionModal isOpen={isOpen} onClose={onClose} blockers={blockers} />
}
export default DepartmentDeletion;
