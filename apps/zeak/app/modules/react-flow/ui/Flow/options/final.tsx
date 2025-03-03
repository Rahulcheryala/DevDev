import { WebTrigerLighting } from "@zeak/icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Textarea,
} from "@zeak/react";
import "@xyflow/react/dist/style.css";
import { CiEdit } from "react-icons/ci";
import { BiTrashAlt } from "react-icons/bi";
import { BsShare, BsThreeDotsVertical } from "react-icons/bs";
import Connector from "~/components/ReactFlow/Connector";
import { useEffect, useState } from "react";
import { ChooseOptions } from "../ChooseOptions";
import Integrations from "../assets/Integration.svg";
import EmailInputWithCheckboxes from "~/components/ReactFlow/multiSlelectCheckbox";

export const DotsWithDropdownContent = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
      <IconButton
        aria-label="Favorite"
        variant={"ghost"}
        icon={<BsThreeDotsVertical color="#000" />}
        className=" rounded-full focus-visible:ring-offset-0 focus-visible:shadow-none focus-visible:ring-0 text-secondary hover:text-secondary hover:bg-dropdownHoverBg data-[state=open]:bg-dropdownHoverBg"
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <CiEdit size={20} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Edit
          </span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <BiTrashAlt size={20} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Delete
          </span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="hover:bg-dropdownHoverBg">
        <div className="flex items-center gap-2">
          <BsShare size={16} />
          <span className="text-sm tracking-wider leading-[20px] font-light text-accent">
            Share
          </span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface Props {
  eventData: any;
  data?: any;
  onBackClick?: () => void;
  onNextClick?: (selectedEvent: any, nodeId: string) => void;
  optionsData?: any;
  createCustomNode?: any;
  nodeId?: string;
  updatedata: (data: any, id?: any) => void;
  nodeType?: string;
  hideOptions: boolean;
  setHideOptions: any;
}

export const Final: React.FC<Props> = ({
  eventData,
  data,
  onBackClick,
  onNextClick,
  optionsData,
  createCustomNode,
  nodeId,
  updatedata,
  nodeType = "Action",
  hideOptions,
  setHideOptions,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showConfigurations, setShowConfigurations] = useState<boolean>(false);
  const [showConfiText, setShowConfiText] = useState<boolean>(true);
  const [recipients, setRecipients] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  // Load saved data when component mounts
  useEffect(() => {
    if (data?.metadata) {
      setRecipients(data.metadata.emails || []);
      setMessage(data.metadata.message || "");
    }
  }, [data]);

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleNextClickCallback = (selectedEvent: any) => {
    if (onNextClick && nodeId) {
      onNextClick(selectedEvent, nodeId);
    }
    setShowOptions(!showOptions);
  };

  const toggleConfigurations = () => setShowConfigurations(!showConfigurations);
  const toggleConfigurationsText = () => setShowConfiText(!showConfiText);

  const onSave = () => {
    const updatedData = {
      ...eventData.metadata,
      emails: recipients,
      message: message,
    };

    updatedata(updatedData, eventData?.id);
    toggleConfigurations();
    toggleConfigurationsText();
  };

  return (
    <>
      <div className="rounded-lg overflow-visible shadow-react-flow-container">
        <div className="flex items-center justify-between bg-accent-lightGreen">
          <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
            <WebTrigerLighting color="#04A777" />
            <span className="text-[#04A777] ml-3 text-xs">{nodeType}</span>
          </div>
        </div>
        <div className="p-4 shadow-react-flow-container relative">
          <div className="flex flex-col grow justify-between mx-1 border-solid rounded-[10px] hover:border-accent-p2">
            {eventData?.metadata.condition &&
              eventData.metadata.condition.length > 0 &&
              eventData.metadata.condition.map((c: any, i: number) => (
                <div className="flex flex-row" key={`condition-${i}`}>
                  <span className="text">Condition : </span>
                  <span> {c?.value}</span>
                </div>
              ))}
            <div className="py-1">
              <div className="text-left flex items-center border border-input rounded-[10px] p-2 relative">
                <div className="mr-4">
                  <img src={Integrations} alt="" width={28} height={28} />
                </div>
                <div className="grow">
                  <h3 className="text-sm text-[#19110B]">
                    {eventData?.metadata.event &&
                      (eventData?.metadata.event?.title ||
                        eventData?.metadata.event?.eventName ||
                        eventData?.metadata.event?.name)}
                  </h3>
                  <p className="text-sm text-tertiary">
                    {eventData?.metadata.event &&
                      (eventData.metadata.event.description ||
                        eventData?.metadata.event?.eventDesc)}
                  </p>
                </div>
                <div className="absolute top-3 right-3">
                  <DotsWithDropdownContent />
                </div>
              </div>
            </div>
          </div>
          {showConfiText && (
            <div className="flex flex-col grow justify-between">
              <button
                className="self-start text-blue-600"
                onClick={() => {
                  toggleConfigurations();
                  toggleConfigurationsText();
                }}
              >
                Configure
              </button>
            </div>
          )}
          {showConfigurations && (
            <>
              {eventData.metadata.event && (
                <div className="flex flex-col">
                  <h3 className="text-lg text-[#19110B] self-start my-2">
                    Send email to
                  </h3>
                  <EmailInputWithCheckboxes
                    onChange={setRecipients}
                    data={recipients}
                  />
                  <h3 className="text-lg text-[#19110B] self-start my-2">
                    Draft email
                  </h3>
                  <Textarea
                    className="border-2"
                    onChange={onTextChange}
                    value={message}
                  />
                </div>
              )}
              <div className="flex w-2/4 justify-between mt-4">
                <Button
                  variant="ghost"
                  className="px-7 rounded-[100px]"
                  size="lg"
                  onClick={onSave}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  className="px-7 rounded-[100px]"
                  size="lg"
                  onClick={() => {
                    toggleConfigurations();
                    toggleConfigurationsText();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
          <Button
            variant="ghost"
            className="px-7 rounded-[100px]"
            size="lg"
            onClick={onBackClick}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="custom-node__body">
        <Connector
          onClick={() => {
            setShowOptions(!showOptions);
            hideOptions && setHideOptions(false);
          }}
        />
      </div>
      {showOptions && !hideOptions && (
        <div className="absolute left-full top-0 ml-16">
          <ChooseOptions
            data={optionsData}
            onBackClick={onBackClick}
            onNextClick={handleNextClickCallback}
            createCustomNode={createCustomNode}
            nodeId={nodeId}
          />
        </div>
      )}
    </>
  );
};
