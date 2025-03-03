import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Button, Input } from "@zeak/react";
import { WebTrigerLighting } from "@zeak/icons";
import "@xyflow/react/dist/style.css";

export const IntegrationsList = ({
  items = [],
  onBackClick,
  onNextClick,
}: any) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSeletctedItem] = useState<(typeof items)[0]>(0);

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div
          className="rounded-lg overflow-hidden shadow-react-flow-container"
          style={{
            boxShadow: "0px 9px 28px 8px #0000000D",
          }}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen">
            <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
              <WebTrigerLighting color="#04A777" />
              <span className="text-[#04A777] ml-3 text-xs">TRIGGER</span>
            </div>
          </div>
          <div className="p-4 shadow-react-flow-container">
            <div className="relative mb-2">
              <Input
                value={searchText}
                onChange={(evt) => setSearchText(evt.target.value)}
                placeholder="Search integrations"
                size={"sm"}
                className=" pr-6"
              />
              <Button
                variant="ghost"
                className="w-6 h-6  p-0 rounded-full right-4 absolute top-[50%] translate-y-[-50%]" //hover:bg-accent-lightGreen
              >
                <CiSearch size={24} />
              </Button>
            </div>
            <ul className="-mb-[5px]">
              {items
                .filter((each: any) =>
                  each.category
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
                )
                .map((item: any) => (
                  <li
                    key={item?.id}
                    data-key={item?.id}
                    className={`flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:border-accent-p2`}
                    style={{
                      background:
                        selectedItem?.id === item?.id ? item?.background : "",
                    }}
                    onClick={() => setSeletctedItem(item)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                      <img
                        src={item?.logoImage}
                        alt=""
                        width={28}
                        height={28}
                      />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-sm">{item?.category}</h3>
                      <p className="text-sm text-tertiary">
                        {item?.categoryDesc}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <hr />
          <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="ghost"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="px-7 rounded-[100px]"
              size="lg"
              disabled={!selectedItem}
              onClick={() => onNextClick(selectedItem)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
