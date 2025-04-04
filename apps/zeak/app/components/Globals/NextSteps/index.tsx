import { Building2, Users } from 'lucide-react'
import { Button } from '@zeak/react'

interface NextStepsProps {
    title?: string
    description?: string
    onAddDepartments?: () => void
    onAddUsers?: () => void
    className?: string
}

export function NextSteps({
    title = "Next Steps",
    description = "The company has been successfully created. You can close the record or use the next steps shown on right to add users and manage your department details.",
    onAddDepartments,
    onAddUsers,
    className
}: NextStepsProps) {
    return (
        <div className="w-full bg-[#E5F9F4] rounded-lg p-6">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="text-[#101828] text-lg font-medium">
                        {title}
                    </h3>
                    <p className="text-[#475467] text-sm max-w-[600px]">
                        {description}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={onAddDepartments}
                        variant="outline"
                        className="bg-white hover:bg-white/90 text-[#475467] border-[#E4E7EC] gap-2"
                    >
                        <Building2 className="w-4 h-4" />
                        Add Departments
                    </Button>
                    <Button
                        onClick={onAddUsers}
                        variant="outline"
                        className="bg-white hover:bg-white/90 text-[#475467] border-[#E4E7EC] gap-2"
                    >
                        <Users className="w-4 h-4" />
                        Add Users
                    </Button>
                </div>
            </div>
        </div>
    )
}