import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  HStack,
  IconButton,
  Input,
} from "@zeak/react";
import { SearchIcon } from "lucide-react"

import { SearchIcon } from "lucide-react"
import { FiPlus } from "react-icons/fi";
import { FreeTrailWarning } from "./FreeTrailWarning";
import { FiPlus } from "react-icons/fi";
import { FreeTrailWarning } from "./FreeTrailWarning";
import AvatarMenu from "./AvatarMenu";
import ModeSwitcher from "./ModeSwitcher";
import { Link, useLocation } from "@remix-run/react";
import CompanyMenu from "./CompanyMenu";
import {
  WebAngleDown,
  WebCloud,
  WebComment,
  WebHeart,
  WebNotification,
  WebPencil,
  WebPrint,
  ZeakLogo, TaskIcon, PlugIcon, WebShare,

} from "@zeak/icons";
import { useState } from "react";
import { path } from "~/utils/path";

const Topbar = () => {
  const location = useLocation();

  const isRouteXReactFlowHome = location.pathname === path.to.reactflowHomeTab;

  const [automationName, setAutomationName] = useState("New Automation");
  const [automationNameInputShow, setAutomationNameInputShow] = useState(false);
  const editAutomationName = () => {
    setAutomationNameInputShow(!automationNameInputShow);
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setAutomationName(e.target.value);
      setAutomationNameInputShow(false);
    }
  };

  // const [ heartColor, setHeartColor ] = useState("gray");
  const [isLiked, setIsLiked] = useState(false);
  const handleChangeHeartColor = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      {!isRouteXReactFlowHome ? (
        <>
          {/* Free trial warning */}
          <FreeTrailWarning />
          <div className="grid bg-background text-foreground px-6 h-[72px] py-3 top-0 sticky z-10 space-x-4 grid-cols-[1fr_auto_1fr] items-center">
            <div className="inline-flex items-center">
              <Link to={"/"} className="inline-flex items-center">
                <ZeakLogo />
              </Link>
            </div>
            {/* <Search /> */}
            {/* Search Input */}
            <div className="flex items-center relative ">
              <Input placeholder="Search" className="pl-10 w-[384px] h-[48px] 2xl:w-[592px] " />
              <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-4" />
            </div>

            {/* Task Icon */}
            <HStack className="justify-end space-x-0 gap-5">
              <HStack className="gap-2 space-x-0">
                <TaskIcon className="h-5" />
                <PlugIcon />


                <div className="w-[40px] h-[40px] relative">
                  <span className="absolute top-[9px] right-[12px] inline-flex items-center justify-center rounded-full w-[8px] h-[8px] bg-white">
                    <span className="w-[6px] h-[6px] rounded-full bg-destructive inline-flex"></span>
                  </span>
                  <IconButton
                    icon={<WebNotification />}
                    variant="ghost"
                    type="submit"
                    className="w-[40px] h-[40px] text-secondary p-0"
                    aria-label={""}
                  />
                </div>
                <ModeSwitcher />
                <FiPlus />
              </HStack>
              <CompanyMenu />
              <AvatarMenu />
            </HStack>
          </div>
        </>
      ) : (
        <div className="grid bg-background text-foreground px-[24px] h-[64px] py-[12px] top-0 sticky z-10 space-x-4 grid-cols-[1fr_auto_1fr] items-center">
          <div className="inline-flex items-center">
            <Link to={"/"} className="inline-flex items-center">
              <img
                src="/images/logo.svg"
                alt="ProjectX"
                className="2xl:w-[32px] 2xl:h-[32px] w-[24px] h-[24px]"
              />
            </Link>
            <div className="flex gap-7 ml-7 items-center">
              <span className="cursor-pointer	">File</span>
              <span className="cursor-pointer">Edit</span>
              <span className="cursor-pointer">View</span>
              <IconButton
                icon={<WebCloud />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
              />
              {/* </Link> */}
            </div>
          </div>
          <HStack className="flex items-cneter justify-end space-x-0 gap-[15px]">
            <HStack className="gap-[4px] space-x-0">
              <IconButton
                icon={<WebHeart color={isLiked ? "red" : "gray"} />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
                onClick={handleChangeHeartColor}
              />
              {automationNameInputShow ? (
                <Input
                  autoFocus
                  placeholder="Enter automation name"
                  className="h-[35px] p-2 bg-white rounded-xl w-full"
                  size="sm"
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <span className="font-bold text-xl">{automationName}</span>
              )}
              <IconButton
                icon={<WebPencil />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
                onClick={editAutomationName}
              />
            </HStack>
          </HStack>
          <HStack className="justify-end space-x-0 gap-[15px]">
            <HStack className="gap-7 space-x-0">
              <IconButton
                icon={<WebComment />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
              />
              <IconButton
                icon={<WebShare />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
              />
              <IconButton
                icon={<WebPrint />}
                variant="ghost"
                type="submit"
                className="w-[40px] h-[40px] text-secondary p-0"
                aria-label={""}
              />
              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="border border-stroke h-10 bg-white rounded-[56px] hover:bg-white"
                >
                  <Button
                    variant="secondary"
                    className="font-normal text-sm font-sans flex gap-2 items-center text-secondary"
                  >
                    <span>Publish</span>
                    <WebAngleDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {/* Dropdown menu content */}
                </DropdownMenuContent>
              </DropdownMenu>
            </HStack>
          </HStack>
        </div>
      )}
    </>
  );
};

export default Topbar;
