import { Label } from "@zeak/react"
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from "@zeak/react"
import NextButton from "./NextButton"
import { ui } from "@zeak/react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createMasterlistSchema, CreateMasterlistSchema } from "../schema"
import axios from "axios"
import { QueryClient } from "@tanstack/react-query"
import { useCreateMasterlist } from "../hooks"


interface GeneralFormProps {
    onNext: () => void;
    userId: string;
}

export default function GeneralForm({ onNext, userId }: GeneralFormProps) {
    const { mutate: createMasterlist, isPending } = useCreateMasterlist(userId)
    const { register, handleSubmit, formState: { errors }, control } = useForm<CreateMasterlistSchema>({
        resolver: zodResolver(createMasterlistSchema),
        defaultValues: {
            isActive: true,
            name: "",
            code: "",
            purpose: "",

        }
    })
    const onSubmit = async (data: CreateMasterlistSchema) => {
        createMasterlist(data)

    }
    return (
        <form className="space-y-6 relative h-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="listName">
                        List Name <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("name")} id="name" required />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                </div>
                <div className="space-y-2">
                    <Label htmlFor="code">
                        Code <span className="text-red-500">*</span>
                    </Label>
                    <Input {...register("code")} id="code" required />
                    {errors.code && <p className="text-red-500">{errors.code.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input {...register("purpose")} id="purpose" placeholder="List of all active label status" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="company">
                        Company (s) <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="all">
                        <SelectTrigger>
                            <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
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
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Active (Default)</SelectItem>
                                <SelectItem value="false">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

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
                            <ui.Calendar />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <div className="w-full">
                            <ui.Calendar />
                        </div>
                    </div>
                </div>
            </ui.Card>



            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t absolute bottom-0 left-0 right-0 bg-gray-50">
                <Button variant="ghost">Cancel</Button>
                <NextButton onClick={onNext} />
            </div>
        </form>
    )
}
