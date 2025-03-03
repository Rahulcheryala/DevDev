import { useState } from "react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { Link } from "@remix-run/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { LuChevronDown, LuChevronUp, LuSettings2 } from "react-icons/lu";
import { path } from "~/utils/path";
import { BiSearch } from "react-icons/bi";
import { UserIcon1 } from "@zeak/icons";
type SettingsProps = {
  isSelectable?: boolean;
  title: string;
  isMoreVisible?: boolean;
};
const SettingsList = (props: SettingsProps) => {
  const { isSelectable, title, isMoreVisible } = props;
  const settingsListInitial = [
    {
      name: "User profile",
      to: path.to.profile,
    },
    {
      name: "Tenant management",
      to: "#",
    },

    {
      name: "Companies",
      to: path.to.companySettings,
    },
    {
      name: "Teams",
      to: path.to.teams,
    },
    {
      name: "Departments ",
      to: path.to.departments,
    },
    {
      name: "Users",
      to: "#",
    },
    {
      name: "Subscription and Billing",
      to: "#",
    },
    {
      name: "Font Manager",
      to: path.to.fontManagerApplicationFonts,
    },
    {
      name: "Workflows",
      to: "#",
    },
    {
      name: "Branding",
      to: "#",
    },
    {
      name: "Integrations",
      to: "#",
    },
    {
      name: "Notifications",
      to: "#",
    },
    {
      name: "Security",
      to: "#",
    },
  ];

  const [settingsList, setSettingsListInitial] = useState(settingsListInitial);

  const handleFilterList = (e: any) => {
    let value = e.target.value;
    if (value) {
      const filteredList = settingsList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setSettingsListInitial(filteredList);
    } else {
      setSettingsListInitial(settingsListInitial);
    }
  };
  return (
    <div className="mt-4 pb-5 flex justify-between">
      <div className="w-full relative flex justify-between items-center">
        {isSelectable ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="text-[32px] text-accent-dark leading-[36px] font-semibold tracking-wider flex items-center py-0 px-0 outline-none focus-visible:outline-none">
              {title}
              {true ? (
                <LuChevronDown className="text-secondary ml-4" size={24} />
              ) : (
                <LuChevronUp className="text-secondary ml-4" size={24} />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="min-w-[436px] pb-6 bg-card"
            >
              <ValidatedForm
                validator={[]}
                className="px-6 pt-6 sticky top-0 left-0 bg-card pb-4"
              >
                <h4 className="text-accent-dark font-medium mb-4">Settings</h4>
                <div className="relative">
                  <Input
                    className="max-w-full w-full h-10 pl-[44px]"
                    placeholder="Search"
                    autoComplete="off"
                    onChange={handleFilterList}
                  />
                  <BiSearch
                    size={20}
                    className="absolute top-[50%] -translate-y-[50%] left-4"
                  />
                </div>
              </ValidatedForm>
              <div className="max-h-[360px] overflow-y-auto">
                {settingsList.map((settings, index) => (
                  <>
                    {index !== 0 && (
                      <DropdownMenuSeparator className="my-0 mx-6" />
                    )}
                    <Link
                      key={index}
                      className="w-full block hover:bg-accent-bgHoverNew px-6 py-5"
                      to={settings.to}
                    >
                      {settings.name}
                    </Link>
                  </>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider">
              {title}
            </h2>
            <Button className="p-0 absolute right-0 bottom-0" variant="ghost">
              <IoCloseOutline size={32} />
            </Button>
          </>
        )}
        {isMoreVisible && (
          <>
            <div className="flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex text-sm items-center py-0 px-0 outline-none focus-visible:outline-none">
                  <LuSettings2 className="mr-3 text-textLink" />
                  Preferences{" "}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[150px] max-h-[300px] overflow-y-auto"
                >
                  <Link
                    className="w-full block hover:bg-accent-bgHoverNew p-3"
                    to="#"
                  >
                    Preference 1
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <hr className="w-[1px] bg-stroke h-6" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex text-sm items-center py-0 px-0 outline-none focus-visible:outline-none">
                  <UserIcon1 className="mr-3 text-textLink" />
                  Manage Notification
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[150px] max-h-[300px] overflow-y-auto"
                >
                  <Link
                    className="w-full block hover:bg-accent-bgHoverNew p-3"
                    to="#"
                  >
                    More option 1
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <hr className="w-[1px] bg-stroke h-6" />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex text-sm items-center py-0 px-0 outline-none focus-visible:outline-none">
                  <FiMoreHorizontal className="mr-3 text-textLink" />
                  More{" "}
                  {true ? (
                    <LuChevronDown className="text-secondary ml-3" size={24} />
                  ) : (
                    <LuChevronUp className="text-secondary ml-3" size={24} />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="min-w-[150px] max-h-[300px] overflow-y-auto"
                >
                  <Link
                    className="w-full block hover:bg-accent-bgHoverNew p-3"
                    to="#"
                  >
                    More option 1
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsList;
