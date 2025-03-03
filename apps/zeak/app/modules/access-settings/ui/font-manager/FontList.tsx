import { Button, Input } from "@zeak/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import type { ApplicationFontType, UploadedFontType } from "../../types";
import { TrashThreeIcon } from "@zeak/icons";
import { useFetcher } from "@remix-run/react";
import { path } from "~/utils/path";

type FontListProps = {
  data: Array<ApplicationFontType | UploadedFontType>;
  count: number;
  origin: "application" | "uploaded";
  onFontClick: (fontName: string) => void;
  onSearch: (count: number) => void;
};

const OriginOptionMap = {
  APPLICATION: "application",
  UPLOADED: "uploaded",
} as const;

const FontList = ({
  data,
  origin,
  count,
  onFontClick,
  onSearch,
}: FontListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loadedFonts, setLoadedFonts] = useState(new Set<number>());
  const [visibleFonts, setVisibleFonts] = useState<
    Array<UploadedFontType | ApplicationFontType>
  >(data.slice(0, 20)); // Initialize with first 20 fonts
  const [currentPage, setCurrentPage] = useState(1);
  const fetcher = useFetcher();

  const pageSize = 20;

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // Adjust the delay (in ms) for debouncing as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Filter the data based on the debounced query
  useEffect(() => {
    if (debouncedQuery) {
      const filtered = data.filter((font) =>
        font.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
      setFilteredData(filtered);
      setVisibleFonts(filtered.slice(0, currentPage * pageSize)); // Reset visible fonts based on the filtered data
    } else {
      setFilteredData(data);
      setVisibleFonts(data.slice(0, currentPage * pageSize)); // Reset visible fonts based on the original data
    }
  }, [debouncedQuery, data, currentPage]);

  // Intersection Observer for loading more fonts when reaching the bottom
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            filteredData.length > visibleFonts.length
          ) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 },
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [visibleFonts.length, filteredData.length],
  );

  useEffect(() => {
    if (loadMoreRef.current) {
      loadMoreObserver(loadMoreRef.current);
    }
  }, [loadMoreRef, loadMoreObserver]);

  // Dynamically add @font-face rules for each loaded font
  useEffect(() => {
    const styleSheet = document.styleSheets[0];

    visibleFonts.forEach((font, index) => {
      const originalIndex = data.findIndex((f) => f.name === font.name);
      if (!loadedFonts.has(originalIndex)) {
        const fontFace = `
              @font-face {
                font-family: 'CustomFont${originalIndex}';
                src: url('${font.assetUrl}') format('truetype');
              }
            `;
        styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
        setLoadedFonts((prev) => new Set(prev).add(originalIndex));
      }
    });
  }, [visibleFonts, loadedFonts, data]);

  // Update visible fonts when the page changes
  useEffect(() => {
    setVisibleFonts(filteredData.slice(0, currentPage * pageSize));
    onSearch?.(filteredData?.length);
  }, [currentPage, filteredData, onSearch]);

  const handleFontDelete = (id: string) => {
    const formData = new FormData();
    formData.append("ids", id);
    fetcher.submit(formData, {
      method: "POST",
      action: path.to.api.deleteFont,
    });
  };

  return (
    <>
      <form>
        <div className="relative mb-6">
          <Input
            name="search"
            placeholder="Search Font"
            className="pl-[44px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RxMagnifyingGlass className="w-5 h-5 absolute top-[50%] left-4 -translate-y-[50%]" />
        </div>
        {!!visibleFonts.length && (
          <ul
            className="-my-[4] overflow-y-auto h-screen"
            style={{
              maxHeight: "calc(100vh - 550px)",
            }}
          >
            {visibleFonts.map((font, index) => {
              const originalIndex = data.findIndex((f) => f.name === font.name);

              // Only render the list item if the font has been loaded
              if (!loadedFonts.has(originalIndex)) return null;

              return (
                <li
                  className="my-4 relative"
                  key={index}
                  style={{
                    fontFamily: `CustomFont${originalIndex}`,
                  }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => onFontClick(`CustomFont${originalIndex}`)}
                    className="py-[18px] pl-3 h-auto w-full pr-[18px] border border-dashed border-[hsl(var(--stroke))] rounded-lg hover:bg-accent-bgHoverNew justify-start"
                  >
                    <span>Aa</span>
                    <p className="text-sm ml-4">{font.name}</p>
                  </Button>
                  {origin === OriginOptionMap.UPLOADED && (
                    <Button
                      variant="ghost"
                      type="button"
                      className="p-0 absolute top-[50%] -translate-y-[50%] right-[18px]"
                      onClick={(e) =>
                        handleFontDelete((font as UploadedFontType)?.id)
                      }
                    >
                      <TrashThreeIcon color="hsl(var(--accent-red))" />
                    </Button>
                  )}
                </li>
              );
            })}
            <div ref={loadMoreRef}></div>
          </ul>
        )}
      </form>
      {!!visibleFonts.length && (
        <p className="text-secondary text-sm text-center tracking-[0.5px] mt-4">
          {origin !== OriginOptionMap.UPLOADED
            ? "Total fonts"
            : "Fonts uploaded"}{" "}
          {count && `(${count})`}
        </p>
      )}
    </>
  );
};

export default FontList;
