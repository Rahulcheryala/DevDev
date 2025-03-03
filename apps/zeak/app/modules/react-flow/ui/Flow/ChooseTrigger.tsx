import { WebTrigerLighting } from "@zeak/icons";
import { FaArrowRightLong } from "react-icons/fa6";
import System from "./assets/System.svg";
import Custom from "./assets/Custom.svg";

const List_Items = {
  id: "step1",
  icon: Custom,
  name: "Trigger",
  showSearchBar: true,
  placeholder: "Search custom",
  titleBg: "#A259FF1F",
  titleColor: "#A259FF",
  addEdge: true,
  optionData: [
    {
      optionsTitle: "",
      events: [
        {
          id: "step21",
          imageUrl: "/images/dynamics365.png",
          background: "#F2F1FD",
          title: "Dynamics 365 F&O",
          description: "Lorem ipsum dolor sit amet set consectetur.",
          clientId: 1002024,
          clientSecret: "askdnkjasndvanrewvkjnedrvaner",
          resourceUrl: "http://loremipsum.dynamics.com",
          icon: System,
          titleColor: "#04A777",
          titleBg: "rgba(4, 167, 119, 0.12)",
          showSearchBar: true,
          placeholder: "Search Integration",
          isDisabled: false,
          trigger: [
            {
              name: "Sales order is created",
              description: "When a sales order is created in my ERP",
              showSecondaryOptions: false,
              isDisabled: false,
              imageUrl: "/images/dynamics365.png",
              icon: System,
            },
          ],
        },
        {
          id: "step22",
          imageUrl: "/images/businessCentral.svg",
          background: "#DEFDFF",
          name: "Business Central",
          description: "Lorem ipsum dolor sit amet set consectetur.",
          clientId: 1002025,
          clientSecret: "askdnkjasndvanrewvkjnedrvaner",
          resourceUrl: "http://loremipsum.business.com",
          icon: System,
          titleColor: "#04A777",
          titleBg: "rgba(4, 167, 119, 0.12)",
          showSearchBar: true,
          placeholder: "Search Integration",
          isDisabled: false,
          trigger: {
            name: "Get New Customer Info",
            description: "Event (Create)",
            from: "CustomerV2",
          },
        },
      ],
    },
  ],
};

export const ChooseTrigger = ({ onNextClick }: any) => {
  return (
    <>
      <div
        className="flex flex-col"
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px]">
          <WebTrigerLighting color="#04A777" />
          <span className="text-[#04A777] ml-3 text-xs">TRIGGER</span>
        </div>
        <div className="flex justify-between items-center bg-white px-4 py-[18px] rounded-b-[10px]">
          <span className="text-sm" onClick={() => onNextClick(List_Items)}>
            Choose the trigger
          </span>
          <button
            onClick={() => onNextClick({ event: List_Items, stepId: "step_0" })}
          >
            <FaArrowRightLong size={18} />
          </button>
        </div>
      </div>
    </>
  );
};
