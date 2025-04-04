import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  IconButton,
  Input,
} from "@zeak/react";

import { IoCopyOutline, IoEllipsisVertical } from "react-icons/io5";
import {
  LuChevronDown,
  LuChevronUp,
  LuRocket,
  LuUsers,
  LuUser,
  LuTrash,
} from "react-icons/lu";
import { RxCopy } from "react-icons/rx";
import { TbPencilMinus, TbReload } from "react-icons/tb";
import { BiSearch } from "react-icons/bi";
import { EmptyList } from "~/modules/shared";
import { Outlet, useNavigate } from "@remix-run/react";
import { path } from "~/utils/path";
import { type DepartmentMember } from "~/modules/access-settings/types";
import { FaPlus, FaRegCircleCheck } from "react-icons/fa6";
import { DepartmentUsersTable } from ".";
import { DataflowIcon, SortIcon } from "@zeak/icons";
import { BsPaperclip } from "react-icons/bs";
import { RiBuildingLine } from "react-icons/ri";

type DepartmentUsersListProps = {
  departmentId: string;
  data: Array<DepartmentMember>;
  count: number;
};

const DepartmentUserList = ({
  departmentId,
  data,
  count,
}: DepartmentUsersListProps) => {
  const navigate = useNavigate();

  return (
    <div className={`${false ? "pr-[336px]" : ""} relative`}>
      {/* 
             To be used when we integrate notes functionality.
            <div
                className="flex justify-between items-start p-4 rounded-xl mb-5 relative"
                style={{ backgroundColor: "#fffae5" }}>
                <IconButton
                    aria-label={"closeMessage"}
                    variant="ghost"
                    className="absolute top-[50%] -translate-y-[50%] right-1"
                    icon={<IoClose size={24} />}
                />
                <div className="pl-[40px]">
                    <GoQuestion
                        size={24}
                        className="absolute left-4 top-[50%] -translate-y-[50%] text-accent-accentYellow"
                    />
                    <h3 className="text-sm text-accent-yellow mb-1">Note:</h3>
                    <p className="text-secondary text-sm">
                        This is a template editable note which is optional and can be closed
                        from X icon on top right of the note box
                    </p>
                </div>
            </div> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="secondary"
                className="py-[13px] px-4 min-w-[162px] text-sm bg-white hover:bg-white h-auto text-left justify-between text-secondary"
              >
                Default views {true ? <LuChevronDown /> : <LuChevronUp />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[162px]">
              <DropdownMenuLabel>Dropdown Item</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-x-1 items-center">
          <Button
            variant="white"
            className="text-secondary-tertiary py-[14px] px-6 h-auto"
          >
            <RxCopy className="text-secondary-tertiary w-5 h-5 mr-2" />
            Edit
          </Button>
          <hr className="bg-stroke h-6 w-[1px]" />
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none">
              <Button
                variant="ghost"
                className="py-[13px] px-4 min-w-[134px] text-sm font-normal text-secondary-tertiary rounded-sm h-auto text-left justify-between  border-none"
              >
                <LuRocket className="text-secondary-tertiary mr-2" size={20} />
                Actions{" "}
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[134px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <hr className="bg-stroke h-6 w-[1px]" />
          <Button
            variant="white"
            className="text-accent-primary py-[14px] px-6 h-auto font-normal"
            onClick={() => navigate(path.to.departmentAddUsers(departmentId))}
          >
            <FaPlus className="text-accent-primary w-5 h-5 mr-2" />
            Add User
          </Button>
          <Outlet />
        </div>
      </div>
      <div className="flex items-center justify-between border border-stroke rounded-tl-md rounded-tr-md p-2 mt-8">
        <div className="flex items-end space-x-6">
          <div className="relative">
            <Input
              className="max-w-[320px] w-[320px] h-10 px-[44px]"
              placeholder="Search"
            />
            <BiSearch
              size={20}
              className="absolute top-[50%] -translate-y-[50%] left-4"
            />
            <span className="absolute top-[50%] -translate-y-[50%] right-4">
              <SortIcon size="20" />
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  <span className="uppercase text-[10px] leading-[12px] text-accent-primary font-semibold">
                    Status
                  </span>
                  Offline
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  <span className="uppercase text-[10px] leading-[12px] text-accent-primary font-semibold">
                    Creation Date
                  </span>
                  Today
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none text-sm font-normal text-secondary-textLink flex text-left justify-between flex-col relative">
              <span className="flex items-center">
                <span className="flex flex-col truncate text-ellipsis items-start text-sm text-textLink tracking-[0.5px] pr-5">
                  More
                </span>
                {true ? (
                  <LuChevronDown
                    size={20}
                    className="text-secondary-tertiary ml-1 absolute right-0 bottom-0"
                  />
                ) : (
                  <LuChevronUp
                    size={20}
                    className="text-secondary-tertiary ml-1"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuLabel className="py-3">
                Dropdown Item
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-x-4">
            {" "}
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background p-0"
              icon={<DataflowIcon size="20" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background p-0"
              icon={<SortIcon size="20" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="ghost"
              className="rounded-full h-10 w-10 hover:bg-background"
              icon={<TbReload size={20} className="text-secondary-tertiary" />}
            />
            <IconButton
              aria-label={"pin"}
              variant="secondary"
              className="rounded-full h-10 w-10 border-none hover:bg-background"
              icon={
                <>
                  <BsPaperclip size={20} className="text-secondary-tertiary" />
                </>
              }
            />
          </div>
          <hr className="mx-4 bg-stroke h-5 w-[1px]" />
          <div className="flex items-center gap-x-1">
            <Button
              variant="ghost"
              className="h-10 text-secondary-tertiary font-normal"
            >
              Export
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus-visible:outline-none w-10 h-10 flex justify-center items-center hover:bg-background rounded-full">
              <IoEllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[100px]">
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <TbPencilMinus size={20} className="mr-4" />
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <IoCopyOutline size={20} className="mr-4" />
                  Duplicate
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <RiBuildingLine size={20} className="mr-4" />
                  Manage Departments
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <LuUsers size={20} className="mr-4" />
                  Manage Teams
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <LuUser size={20} className="mr-4" />
                  Manage Users
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <FaRegCircleCheck size={20} className="mr-4" />
                  Update Status
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Button
                  variant="secondary"
                  className="p-4 hover:bg-stroke text-accent-red hover:text-accent-red bg-transparent h-auto w-full rounded-none justify-start border-none"
                >
                  <LuTrash size={20} className="mr-4" />
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {count === 0 ? (
        <div className="max-w-[500px] mx-auto">
          <EmptyList
            title="No Users to display."
            ctaText="Click here to add your first user for this department"
            ctaHandle={() => navigate(path.to.departmentAddUsers(departmentId))}
          />
        </div>
      ) : (
        <DepartmentUsersTable
          data={data}
          count={count}
          departmentId={departmentId}
        />
      )}
    </div>
  );
};

export default DepartmentUserList;
