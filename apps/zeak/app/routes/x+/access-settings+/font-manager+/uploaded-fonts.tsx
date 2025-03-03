import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { s3Client } from "~/lib/s3";
import {
  addFontValidator,
  insertFont,
  AWS_FONTS_FOLDER_NAME,
  getFonts,
  type UploadedFontType,
} from "~/modules/access-settings";
import {
  FontList,
  PreviewFont,
} from "~/modules/access-settings/ui/font-manager";
import { populateSignedUrlInList } from "~/modules/shared/shared.server";
import { requirePermissions } from "~/services/auth/auth.server";
import { flash } from "~/services/session.server";
import { path } from "~/utils/path";
import { error, success } from "~/utils/result";
import { assertIsPost } from "~/utils/http";
import { validationError } from "@zeak/remix-validated-form";
import { uploadFileToS3FromBrowser } from "~/utils/helper";
import { Button } from "@zeak/react";
import { FaPlus } from "react-icons/fa";
import FileUploadModal from "~/components/FileUploadModal";
import {
  FONTS_ALLOWED_FILE_MIME_TYPES,
  FONTS_EXPECTED_TYPES_LABEL,
  MAX_FILES_ALLOWED_TO_UPLOAD,
  MAX_FILES_SIZE,
} from "~/modules/access-settings/configuration";
import EmptyList from "~/modules/shared/ui/EmptyList";
import { EmptyListOriginOptions } from "~/modules/shared";

export async function loader({ request }: LoaderFunctionArgs) {
  const { client } = await requirePermissions(request, {
    view: "users",
    role: "employee",
  });

  const fonts = await getFonts(client);

  if (fonts.error) {
    redirect(
      request.url,
      await flash(request, error(fonts.error, "Failed to fetch details")),
    );
  }

  // populate s3 signedUrl in assetUrl for fontsList and return whole object data
  const fontsList = (await populateSignedUrlInList(
    s3Client,
    fonts?.data as Array<UploadedFontType>,
    "assetUrl",
  )) as Array<UploadedFontType>;

  return json({
    data: fontsList ?? [],
    count: fontsList.length ?? 0,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  assertIsPost(request);

  const { client, userId } = await requirePermissions(request, {
    create: "users",
  });

  const formData = await request.formData();

  // Parse formData into an array of font objects
  const fontsData = [];
  const keys = Array.from(formData.keys());

  const fontsCount = keys.filter((key) => key.startsWith("fonts[")).length / 2;

  for (let i = 0; i < fontsCount; i++) {
    const name = formData.get(`fonts[${i}][name]`) as string;
    const assetUrl = formData.get(`fonts[${i}][assetUrl]`) as string;
    fontsData.push({ name, assetUrl });
  }

  try {
    addFontValidator.parse(fontsData);
  } catch (e: any) {
    return validationError(e);
  }
  // Validate the array of fonts

  const insertResults = await Promise.all(
    fontsData.map((font) =>
      insertFont(client, {
        ...font,
        createdBy: userId,
      }),
    ),
  );

  const errorInserts = insertResults.filter((result) => result.error);

  if (errorInserts.length > 0) {
    return redirect(
      path.to.fontManagerUploadedFonts,
      await flash(request, error("Failed to create one or more fonts")),
    );
  }

  return redirect(
    path.to.fontManagerUploadedFonts,
    await flash(request, success("Fonts added successfully")),
  );
}

export default function UploadedFonts() {
  const [showModal, setShowModal] = useState(false);
  const { data, count } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [filteredFontCount, setFilteredFontCount] = useState<number>();

  const uploadFont = async (fontFiles: Array<File>) => {
    if (fontFiles?.length) {
      const fileList: Array<File> = [];
      fontFiles.forEach((fontFile) => {
        const newFileName = encodeURI(`${Date.now()}-${fontFile.name}`);
        const newFile = new File([fontFile], newFileName, {
          type: fontFile.type,
        });
        fileList.push(newFile);
      });

      const assetUrlList = await uploadFileToS3FromBrowser(
        fileList,
        AWS_FONTS_FOLDER_NAME,
      );
      const formData = new FormData();

      assetUrlList.forEach((assetUrl: string, index: number) => {
        formData.append(`fonts[${index}][name]`, fileList[index].name);
        formData.append(`fonts[${index}][assetUrl]`, assetUrl);
      });
      fetcher.submit(formData, { method: "POST" });
    }
  };

  return (
    <>
      <div className="pt-6">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="pr-8">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">
                Fonts ({filteredFontCount})
              </h4>
              <Button
                variant="ghost"
                onClick={() => setShowModal(true)}
                className="flex items-center text-accent-primary hover:text-accent-primary"
              >
                <FaPlus className="mr-2" /> Add Font
              </Button>
            </div>
            <div className="pt-6">
              <div className="mb-3">
                <FontList
                  data={data}
                  count={count}
                  origin="uploaded"
                  onFontClick={(e) => setSelectedFont(e)}
                  onSearch={(fontCount) => setFilteredFontCount(fontCount)}
                />
              </div>

              {/* To be used in case of no font*/}
              {count <= 0 && (
                <EmptyList
                  origin={EmptyListOriginOptions.FontManagerUpload}
                  title="No fonts to show"
                  ctaText="Click here to add Fonts"
                  ctaHandle={() => setShowModal(true)}
                />
              )}
            </div>
          </div>
          <PreviewFont selectedFont={selectedFont} />
        </div>
      </div>
      <FileUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        maxFiles={MAX_FILES_ALLOWED_TO_UPLOAD}
        maxFileSize={MAX_FILES_SIZE}
        onSubmit={uploadFont}
        acceptedFileTypes={FONTS_ALLOWED_FILE_MIME_TYPES}
        fileValidateTypeLabelExpectedTypes={FONTS_EXPECTED_TYPES_LABEL}
        labelIdle={`
                <span class="flex flex-col items-center p-6">
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
                  <span class="text-tertiary text-center" style="font-size: 12px; max-width: 300px; margin: 0 auto">
                    Select up to ${MAX_FILES_ALLOWED_TO_UPLOAD} font file (.ttf, .ttc, or .otf) to upload, or drag and drop a file directly to the font manager.
                  </span>
                </span>`}
      />
    </>
  );
}
