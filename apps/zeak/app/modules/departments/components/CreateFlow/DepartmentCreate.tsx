import { ExpandableTextArea, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tooltip, TooltipContent, TooltipTrigger } from "@zeak/react"
import { IoBanOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5"
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { BsQuestionCircle } from "react-icons/bs";
import { useRef, useState } from "react";
import { InfoCircleIcon, UploadIcon1 } from "@zeak/icons";
import { useDepartmentContext } from "../../context";
import { z } from 'zod';
import { DatePicker } from "antd";
import moment from "moment";
import { InfoTooltip } from "../../../../components/Layout/Screen";
import Image from "../../../../components/Image";
import { CiEdit } from "react-icons/ci";
import { fetchDepartmentList } from "../../utils/api.utils";


const generateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    const timestamp = new Date().getTime().toString().slice(-4);
    let result = '';
    for (let i = 0; i < length / 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    result += timestamp;
    return result;
};

// Define the Zod schema for validation
export const departmentSchema = z.object({
    name: z.string().min(1, "Department name is required"),
    departmentCode: z.string().min(1, "Department code is required"),
    description: z.string().optional(),
    status: z.string().optional(),
    supervisor: z.string().optional(),
    supervisorEmail: z.string().email("Invalid email format").nullable().optional().default(''),
    effectiveStartDate: z.string().date('Effective Start Date is required'),
    effectiveEndDate: z.string().optional(),
})
    
//     .refine((data) => {
//     if (data.effectiveEndDate && data.effectiveStartDate) {
//         return new Date(data.effectiveEndDate) >= new Date(data.effectiveStartDate);
//     }
//     return true;
// }, {
//     message: "End date must be after start date",
//     path: ["endDate"]
// });


function DepartmentCreateForm() {
    const { state, dispatch } = useDepartmentContext();
    const { departmentForm, employeeUsers, currentFlow, selectedDepartment } = state;
    const [showMore, setShowMore] = useState<boolean>(false)
    const [hideNote, setHideNote] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true);
    const imagePickerHandler = () => {
        if (fileInputRef.current) (fileInputRef.current as HTMLInputElement).click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            handleChange({ target: { name: 'image', value: imageUrl } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch({type: 'UPDATE_FORM', payload: { [name]: value }});
    };

    const checkDuplicacy = async (value: string) => {
        try {
            if (currentFlow === 'edit' && selectedDepartment?.name === value) { 
                return false;
            }
            const response = await fetchDepartmentList({ name: value });
            if (response.length > 0) {
                dispatch({ type: 'UPDATE_ERROR', payload: { name: 'Department with this name already exists' } });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking duplicacy:', error);
            return false;
        }
    };

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;        
        try {
            // Validate field
            (departmentSchema as any).pick({ [name]: true } as any).parse({ [name]: value });
            // Check for duplicates on name
            if (name === 'name') {
                const isDuplicate = await checkDuplicacy(value);
                if (isDuplicate) return;
                if (currentFlow === 'create') {
                    const code = generateCode();
                    dispatch({ type: 'UPDATE_FORM', payload: { departmentCode: code } });
                }
            }
            dispatch({ type: 'UPDATE_ERROR', payload: { [name]: null } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                dispatch({ 
                    type: 'UPDATE_ERROR', 
                    payload: { [name]: error.errors[0].message } 
                });
            }
        }
    };

    const disabledDate = (current: any) => {
        return current && current.isBefore(moment().startOf('day'));
    };

    return (<div className="w-full">
        <div className="form-container ">
            <div className="flex flex-col gap-8">
               {!hideNote ? <div className="note-container py-3 px-6 rounded-md  bg-accent-yellowLight flex gap-6 items-center">
                    <div>
                        <BsQuestionCircle className="text-md text-[20px] text-accent-accentYellow" />
                    </div>
                    <div>
                        <p className="text-sm text-accent-accentYellow uppercase">
                            <span>Note</span>
                        </p>
                        <p className="text-sm text-textLink">Company addresses can serve various purposes, including the primary legal address of the company
                            (often referred to as the registered or headquarters address), addresses for legal
                            {!showMore ? <span>... <span className="text-accent-primary cursor-pointer" onClick={() => setShowMore(true)}>MORE</span></span> : <span>registrations, and addresses for official communications.
                                These addresses are typically used in legal documents, tax filings, and official correspondence.
                                <span className="block mt-2 text-accent-primary cursor-pointer" onClick={() => setShowMore(false)}>SHOW LESS</span>
                            </span>}
                        </p>
                    </div>
                    <div className="flex self-center">
                        <IoCloseOutline className="text-[24px] text-accent-darkYellow cursor-pointer" onClick={() => setHideNote(true)} />
                    </div>
                </div> : <></>}
                <div className="profile-container flex gap-x-8 items-center">
                    <Image className="h-[100px] w-[100px] object-cover rounded-full text-2xl drop-shadow-lg" src={departmentForm.logo} alt="Department Picture" />

                    {/* <img className="h-[100px] w-[100px] object-cover rounded-full drop-shadow-lg" src={departmentForm.image} alt="Selected" /> */}
                    <div className="img-selector flex flex-col">
                        <Label htmlFor="name" className="text-textLink text-sm">Department Picture</Label>
                        <span className="text-sm text-textLink">PNG, JPEG, SVG <span className="text-text-tertiary"> (Max 2MB)</span></span>
                        <button className="flex gap-2 items-center mt-2" onClick={imagePickerHandler}>
                            <UploadIcon1 color="#9BA2AC" />
                            <span className="text-text-tertiary">Upload</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/png, image/jpg, image/jpeg, image/svg"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                {/* Department Name and Description */}
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="name" className="flex gap-1 items-center">
                            <span> Department Name <span className="text-lg text-accent-red">*</span></span>
                            <InfoTooltip
                                title="Required, unique"
                                subtext="Enter a unique name for the department. The department name must be distinct and cannot be duplicated within the company" />
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter Department Name"
                            className="bg-inputBg border-0"
                            value={departmentForm.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {state.errors.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="departmentCode" className="flex gap-1 items-center justify-between">
                            <div className="flex flex-1 gap-1 items-center">
                                <span> Department Code <span className="text-lg text-accent-red">*</span></span>
                                <InfoTooltip
                                    title="Required, unique"
                                    subtext="Enter a unique code for the department. The department code must be distinct and cannot be duplicated within the company" />
                            </div>
                            <CiEdit className="self-center cursor-pointer text-xl" onClick={() => setIsEditDisabled(!isEditDisabled)} />
                        </Label>
                        <Input
                            id="departmentCode"
                            name="departmentCode"
                            placeholder="Enter Department Code"
                            className="bg-inputBg border-0"
                            value={departmentForm.departmentCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isDisabled={isEditDisabled}
                        />
                        {state.errors.departmentCode && <p className="text-red-500 text-sm">{state.errors.departmentCode}</p>}
                    </div>

                </div>

                {/* Companies and Purpose */}
                <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="description">Description</Label>
                        <ExpandableTextArea
                            className="bg-inputBg border-0 text-base"
                            inputClassname="text-base bg-inputBg placeholder:text-tertiary"
                            id="description"
                            name="description"
                            placeholder="Enter Description"
                            value={departmentForm.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            name="status"
                            value={departmentForm.status}
                            onValueChange={(e) => handleChange({ target: { name: 'status', value: e } } as React.ChangeEvent<HTMLInputElement>)}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select a Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoCheckmarkCircleOutline className="text-xl" />
                                        <span> Active</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Inactive">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoCloseCircleOutline className="text-xl" />
                                        <span> Inactive</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Blocked">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoBanOutline className="text-lg" />
                                        <span> Blocked</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Priority and Flag Notification */}
                <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="supervisor">Supervisor</Label>
                        <Select
                            name="supervisor"
                            value={departmentForm.supervisor}
                            onValueChange={(e) => {
                                const selectedSupervisor = employeeUsers.find(user => user.id === e);
                                handleChange({ target: { name: 'supervisor', value: e } } as React.ChangeEvent<HTMLInputElement>);
                                if (selectedSupervisor) {
                                    handleChange({ target: { name: 'supervisorEmail', value: selectedSupervisor.email } } as React.ChangeEvent<HTMLInputElement>);
                                }
                            }}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select a Supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeUsers.map((e) => <SelectItem value={e.id} key={e.id}>
                                    <div className="flex items-center gap-2 py-2">
                                        <span>{e.firstName || ''} {e.lastName || '' }</span>
                                    </div>
                                </SelectItem>)}
                            
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="supervisorEmail">Supervisor Email</Label>
                        <Input
                            id="supervisorEmail"
                            name="supervisorEmail"
                            placeholder="Enter Supervisor Email"
                            className="bg-inputBg border-0"
                            value={departmentForm.supervisorEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                         {state.errors.supervisorEmail && <p className="text-red-500 text-sm">{state.errors.supervisorEmail}</p>}
                    </div>
                </div>
                <div className="grid  grid-cols lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Accordion.Root
                            className="AccordionRoot"
                            type="single"
                            defaultValue="item-1"
                            collapsible
                        >
                            <Accordion.Item className="AccordionItem" value="item-1">
                                <Accordion.AccordionTrigger className="h-[56px] bg-[#F0F4FD] w-full text-left px-6 rounded-t-md flex items-center">
                                    <span className="flex-1">Effectivity Dates</span>
                                    <ChevronDownIcon className="AccordionChevron" aria-hidden />
                                </Accordion.AccordionTrigger>
                                <Accordion.AccordionContent className="p-6 bg-[#F7F7F8] rounded-b-md">
                                    <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="name">Start Date<span className="text-lg text-accent-red leading-none">*</span></Label>
                                            <DatePicker
                                                name="effectiveStartDate"
                                                id="effectiveStartDate"
                                                placeholder="MM/DD/YYYY"
                                                className="block border-0 h-14 p-4 text-base"
                                                value={departmentForm.effectiveStartDate ? moment(departmentForm.effectiveStartDate) : null}
                                                onChange={(date, dateString) => handleChange({ 
                                                    target: { 
                                                        name: 'effectiveStartDate', 
                                                        value: dateString 
                                                    } 
                                                } as React.ChangeEvent<HTMLInputElement>)}
                                                disabledDate={(current) => disabledDate(current) || (departmentForm.effectiveStartDate ? current.isBefore(moment(departmentForm.effectiveStartDate).toDate()) : false)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="effectiveEndDate">End Date</Label>
                                            <DatePicker
                                                name="effectiveEndDate"
                                                id="effectiveEndDate"
                                                placeholder="MM/DD/YYYY"
                                                className="block border-0 h-14 p-4 text-base"
                                                value={departmentForm.effectiveEndDate ? moment(departmentForm.effectiveEndDate) : null}
                                                onChange={(date, dateString) => handleChange({ 
                                                    target: { 
                                                        name: 'effectiveEndDate', 
                                                        value: dateString 
                                                    } 
                                                } as React.ChangeEvent<HTMLInputElement>)}
                                                disabledDate={(current) => disabledDate(current) || (departmentForm.effectiveStartDate ? current.isBefore(moment(departmentForm.effectiveStartDate).toDate()) : false)}
                                            />
                                        </div>
                                    </div>
                                </Accordion.AccordionContent>
                            </Accordion.Item>
                        </Accordion.Root>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default DepartmentCreateForm
