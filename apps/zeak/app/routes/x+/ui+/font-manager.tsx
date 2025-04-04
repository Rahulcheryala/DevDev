import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
} from "@zeak/react";
import { FilePond } from "react-filepond";
import { useState } from "react";
import { TrashThreeIcon, WebArrowLeft } from "@zeak/icons";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Breadcrumbs } from "~/components";

export default function FontManager() {
  const defaultTab = "applicationFonts";
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };
  return (
    <div className="py-[26px] px-[50px] w-full">
      <div className="flex items-center">
        <WebArrowLeft />
        <Breadcrumbs />
      </div>
      <div className="mt-[22px] mb-[20px] min-h-[56px] flex justify-between">
        <h2 className="text-[32px] text-accent leading-[36px] font-semibold tracking-wider w-[calc(100%_-_160px)]">
          Font Manager
        </h2>
      </div>

      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        value={currentTab}
        className="w-full"
      >
        <TabsList aria-label="font-tabs" className="">
          <TabsTrigger value="applicationFonts">Application Fonts</TabsTrigger>
          <TabsTrigger value="uploadedFonts">Uploaded Fonts</TabsTrigger>
        </TabsList>
        <TabsContent value="applicationFonts" className="pt-6">
          <ApplicationFonts />
        </TabsContent>
        <TabsContent value="uploadedFonts" className="pt-6">
          <UploadedFonts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const ApplicationFonts = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="pr-8">
          <div>
            <h4 className="text-sm mb-3">Fonts ({"200"})</h4>
            <h5 className="text-sm text-secondary">All Fonts</h5>
          </div>
          <div className="pt-8">
            <form>
              <div className="relative mb-6">
                <Input
                  name="search"
                  placeholder="Search Font"
                  className="pl-[44px]"
                />
                <RxMagnifyingGlass className="w-5 h-5 absolute top-[50%] left-4 -translate-y-[50%]" />
              </div>
              <ul className="-my-[4]">
                <li className="my-4">
                  <Button
                    variant="ghost"
                    className="py-[18px] pl-3  h-auto  w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span className="text-secondary">Aa</span>
                    <p className="text-sm ml-4">Arial Bold</p>
                  </Button>
                </li>
                <li className="my-4">
                  <Button
                    variant="ghost"
                    className="py-[18px] pl-3  h-auto  w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span className="text-secondary">Aa</span>
                    <p className="text-sm ml-4">Arial Bold</p>
                  </Button>
                </li>
                <li className="my-4">
                  <Button
                    variant="ghost"
                    className="py-[18px] pl-3  h-auto  w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span className="text-secondary">Aa</span>
                    <p className="text-sm ml-4">Arial Bold</p>
                  </Button>
                </li>
                <li className="my-4">
                  <Button
                    variant="ghost"
                    className="py-[18px] pl-3  h-auto  w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span className="text-secondary">Aa</span>
                    <p className="text-sm ml-4">Arial Bold</p>
                  </Button>
                </li>
              </ul>
            </form>
            <p className="text-secondary text-sm text-center tracking-[0.5px] mt-4">
              Total fonts {"200"}
            </p>
          </div>
        </div>
        <PreviewFontContent />
      </div>
    </>
  );
};

const UploadedFonts = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file));
  };

  const maxFileSize = 1048576;
  return (
    <>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="pr-8">
          <div>
            <h4 className="text-sm mb-3">Fonts ({"200"})</h4>
            <h5 className="text-sm text-secondary">
              Click Add a New Font or drag and drop a font below to upload.
            </h5>
          </div>
          <div className="pt-6">
            <div className="custom-filepond-wrap border border-dashed rounded-lg mb-6 bg-stroke-primary">
              <FilePond
                files={files}
                onupdatefiles={handleUpdateFiles}
                allowMultiple={true}
                maxFiles={10}
                maxFileSize={`${maxFileSize / 1024 / 1024}MB`}
                acceptedFileTypes={["image/png", "image/jpeg"]}
                labelFileTypeNotAllowed="Expects .jpg, .jpeg or .png"
                labelIdle={`<span class="flex flex-col items-center p-6">
                    <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M17.5 13V14C17.5 15.4001 17.5 16.1002 17.2275 16.635C16.9878 17.1054 16.6054 17.4878 16.135 17.7275C15.6002 18 14.9001 18 13.5 18H6.5C5.09987 18 4.3998 18 3.86502 17.7275C3.39462 17.4878 3.01217 17.1054 2.77248 16.635C2.5 16.1002 2.5 15.4001 2.5 14V13M14.1667 7.16667L10 3M10 3L5.83333 7.16667M10 3V13"
                        stroke="#19110B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                    <span class="mb-1" style="font-size: 12px">
                      Drag and Drop a font file, or
                    </span>
                    <span class="text-accent-primary underline underline-offset-1 mb-1" style="font-size: 12px">
                      Browse
                    </span>
                    <span class="text-tertiary text-center" style="font-size: 12px">
                      Select a font file (.ttf, .ttc, or .otf) to upload, or
                      drag and drop a file directly to that manager.
                    </span>
                  </span>`}
                onerror={(e) => console.error(e)}
              />
            </div>
            <div>
              <div className="relative mb-6">
                <Input
                  name="search"
                  placeholder="Search Font"
                  className="pl-[44px]"
                />
                <RxMagnifyingGlass className="w-5 h-5 absolute top-[50%] left-4 -translate-y-[50%]" />
              </div>
              <ul className="-my-[4]">
                <li className="my-4 relative">
                  <Button
                    type="button"
                    variant="ghost"
                    className="py-[18px] pl-3  h-auto  w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span className="text-secondary">Aa</span>
                    <p className="text-sm ml-4">Arial Bold</p>
                  </Button>
                  <Button
                    variant="ghost"
                    type="button"
                    className="p-0 absolute top-[50%] -translate-y-[50%] right-[18px]"
                  >
                    <TrashThreeIcon color="hsl(var(--accent-red))" />
                  </Button>
                </li>
              </ul>
            </div>
            <p className="text-secondary text-sm text-center tracking-[0.5px] mt-4">
              Fonts uploaded - {"1"}
            </p>
          </div>
        </div>
        <PreviewFontContent />
      </div>
    </>
  );
};
const PreviewFontContent = () => {
  return (
    <>
      <div className="px-8">
        <h4 className="text-sm mb-6">Preview</h4>
        <div className="px-[80px] py-[40px] border border-dashed border-tertiary rounded-lg min-h-[calc(100vh_-_400px)] flex items-center justify-center">
          {false ? (
            <p className="text-sm text-secondary text-center">
              Select font to see preview
            </p>
          ) : (
            <div>
              {/* Applying font family in this div  */}
              <h3 className="mb-3 text-5xl">Suisse Neue</h3>
              <h4 className="mb-3 text-4xl">ABCDEFGHIJKLM NOPQRSTUVWXYZ</h4>
              <h5 className="mb-3 text-3xl">abcdefghijklm nopqrstuvwxyz</h5>
              <h6 className="mb-3 text-2xl">0123456789</h6>
              <p className="mb-2 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cilium dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Lorem ipsum dolor sit amet, consectetur adipisicing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
