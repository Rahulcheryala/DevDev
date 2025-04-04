import { useState, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@zeak/react";
import {
  TriggerNodeModal,
  Nodeitem,
  WaitModal,
  NotificationModal,
  ValidationModal,
  IntegrationModal,
} from "~/modules/vendor-onboarding";
import { RxCross2 } from "react-icons/rx";
import FormBuilderModal from "~/modules/vendor-onboarding/modals/form-builder-modal";
import { LuZap } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { nodeModalValues } from "~/utils/onboarding-node";
import {
  MdConnectedTv,
  MdOutlineIntegrationInstructions,
} from "react-icons/md";
import { CgSandClock } from "react-icons/cg";
import { RiPassValidLine } from "react-icons/ri";
import { BellIcon, CheckIcon } from "@zeak/icons";
import { TbAutomaticGearbox } from "react-icons/tb";
import CommunicationNodeModal from "~/modules/vendor-onboarding/modals/communication-node-modal";
import ContractCommunicationModal from "~/modules/vendor-onboarding/modals/contract-communication-modal";

export default function VendorOnboarding() {
  const [isTriggerModalOpen, setIsTriggerModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(
    nodeModalValues.dataPrep,
  );

  const initialNodes = [
    {
      id: "1",
      position: { x: 100, y: 0 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: FaWpforms,
              title: "Trigger Node",
              subtitle: "Vendor Onboarding Start",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.trigger);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: LuZap,
              title: "Data Preparation Node",
              subtitle: "Build Onboarding Form",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.dataPrep);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "3",
      position: { x: 100, y: 200 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: MdConnectedTv,
              title: "Communication Node",
              subtitle: "Send Hyperlink via Email",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.communication);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "4",
      position: { x: 100, y: 300 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: CgSandClock,
              title: " Wait Node",
              subtitle: "Vendor Response",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.wait);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "5",
      position: { x: 100, y: 400 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: RiPassValidLine,
              title: "Data Validation Node",
              subtitle: "Process Vendor Data",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.dataValidation);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "6",
      position: { x: 100, y: 500 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: MdOutlineIntegrationInstructions,
              title: "Integration Node",
              subtitle: "Create Prospect in D365 FO",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.integration);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "7",
      position: { x: 100, y: 600 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: TbAutomaticGearbox,
              title: "Automation Node",
              subtitle: "Generate Contract",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.automation);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "8",
      position: { x: 100, y: 700 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: CheckIcon,
              title: "Review Node",
              subtitle: "Internal User Approval",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.review);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "9",
      position: { x: 100, y: 800 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: MdConnectedTv,
              title: "Communication Node",
              subtitle: "Send Contract URL to Vendor",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.communicationContract);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "10",
      position: { x: 100, y: 900 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: CgSandClock,
              title: "Wait Node",
              subtitle: "Vendor Contract Acceptance",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.waitContract);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "11",
      position: { x: 100, y: 1000 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: MdOutlineIntegrationInstructions,
              title: "Integration Node",
              subtitle: "Update Records in Zeak and D365 FO",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.integrationContract);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
    {
      id: "12",
      position: { x: 100, y: 1100 },
      data: {
        label: (
          <Nodeitem
            nodeInfo={{
              icon: BellIcon,
              title: "Notification Node",
              subtitle: "Completion Alert",
            }}
            handleSetting={() => {
              setIsTriggerModalOpen(!isTriggerModalOpen);
              setModalOpenValue(nodeModalValues.notification);
            }}
            setModalOpenValue={setModalOpenValue}
          />
        ),
      },
    },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
    { id: "e5-6", source: "5", target: "6" },
    { id: "e6-7", source: "6", target: "7" },
    { id: "e7-8", source: "7", target: "8" },
    { id: "e8-9", source: "8", target: "9" },
    { id: "e9-10", source: "9", target: "10" },
    { id: "e10-11", source: "10", target: "11" },
    { id: "e11-12", source: "11", target: "12" },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [viewMode, setViewMode] = useState("Text");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  // const addNewNode = () => {
  //   setNodes([
  //     ...nodes,
  //     {
  //       id: "3",
  //       position: { x: 0, y: 200 },
  //       data: { label: <div>Third node</div> },
  //     },
  //   ]);
  //   setEdges([...edges, { id: "e2-2", source: "2", target: "3" }]);
  // };

  return (
    <div className="w-full bg-background">
      <div className="rounded-tl-lg rounded-bl-lg h-[calc(100vh_-_96px)] overflow-hidden relative bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          className="small-nodes"
          // fitView
          defaultViewport={{ x: 100, y: 200, zoom: 1 }}
        >
          <Controls />
          <MiniMap />
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>

      {isTriggerModalOpen && (
        <div className="">
          {modalOpenValue === nodeModalValues.trigger && (
            <TriggerNodeModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.dataPrep && (
            <FormBuilderModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.communication && (
            <CommunicationNodeModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.wait && (
            <WaitModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.communicationContract && (
            <ContractCommunicationModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.dataValidation && (
            <ValidationModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.integration && (
            <IntegrationModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
          {modalOpenValue === nodeModalValues.notification && (
            <NotificationModal
              isModalOpen={isTriggerModalOpen}
              setIsTriggerModalOpen={setIsTriggerModalOpen}
            />
          )}
        </div>
      )}
    </div>
  );
}
