import { Tabs, TabsList, TabsTrigger } from "@zeak/react";
import { Breadcrumbs } from "~/components";
import { GoArrowLeft } from "react-icons/go";
import { Outlet, useLocation, useNavigate } from "@remix-run/react";
import { path } from "~/utils/path";
import type { Handle } from "~/utils/handle";
import { FontManagerTabMap } from "~/modules/access-settings";

export const handle: Handle = {
  breadcrumb: "Font Manager",
  to: path.to.fontManagerApplicationFonts,
};

export default function FontManager() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (tabName: string) => {
    navigate(
      tabName === FontManagerTabMap.UPLOADED_FONTS
        ? path.to.fontManagerUploadedFonts
        : path.to.fontManagerApplicationFonts,
    );
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <GoArrowLeft size={24} className="text-secondary" />
        <Breadcrumbs />
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Font Manager
        </h2>
      </div>

      <Tabs
        onValueChange={handleTabChange}
        value={
          location.pathname.includes(FontManagerTabMap.UPLOADED_FONTS)
            ? FontManagerTabMap.UPLOADED_FONTS
            : FontManagerTabMap.APPLICATION_FONTS
        }
        className="w-full"
      >
        <TabsList aria-label="font-tabs" className="">
          <TabsTrigger value={FontManagerTabMap.APPLICATION_FONTS}>
            Application Fonts
          </TabsTrigger>
          <TabsTrigger value={FontManagerTabMap.UPLOADED_FONTS}>
            Uploaded Fonts
          </TabsTrigger>
        </TabsList>
        <Outlet />
      </Tabs>
    </>
  );
}
