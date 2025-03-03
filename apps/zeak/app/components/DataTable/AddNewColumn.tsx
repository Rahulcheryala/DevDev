import { useState } from "react"
import { Button, Drawer, DrawerContent, DrawerHeader, DrawerTitle,  Label } from "@zeak/react"
import { ScrollArea, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeak/react"
import {useForm} from "react-hook-form"
import { cn } from "@zeak/react"
import { useDatatableStore } from "./useDatatableStore"
interface AddNewColumnProps {
  addNewColumn:()=>void
}

export default function AddNewColumn({  addNewColumn }: AddNewColumnProps) {
  const {setNewColumnName, newColumnName, setIsAddNewColumn, isAddNewColumn, setNewColType} = useDatatableStore()
   const [isOpen, setIsOpen] = useState(false)
    const {handleSubmit, register, formState: {errors}, watch} = useForm()
    
   const handleAddNewColumn = () => {
    addNewColumn()
    setIsOpen(false)
   }
  return (
    <Drawer open={isAddNewColumn} onOpenChange={setIsAddNewColumn}>

      <DrawerContent className=" px-5 flex flex-col gap-5">
        <DrawerHeader>
          <DrawerTitle>Add New Column</DrawerTitle>
        </DrawerHeader>
       
           <div className="">
            <Label htmlFor="name">Name</Label>
            <Input onChange={(e)=>setNewColumnName(e.target.value)} id="name" />
           </div>  
           <div className="">
            <Label htmlFor="type">Type</Label>
            <Select onValueChange={(value)=>setNewColType(value)}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
              </SelectContent>
            </Select>
           </div>
           <Button onClick={handleAddNewColumn}>Add Column</Button>
       
      </DrawerContent>
    </Drawer>
  )
}
