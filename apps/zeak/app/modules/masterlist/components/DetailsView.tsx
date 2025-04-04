import { MoreHorizontal } from "lucide-react"
import { Button, Badge } from "@zeak/react"
import { Zlogo } from "@zeak/icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@zeak/react"
import { useMasterlistDetails } from "../hooks"
import { cn } from "@zeak/react"
import { useParams } from "@remix-run/react"
import { Edit3 } from "lucide-react"
import { Input, ui, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeak/react"
import { useMasterlistStore } from "../hooks"
import { useState } from "react"
import { useCompanies } from "../hooks/use-companies"
import { format } from "date-fns"
import { UserCircle } from "lucide-react"

type FormValues = {
    name: string;
    purpose: string;
    code: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
    lastUpdatedBy?: string;
}

const DetailsView = ({ userId }: { userId?: string }) => {
    const { isEditing, setIsEditing, setEditMasterlist, editMasterlist } = useMasterlistStore()
    const { id } = useParams()

    if (!id) {
        return <div>No id</div>
    }
    const { data, isLoading, isError } = useMasterlistDetails(id)
    const { data: companies, isLoading: companiesLoading, isError: companiesError } = useCompanies()
    const [formData, setFormData] = useState<FormValues>({
        name: data?.name,
        purpose: data?.purpose,
        code: data?.code,
        isActive: data?.isActive,
        startDate: data?.startDate,
        endDate: data?.endDate,
        lastUpdatedBy: userId
    })

    const handleInputChange = (field: keyof FormValues, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        setEditMasterlist({
            ...editMasterlist,
            lastUpdatedBy: userId,  
            [field]: value
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error...</div>
    }



    return (
        <div className="rounded-zeak mt-4">
            <div className="flex">
                <div className="p-6 bg-[rgba(255,_255,_255,_0.50)] w-[300px] fhd:w-[400px] rounded-l-zeak">
                    <h2 className="text-xl font-semibold text-gray-700">General</h2>
                </div>

                <div className="bg-white w-full px-10 py-6 space-y-8 relative">
                    {!isEditing && (
                        <div className="absolute top-6 right-10 flex items-center gap-2">
                            <Button variant="ghost" onClick={() => {
                                setIsEditing(true)
                            }}>
                                <Edit3 className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">List Name</label>
                            {isEditing ? (
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    defaultValue={data?.name}
                                    className="font-medium capitalize"
                                />
                            ) : (
                                <div className="font-medium capitalize">{data?.name}</div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">List Code</label>
                            {isEditing ? (
                                <Input
                                    value={formData.code}
                                    onChange={(e) => handleInputChange('code', e.target.value)}
                                    defaultValue={data?.code}
                                    className="font-medium capitalize"
                                />
                            ) : (
                                <div className="font-medium capitalize">{data?.code}</div>
                            )}
                        </div>



                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Purpose</label>
                            {isEditing ? (
                                <Input
                                    variant="zeak"
                                    value={formData.purpose}
                                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                                    defaultValue={data?.purpose}
                                    className="font-medium capitalize"
                                />
                            ) : (
                                <div className="font-medium capitalize">{data?.purpose}</div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Companies</label>
                            <div className="flex items-center gap-2">
                                {companiesLoading ? (
                                    <div className="text-gray-500">Loading companies...</div>
                                ) : companiesError ? (
                                    <div className="text-red-500">Error loading companies</div>
                                ) : data?.companies.length === 0 ? (
                                    <div className="text-gray-500">No companies assigned</div>
                                ) : (
                                    <div>
                                        {companies?.companies.filter((company: any) => data?.companies.includes(company.id)).map((company: any) => (
                                            <div key={company.id}>
                                                {company.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Status</label>
                            {isEditing ? (
                                <Select
                                    defaultValue={data?.isActive ? "active" : "inactive"}
                                    onValueChange={(value) => handleInputChange('isActive', value === 'active')}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-[10px] h-[10px] border-2 ring-2 border-white rounded-[50%]", data?.isActive ? "bg-green-500 ring-green-500" : "bg-gray-500 ring-gray-500")}></div>
                                    <span className="font-medium capitalize">{data?.isActive ? "Active" : "Inactive"}</span>
                                </div>
                            )}
                        </div>


                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">List Type</label>
                            <div className="flex items-center gap-2">
                                {data?.type === "system" ? <Zlogo /> : <UserCircle className="w-5 h-5" />}
                                <span className="font-medium capitalize">{data?.type}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">Start Date</label>
                            {isEditing ? (
                                <ui.Calendar
                                    onChange={(date) => handleInputChange('startDate', date)}
                                    value={formData.startDate}
                                />
                            ) : (
                                <div className="font-medium text-gray-500">
                                    {data?.startDate ? format(data?.startDate, "MM/dd/yyyy") : "--/--/----"}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-500">End Date</label>
                            {isEditing ? (
                                <ui.Calendar
                                    onChange={(date) => handleInputChange('endDate', date)}
                                    value={formData.endDate}
                                />
                            ) : (
                                <div className="font-medium text-gray-500">{data?.endDate ? format(data?.endDate, "MM/dd/yyyy") : "--/--/----"}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsView
