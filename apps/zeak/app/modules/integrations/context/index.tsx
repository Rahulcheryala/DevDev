import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
  useReducer,
  useState,
} from "react";
import {
  IntegrationForm,
  initialIntegrationForm,
} from "../models/integration-form.model";
import { IIntegrationModel } from "../models/integration.model";
import { IConnectionModel } from "../models/connection.model";
import { toast } from "@zeak/ui";
import { useNavigate } from "@remix-run/react";
import { ConfirmationModal } from "@zeak/ui";
import IntegrationAddFlow from "../components/CreateFlow/Integration";
import ConnectionAddFlow from "../components/CreateFlow/Connection";
import {
  ConnectionForm,
  initialConnectionFormData,
} from "../models/connection-form.model";
import {
  createConnectionFn,
  createIntegrationFn,
  fetchCompanyById,
  fetchConnectionsList,
  fetchIntegrationConnections,
  fetchIntegrationsList,
  updateConnectionFn,
  updateIntegrationFn,
} from "../utils/api.utils";
import { refreshConnectionsAction, refreshIntegrationsAction } from "./action";
import { IntegrationType } from "@prisma/client";
import { exportConnectionData, exportIntegrationData } from "../utils/download.utils";
import UnableToDeleteModal from "../components/misc/UnableToDeleteModal";

// Define flow types for integrations
export type IntegrationFlow =
  | "create"
  | "edit"
  | "connection"
  | "activation"
  | "deactivation"
  | "deactivation"
  | "duplicate"
  | "delete"
  | "export"
  | null;

// Define flow types for connections
export type ConnectionFlow =
  | "create"
  | "edit"
  | "activation"
  | "deactivation"
  | "duplicate"
  | "delete"
  | "export"
  | null;

// Unified state for both integrations and connections
export type UnifiedState = {
  // Integration state
  records: IIntegrationModel[];
  selectedIntegration: IIntegrationModel | null;
  integrationForm: IntegrationForm;
  integrationFlow: IntegrationFlow;
  selectedIntegrationConnections: IConnectionModel[];
  isIntegrationLoading: boolean;
  integrationError: Error | null;
  integrationErrors: { [key: string]: string | null };
  isIntegrationFormDirty: boolean;

  // Connection state
  connectionsList: IConnectionModel[];
  selectedConnection: IConnectionModel | null;
  connectionForm: ConnectionForm;
  connectionFlow: ConnectionFlow;
  isConnectionLoading: boolean;
  connectionError: Error | null;
  connectionErrors: { [key: string]: string | null };
  isConnectionFormDirty: boolean;

  // company state
  companies: { name: string; id: string }[] | [];
};

// Initial state for the unified context
const initialState: UnifiedState = {
  // Integration state,
  records: [],
  selectedIntegration: null,
  integrationForm: initialIntegrationForm,
  integrationFlow: null,
  selectedIntegrationConnections: [],
  isIntegrationLoading: false,
  integrationError: null,
  integrationErrors: {},
  isIntegrationFormDirty: false,

  // Connection state
  connectionsList: [],
  selectedConnection: null,
  connectionForm: initialConnectionFormData,
  connectionFlow: null,
  isConnectionLoading: false,
  connectionError: null,
  connectionErrors: {},
  isConnectionFormDirty: false,

  // company state
  companies: [],
};

// Unified action type
export type UnifiedAction =
  // Integration actions
  | { type: "SET_INTEGRATION_LOADING"; payload: boolean }
  | { type: "SET_INTEGRATION_ERROR"; payload: Error | null }
  | { type: "SET_INTEGRATIONS_LIST"; payload: IIntegrationModel[] }
  | { type: "SET_SELECTED_INTEGRATION"; payload: IIntegrationModel | null }
  | {
    type: "SET_SELECTED_INTEGRATION_CONNECTIONS";
    payload: IConnectionModel[];
  }
  | {
    type: "UPDATE_INTEGRATION_FORM";
    payload: Partial<IntegrationForm>;
    setFormDirty?: boolean;
  }
  | { type: "RESET_INTEGRATION_FORM" }
  | { type: "SET_INTEGRATION_FLOW"; payload: IntegrationFlow }
  | {
    type: "UPDATE_INTEGRATION_ERROR";
    payload: { [key: string]: string | null };
  }
  | { type: "CLEAR_INTEGRATION_ERRORS" }

  // Connection actions
  | { type: "SET_CONNECTION_LOADING"; payload: boolean }
  | { type: "SET_CONNECTION_ERROR"; payload: Error | null }
  | { type: "SET_CONNECTIONS_LIST"; payload: IConnectionModel[] }
  | { type: "SET_SELECTED_CONNECTION"; payload: IConnectionModel | null }
  | {
    type: "UPDATE_CONNECTION_FORM";
    payload: Partial<ConnectionForm>;
    setFormDirty?: boolean;
  }
  | { type: "RESET_CONNECTION_FORM" }
  | { type: "SET_CONNECTION_FLOW"; payload: ConnectionFlow }
  | {
    type: "UPDATE_CONNECTION_ERROR";
    payload: { [key: string]: string | null };
  }
  | { type: "CLEAR_CONNECTION_ERRORS" }

  // Company actions
  | { type: "SET_COMPANIES"; payload: { name: string; id: string } };

// Unified reducer function
function unifiedReducer(
  state: UnifiedState,
  action: UnifiedAction
): UnifiedState {
  switch (action.type) {
    // Integration reducers
    case "SET_INTEGRATION_LOADING":
      return { ...state, isIntegrationLoading: action.payload };
    case "SET_INTEGRATION_ERROR":
      return { ...state, integrationError: action.payload };
    case "SET_INTEGRATIONS_LIST":
      return { ...state, records: action.payload };
    case "SET_SELECTED_INTEGRATION":
      return { ...state, selectedIntegration: action.payload };
    case "SET_SELECTED_INTEGRATION_CONNECTIONS":
      return { ...state, selectedIntegrationConnections: action.payload };
    case "UPDATE_INTEGRATION_FORM":
      return {
        ...state,
        integrationForm: { ...state.integrationForm, ...action.payload },
        isIntegrationFormDirty: action.setFormDirty !== false,
      };
    case "RESET_INTEGRATION_FORM":
      return {
        ...state,
        integrationForm: initialIntegrationForm,
        integrationErrors: {},
        isIntegrationFormDirty: false,
      };
    case "SET_INTEGRATION_FLOW":
      return { ...state, integrationFlow: action.payload };
    case "UPDATE_INTEGRATION_ERROR":
      return {
        ...state,
        integrationErrors: { ...state.integrationErrors, ...action.payload },
      };
    case "CLEAR_INTEGRATION_ERRORS":
      return { ...state, integrationErrors: {} };

    // Connection reducers
    case "SET_CONNECTION_LOADING":
      return { ...state, isConnectionLoading: action.payload };
    case "SET_CONNECTION_ERROR":
      return { ...state, connectionError: action.payload };
    case "SET_CONNECTIONS_LIST":
      return { ...state, connectionsList: action.payload };
    case "SET_SELECTED_CONNECTION":
      return { ...state, selectedConnection: action.payload };
    case "UPDATE_CONNECTION_FORM":
      return {
        ...state,
        connectionForm: { ...state.connectionForm, ...action.payload },
        isConnectionFormDirty: action.setFormDirty !== false,
      };
    case "RESET_CONNECTION_FORM":
      return {
        ...state,
        connectionForm: initialConnectionFormData,
        connectionErrors: {},
        isConnectionFormDirty: false,
      };
    case "SET_CONNECTION_FLOW":
      return { ...state, connectionFlow: action.payload };
    case "UPDATE_CONNECTION_ERROR":
      return {
        ...state,
        connectionErrors: { ...state.connectionErrors, ...action.payload },
      };
    case "CLEAR_CONNECTION_ERRORS":
      return { ...state, connectionErrors: {} };

    // company actions
    case "SET_COMPANIES":
      return { ...state, companies: [...state.companies, action.payload] };
    default:
      return state;
  }
}

