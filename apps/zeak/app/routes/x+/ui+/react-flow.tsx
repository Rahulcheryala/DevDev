import { useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { LuChevronUp, LuZap } from "react-icons/lu";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button, Input } from "@zeak/react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  LiaUndoAltSolid,
  LiaRedoAltSolid,
  LiaPlaySolid,
} from "react-icons/lia";
import {
  CodeBrowserIcon,
  PlaySloidIcon,
  PlugIcon,
  ScalesIcon,
  SkipForwardIcon,
  SkipRevertIcon,
  StopIcon,
  WorkFlowIcon,
  ZapCircleIcon,
} from "@zeak/icons";

export default function Automations() {
  const ChooseTrigger = () => {
    return (
      <>
        <div className="">
          <div className="rounded-lg overflow-hidden shadow-6large">
            <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
              <div className="flex items-center">
                <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                  <LuZap color="#ffffff" />
                </div>
                <span className="text-accent-green text-xs font-normal uppercase ml-3">
                  Trigger
                </span>
              </div>
              {/* <Button
                  variant="ghost"
                  className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full"
                >
                  <WebEye />
                </Button> */}
            </div>
            <ul className="px-4 py-3">
              <li className="flex items-center justify-between">
                <p className="text-sm font-normal text-accent">
                  Choose the trigger
                </p>{" "}
                <Button variant="ghost" className="w-6 h-6 p-0">
                  <FaArrowRightLong size={16} />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const IntegrationsList = () => {
    return (
      <>
        <div className="">
          <div className="rounded-lg overflow-hidden shadow-6large">
            <div className="flex items-center justify-between p-3 bg-accent-lightGreen">
              <div className="flex items-center">
                <div className="bg-green-500 w-6 h-6  rounded-sm flex justify-center items-center">
                  <LuZap color="#ffffff" />
                </div>
                <span className="text-accent-green text-xs font-normal uppercase ml-3">
                  Trigger
                </span>
              </div>
              {/* <Button
              variant="ghost"
              className="w-6 h-6 hover:bg-accent-lightGreen p-0 rounded-full"
            >
              <WebEye />
            </Button> */}
            </div>
            <div className="p-4">
              <div className="relative mb-2">
                <Input
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
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#F2F1FD] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Dynamics 365 F&O</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#DEFDFF] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#DEFDFF]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Business Central</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[#00A1E01A] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#00A1E01A]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Salesforce</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(58,_197,_242,_0.1)] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(58,_197,_242,_0.1)]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Azure</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(81,_169,_227,_0.1)] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(81,_169,_227,_0.1)]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Sendgrid</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(248,_0,_0,_0.1)] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(248,_0,_0,_0.1)]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">MailGun</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(255,_224,_27,_0.1)] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(255,_224,_27,_0.1)]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Mailchimp</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
                <li className="flex items-center my-[5px] p-2 border border-solid rounded-[10px] hover:bg-[rgba(0,_0,_0,_0.06] hover:border-accent-p2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[rgba(0,_0,_0,_0.06)]">
                    <img
                      src="/images/microsoft.png"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm">Notion</h3>
                    <p className="text-sm text-tertiary">
                      Lorem ipsum dolor sit amet set consectetur.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <hr />
            <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
              <Button
                variant="ghost"
                className="px-7 rounded-[100px]"
                size="lg"
              >
                Back
              </Button>
              <Button
                variant="primary"
                className="px-7 rounded-[100px]"
                size="lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: <ChooseTrigger /> } },
    {
      id: "2",
      position: { x: 50, y: 200 },
      data: { label: <IntegrationsList /> },
    },
  ];
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [viewMode, setViewMode] = useState("Text");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const addNewNode = () => {
    setNodes([
      ...nodes,
      { id: "3", position: { x: 0, y: 200 }, data: { label: "Third node" } },
    ]);
    setEdges([...edges, { id: "e2-2", source: "2", target: "3" }]);
  };

  return (
    <div className="w-full bg-background">
      <div className="bg-background pb-3">
        <div className="flex justify-between items-center px-[20px] py-4 bg-white rounded-bl-xl">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <LiaUndoAltSolid size={16} />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <LiaRedoAltSolid size={16} />
            </Button>
            <Button variant="ghost" className="mr-1 h-10">
              Test automation
              <LiaPlaySolid size={24} className="ms-2" />
            </Button>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <PlugIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <CodeBrowserIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <ZapCircleIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <ScalesIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <WorkFlowIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-tl-lg rounded-bl-lg h-[calc(100vh_-_252px)] overflow-hidden relative bg-white">
        <div
          className="inline-flex rounded-md shadow-sm absolute left-8 top-8 z-[1]"
          role="group"
        >
          <Button
            variant="secondary"
            onClick={() => setViewMode("Text")}
            className={`rounded-tr-none rounded-br-none font-normal border-r-0 py-[14px] px-6 h-auto hover:bg-dropdownHoverBg ${
              viewMode === "Text" ? "bg-dropdownHoverBg" : "bg-white"
            }`}
          >
            Text
          </Button>

          <Button
            variant="secondary"
            onClick={() => setViewMode("Workflow")}
            className={`rounded-tl-none rounded-bl-none font-normal border-l-0 py-[14px] px-6 h-auto hover:bg-dropdownHoverBg ${
              viewMode === "Workflow" ? "bg-dropdownHoverBg" : "bg-white"
            }`}
          >
            Workflow
          </Button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // fitView
          defaultViewport={{ x: 100, y: 200, zoom: 1 }}
        >
          <Controls />
          {/* <MiniMap /> */}
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div className="bg-background pt-3">
        <div className="flex justify-between items-center px-[20px] py-4 bg-white rounded-tl-xl">
          <div className="flex items-center">
            <p className="text-lg">Visualizer</p>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={addNewNode}
              className="mr-1 h-10 w-10 p-0"
            >
              <PlaySloidIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <SkipRevertIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <SkipForwardIcon />
            </Button>
            <Button variant="ghost" className="mr-1 h-10 w-10 p-0">
              <StopIcon />
            </Button>
            <Button variant="ghost" className="ml-8 h-10 w-10 p-0">
              <LuChevronUp size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
