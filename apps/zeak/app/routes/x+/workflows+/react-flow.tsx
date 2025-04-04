import { useState, useCallback } from "react";
import { CiSearch } from "react-icons/ci";
import { LuZap } from "react-icons/lu";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Button, IconButton, Input } from "@zeak/react";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  WebArrowCircleLeft,
  WebArrowCircleRight,
  WebArrowTop,
  WebGoLeftPlay,
  WebGoRightPlay,
  WebPause,
  WebPlay,
  WebPlayBold,
  WebStop,
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

  const [nodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [viewMode, setViewMode] = useState("Text");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full bg-background">
      <div className="bg-background pb-3">
        <div className="rounded-tl-[10px] bg-white overflow-y-auto overflow-x-hidden mb-1 py-4 px-5 flex items-center">
          <div className="flex gap-4">
            <IconButton
              icon={<WebArrowCircleLeft />}
              variant="ghost"
              type="submit"
              className="w-[40px] h-[40px] text-secondary p-0"
              aria-label={""}
            />
            <IconButton
              icon={<WebArrowCircleRight />}
              variant="ghost"
              type="submit"
              className="w-[40px] h-[40px] text-secondary p-0"
              aria-label={""}
            />
          </div>
          <span className="ml-7 text-[#8A8A8F] mr-4">Test automation</span>
          <IconButton
            icon={<WebPlay />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
        </div>
      </div>
      <div className="rounded-tl-lg rounded-bl-lg h-[calc(100vh_-_268px)] overflow-hidden relative bg-white">
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
      <div className="flex justify-between w-full rounded-tl-[10px] bg-white overflow-y-auto overflow-x-hidden mt-3 py-4 px-5 flex items-center">
        <span className="text-xl font-medium">Visualizer</span>
        <div className="flex ">
          <IconButton
            icon={<WebPlayBold />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebPause />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebGoLeftPlay />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebGoRightPlay />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebStop />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0"
            aria-label={""}
          />
          <IconButton
            icon={<WebArrowTop />}
            variant="ghost"
            type="submit"
            className="w-[40px] h-[40px] text-secondary p-0 ml-10"
            aria-label={""}
          />
        </div>
      </div>
    </div>
  );
}
