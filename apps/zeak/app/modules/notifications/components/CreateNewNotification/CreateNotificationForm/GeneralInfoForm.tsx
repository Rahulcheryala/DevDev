import {
  Input,
  Label,
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@zeak/react";
import NotificationTriggerType from "./NotificationTriggerType";
import { NotificationType, notificationTypeList } from "~/modules/notifications/constants";
import { StepHeader } from "./StepHeader";
import {useState} from "react"
import {RadioGroup} from "@zeak/react"
import { ChevronDownIcon, AlertTriangleIcon} from "lucide-react";
import { Info } from "lucide-react";


export default function GeneralInfoForm() {
  const [selectedTriggerType, setSelectedTriggerType] = useState<string>('manual');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  return (
    <div className=" bg-white rounded-md ">
       <StepHeader title="General" />
      <div className=" 2xl:px-[60px] px-10 mt-8 ">
        {/* Notification Name and Description */}
        <div className="2xl:mb-[60px] mb-10 space-y-8">

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Notification Name

               <span className="text-red-500 ml-0.5">*</span>
            </Label>

            <Input id="name" name="name" placeholder="Enter Notification Name" className="" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Describe the notification"
            />
          </div>
        </div>

        {/* Companies and Purpose */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 ">
          <div className="flex flex-col gap-3">
            <Label htmlFor="companies">Companies</Label>
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-between relative">
                  <Input placeholder="Select a Company(s)" value={selectedCompanies.join(', ')} />
                  <ChevronDownIcon className="w-5 h-5 absolute right-2 text-[#475467]" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-4">
               <div className="flex gap-3">
                <div onClick={() => setSelectedCompanies((prev) => [...prev, 'Pfizer USA (Primary)'])} className="flex p-3 flex-col justify-center items-start gap-[NaNpx] rounded-[12px] bg-[#F7F7F8]">
                  Pfizer USA (Primary)
                </div>
                 <div onClick={() => setSelectedCompanies((prev) => [...prev, 'Pfizer India'])} className="flex p-3 flex-col justify-center items-start gap-[NaNpx] rounded-[12px] bg-[#F7F7F8]">
                  Pfizer India
                </div>
                 <div onClick={() => setSelectedCompanies((prev) => [...prev, 'Pfizer UK'])} className="flex p-3 flex-col justify-center items-start gap-[NaNpx] rounded-[12px] bg-[#F7F7F8]">
                  Pfizer UK
                </div>
               </div>
              </PopoverContent>
            </Popover> 
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="purpose">Purpose</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Priority and Flag Notification */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">
                  <div className="flex items-center gap-4 text-red-500">
                    <AlertTriangleIcon className="w-5 h-5 text-red-500" />
                    Critical
                  </div>
                 
                  </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="flag">Flag Notification</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a flag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Green">Green</SelectItem>
                <SelectItem value="Yellow">Yellow</SelectItem>
                <SelectItem value="Red">Red</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-secondary" />
              <span className="text-[14px] tracking-[0px] text-secondary">Flag allows you to highlight key notifications and facilitates quick search. </span>
            </div>
          </div>
        </div>
        </div>

        {/* Trigger Type */}
        <div>
          <h3 className="text-[20px] font-[450] tracking-[0px]  mb-8 text-[#475467]">
            Select the type of trigger for the notification
            <span className="text-red-500">*</span>
          </h3>
            <RadioGroup defaultValue={selectedTriggerType} onValueChange={(value) => setSelectedTriggerType(value)}>
          <div className="grid xl:grid-cols-3  lg:grid-cols-2 grid-cols-1 gap-10">
          

            {notificationTypeList.map((type, index) => (
              <NotificationTriggerType
                label={type.label}
              
                description={type.description}
                color={type.color}
                value={type.value}
                selected={selectedTriggerType as NotificationType}
                
                key={index}
              />
            ))}
          </div>
            </RadioGroup>
        </div>
      </div>

     
    </div>
  );
}
