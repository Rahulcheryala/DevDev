import { BiUpload, BiX } from "react-icons/bi";
import type { ChangeEvent } from "react";
import { useState, useEffect } from "react";

const FILE_TYPES = [
  { label: "Document", value: ".doc,.docx" },
  { label: "Presentation", value: ".ppt,.pptx" },
  { label: "Spreadsheet", value: ".xls,.xlsx" },
  { label: "Drawing", value: ".dwg,.dxf" },
  { label: "PDF", value: ".pdf" },
  { label: "Image", value: ".jpg,.jpeg,.png,.gif" },
  { label: "Video", value: ".mp4,.mov,.avi" },
  { label: "Audio", value: ".mp3,.wav" },
];

interface FileUploadFieldProps {
  disabled?: boolean;
  showUpload?: boolean;
  allowedTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  onChange?: (config: {
    allowedTypes: string[];
    maxFiles: number;
    maxFileSize: number;
  }) => void;
}

export function FileUploadField({
  disabled,
  showUpload = true,
  allowedTypes = [],
  maxFiles = 1,
  maxFileSize = 10,
  onChange,
}: FileUploadFieldProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(allowedTypes);
  const [filesLimit, setFilesLimit] = useState(maxFiles);
  const [sizeLimit, setSizeLimit] = useState(maxFileSize);
  const [previews, setPreviews] = useState<
    Array<{ url: string; name: string }>
  >([]);

  useEffect(() => {
    if (onChange) {
      const config = {
        allowedTypes: selectedTypes,
        maxFiles: filesLimit,
        maxFileSize: sizeLimit,
      };
      if (
        config.allowedTypes !== allowedTypes ||
        config.maxFiles !== maxFiles ||
        config.maxFileSize !== maxFileSize
      ) {
        onChange(config);
      }
    }
  }, [
    selectedTypes,
    filesLimit,
    sizeLimit,
    onChange,
    allowedTypes,
    maxFiles,
    maxFileSize,
  ]);

  const handleTypeChange = (value: string, checked: boolean) => {
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value),
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    const newPreviews = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPreviews((prev) => [...prev, ...newPreviews].slice(0, filesLimit));
    console.log(previews, filesLimit);
  };

  const handleRemoveFile = (urlToRemove: string) => {
    setPreviews((prev) => prev.filter((p) => p.url !== urlToRemove));
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  return (
    <div className="grid w-full items-center gap-4">
      {showUpload && (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <input
            id="file"
            type="file"
            className="hidden"
            disabled={disabled}
            accept={selectedTypes.join(",")}
            onChange={handleFileChange}
            multiple
          />
          <label
            htmlFor="file"
            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
          >
            <div className="flex flex-col items-center space-y-2">
              <BiUpload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-500">
                Drop files here or click to upload
              </span>
            </div>
          </label>
          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {previews.map((preview) => (
                <div key={preview.url} className="relative">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(preview.url)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    type="button"
                  >
                    <BiX className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!disabled && !showUpload && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Allow only specific file types
              </label>
              <input
                type="checkbox"
                checked={selectedTypes.length > 0}
                onChange={(checked) => {
                  if (!checked) setSelectedTypes([]);
                }}
              />
            </div>
            {selectedTypes.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {FILE_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.value)}
                      onChange={(e) =>
                        handleTypeChange(type.value, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Maximum number of files
            </label>
            <select
              value={filesLimit}
              onChange={(e) => setFilesLimit(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Maximum file size</label>
            <select
              value={sizeLimit}
              onChange={(e) => setSizeLimit(Number(e.target.value))}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {[1, 2, 5, 10].map((size) => (
                <option key={size} value={size}>
                  {size} MB
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-gray-500">
            This form can accept up to 1 GB of files.
          </p>
        </div>
      )}
    </div>
  );
}
