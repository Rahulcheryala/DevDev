import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input, Button, ui, cn } from '@zeak/react'
import { useCreateMasterlistValue, } from '~/modules/masterlist'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@zeak/react'
import { Loader2, Save, X, Upload} from 'lucide-react'
import { columns } from './columns'
import { RowDragHandleCell, DataTableCheckbox } from '@zeak/datatable'



type FormValues = {
    displayName: string
    meaning: string
    value: string
    isActive: "Active" | "Inactive"
    editable: boolean,
    isDefault: boolean
}

export default function AddValueRow({ userId, masterlistId, onCancel }: { userId: string, masterlistId: string, onCancel: () => void }) {

    const [selectedRow, setSelectedRow] = useState<any>(null)
    const { register, handleSubmit, setValue, control } = useForm<FormValues>({
        defaultValues: {
            displayName: '',
            value: '',
            meaning: '',
            isActive: "Active",
            editable: false,
            isDefault: false
        }
    })

    const { mutate: createMasterlistValue, isPending } = useCreateMasterlistValue(masterlistId, () => {
        onCancel()
    })
    const onSubmit = async (data: FormValues) => {
        createMasterlistValue({
            ...data,
            isActive: data.isActive === "Active",
            userId,
        })
        
    }

    // Filter out non-input columns
    const inputColumns = columns.filter(col =>
        col.id !== 'select' &&
        col.id !== 'sequence' &&
        col.id !== 'status' &&
        col.id !== 'createdAt' &&
        col.id !== 'image'
    )

    return (
        <tr className="h-[64px] relative ">
            {columns.map(column => {
                // Handle special columns first
                if (column.id === 'select') {
                    return <td key={column.id} className=' p-0' style={{ width: `${column.size}px` }} >
                        <div className={cn("flex h-[64px] w-[60px]  rounded-l-[12px]", {
                            "bg-[#FFDF41]": selectedRow,
                        })}>
                            <RowDragHandleCell rowId={column.id} />

                            <div
                                className={cn(
                                    " flex items-center justify-center rounded-l-[12px] relative",

                                )}
                            >

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
                }
                if (column.id === 'image') {
                    return <td key={column.id} className=''  >
                        <div style={{ width: `${column.size}px` }} className='flex items-center justify-center h-full gap-3'>
                            <Upload className='text-[#9BA2AC] h-5 w-5'/>
                            <span className='text-[#9BA2AC]'>Upload</span>
                        </div>
                    </td>
                }
                if (column.id === 'sequence') {
                    return <td key={column.id} className=''  >
                        <div style={{ width: `${column.size}px` }} className='flex items-center justify-center h-full'>

                        </div>
                    </td>
                }

                if (column.id === 'isActive') {
                    return (
                        <td key={column.id} className=" flex items-center justify-center">
                            <div style={{ width: `${column.size}px` }} className="flex items-center justify-center">
                                <Controller
                                    control={control}
                                    name={column.id}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="rounded-zeak bg-white border-none">
                                                <SelectValue placeholder={column.meta?.name} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </td>
                    )
                }
                // For boolean columns, render Checkbox
                if (column.meta?.dataType === 'boolean') {
                    return (
                        <td key={column.id} className=" flex items-center justify-center">
                            <div style={{ width: `${column.size}px` }} className="flex items-center space-x-2 justify-center">
                                <ui.RadioCheckbox
                                    id={column.id}

                                    onCheckedChange={(checked) => setValue(column.id as keyof FormValues, checked)}
                                />

                            </div>

                        </td>
                    )
                }

                // For input columns, render Input component
                if (inputColumns.find(col => col.id === column.id)) {
                    return (
                        <td key={column.id} className="">
                            <div style={{ width: `${column.size}px` }} className='flex items-center justify-center h-full'>

                                {column.meta?.isEditable && <Input
                                    {...register(column.id as keyof FormValues)}
                                    placeholder={column.meta?.name || column.id}

                                    className="w-full"
                                />}
                            </div>

                        </td>
                    )
                }

                // Default empty cell for other columns
                return <td key={column.id} style={{ width: `${(column.size ?? 100) + 14}px` }} />
            })}
            <td className="text-center absolute right-0 top-1/4 ">
                <div className="flex gap-2 justify-center">
                    <Button variant="ghost" onClick={handleSubmit(onSubmit)}>
                        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    </Button>
                    <Button variant="ghost" onClick={onCancel} >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </td>
        </tr >
    )
}
