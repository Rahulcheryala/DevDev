import { useState, useCallback, useEffect, useRef } from "react";
import type { Node } from "@xyflow/react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  getConnectedEdges,
  Position,
  BackgroundVariant,
  Panel,
  useReactFlow,
  getOutgoers,
  getIncomers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button, ClientOnly } from "@zeak/react";
import { ChooseTrigger } from "./ChooseTrigger";
import { IntegrationsList } from "./IntegrationList";
import { UpdateListItemData } from "./UpdateListItemData";
import { UpdatedListItemView } from "./UpdatedListItemView";
import { EventsListItemView } from "./EventsListItemView";
import { ChooseAction } from "./ActionNode";
import Rules from "./assets/Rules.svg";
import Workflows from "./assets/Workflows.svg";
import Integrations from "./assets/Integration.svg";
import Custom from "./assets/Custom.svg";
import { useFetcher } from "@remix-run/react";
import { path } from "~/utils/path";
import { CustomTriggerNode } from "./CustomTriggerNode";
import { nanoid } from "nanoid";

const options = [
  {
    id: 1,
    icon: Integrations,
    name: "Action",
    showSearchBar: true,
    placeholder: "Add an action to your trigger",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "Modules",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "Send email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "2",
            Icon: Integrations,
            title: "Send sequential approval email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "3",
            Icon: Integrations,
            title: "Send parallel approval email",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
          {
            id: "4",
            Icon: Integrations,
            title: "Send all approved mail",
            description: "When a sales order is created in my ERP",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
            notification_type: "email",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: Integrations,
    name: "parallel branches",
    showSearchBar: true,
    placeholder: "parallel branch",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "parallel branches",
            description: "Create parallel branches",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: Workflows,
    name: "Condition",
    showSearchBar: true,
    placeholder: "Condition",
    titleBg: "rgba(234, 27, 34, 0.12)",
    titleColor: "#EA1B22",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Integrations,
            title: "add Condition",
            description: "Create Condition branch",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "rgba(234, 27, 34, 0.12)",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    icon: Custom,
    name: "Custom",
    showSearchBar: true,
    placeholder: "Search custom",
    titleBg: "#A259FF1F",
    titleColor: "#A259FF",
    optionData: [
      {
        optionsTitle: "",
        events: [
          {
            id: "1",
            Icon: Rules,
            title: "Custom1",
            description: "The description of the custom action.",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
          {
            id: "2",
            Icon: Rules,
            title: "Custom2",
            description: "The description of the custom action.",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
        ],
      },
      {
        optionsTitle: "New",
        events: [
          {
            id: "21",
            Icon: Rules,
            title: "Create a new action",
            description: "",
            showSecondaryOptions: false,
            isDisabled: false,
            background: "#A259FF1F",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    icon: Rules,
    name: "Delay",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: false,
  },
  {
    id: 6,
    icon: Rules,
    name: "End Process",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: true,
  },
  {
    id: 8,
    icon: Integrations,
    name: "Trigger",
    showSearchBar: true,
    placeholder: "Search Rules",
    titleBg: "#0E77D31A",
    titleColor: "#0E77D3",
    optionData: [],
    isDisabled: false,
  },
];

type List_Items = (
  | {
      id: number;
      imageUrl: string;
      background: string;
      name: string;
      category_id: string;
      description: string;
      clientId: number;
      clientSecret: string;
      resourceUrl: string;
      trigger: {
        id: string;
        name: string;
        description: string;
        showSecondaryOptions: boolean;
        isDisabled: boolean;
        imageUrl: string;
      }[];
    }
  | {
      id: number;
      imageUrl: string;
      background: string;
      name: string;
      category_id: string;
      description: string;
      clientId: number;
      clientSecret: string;
      resourceUrl: string;
      trigger: {
        name: string;
        description: string;
        from: string;
      }[];
    }
)[];

interface FetcherData {
  data?: {
    id: string;
    [key: string]: string;
  }[];
}

const stepsStatus: { [ker: number]: string } = {
  0: "choose",
  1: "select",
  2: "updateData",
  3: "updatedView",
  4: "events",
  5: "schedule",
  6: "interval",
};

const flowKey = "react-flow";
export default function Automations({
  allTables,
  allTriggerCategories,
  triggers,
  actions,
}: any) {
  const [step, setStep] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<List_Items[0] | null>(null);
  const [allNodeData, setAllNodeData] = useState<any[]>([]);
  const [preTriggers, setPreTriggers] = useState<any>();
  const [hideOptions, setHideOptions] = useState(false);
  const [workFlowId, setWorkFlowId] = useState<any>();
  const fetcher = useFetcher<FetcherData>();

  useEffect(() => {
    console.log("allNodeData", allNodeData);
  }, [allNodeData]);

  const setHideOptionsCallback = useCallback((value: boolean) => {
    setHideOptions(value);
  }, []);

  const rfInstanceRef = useRef<any>(null);
  const { getNodes, getEdges, getNode } = useReactFlow();

  const selectCustomCallback = () => {
    setStep((prev) => prev + 2);
  };

  const setSelectedDataCallback = useCallback((data: any) => {
    setAllNodeData((prev: any[]) => {
      const nodeIndex =
        prev.length > 0 &&
        prev.findIndex((node: any) => node.event.id === data.event.id);

      if (nodeIndex && nodeIndex !== -1) {
        const updatedNodes = [...prev];
        updatedNodes[nodeIndex] = { ...prev[nodeIndex], ...data };
        return updatedNodes;
      } else {
        return [...prev, data];
      }
    });
  }, []);

  const handleNextClick = useCallback(() => setStep((prev) => prev + 1), []);
  const handleBackClick = useCallback(() => setStep((prev) => prev - 1), []);

  const selectTriggerCallback = useCallback(
    (item: List_Items[0]) => {
      // setIntialTrigger(item);
      handleNextClick();
    },
    [handleNextClick],
  );

  const selectItemCallback = useCallback(
    (item: any) => {
      const categoryTriggers = triggers.filter(
        (trigger: any) => trigger.category_id === item.id,
      );
      setPreTriggers(categoryTriggers);
      setSelectedItem(item);
      handleNextClick();
    },
    [handleNextClick, triggers],
  );

  const selectCategoryCallback = useCallback(
    (item: any) => {
      const categoryTriggers = triggers.filter(
        (trigger: any) => trigger.category_id === item.id,
      );
      setPreTriggers(categoryTriggers);
    },
    [triggers],
  );

  const handleCustomBackClick = () => {
    setStep((prev) => prev - 2);
    setAllNodeData([]);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOptionsNodeClick = (data: any, nodeId?: any) => {
    // setSelectedAction(data);
    data.name === "parallel branches"
      ? addTwoNode(data, nodeId)
      : addNewNode(data, nodeId);
    // setSelectedData((prevState: any) => ({
    //   ...prevState,
    //   ...{ option: rest },
    // }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCreateCustomNode = (nodeId: any, selected: any) => {
    addCustomNode(nodeId, selected);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const getDefaultNodes = useCallback(() => {
    const idOne = "1";
    const idTwo = "2";
    const idThree = "3";
    const idFour = "4";
    const idFive = "5";
    const idSix = "6";

    return [
      {
        id: idOne,
        position: { x: 0, y: 0 },
        data: {
          label:
            stepsStatus[step] === "choose" ? (
              <ChooseTrigger onNextClick={handleNextClick} />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
      {
        id: idTwo,
        position: { x: 0, y: 0 },
        data: {
          label:
            stepsStatus[step] === "select" ? (
              <IntegrationsList
                items={allTriggerCategories}
                onBackClick={handleBackClick}
                onNextClick={selectItemCallback}
              />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
      {
        id: idThree,
        position: { x: 0, y: 0 },
        data: {
          label:
            stepsStatus[step] === "updateData" && selectedItem ? (
              <UpdateListItemData
                data={selectedItem}
                onBackClick={handleBackClick}
                onNextClick={handleNextClick}
                createCustomNode={handleCreateCustomNode}
              />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
      {
        id: idFour,
        position: { x: 0, y: 0 },
        // sourcePosition: Position.Right,
        // targetPosition: Position.Left,
        data: {
          label:
            stepsStatus[step] === "updatedView" && selectedItem ? (
              <EventsListItemView
                data={preTriggers}
                onBackClick={handleBackClick}
                onNextClick={selectTriggerCallback}
                optionsData={options}
                createCustomNode={selectCustomCallback}
                nodeId={idFour}
                updateNodeData={setSelectedDataCallback}
                CategoryId={selectedItem.id}
                id={nanoid()}
                type={"trigger"}
              />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
      {
        id: idFive,
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label:
            stepsStatus[step] === "events" && selectedItem ? (
              <UpdatedListItemView
                data={preTriggers}
                onBackClick={handleBackClick}
                onNextClick={handleOptionsNodeClick}
                optionsData={options}
                createCustomNode={handleCreateCustomNode}
                // createCustomNode={selectCustomCallback}
                nodeId={idFive}
                hideOptions={hideOptions}
                setHideOptions={setHideOptionsCallback}
              />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
      {
        id: idSix,
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label:
            stepsStatus[step] === "schedule" && selectedItem ? (
              <CustomTriggerNode
                onBackClick={handleCustomBackClick}
                onNextClick={handleOptionsNodeClick}
                optionsData={options}
                type={"trigger"} // createCustomNode={handleCreateCustomNode}
                nodeId={idSix}
                CategoryId={selectedItem.id}
                Category={selectedItem}
                tables={allTables}
                hideOptions={hideOptions}
                setHideOptions={setHideOptionsCallback}
                id={nanoid()}
                updateNodeData={setSelectedDataCallback}
              />
            ) : null,
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      },
    ];
  }, [step]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
  const [viewMode, setViewMode] = useState("Text");
  const [nodes, setNodes, onNodesChange] = useNodesState(getDefaultNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const [rfInstance, setRfInstance] = useState(null);

  const handleActionNextClick = useCallback(
    async (id: any) => {
      // addTriggerEventNode();
      setNodes((nds) => nds.filter((node) => node.id !== id));
      // setSelectedAction(null);
    },
    [setNodes],
  );

  const updateEdgesForNewNode = useCallback(
    (sourceId: string, newNodeId: string, targetIds: string[]) => {
      setEdges((eds) => {
        const updatedEdges = eds.filter(
          (e) => e.source !== sourceId || !targetIds.includes(e.target),
        );

        // Add new edge from source to new node
        updatedEdges.push({
          id: `e${sourceId}-${newNodeId}`,
          source: sourceId,
          target: newNodeId,
        });

        // Add new edges from new node to all targets
        targetIds.forEach((targetId) => {
          updatedEdges.push({
            id: `e${newNodeId}-${targetId}`,
            source: newNodeId,
            target: targetId,
          });
        });

        return updatedEdges;
      });
    },
    [setEdges],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, getNodes(), getEdges());
          const outgoers = getOutgoers(node, getNodes(), getEdges());
          const connectedEdges = getConnectedEdges([node], getEdges());

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            })),
          );

          return [...remainingEdges, ...createdEdges];
        }, getEdges()),
      );
    },
    [getNodes, getEdges, setEdges],
  );

  const deleteNodeById = useCallback(
    (id: string) => {
      const nodeToDelete = getNode(id);
      if (nodeToDelete) {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        onNodesDelete([nodeToDelete]);
      }
      // setSelectedData({});
    },
    [getNode, setNodes, onNodesDelete],
  );

  const addNewNode = useCallback(
    (data: any, nodeId: string) => {
      const newNodeId = `new-${Date.now()}`;
      const parentNode = getNode(nodeId);

      if (!parentNode) return;

      const outgoers = getOutgoers(parentNode, getNodes(), getEdges());
      const targetNodeIds = outgoers.map((node) => node.id);

      const newNodeX = parentNode.position.x + 700;
      const newNodeY = parentNode.position.y;

      const newNode = {
        id: newNodeId,
        position: { x: newNodeX, y: newNodeY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <ChooseAction
              data={selectedItem}
              onBackClick={() => deleteNodeById(newNodeId)}
              onNextClick={() => handleActionNextClick(newNodeId)}
              optionData={data}
              updatedata={setSelectedDataCallback}
              createCustomNode={handleCreateCustomNode}
              nodeId={newNodeId}
              optionClick={handleOptionsNodeClick}
              CategoryId={selectedItem && selectedItem.id}
              tabels={allTables}
              actions={actions}
              triggers={triggers}
              hideOptions={hideOptions}
              setHideOptions={setHideOptionsCallback}
              key={`${nodeId}-${hideOptions}`}
              selectCategory={selectCategoryCallback}
              triggerCategories={allTriggerCategories}
            />
          ),
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      };

      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          if (node.position.x >= newNodeX) {
            // Move all nodes to the right of the new node
            return {
              ...node,
              position: {
                x: node.position.x + 700,
                y: node.position.y,
              },
            };
          }
          return node;
        });
        return [...updatedNodes, newNode];
      });

      if (targetNodeIds.length > 0) {
        updateEdgesForNewNode(nodeId, newNodeId, targetNodeIds);
      } else {
        setEdges((eds) => [
          ...eds,
          { id: `e${nodeId}-${newNodeId}`, source: nodeId, target: newNodeId },
        ]);
      }
      // setSelectedAction(data);
      // setSelectedData((prevState: any) => ({
      //   ...prevState,
      //   ...{ option: data },
      // }));
    },
    [
      getNode,
      getNodes,
      getEdges,
      selectedItem,
      setSelectedDataCallback,
      handleCreateCustomNode,
      handleOptionsNodeClick,
      allTables,
      actions,
      triggers,
      hideOptions,
      setHideOptionsCallback,
      selectCategoryCallback,
      allTriggerCategories,
      setNodes,
      deleteNodeById,
      handleActionNextClick,
      updateEdgesForNewNode,
      setEdges,
    ],
  );

  const addTwoNode = useCallback(
    (data: any, nodeId: string) => {
      const firstNodeId = `new-Parallel-1-${nanoid(5)}`;
      const secondNodeId = `new-Parallel-2-${nanoid(5)}`;

      const parentNode = getNode(nodeId);

      if (!parentNode) return;

      const outgoers = getOutgoers(parentNode, getNodes(), getEdges());
      const targetNodeIds = outgoers.map((node) => node.id);

      const firstNodeX = parentNode.position.x + 700;
      const firstNodeY = parentNode.position.y - 200;
      const secondNodeX = parentNode.position.x + 700;
      const secondNodeY = parentNode.position.y + 200;

      const firstNode = {
        id: firstNodeId,
        position: { x: firstNodeX, y: firstNodeY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <ChooseAction
              data={selectedItem}
              onBackClick={() => deleteNodeById(firstNodeId)}
              onNextClick={() => handleActionNextClick(firstNodeId)}
              optionData={data}
              updatedata={setSelectedDataCallback}
              createCustomNode={handleCreateCustomNode}
              optionClick={handleOptionsNodeClick}
              nodeId={firstNodeId}
              CategoryId={selectedItem && selectedItem.id}
              tabels={allTables}
              actions={actions}
              triggers={triggers}
              hideOptions={hideOptions}
              setHideOptions={setHideOptionsCallback}
              key={`${nodeId}-${hideOptions}`}
              selectCategory={selectCategoryCallback}
              triggerCategories={allTriggerCategories}
            />
          ),
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      };

      const secondNode = {
        id: secondNodeId,
        position: { x: secondNodeX, y: secondNodeY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <ChooseAction
              data={selectedItem}
              onBackClick={() => deleteNodeById(secondNodeId)}
              onNextClick={() => handleActionNextClick(secondNodeId)}
              optionData={data}
              updatedata={setSelectedDataCallback}
              createCustomNode={handleCreateCustomNode}
              optionClick={handleOptionsNodeClick}
              CategoryId={selectedItem && selectedItem.id}
              nodeId={secondNodeId}
              tabels={allTables}
              actions={actions}
              triggers={triggers}
              hideOptions={hideOptions}
              setHideOptions={setHideOptionsCallback}
              key={`${nodeId}-${hideOptions}`}
              selectCategory={selectCategoryCallback}
              triggerCategories={allTriggerCategories}
            />
          ),
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      };

      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          if (node.position.x >= firstNodeX) {
            // Move all nodes to the right of the new node
            return {
              ...node,
              position: {
                x: node.position.x + 700,
                y: node.position.y,
              },
            };
          }
          return node;
        });
        return [...updatedNodes, firstNode, secondNode];
      });

      if (targetNodeIds.length > 0) {
        updateEdgesForNewNode(nodeId, firstNodeId, targetNodeIds);
        updateEdgesForNewNode(nodeId, secondNodeId, targetNodeIds);
      } else {
        // If there are no target nodes, just add an edge from the parent to the new node
        setEdges((eds) => [
          ...eds,
          {
            id: `e${nodeId}-${firstNodeId}`,
            source: nodeId,
            target: firstNodeId,
          },
          {
            id: `e${nodeId}-${secondNodeId}`,
            source: nodeId,
            target: secondNodeId,
          },
        ]);
      }
    },
    [
      allTriggerCategories,
      selectCategoryCallback,
      getNode,
      getNodes,
      getEdges,
      setNodes,
      setEdges,
      updateEdgesForNewNode,
      selectedItem,
      handleActionNextClick,
      handleCreateCustomNode,
      handleOptionsNodeClick,
      deleteNodeById,
      setSelectedDataCallback,
      actions,
      allTables,
      hideOptions,
      setHideOptionsCallback,
      triggers,
    ],
  );

  const addCustomNode = useCallback(
    (nodeId: string, type: any) => {
      const newNodeId = `new-${Date.now()}`;
      const parentNode = getNode(nodeId);
      const eventID = nanoid();

      if (!parentNode) return;

      const newNodeX = parentNode.position.x + 700;
      const newNodeY = parentNode.position.y;

      const newNode = {
        id: newNodeId,
        position: { x: newNodeX, y: newNodeY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: (
            <CustomTriggerNode
              onBackClick={() => deleteNodeById(newNodeId)}
              onNextClick={handleNextClick}
              updatedata={setSelectedDataCallback}
              CategoryId={selectedItem && selectedItem.id}
              type={type}
              optionsData={options}
              nodeId={newNodeId}
              tables={allTables}
              hideOptions={hideOptions}
              setHideOptions={setHideOptionsCallback}
              id={eventID}
            />
          ),
        },
        style: {
          width: "600px",
          border: "none",
          pointer: "none",
          padding: 0,
          borderRadius: "10px",
        },
      };

      setNodes((nds) => {
        const updatedNodes = nds.map((node) => {
          if (node.position.x >= newNodeX) {
            // Move all nodes to the right of the new node
            return {
              ...node,
              position: {
                x: node.position.x + 700,
                y: node.position.y,
              },
            };
          }
          return node;
        });
        return [...updatedNodes, newNode];
      });
      // setSelectedAction(data);
      // setSelectedData(prevState => ({
      //   ...prevState,
      //   ...{ option: data }
      // }));
    },
    [
      handleNextClick,
      getNode,
      setNodes,
      selectedItem,
      deleteNodeById,
      setSelectedDataCallback,
      allTables,
      hideOptions,
      setHideOptionsCallback,
    ],
  );

  const saveReactFlow = useCallback(() => {
    if (rfInstanceRef) {
      const flow = rfInstanceRef.current.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstanceRef]);

  const onSave = useCallback(() => {
    if (true && allNodeData) {
      fetcher.submit(
        { data: allNodeData, workflowID: workFlowId, action: "saveWorkflow" },
        {
          action: path.to.reactflowHomeTab,
          method: "post",
          encType: "application/json",
        },
      );
    }
    saveReactFlow();
  }, [allNodeData, fetcher, saveReactFlow, workFlowId]);

  useEffect(() => {
    setNodes(getDefaultNodes());
  }, [step, getDefaultNodes, setNodes]);

  useEffect(() => {
    if (fetcher?.data && fetcher.data?.data) {
      setWorkFlowId(fetcher.data?.data[0]?.id);
    }
  }, [fetcher]);

  return (
    <div className="w-full bg-background py-3">
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

        <ClientOnly fallback={<div>Loading...</div>}>
          {() => (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              defaultViewport={{ x: 100, y: 200, zoom: 1 }}
              onInit={(instance) => (rfInstanceRef.current = instance)}
              // deleteKeyCode={["Backspace", "Delete"]}
              onNodesDelete={onNodesDelete}
              elevateNodesOnSelect
              autoPanOnConnect
              onlyRenderVisibleElements={false}
              onPaneClick={() => setHideOptionsCallback(!hideOptions)}
            >
              {/* <Controls /> */}
              <Panel position="top-right">
                <button onClick={onSave}>save</button>
              </Panel>
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          )}
        </ClientOnly>
      </div>
    </div>
  );
}
