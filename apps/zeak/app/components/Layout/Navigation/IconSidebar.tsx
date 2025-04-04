import { Button, VStack, cn, useDisclosure } from "@zeak/react";
import { Link, useLocation, useMatches, useNavigate } from "@remix-run/react";
import { noop } from "@tanstack/react-table";
import {
  forwardRef,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
} from "react";
import { z } from "zod";
import type { Authenticated, NavItem } from "~/types";
import { useModules } from "./useModules";
import {
  BellIcon,
  BrandingIcon,
  BuildingIcon,
  DollarIcon,
  FlowIcon,
  IntegrationIcon,
  LockIcon,
  UserIcon,
  UserSettingsIcon,
  UsersIcon,
  WebMenuVerticalDots,
  WebPin,
} from "@zeak/icons";
import { path } from "~/utils/path";
import { HiOutlineArrowLeft } from "react-icons/hi";

export const ModuleHandle = z.object({
  module: z.string(),
});

const IconSidebar = ({
  onMenuPinned,
  onSettingClicked,
}: {
  onMenuPinned: (value: boolean) => void;
  onSettingClicked: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [navigationPanelHover, setNavigationPanelHover] = useState(false);
  const [navigationCollapse, setNavigationCollapse] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigationPanel = useDisclosure();
  const links = useModules();
  const location = useLocation();
  const isLabelsHomeView = location.pathname.includes("labels-reports/home");
  // const isLabelsView = location.pathname.includes("labels-reports");
  const isEditorView = location.pathname.includes("labels/editor");

  const matchedModules = useMatches().reduce((acc, match) => {
    if (match.handle) {
      const result = ModuleHandle.safeParse(match.handle);
      if (result.success) {
        acc.add(result.data.module);
      }
    }

    return acc;
  }, new Set<string>());

  useEffect(() => {
    if (location.pathname.includes("access-settings")) {
      setIsSettingsOpen(true);
      navigationPanel.onOpen();
    }
  }, [location.pathname, navigationPanel]);

  useEffect(() => {
    onMenuPinned(navigationPanel.isOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationPanel.isOpen]);
  useEffect(() => {
    onSettingClicked(isSettingsOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettingsOpen]);

  const settingsList = [
    {
      icon: <UserIcon />,
      name: "User profile",
      to: path.to.profile,
    },
    {
      icon: <UserSettingsIcon />,
      name: "Tenant management",
      to: "#",
    },

    {
      icon: <BuildingIcon />,
      name: "Companies",
      to: path.to.companySettings,
    },
    {
      icon: <BuildingIcon />,
      name: "Teams",
      to: path.to.teams,
    },
    {
      icon: <UserSettingsIcon />,
      name: "Departments ",
      to: path.to.departments,
    },
    {
      icon: <UsersIcon />,
      name: "Users",
      to: path.to.users,
    },
    {
      icon: <DollarIcon />,
      name: "Subscription and Billing",
      to: "#",
    },
    {
      icon: <DollarIcon />,
      name: "Font Manager",
      to: path.to.fontManagerApplicationFonts,
    },
    {
      icon: <FlowIcon />,
      name: "Workflows",
      to: "#",
    },
    {
      icon: <BrandingIcon />,
      name: "Branding",
      to: "#",
    },
    {
      icon: <IntegrationIcon />,
      name: "Integrations",
      to: "#",
    },
    {
      icon: <BellIcon />,
      name: "Notifications",
      to: "#",
    },
    {
      icon: <LockIcon />,
      name: "Security",
      to: "#",
    },
  ];

  return (
    <div
      className={`h-full z-10 ${navigationPanel.isOpen ? "relative" : "absolute"
        } left-0 top-0 `}
    >
      {isEditorView && (
        <div
          className={`border-b border-[#E9E9EE] h-[64px] w-full ${navigationPanel.isOpen
              ? "px-[30px] py-[16px]"
              : "px-[4px] py-[12px] flex items-center justify-center"
            }`}
        >
          <Link to={"/"} className="flex items-center">
            <img
              src="/images/logo.svg"
              alt="ProjectX"
              className="w-[32px] h-[32px]"
            />{" "}
            {navigationPanel.isOpen && (
              <span className="text-[20px] font-medium leading-[22px] text-accent ml-[8px]">
                ProjectX
              </span>
            )}
          </Link>
        </div>
      )}
      <nav
        data-state={
          navigationPanel.isOpen || navigationPanelHover
            ? "expanded"
            : "collapsed"
        }
        onMouseEnter={() => setNavigationPanelHover(true)}
        onMouseLeave={() => setNavigationPanelHover(false)}
        className={cn(
          "bg-white group z-10 h-full w-[80px] data-[state=expanded]:w-[250px]",
          "transition-width duration-200",
          `flex flex-col w-full justify-between overflow-y-auto overflow-x-hidden rounded-tr-[10px] ${navigationPanelHover
            ? "shadow-[0px_9px_28px_8px_rgba(0,0,0,0.02)]"
            : ""
          }`,
          `${isLabelsHomeView
            ? "h-[calc(100vh_-_80px)]"
            : "h-[calc(100vh_-_96px)] flex-row"
          }`,
        )}
      // onClick={navigationPanel.onToggle}
      // onMouseLeave={navigationPanel.onClose}
      >
        <div
          className={`flex flex-col justify-between w-full ${isLabelsHomeView
              ? "h-[calc(100vh_-_80px)]"
              : "h-[calc(100vh_-_96px)]"
            }`}
        >
          <VStack
            spacing={1}
            className="flex flex-col justify-start space-y-0 pt-[15px] relative px-[16px]"
          >
            {isSettingsOpen ? (
              <>
                <div className="w-full min-w-[54px]">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSettingsOpen(false);
                      navigationPanel.onClose();
                      navigate(path.to.authenticatedRoot);
                    }}
                    className={`relative w-full flex items-center px-[15px] h-[50px] py-[13px] rounded-none border-b border-[#E9E9EE] ${navigationPanelHover || navigationPanel.isOpen
                        ? "justify-start"
                        : "justify-center"
                      }`}
                  >
                    <HiOutlineArrowLeft className="flex rounded-md items-center items-center justify-center" />
                    {(navigationPanelHover || navigationPanel.isOpen) && (
                      <span
                        className={cn(
                          "font-semibold text-[20px] leading-[24px] leading-[16px] tracking-wider text-accent",
                          "group-data-[state=collapsed]:mt-[4px] group-data-[state=expanded]:ml-[16px]  group-data-[state=collapsed]:text-center group-data-[state=expanded]:text-left whitespace-nowrap",
                        )}
                      >
                        Settings
                      </span>
                    )}
                  </Button>
                  <div className="py-[20px]">
                    {settingsList.map((setting, index) => (
                      <Link
                        key={index}
                        to={setting.to}
                        className={`relative w-full flex items-center px-[15px] h-[40px] mb-4 py-[10px] font-normal hover:font-medium hover:bg-accent-bgHoverNew  ${location?.pathname.includes(setting.to)
                            ? "text-accent-blueDark bg-accent-bgHoverNew"
                            : "text-accent"
                          } ${navigationPanelHover || navigationPanel.isOpen
                            ? "justify-start rounded-[8px]"
                            : "justify-center rounded-none"
                          }`}
                      >
                        {/* <span className="min-w-6">{setting.icon}</span> */}
                        {(navigationPanelHover || navigationPanel.isOpen) && (
                          <span
                            className={cn(
                              `leading-[16px] tracking-wider`,
                              "group-data-[state=collapsed]:mt-[4px]  group-data-[state=collapsed]:text-[10px] group-data-[state=expanded]:text-[14px] whitespace-nowrap",
                            )}
                          >
                            {setting.name}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {(navigationPanelHover || navigationPanel.isOpen) && (
                  <Link
                    to="#"
                    className={`py-[2px] flex items-center justify-center w-[32px] h-[32px] rounded-md absolute top-[8px] right-0 z-[2]`}
                    onClick={() => {
                      navigationPanel.onToggle();
                    }}
                  >
                    <WebPin />
                  </Link>
                )}
                {links.slice(0, 7).map((link: any) => {
                  const module = link.to.split("/")[0]; // link.to is "/parts" -- this returns "parts"
                  const isActive = matchedModules.has(module);
                  return (
                    <NavigationIconLink
                      key={link.name}
                      link={link}
                      isActive={isActive}
                      isOpen={navigationPanel.isOpen}
                      isOpenOnHover={navigationPanelHover}
                    // onClick={navigationPanel.onClose}
                    />
                  );
                })}
                {navigationCollapse && (
                  <>
                    {links.slice(8, links.length).map((link: any) => {
                      const module = link.to.split("/")[0]; // link.to is "/parts" -- this returns "parts"
                      const isActive = matchedModules.has(module);
                      return (
                        <NavigationIconLink
                          key={link.name}
                          link={link}
                          isActive={isActive}
                          isOpen={navigationPanel.isOpen}
                          isOpenOnHover={navigationPanelHover}
                        // onClick={navigationPanel.onClose}
                        />
                      );
                    })}
                  </>
                )}

                <Link
                  to={"#"}
                  className={`w-full flex flex-wrap items-center text-left rounded-[8px] min-h-[50px] py-[13px] font-normal hover:font-medium hover:bg-accent-bgHoverNew ${navigationPanel.isOpen || navigationPanelHover
                      ? "px-[15px]"
                      : "px-[0] justify-center"
                    }`}
                  onClick={() => setNavigationCollapse(!navigationCollapse)}
                >
                  <WebMenuVerticalDots />
                  <span
                    className={`leading-[16px] tracking-wider text-accent group-data-[state=collapsed]:mt-[2px] group-data-[state=expanded]:ml-[16px] text-[14px] group-data-[state=collapsed]:text-center group-data-[state=expanded]:text-left group-data-[state=collapsed]:w-full group-data-[state=expanded]:w-auto`}
                  >
                    {!navigationCollapse ? "More" : "Less"}
                  </span>
                </Link>
              </>
            )}
          </VStack>
          <div className="pb-[15px] px-[16px]">
            {!isSettingsOpen && (
              <div
                // to={path.to.rolesPermissions}
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen);
                  navigationPanel.onOpen();
                  navigate(path.to.profile);
                }}
                className={`w-full flex items-center text-left rounded-[8px] h-[50px] py-[13px] hover:bg-accent-bgHoverNew ${navigationPanel.isOpen || navigationPanelHover
                    ? "px-[15px]"
                    : "px-[0] justify-center"
                  }`}
              >
                <img
                  src="/images/left-menu/setting.svg"
                  alt="setting"
                  className="w-[20px] h-[20px]"
                />
                {(navigationPanel.isOpen || navigationPanelHover) && (
                  <span className="font-light leading-[16px] tracking-wider text-accent group-data-[state=collapsed]:mt-[4px] group-data-[state=expanded]:ml-[16px] group-data-[state=collapsed]:text-[10px] group-data-[state=expanded]:text-[14px] group-data-[state=collapsed]:text-center group-data-[state=expanded]:text-left">
                    Settings
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

interface NavigationIconButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  link: Authenticated<NavItem>;
  isActive?: boolean;
  isOpen?: boolean;
  isOpenOnHover?: boolean;
}

const NavigationIconLink = forwardRef<
  HTMLAnchorElement,
  NavigationIconButtonProps
>(
  (
    {
      link,
      isActive = false,
      isOpen = false,
      isOpenOnHover = false,
      onClick = noop,
      ...props
    },
    ref,
  ) => {
    const iconClasses = [
      "absolute left-3 top-3 flex rounded-md items-center items-center justify-center", // Layout
    ];

    const classes = [
      "relative w-full rounded-[8px]",
      "transition-all duration-200",
      "flex items-center",
      "group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:flex-col group-data-[state=collapsed]:px-0 px-[15px] h-[50px] py-[13px]",
      "hover:bg-accent-bgHoverNew hover:font-medium",
      `${isActive ? "bg-dropdownHoverBg" : "hover:text-foreground"}`,
      "group/item",
    ];

    return (
      <Link
        role="button"
        aria-current={isActive}
        ref={ref}
        to={link.to}
        {...props}
        onClick={onClick}
        className={cn(classes, props.className)}
        prefetch="intent"
      >
        <link.icon className={cn(...iconClasses)} />
        {(isOpen || isOpenOnHover) && (
          <span
            aria-hidden={isOpen || isOpenOnHover || undefined}
            className={cn(
              "leading-[16px] tracking-wider text-accent font-normal",
              "group-data-[state=collapsed]:mt-[4px] group-data-[state=expanded]:ml-[16px] group-data-[state=collapsed]:text-[10px] group-data-[state=expanded]:text-[14px] group-data-[state=collapsed]:text-center group-data-[state=expanded]:text-left whitespace-nowrap",
            )}
          >
            {link.name}
          </span>
        )}
      </Link>
    );
  },
);
NavigationIconLink.displayName = "NavigationIconLink";

export default IconSidebar;