// Create unified context
const UnifiedContext = createContext<
  | {
    state: UnifiedState;
    dispatch: React.Dispatch<UnifiedAction>;
    openIntegrationDrawer: (type: IntegrationFlow) => void;
    closeIntegrationDrawer: (ignoreCheck?: boolean) => void;
    openConnectionDrawer: (type: ConnectionFlow) => void;
    closeConnectionDrawer: (ignoreCheck?: boolean) => void;
    isIntegrationDrawerOpen: boolean;
    isConnectionDrawerOpen: boolean;
    isDeleteIntegrationOpen: boolean;
    integrationConfirmationOpen: {
      message: ConfirmationMessage;
      title: string;
      flag: boolean;
      type: ModalType;
    };
    connectionConfirmationOpen: {
      message: ConfirmationMessage;
      title: string;
      flag: boolean;
      type: ModalType;
    };
    setIntegrationConfirmationOpen: React.Dispatch<
      React.SetStateAction<{
        message: ConfirmationMessage;
        title: string;
        flag: boolean;
        type: ModalType;
      }>
    >;
    setConnectionConfirmationOpen: React.Dispatch<
      React.SetStateAction<{
        message: ConfirmationMessage;
        title: string;
        flag: boolean;
        type: ModalType;
      }>
    >;
    setDeleteIntegrationOpen: React.Dispatch<
      React.SetStateAction<{
        message: string;
        title: string;
        flag: boolean;
        onConfirm?: Promise<void>;
        onClose?: void;
      }>
    >;
    onIntegrationConfirmHandler: () => Promise<void>;
    onIntegrationCancelHandler: () => void;
    onConnectionConfirmHandler: () => Promise<void>;
    onConnectionCancelHandler: () => void;
    onDeleteIntegrtionHandler: () => Promise<void>;
    onDeleteCancelHandler: () => void;
    onDeActivateIntegrtionHandler: () => Promise<void>;
    onDeActivateCancelHandler: () => void;
    onDuplicateIntegrtionHandler: () => Promise<void>;
    onDuplicateCancelHandler: () => void;
  }
  | undefined
>(undefined);

type ConfirmationMessage = string | string[];
type ModalType = "warning" | "info" | "danger" | "success" | "custom";

const initialConfirmationValues = {
  message: "" as ConfirmationMessage,
  title: "",
  flag: false,
  type: "warning" as ModalType,
};

// Global variable to track provider instances for debugging
let providerInstances = 0;

