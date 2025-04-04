import { columns } from "./columns";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, Button } from "@zeak/react";
import { cn } from "@zeak/react";
import { RowDragHandleCell, DataTableCheckbox } from "@zeak/datatable";
import { Save, X } from "lucide-react";
import { useCompanies } from "~/modules/masterlist";
import { useCreateMapping } from "~/modules/masterlist";
import { useState } from "react";

export function AddNewRowFrom({ masterListId, userId }: { masterListId: string, userId?: string }) {
    const { control, handleSubmit } = useForm();
    const { data } = useCompanies();
    const [selectedRow, setSelectedRow] = useState(false);
    const { mutate: createMapping, isPending } = useCreateMapping(masterListId, () => {
        setSelectedRow(false);
    });

    const onSubmit = (formData: any) => {
        if (!userId) return;
        createMapping({
            companyId: formData.companyId,
            status: formData.status === "ACTIVE",
            userId: userId
        });

    };

    return (
        <tr className="bg-white pb-1 rounded-zeak">
            <td>
                <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
                    "bg-[#FFDF41]": selectedRow,
                })}>
                    <RowDragHandleCell rowId={"hdfed"} />
                    <div className={cn(" flex items-center justify-center rounded-l-[12px] relative")}>
                        <DataTableCheckbox
                            className={cn("rounded-full", {
                                "bg-white": selectedRow,
                            })}
                            checked={selectedRow}
                            onCheckedChange={() => setSelectedRow(!selectedRow)}
                            aria-label="Select row"
                        />
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <Controller
                        name="companyId"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    {data?.companies?.map((company: any) => (
                                        <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </td>
            <td>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            </td>
            <td>
                <Select disabled>
                    <SelectTrigger>
                        <SelectValue placeholder="Auto-populated" />
                    </SelectTrigger>
                </Select>
            </td>
            <td>
                <div className="flex items-center gap-2 h-[64px] ">
                    <Button
                        variant="ghost"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isPending}
                    >
                        <Save />
                    </Button>
                    <Button variant="ghost">
                        <X />
                    </Button>
                </div>
            </td>
        </tr>
    )
}