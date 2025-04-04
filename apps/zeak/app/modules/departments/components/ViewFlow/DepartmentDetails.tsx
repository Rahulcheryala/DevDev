import { format } from 'date-fns'
import { useDepartmentContext } from '../../context';
import { motion } from 'framer-motion'
import { DetailsSection, StatusPill } from '../../../../components/Layout/Screen';

function DepartmentDetails() {
    const { state: { selectedDepartment } } = useDepartmentContext();

    if (!selectedDepartment) return null;

    const formatDate = (date: string | null | undefined) => {
        if (!date) return '-';
        return format(new Date(date), 'MM/dd/yyyy, hh:mm a zzz');
    }

    const formatEffectiveDate = (date: string | null | undefined) => {
        if (!date) return format(new Date(), 'MM/dd/yyyy');
        return format(new Date(date), 'MM/dd/yyyy');
    }

    return <motion.div
        initial={{ x: '-10%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}>
        <div className='flex flex-col gap-4'>
            <DetailsSection
                title='General'
                items={[
                    { title: 'Department Name', value: selectedDepartment.name },
                    { title: 'Department Code', value: selectedDepartment.departmentCode },
                    { title: 'Description', value: selectedDepartment.description || '-' },
                    { title: 'Status', value: <StatusPill status={selectedDepartment.status} /> },
                    { title: 'Supervisor Name', value: selectedDepartment.supervisorUser ? selectedDepartment.supervisorUser?.firstName || '' + ' ' + selectedDepartment.supervisorUser?.lastName || '' : '-' },
                    { title: 'Supervisor Email', value: selectedDepartment.supervisorEmail || '-' },
                ]}
                className='bg-[#D5E0ED]'
            />
            <DetailsSection title='Effectivity' items={[
                { title: 'Start Date', value: formatEffectiveDate(selectedDepartment.effectiveStartDate) },
                { title: 'End Date', value: formatEffectiveDate(selectedDepartment.effectiveEndDate) },
            ]}
                className='bg-[#f9fafe]'
            />
            <DetailsSection title='Audit'
                items={[
                    { title: 'Created By', value: selectedDepartment.createdByUser ? selectedDepartment.createdByUser?.firstName || '' + ' ' + selectedDepartment.createdByUser?.lastName || '' : '-' },
                    { title: 'Created Date', value: formatDate(selectedDepartment.createdAt) },
                    { title: 'Updated By', value: selectedDepartment.lastUpdatedByUser ? selectedDepartment.lastUpdatedByUser?.firstName || '' + ' ' + selectedDepartment.lastUpdatedByUser?.lastName || '' : '-' },
                    { title: 'Updated Date', value: formatDate(selectedDepartment.updatedAt) },
                ]}
                className='bg-[#D5E0ED]'
            />
        </div>
    </motion.div>
}

export default DepartmentDetails
