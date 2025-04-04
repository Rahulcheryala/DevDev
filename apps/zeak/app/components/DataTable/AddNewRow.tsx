import { Button, Input, Label, Textarea } from "@zeak/react"
import { Plus } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, ScrollArea } from "@zeak/react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useDatatableStore } from "./useDatatableStore"
import {faker} from "@faker-js/faker"


interface AddNewRowProps {
  columns: any[]
  setData: (data: any) => React.SetStateAction<any>
  data: any[]
 
}

export default function AddNewRow({ columns, setData, data}: AddNewRowProps) {
  const {setIsAddNewRow, isAddNewRow} = useDatatableStore()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const submitForm = (formData: any) => {
    setData([...data, {id: faker.string.uuid(), ...formData,  deliveryMethod: {
      inApp: faker.datatype.boolean(),
      email: faker.datatype.boolean(),
      sms: faker.datatype.boolean(),
    }, 
      chartData: Array.from({ length: 10 }, () => faker.number.int({ min: 1, max: 200 })),
}])
    reset()
    setOpen(false)
  }

  return (
    <Drawer open={isAddNewRow} onOpenChange={setIsAddNewRow}>
     
      <DrawerContent>
        <ScrollArea className="h-[calc(100vh)]">

        <DrawerHeader>
          <DrawerTitle>Add New Row</DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(submitForm)} className="p-6 space-y-4">
          {columns.map((column) => {
            if (!column.accessorKey || column.id === 'select' || column.id === 'actions' || column.meta?.dataType === 'chart') return null

            const fieldName = column.accessorKey
            const label = column.meta?.name || column.id

            if (column.meta?.dataType === 'boolean') {
              return (
                <div key={column.id} className="flex items-center gap-2">
                  <input type="checkbox" {...register(fieldName)} id={fieldName} />
                  <Label htmlFor={fieldName}>{label}</Label>
                </div>
              )
            }

            if (column.meta?.dataType === 'string' && column.size > 200) {
              return (
                <div key={column.id} className="space-y-2">
                  <Label htmlFor={fieldName}>{label}</Label>
                  <Textarea {...register(fieldName)} id={fieldName} />
                </div>
              )
            }
            if (column.meta?.dataType === 'date') {
              return (
                <div key={column.id} className="space-y-2">
                  <Label htmlFor={fieldName}>{label}</Label>
                  <Input {...register(fieldName)} id={fieldName} type="date" />
                </div>
              )
            }
            return (
              <div key={column.id} className="space-y-2">
                <Label htmlFor={fieldName}>{label}</Label>
                <Input 
                  {...register(fieldName)}
                  id={fieldName}
                  type={column.meta?.dataType === 'number' ? 'number' : 'text'}
                />
              </div>
            )
          })}

          <Button type="submit" className="w-full">
            Add Row
          </Button>
        </form>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
