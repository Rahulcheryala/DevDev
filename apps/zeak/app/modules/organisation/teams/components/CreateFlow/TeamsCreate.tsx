import { ExpandableTextArea, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@zeak/react"
import { IoBanOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCloseOutline } from "react-icons/io5"
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, Globe, Lock } from "lucide-react";
import { BsQuestionCircle } from "react-icons/bs";
import { useRef, useState } from "react";
import { UploadIcon1 } from "@zeak/icons";
import { useTeamContext } from "../../context";
import { z } from 'zod';
import { DatePicker } from "antd";
import moment from "moment";
import { InfoTooltip } from "../../../../../components/Layout/Screen";
import Image from "../../../../../components/Image";
import { generateTeamCode } from "../../utils/misc.utils";
import { CiEdit } from "react-icons/ci";
import { fetchTeamList } from "../../utils/api.utils";

// Define the Zod schema for validation
export const teamSchema = z.object({
    name: z.string().min(1, "Team name is required"),
    teamCode: z.string().min(1, "Team code is required"),
    description: z.string().optional(),
    status: z.string().optional().default('Active'),
    startDate: z.string()
        .refine((date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return new Date(date) >= today;
        }, "Start date cannot be in the past")
        .refine((date) => date, 'Effective Start Date is required'),
    endDate: z.string().optional().nullable(),
    parentTeamId: z.string().optional().nullable(),
    teamLeaderId: z.string().optional().nullable(),
    visibility: z.string().optional().default('Public'),
    imageUrl: z.string().optional(),
})
//     .refine((data) => {
//     if (data.endDate && data.startDate) {
//         return new Date(data.endDate) >= new Date(data.startDate);
//     }
//     return true;
// }, {
//     message: "End date must be after start date",
//     path: ["endDate"]
// });


