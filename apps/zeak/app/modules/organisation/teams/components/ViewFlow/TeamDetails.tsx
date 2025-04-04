import { format } from 'date-fns'
import { useTeamContext } from '../../context';
import { motion } from 'framer-motion'
import { DetailsSection, StatusPill } from '../../../../../components/Layout/Screen';
import { Globe, Lock } from 'lucide-react';

const PrivacyPill = ({ privacy }: { privacy: string }) => {
    return <div className='flex items-center gap-2'>
        {privacy === 'Public' ? <Globe className='w-4 h-4' /> : <Lock className='w-4 h-4' />}
        <span>{privacy}</span>
    </div>
}

function TeamDetails() {
    const { state: { selectedTeam } } = useTeamContext();

    if (!selectedTeam) return null;

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
                    { title: 'Team Name', value: selectedTeam.name },
                    { title: 'Team Code', value: selectedTeam.teamCode },
                    { title: 'Description', value: selectedTeam.description || '-' },
                    { title: 'Parent Team', value: selectedTeam.parentTeam?.name || '-' },
                    { title: 'Status', value: <StatusPill status={selectedTeam.status} /> },
                    { title: 'Privacy', value: <PrivacyPill privacy={selectedTeam.visibility} /> },
                    { title: 'Leader Name', value: selectedTeam.teamLeader ? selectedTeam.teamLeader?.firstName || '' + ' ' + selectedTeam.teamLeader?.lastName || '' : '-' },
                    { title: 'Leader Email', value: selectedTeam.teamLeader?.email || '-' },
                ]}
                className='bg-[#f9fafe]'
            />
            <DetailsSection title='Effectivity' items={[
                { title: 'Start Date', value: formatEffectiveDate(selectedTeam.startDate) },
                { title: 'End Date', value: formatEffectiveDate(selectedTeam.endDate) },
            ]}
                className='bg-[#f9fafe]'
            />
            <DetailsSection title='Audit'
                items={[
                    { title: 'Created By', value: selectedTeam.createdByUser ? selectedTeam.createdByUser?.firstName || '' + ' ' + selectedTeam.createdByUser?.lastName || '' : '-' },
                    { title: 'Created Date', value: formatDate(selectedTeam.createdAt) },
                    { title: 'Updated By', value: selectedTeam.lastUpdatedByUser ? selectedTeam.lastUpdatedByUser?.firstName || '' + ' ' + selectedTeam.lastUpdatedByUser?.lastName || '' : '-' },
                    { title: 'Updated Date', value: formatDate(selectedTeam.updatedAt) },
                ]}
                className='bg-[#D5E0ED]'
            />
        </div>
    </motion.div>
}

export default TeamDetails
