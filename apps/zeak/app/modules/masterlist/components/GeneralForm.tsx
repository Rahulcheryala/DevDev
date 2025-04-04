import { Label } from "@zeak/react"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button, ui, Popover, PopoverContent, PopoverTrigger } from "@zeak/react"
import NextButton from "./NextButton"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createMasterlistSchema, CreateMasterlistSchema } from "../schema"
import { useMasterlistStore } from "../hooks/use-masterlist-store"
import { useCreateMasterlist } from "../hooks"


import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Company } from "~/modules/settings/types"

interface GeneralFormProps {
    onNext: () => void;
    userId: string;
    companies: any;
    onCancel: () => void;
}

export default function GeneralForm({ onNext, userId, companies, onCancel }: GeneralFormProps) {
    const { mutate: createMasterlist, isPending } = useCreateMasterlist(userId)
    const { setActiveStep } = useMasterlistStore()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedCompanies, setSelectedCompanies] = useState<any[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null)

    const { register, handleSubmit, formState: { errors }, control } = useForm<CreateMasterlistSchema>({
        resolver: zodResolver(createMasterlistSchema),
        defaultValues: {
            isActive: true,
            name: "",
            code: "",
            purpose: "",
            startDate: new Date(),
            endDate: new Date(),

        }
    })

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

    const addCompany = (company: Company) => {
        if (!selectedCompanies.find((c) => c.id === company.id)) {
            setSelectedCompanies([...selectedCompanies, company]);
        }
    };


    const removeCompany = (company: any) => {
        setSelectedCompanies(selectedCompanies.filter((c) => c.id !== company.id))
    }
    const onSubmit = async (data: CreateMasterlistSchema) => {
        createMasterlist({
            ...data,
            companies: selectedCompanies.map((c) => c.id)
        })
    }


    return (
        <form className="space-y-6 relative h-full pb-20" >

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="listName">
                        List Name <span className="text-red-500">*</span>
                    </Label>
                    <Input className="rounded-zeak bg-[#f7f7f7] border-none" {...register("name")} id="name" required />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="code">
                        Code <span className="text-red-500">*</span>
                    </Label>
                    <Input className="rounded-zeak bg-[#f7f7f7] border-none" {...register("code")} id="code" required />
                    {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input {...register("purpose")} id="purpose" className="rounded-zeak bg-[#f7f7f7] border-none" placeholder="Purpose" />
                    {errors.purpose && <p className="text-red-500 text-sm">{errors.purpose.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">
                        Company (s) <span className="text-red-500">*</span>
                    </Label>
                    <div ref={dropdownRef} className="relative  w-full rounded-zeak">
                        <div
                            className="h-[56px] bg-[#f7f7f7] rounded-zeak p-3 cursor-pointer flex items-center "
                            onClick={toggleDropdown}
                        >
                            {selectedCompanies.length > 0 ? (
                                <div className="flex flex-wrap gap-2 ">
                                    {selectedCompanies.map((c) => (
                                        <div
                                            key={c.id}
                                            className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded"
                                        >
                                            {c.name} <X className="w-4 h-4 cursor-pointer" onClick={() => removeCompany(c)} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <span className="text-gray-500">Select company</span>
                            )}
                        </div>
                        {dropdownOpen && (
                            <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-md p-2">
                                {companies.map((c: any) => (
                                    <div
                                        key={c.id}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => addCompany(c)}
                                    >
                                        {c.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 ">
                    <Label htmlFor="status">
                        Status <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                        control={control}
                        name="isActive"
                        render={({ field }) => (
                            <Select
                                value={field.value?.toString()}

                                onValueChange={(value) => field.onChange(value === "true")}
                            >
                                <SelectTrigger className="rounded-zeak bg-[#f7f7f7] border-none">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Active (Default)</SelectItem>
                                    <SelectItem value="false">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.isActive && <p className="text-red-500 text-sm">{errors.isActive.message}</p>}
                </div>
            </div>

            <ui.Card header={<><div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Effectivity Dates</h3>
                <Button variant="ghost" className="text-primary">
                    <span className="sr-only">Toggle effectivity dates</span>
                </Button>
            </div>
            </>}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="startDate">
                            Start Date <span className="text-red-500">*</span>
                        </Label>
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="startDate"
                                render={({ field }) => (
                                    <ui.Calendar value={field.value} onChange={field.onChange} />
                                )}
                            />
                        </div>
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="endDate"
                                render={({ field }) => (
                                    <ui.Calendar value={field.value} onChange={field.onChange} />
                                )}
                            />
                        </div>
                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                    </div>
                </div>
            </ui.Card>

            {/* Footer */}
            <div className="fixed bottom-20 left-0 right-0 bg-white border-t p-4 flex justify-between gap-2">
                <Button className="h-[56px]" variant="ghost" onClick={onCancel}>Cancel</Button>
                <NextButton onClick={handleSubmit(onSubmit)} />
            </div>
        </form>
    )
}