function TeamCreateForm() {
    const { state, dispatch } = useTeamContext();
    const { teamForm, employeeUsers, records, currentFlow, selectedTeam } = state;
    const [showMore, setShowMore] = useState<boolean>(false)
    const [hideNote, setHideNote] = useState<boolean>(false);
    const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const imagePickerHandler = () => {
        if (fileInputRef.current) (fileInputRef.current as HTMLInputElement).click();
    };

    const checkDuplicacy = async (value: string) => {
        try {
            if (currentFlow === 'edit' && selectedTeam?.name === value) { 
                return false;
            }
            const response = await fetchTeamList({ name: value, checkDuplicacy: true });
            if (response.length > 0) {
                dispatch({ type: 'UPDATE_ERROR', payload: { name: 'Team with this name already exists' } });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking duplicacy:', error);
            return false;
        }
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
        dispatch({ type: 'UPDATE_FORM', payload: { [name]: value } });
    };

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;        
        try {
            // Validate field
            (teamSchema as any).pick({ [name]: true } as any).parse({ [name]: value });
            // Check for duplicates on name
            if (name === 'name') {
                const isDuplicate = await checkDuplicacy(value);
                if (isDuplicate) return;
                if (currentFlow === 'create') {
                    const teamCode = generateTeamCode();
                    dispatch({ type: 'UPDATE_FORM', payload: { teamCode: teamCode } });
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

    const handleDateChange = (dateType: 'startDate' | 'endDate', date: moment.Moment | null, dateString: string) => {
        handleChange({ target: { name: dateType, value: dateString } } as React.ChangeEvent<HTMLInputElement>);
        
        try {
            if (dateType === 'startDate') {
                (teamSchema as any).pick({ startDate: true }).parse({ startDate: dateString });
                dispatch({ type: 'UPDATE_ERROR', payload: { startDate: null } });
            } else {
                const { startDate } = teamForm;
                (teamSchema as any).pick({ startDate: true, endDate: true }).parse({ 
                    startDate, 
                    endDate: dateString 
                });
                dispatch({ type: 'UPDATE_ERROR', payload: { endDate: null } });
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                dispatch({ 
                    type: 'UPDATE_ERROR', 
                    payload: { [dateType]: error.errors[0].message } 
                });
            }
        }
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
                        <p className="text-sm text-textLink">Company addresses can serve various purposes, including the primary legal address of the company (often referred to as the registered or headquarters address), addresses for legal registrations, and addresses
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
                    <Image className="h-[100px] w-[100px] object-cover rounded-full text-2xl drop-shadow-lg" src={teamForm.imageUrl} alt="Team Picture" />
                    <div className="img-selector flex flex-col">
                        <Label htmlFor="name" className="text-textLink text-sm">Team Image</Label>
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
                {/* Team Name and Description */}
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="name" className="flex gap-1 items-center">
                            <span> Team Name <span className="text-lg text-accent-red">*</span></span>
                            <InfoTooltip
                                title="Required, unique"
                                subtext="Enter a unique name for the team. The team name must be distinct and cannot be duplicated within the company" />
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter a unique name"
                            className="bg-inputBg border-0"
                            value={teamForm.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {state.errors.name && <p className="text-red-500 text-sm">{state.errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="teamCode" className="flex gap-1 items-center justify-between">
                            <div className="flex flex-1 gap-1 items-center">
                                <span> Team Code <span className="text-lg text-accent-red">*</span></span>
                                <InfoTooltip
                                    title="Required, unique"
                                    subtext="Enter a unique code for the team. The team code must be distinct and cannot be duplicated within the company" />
                            </div>
                            <CiEdit className="self-center cursor-pointer text-xl" onClick={() => setIsEditDisabled(!isEditDisabled)} />
                        </Label>
                        <Input
                            id="teamCode"
                            name="teamCode"
                            placeholder="Enter a unique code"
                            className="bg-inputBg border-0"
                            value={teamForm.teamCode}
                            isDisabled={isEditDisabled}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {state.errors.teamCode && <p className="text-red-500 text-sm">{state.errors.teamCode}</p>}
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
                            placeholder="Enter a Description"
                            value={teamForm.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            name="status"
                            value={teamForm.status}
                            onValueChange={(e) => handleChange({ target: { name: 'status', value: e } } as React.ChangeEvent<HTMLInputElement>)}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoCheckmarkCircleOutline className="text-2xl" />
                                        <span> Active</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Inactive">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoCloseCircleOutline className="text-2xl" />
                                        <span> Inactive</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Blocked">
                                    <div className="flex items-center gap-2 py-2">
                                        <IoBanOutline className="text-xl" />
                                        <span> Blocked</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Parent Team */}
                <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="parentTeamId">Parent Team</Label>
                        <Select
                            name="parentTeamId"
                            value={teamForm.parentTeamId!}
                            onValueChange={(e) => handleChange({ target: { name: 'parentTeamId', value: e } } as React.ChangeEvent<HTMLInputElement>)}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {records.map((e) => <SelectItem value={e.id} key={e.id}>
                                    <div className="flex items-center gap-2 py-2">
                                        <Image className="h-[24px] w-[24px] text-[10px] object-cover rounded-full drop-shadow-lg" src={e.imageUrl} alt={e.name!} />
                                        <span>{e.name}</span>
                                    </div>
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="visibility">Privacy</Label>
                        <Select
                            name="visibility"
                            value={teamForm.visibility!}
                            onValueChange={(e) => handleChange({ target: { name: 'visibility', value: e } } as React.ChangeEvent<HTMLInputElement>)}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Public">
                                    <div className="flex items-center gap-2 py-2">
                                        <Globe className="text-lg" />
                                        <span> Public</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Private">
                                    <div className="flex items-center gap-2 py-2">
                                        <Lock className="text-lg" />
                                        <span> Private</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="Restricted">
                                    <div className="flex items-center gap-2 py-2">
                                        <Lock className="text-lg" />
                                        <span> Restricted</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Priority and Flag Notification */}
                <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="teamLeaderId">Team Leader</Label>
                        <Select
                            name="teamLeaderId"
                            value={teamForm.teamLeaderId!}
                            onValueChange={(e) => {
                                const selectedTeamLeader = employeeUsers.find(user => user.id === e);
                                handleChange({ target: { name: 'teamLeaderId', value: e } } as React.ChangeEvent<HTMLInputElement>);
                                if (selectedTeamLeader) {
                                    handleChange({ target: { name: 'teamLeaderEmail', value: selectedTeamLeader.email } } as React.ChangeEvent<HTMLInputElement>);
                                }
                            }}>
                            <SelectTrigger className="bg-inputBg border-0 text-base data-[placeholder]:text-tertiary">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                {employeeUsers.map((e) => <SelectItem value={e.id} key={e.id}>
                                    <div className="flex items-center gap-2 py-2">
                                        <span>{e.firstName || ''} {e.lastName || ''}</span>
                                    </div>
                                </SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="teamLeaderEmail">Supervisor Email</Label>
                        <Input
                            id="teamLeaderEmail"
                            name="teamLeaderEmail"
                            placeholder="Enter Team Leader Email"
                            className="bg-inputBg border-0"
                            value={teamForm.teamLeaderEmail!}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {state.errors.teamLeaderEmail && <p className="text-red-500 text-sm">{state.errors.teamLeaderEmail}</p>}
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
                                    <span className="flex-1">Effectivity</span>
                                    <ChevronDownIcon className="AccordionChevron" aria-hidden />
                                </Accordion.AccordionTrigger>
                                <Accordion.AccordionContent className="p-6 bg-[#F7F7F8] rounded-b-md">
                                    <div className="grid lg:grid-cols-2 grid-cols lg:gap-[60px] md:gap-8">
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="startDate">Start Date<span className="text-lg text-accent-red leading-none">*</span></Label>
                                            <DatePicker
                                                name="startDate"
                                                id="startDate"
                                                placeholder="MM/DD/YYYY"
                                                className="block border-0 h-14  p-4 text-base"
                                                value={teamForm.startDate ? moment(teamForm.startDate) : null}
                                                onChange={(date, dateString) => handleDateChange('startDate', date, dateString as string)}
                                                disabledDate={(current) => disabledDate(current) || (teamForm.startDate ? current.isBefore(moment(teamForm.startDate).toDate()) : false)}
                                            />
                                            {state.errors.startDate && <p className="text-red-500 text-sm">{state.errors.startDate}</p>}
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label htmlFor="endDate">End Date</Label>
                                            <DatePicker
                                                name="endDate"
                                                id="endDate"
                                                placeholder="MM/DD/YYYY"
                                                className="block border-0 h-14 p-4 text-base"
                                                value={teamForm.endDate ? moment(teamForm.endDate) : null}
                                                onChange={(date, dateString) => handleDateChange('endDate', date, dateString as string)}
                                                disabledDate={(current) => disabledDate(current) || (teamForm.startDate ? current.isBefore(moment(teamForm.startDate).toDate()) : false)}
                                            />
                                            {state.errors.endDate && <p className="text-red-500 text-sm">{state.errors.endDate}</p>}
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

export default TeamCreateForm