// Unified provider component
export const UnifiedProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(unifiedReducer, initialState);

  // Integration state
  const [isIntegrationDrawerOpen, setIsIntegrationDrawerOpen] = useState(false);
  const [DeleteIntegrationOpen, setDeleteIntegrationOpen] = useState({
    ...initialConfirmationValues,
  });
  const [integrationTaskState, setIntegrationTaskState] = useState({
    ...initialConfirmationValues,
  });
  const [integrationTaskStateDuplicate, setIntegrationTaskStateDuplicate] = useState({
    ...initialConfirmationValues,
  });
  const [integrationConfirmationOpen, setIntegrationConfirmationOpen] =
    useState({
      ...initialConfirmationValues,
    });

  // Connection state
  const [isConnectionDrawerOpen, setIsConnectionDrawerOpen] = useState(false);
  const [connectionConfirmationOpen, setConnectionConfirmationOpen] = useState({
    ...initialConfirmationValues,
  });

  // Access needed state variables
  const { records, integrationFlow, selectedIntegration, connectionFlow, selectedConnection } =
    state;

  const navigate = useNavigate();

  // Data fetching status tracking
  const [dataFetchStatus, setDataFetchStatus] = useState({
    isFetched: false,
    isFetching: false,
    lastFetched: null as number | null,
  });

  // Inside the UnifiedProvider component, add a new state for the unable to delete modal
  const [unableToDeleteModalState, setUnableToDeleteModalState] = useState({
    isOpen: false,
    entityType: "integration" as "integration" | "connection",
    dependencies: [] as { count: number; label: string; action?: () => void }[]
  });

  // Debug code to detect provider instances
  // useEffect(() => {
  //   providerInstances++;
  //   console.log(
  //     `[DEBUG] UnifiedProvider mounted. Total instances: ${providerInstances}`
  //   );

  //   return () => {
  //     providerInstances--;
  //     console.log(
  //       `[DEBUG] UnifiedProvider unmounted. Total instances: ${providerInstances}`
  //     );
  //   };
  // }, []);

  // Optimized fetch function with caching
  const fetchData = useCallback(
    async (forceFetch = false) => {
      // Skip fetching if data is already being fetched
      if (dataFetchStatus.isFetching) return;

      // Skip fetching if data is already fetched and not forced, and last fetch was less than 5 minutes ago
      const now = Date.now();
      const cacheValid =
        dataFetchStatus.lastFetched &&
        now - dataFetchStatus.lastFetched < 5 * 60 * 1000;

      if (dataFetchStatus.isFetched && !forceFetch && cacheValid) {
        // console.log("Using cached data");
        return;
      }

      try {
        // Set fetching state
        setDataFetchStatus((prev) => ({ ...prev, isFetching: true }));
        dispatch({ type: "SET_INTEGRATION_LOADING", payload: true });
        dispatch({ type: "SET_CONNECTION_LOADING", payload: true });
        dispatch({ type: "SET_INTEGRATION_ERROR", payload: null });
        dispatch({ type: "SET_CONNECTION_ERROR", payload: null });

        if (dataFetchStatus.isFetched) return;
        const [integrations, connectionsList] = await Promise.all([
          fetchIntegrationsList(),
          fetchConnectionsList(),
        ]);

        dispatch({ type: "SET_INTEGRATIONS_LIST", payload: integrations.data });
        dispatch({
          type: "SET_CONNECTIONS_LIST",
          payload: connectionsList.data,
        });

        // Update fetch status
        setDataFetchStatus({
          isFetched: true,
          isFetching: false,
          lastFetched: Date.now(),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_INTEGRATION_ERROR", payload: error as Error });
        dispatch({ type: "SET_CONNECTION_ERROR", payload: error as Error });
        setDataFetchStatus((prev) => ({ ...prev, isFetching: false }));
      } finally {
        dispatch({ type: "SET_INTEGRATION_LOADING", payload: false });
        dispatch({ type: "SET_CONNECTION_LOADING", payload: false });
      }
    },
    [
      dataFetchStatus.isFetched,
      dataFetchStatus.isFetching,
      dataFetchStatus.lastFetched,
    ]
  );

  // Fetch data on initial mount only
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(state.connectionsList);
  // }, [state.connectionsList]);

  // useEffect(() => {
  //   console.log(state.selectedConnection);
  // }, [state.selectedConnection]);

  useEffect(() => {
    const fetchMissingCompanies = async () => {
      if (records.length > 0) {
        const allCompanyIds = new Set<string>();
        records.forEach((record) => {
          record.companyIds.forEach((id) => {
            allCompanyIds.add(id);
          });
        });

        const existingIds = new Set(
          state.companies.map((company) => company.id)
        );
        const missingIds = Array.from(allCompanyIds).filter(
          (id) => !existingIds.has(id)
        );

        if (missingIds.length > 0) {
          // console.log(`Fetching ${missingIds.length} missing companies`);

          const companyPromises = missingIds.map((id) => fetchCompanyById(id));
          const results = await Promise.all(companyPromises);

          // Create a Set of existing company IDs for quick lookup
          const existingCompanyIds = new Set(state.companies.map(company => company.id));

          results.forEach((result) => {
            // Only add if the company doesn't already exist
            if (result && result.name && result.id && !existingCompanyIds.has(result.id)) {
              dispatch({
                type: "SET_COMPANIES",
                payload: { name: result.name, id: result.id },
              });
            }
          });
        }
      }
    };

    fetchMissingCompanies();
  }, [records]);

  // Handle different flows
  useEffect(() => {
    switch (integrationFlow) {
      case "create":
        setIsIntegrationDrawerOpen(true);
        break;
      case "edit":
        if (selectedIntegration) {
          // Additional side effects for different flows
          // ...
        }
        break;
      case "duplicate":
        setIntegrationConfirmationOpen({
          message: "Are you sure you want to duplicate this integration?",
          title: "Duplicate Integration?",
          flag: true,
          type: "info"
        });
        break;
      case "activation":
        setIntegrationConfirmationOpen({
          message: "Are you sure you want to activate this integration?",
          title: "Activate Integration?",
          flag: true,
          type: "info"
        });
        break;
      case "deactivation":
        setIntegrationConfirmationOpen({
          message: "Are you sure you want to deactivate this integration?",
          title: "Deactivate Integration?",
          flag: true,
          type: "info"
        });
        break;
      case "delete":
        // Check if the integration has dependencies that prevent deletion
        const hasDependencies = selectedIntegration && checkIntegrationDependencies(selectedIntegration);

        if (hasDependencies) {
          // If has dependencies, show the unable to delete modal instead
          setUnableToDeleteModalState({
            isOpen: true,
            entityType: "integration",
            dependencies: hasDependencies
          });
        } else {
          // Otherwise show the normal delete confirmation
          setIntegrationConfirmationOpen({
            message: "Are you sure you want to delete this integration?",
            title: "Delete Integration?",
            flag: true,
            type: "danger" as ModalType
          });
        }
        break;
      case "export":
        const connections = state.connectionsList?.filter(
          (connection) => connection.integrationId === state.selectedIntegration?.id
        );
        exportIntegrationData(state.selectedIntegration!, connections!);
        break;
      default:
        break;
    }
  }, [integrationFlow, selectedIntegration]);

  // Handle connection flow changes
  useEffect(() => {
    switch (connectionFlow) {
      case "create":
        setIsConnectionDrawerOpen(true);
        break;
      case "edit":
        break;
      case "duplicate":
        setConnectionConfirmationOpen({
          message: "Are you sure you want to duplicate this connection?",
          title: "Duplicate Connection?",
          flag: true,
          type: "info"
        });
        break;
      case "activation":
        setConnectionConfirmationOpen({
          message: "Are you sure you want to activate this connection?",
          title: "Activate Connection?",
          flag: true,
          type: "info"
        });
        break;
      case "deactivation":
        setConnectionConfirmationOpen({
          message: "Are you sure you want to deactivate this connection?",
          title: "Deactivate Connection?",
          flag: true,
          type: "info"
        });
        break;
      case "delete":
        // Check if the connection has dependencies that prevent deletion
        const connectionDependencies = selectedConnection && checkConnectionDependencies(selectedConnection);

        if (connectionDependencies) {
          // If has dependencies, show the unable to delete modal instead
          setUnableToDeleteModalState({
            isOpen: true,
            entityType: "connection",
            dependencies: connectionDependencies
          });
        } else {
          // Otherwise show the normal delete confirmation
          setConnectionConfirmationOpen({
            message: "Are you sure you want to delete this connection?",
            title: "Delete Connection?",
            flag: true,
            type: "danger" as ModalType
          });
        }
        break;
      case "export":
        if (selectedConnection) {
          exportConnectionData(selectedConnection!);
        }
        break;
      default:
        break;
    }
  }, [connectionFlow, selectedConnection]);

  // Integration drawer handlers
  const openIntegrationDrawer = (type: IntegrationFlow) => {
    setIsIntegrationDrawerOpen(true);
    dispatch({ type: "SET_INTEGRATION_FLOW", payload: type });
  };

  const closeIntegrationDrawer = (ignoreCheck?: boolean) => {
    if (ignoreCheck || !state.isIntegrationFormDirty) {
      setIsIntegrationDrawerOpen(false);
      dispatch({ type: "RESET_INTEGRATION_FORM" });
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
      return;
    }

    setIntegrationConfirmationOpen({
      message: ["You're about to leave the record you are currently editing. Any unsaved changes will be lost", "Are you sure you want to continue?"],
      title: "Attention!",
      flag: true,
      type: "warning"
    });
  };

  const handleDuplicateIntegration = async () => {
    try {
      if (!selectedIntegration) return;
      const currentCopies = selectedIntegration.copies || 0;
      const newCopyNumber = currentCopies + 1;

      // Generate new name and code with copy number
      const copyIntegrationName = `Copy ${newCopyNumber} of ${selectedIntegration?.integrationName}`;
      const newIntegrationCode = `CP-${newCopyNumber}-${selectedIntegration?.integrationCode!}`;

      const newIntegration = await createIntegrationFn({
        logo: selectedIntegration.logo,
        isFavorite: selectedIntegration.isFavorite,
        integrationName: copyIntegrationName,
        integrationCode: newIntegrationCode,
        applicationName: selectedIntegration.applicationName,
        description: selectedIntegration.description,
        integrationType: IntegrationType.User_Defined,
        integrationCategory: selectedIntegration.integrationCategory,
        connectionType: selectedIntegration.connectionType,
        authType: selectedIntegration.authType,
        connectionLimit: selectedIntegration.connectionLimit,
        status: selectedIntegration.status,
        companyIds: selectedIntegration.companyIds,
      });

      const updatedIntegration = await updateIntegrationFn(selectedIntegration.id, {
        copies: newCopyNumber
      } as Partial<IntegrationForm>);

      // console.log("updatedIntegration", updatedIntegration);

      if (newIntegration && updatedIntegration) {
        toast.success(
          "INTEGRATION DUPLICATED SUCCESSFULLY",
          `Integration ${selectedIntegration?.integrationName} duplicated successfully`,
          {
            actions: [
              {
                label: "View Integration",
                onClick: () => {
                  navigate(`/x/access-settings/integrations/${newIntegration?.id}`);
                },
              },
            ]
          }
        );
        dispatch({ type: "RESET_INTEGRATION_FORM" });
        dispatch({ type: "CLEAR_INTEGRATION_ERRORS" });
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        refreshIntegrationsAction({}, dispatch);
      }
    } catch (error) {
      console.error("Failed to duplicate integration", error);
      toast.error(
        "INTEGRATION DUPLICATION FAILED",
        "Failed to duplicate integration"
      );
    } finally {
      setIntegrationConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  const handleDeleteIntegration = async () => {
    if (!selectedIntegration) return;
    // console.log("handleDeleteIntegration", selectedIntegration);
    try {
      const deletedTime = new Date().toISOString();
      const integrationId = selectedIntegration?.id;

      const response = await updateIntegrationFn(integrationId!, {
        deletedAt: deletedTime,
      } as Partial<IntegrationForm>);

      // console.log("Delete response:", response);

      if (response) {
        toast.success(
          "INTEGRATION DELETED SUCCESSFULLY",
          `Integration ${selectedIntegration?.integrationName} deleted successfully`
        );

        await refreshIntegrationsAction({}, dispatch);
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        navigate("/x/access-settings/integrations");
      }
    } catch (error) {
      console.error("Failed to delete integration", error);
      // Show more details about the error if available
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        "INTEGRATION DELETION FAILED",
        `Failed to delete integration: ${errorMessage}`
      );
    } finally {
      setIntegrationConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  const handleIntegrationStatus = async (
    selectedIntegration: IIntegrationModel
  ) => {
    if (!selectedIntegration) return;
    try {
      const integrationId = selectedIntegration.id;
      const currentStatus = selectedIntegration.status;
      // Status should be opposite of current status
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

      const response = await updateIntegrationFn(integrationId, {
        status: newStatus,
      } as Partial<IntegrationForm>);

      // console.log("Status update response:", response);

      const updatedStatus = response?.status || newStatus;
      // console.log(`Response status: ${updatedStatus}, Expected: ${newStatus}`);

      if (response) {
        toast.success(
          "INTEGRATION STATUS UPDATED SUCCESSFULLY",
          `Integration ${selectedIntegration.integrationName} ${updatedStatus === "Active" ? "activated" : "deactivated"} successfully`
        );

        // Refresh the list to get updated data
        await refreshIntegrationsAction({}, dispatch);
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
      }
    } catch (error) {
      console.error("Failed to update integration status", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        "INTEGRATION STATUS UPDATE FAILED",
        `Failed to update status: ${errorMessage}`
      );
    } finally {
      setIntegrationConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  // Integration confirmation handlers
  const onIntegrationConfirmHandler = async () => {
    setIntegrationConfirmationOpen({ ...initialConfirmationValues });
    setIsIntegrationDrawerOpen(false);
    switch (integrationFlow) {
      case "edit":
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        break;
      case "duplicate":
        handleDuplicateIntegration();
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        break;
      case "delete":
        handleDeleteIntegration();
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        break;
      case "activation":
        handleIntegrationStatus(selectedIntegration!);
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        break;
      case "deactivation":
        handleIntegrationStatus(selectedIntegration!);
        dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
        break;
      default:
        break;
    }
    dispatch({ type: "RESET_INTEGRATION_FORM" });
  };

  const onIntegrationCancelHandler = () => {
    if (integrationFlow !== "edit") {
      dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
    }
    setIntegrationConfirmationOpen({ ...initialConfirmationValues });
  };

  // Connection drawer handlers
  const openConnectionDrawer = (type: ConnectionFlow) => {
    setIsConnectionDrawerOpen(true);
    dispatch({ type: "SET_CONNECTION_FLOW", payload: type });
  };

  const closeConnectionDrawer = (ignoreCheck?: boolean) => {
    if (ignoreCheck || !state.isConnectionFormDirty) {
      setIsConnectionDrawerOpen(false);
      dispatch({ type: "RESET_CONNECTION_FORM" });
      dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
      return;
    }

    setConnectionConfirmationOpen({
      message: ["You're about to leave the record you are currently editing. Any unsaved changes will be lost", "Are you sure you want to continue?"],
      title: "Attention!",
      flag: true,
      type: "warning"
    });
  };

  // Connection confirmation handlers
  const onConnectionConfirmHandler = async () => {
    setConnectionConfirmationOpen({ ...initialConfirmationValues });
    setIsConnectionDrawerOpen(false);
    if (connectionFlow === "duplicate") handleDuplicateConnection();
    else if (connectionFlow === "delete") handleDeleteConnection();
    else if (
      connectionFlow === "activation" ||
      connectionFlow === "deactivation"
    )
      handleConnectionStatus(selectedConnection!);
    dispatch({ type: "RESET_CONNECTION_FORM" });
    dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
  };

  const onConnectionCancelHandler = () => {
    setConnectionConfirmationOpen({ ...initialConfirmationValues });
  };

  // Connection handlers
  const handleDuplicateConnection = async () => {
    try {
      if (!selectedConnection) return;
      const currentCopies = selectedConnection.copies || 0;
      const newCopyNumber = currentCopies + 1;

      // Generate new name and code with copy number
      const copyConnectionName = `Copy ${newCopyNumber} of ${selectedConnection.connectionName}`;
      const newConnectionCode = `CP-${newCopyNumber}-${selectedConnection.connectionCode!}`;

      // Update the original connection (increment copies count)
      const updateConnectionFn = async (id: string, data: any) => {
        const response = await fetch('/api/connection.update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...data })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to update connection');
        }

        return await response.json();
      };

      // Create duplicate connection
      const newConnection = await createConnectionFn({
        integrationId: selectedConnection.integrationId,
        connectionName: copyConnectionName,
        connectionCode: newConnectionCode,
        connectionDescription: selectedConnection.connectionDescription,
        companyIds: selectedConnection.companyIds,
        isEnabled: false, // Start as disabled for safety
        connectionDetails: selectedConnection.connectionDetails,
        executionFrequency: selectedConnection.executionFrequency,
        connectionStatus: "Offline", // Start as offline
      });

      // Update the original connection's copies count
      const updatedConnection = await updateConnectionFn(selectedConnection.id, {
        copies: newCopyNumber
      });

      if (newConnection && updatedConnection) {
        toast.success(
          "CONNECTION DUPLICATED SUCCESSFULLY",
          `Connection ${selectedConnection.connectionName} duplicated successfully`,
          {
            actions: [
              {
                label: "View Connection",
                onClick: () => {
                  navigate(`/x/access-settings/connections/${newConnection?.id}`);
                },
              },
            ],
          }
        );
        dispatch({ type: "RESET_CONNECTION_FORM" });
        dispatch({ type: "CLEAR_CONNECTION_ERRORS" });
        dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
        refreshConnectionsAction({}, dispatch);
      }
    } catch (error) {
      console.error("Failed to duplicate connection", error);
      toast.error(
        "CONNECTION DUPLICATION FAILED",
        "Failed to duplicate connection"
      );
    } finally {
      setConnectionConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  const handleDeleteConnection = async () => {
    if (!selectedConnection) return;
    try {
      const deletedTime = new Date().toISOString();
      const connectionId = selectedConnection.id;

      // Update the connection with deletedAt field
      const updateConnectionFn = async (id: string, data: any) => {
        const response = await fetch('/api/connection.update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...data })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to update connection');
        }

        return await response.json();
      };

      const response = await updateConnectionFn(connectionId, {
        deletedAt: deletedTime
      });

      if (response) {
        toast.success(
          "CONNECTION DELETED SUCCESSFULLY",
          `Connection ${selectedConnection.connectionName} deleted successfully`
        );

        await refreshConnectionsAction({}, dispatch);
        navigate(`/x/access-settings/integrations/${selectedConnection?.integrationId}`);
      }
    } catch (error) {
      console.error("Failed to delete connection", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        "CONNECTION DELETION FAILED",
        `Failed to delete connection: ${errorMessage}`
      );
    } finally {
      setConnectionConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  const handleConnectionStatus = async (
    selectedConnection: IConnectionModel
  ) => {
    if (!selectedConnection) return;
    try {
      const connectionId = selectedConnection.id;
      const currentStatus = selectedConnection.connectionStatus;
      // Toggle between Online and Offline
      const newStatus = currentStatus === "Online" ? "Offline" : "Online";
      // For connections, isEnabled should align with the status
      // const newIsEnabled = newStatus === "Online";

      const response = await updateConnectionFn(connectionId, {
        connectionStatus: newStatus,
        // isEnabled: newIsEnabled
      });

      if (response) {
        toast.success(
          "CONNECTION STATUS UPDATED SUCCESSFULLY",
          `Connection ${selectedConnection.connectionName} ${newStatus === "Online" ? "activated" : "deactivated"} successfully`
        );

        dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
        await refreshConnectionsAction({}, dispatch);
      }
    } catch (error) {
      console.error("Failed to update connection status", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error(
        "CONNECTION STATUS UPDATE FAILED",
        `Failed to update status: ${errorMessage}`
      );
    } finally {
      setConnectionConfirmationOpen({ ...initialConfirmationValues });
    }
  };

  // Add the helper functions to check dependencies
  const checkIntegrationDependencies = (integration: IIntegrationModel) => {
    const dependencies = [];
    const activeConnections = state.connectionsList.filter(
      conn => conn.integrationId === integration.id &&
        conn.connectionStatus === "Online" &&
        !conn.deletedAt
    );

    if (activeConnections.length > 0) {
      dependencies.push({
        count: activeConnections.length,
        label: 'Active Connections',
        action: () => {
          navigate(`/x/access-settings/integrations/${integration.id}`);
        }
      });
    }

    if (integration.companyIds && integration.companyIds.length > 0) {
      dependencies.push({
        count: integration.companyIds.length,
        label: 'Assigned Companies',
        action: () => {
          navigate(`/x/access-settings/integrations/${integration.id}`);
        }
      });
    }

    return dependencies.length > 0 ? dependencies : null;
  };

  const checkConnectionDependencies = (connection: IConnectionModel) => {
    const dependencies = [];

    if (connection.connectionStatus === "Online") {
      dependencies.push({
        count: 1,
        label: 'Active Connection',
        action: () => {
          navigate(`/x/access-settings/connections/${connection.id}`);
        }
      });
    }

    if (connection.companyIds && connection.companyIds.length > 0) {
      dependencies.push({
        count: connection.companyIds.length,
        label: 'Assigned Companies',
        action: () => {
          navigate(`/x/access-settings/connections/${connection.id}`);
        }
      });
    }

    return dependencies.length > 0 ? dependencies : null;
  };

  return (
    <UnifiedContext.Provider
      value={{
        state,
        dispatch,
        openIntegrationDrawer,
        closeIntegrationDrawer,
        openConnectionDrawer,
        closeConnectionDrawer,
        isIntegrationDrawerOpen,
        isConnectionDrawerOpen,
        DeleteIntegrationOpen,
        integrationTaskState,
        integrationTaskStateDuplicate,
        integrationConfirmationOpen,
        connectionConfirmationOpen,
        setIntegrationConfirmationOpen,
        setConnectionConfirmationOpen,
        setDeleteIntegrationOpen,
        onIntegrationConfirmHandler,
        onIntegrationCancelHandler,
        onConnectionConfirmHandler,
        onConnectionCancelHandler,
      }}
    >
      {/* Integration UI components */}
      {integrationConfirmationOpen.flag && (
        <ConfirmationModal
          type={integrationConfirmationOpen.type}
          isOpen={integrationConfirmationOpen.flag}
          onClose={onIntegrationCancelHandler}
          title={integrationConfirmationOpen.title}
          message={integrationConfirmationOpen.message}
          leftButtonText="Cancel"
          rightButtonText="Confirm"
          onLeftButtonClick={onIntegrationCancelHandler}
          onRightButtonClick={onIntegrationConfirmHandler}
        />
      )}

      {/* Connection UI components */}
      {connectionConfirmationOpen.flag && (
        <ConfirmationModal
          type={connectionConfirmationOpen.type}
          isOpen={connectionConfirmationOpen.flag}
          title={connectionConfirmationOpen.title}
          message={connectionConfirmationOpen.message}
          onClose={onConnectionCancelHandler}
          onLeftButtonClick={onConnectionCancelHandler}
          onRightButtonClick={onConnectionConfirmHandler}
          leftButtonText="Cancel"
          rightButtonText="Confirm"
        />
      )}

      {/* Unable to Delete Modal */}
      <UnableToDeleteModal
        isOpen={unableToDeleteModalState.isOpen}
        onClose={() => setUnableToDeleteModalState(prev => ({ ...prev, isOpen: false }))}
        entityType={unableToDeleteModalState.entityType}
        dependencies={unableToDeleteModalState.dependencies}
      />

      {children}

      {/* Integration drawers */}
      <IntegrationAddFlow
        isOpen={isIntegrationDrawerOpen}
        closeDrawer={closeIntegrationDrawer}
      />

      {/* Connection drawers */}
      <ConnectionAddFlow
        isOpen={isConnectionDrawerOpen}
        closeDrawer={closeConnectionDrawer}
      />
    </UnifiedContext.Provider>
  );
};

// Custom hook to use the unified context
export const useUnifiedContext = () => {
  const context = useContext(UnifiedContext);
  if (context === undefined) {
    throw new Error("useUnifiedContext must be used within a UnifiedProvider");
  }
  return context;
};
