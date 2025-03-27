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
// import { toast } from "@zeak/react";
import { useNavigate } from "@remix-run/react";
import { ConfirmationModal } from "../../../components/Layout/Screen";
import { IntegrationAddFlow } from "../components/CreateFlow/Integration";
import ConnectionAddFlow from "../components/CreateFlow/Connection";
import {
  ConnectionForm,
  initialConnectionFormData,
} from "../models/connection-form.model";
import {
  fetchCompany,
  fetchConnectionsList,
  fetchIntegrationConnections,
  fetchIntegrationsList,
} from "../utils/api.utils";
import { updateIntegrationFn, createIntegrationFn } from "../utils/api.utils";
import { toast } from "@zeak/react";
import { refreshIntegrationsAction } from "../context/action";

// Define flow types for integrations
export type IntegrationFlow =
  | "create"
  | "edit"
  | "connection"
  | "activation"
  | "deactivation"
  | "duplicate"
  | "delete"
  | null;

// Define flow types for connections
export type ConnectionFlow =
  | "create"
  | "edit"
  | "delete"
  | "activation"
  | "duplicate"
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
  company: { name: string, id: string } | null;
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
  company: null,
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
  | { type: "SET_COMPANY"; payload: { name: string, id: string } }  

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
      return { ...state, integrationErrors: {} };;

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
    case "SET_COMPANY":
      return { ...state, company: action.payload };
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
      DeleteIntegrationOpen: {
        message: string;
        title: string;
        flag: boolean;
        onClose?: void;
        onConfirm?: Promise<void>;
      };
      integrationTaskState: {
        message: string;
        title: string;
        flag: boolean;
        onClose?: void;
        onConfirm?: Promise<void>;
      }
      integrationTaskStateDuplicate: {
        message: string;
        title: string;
        flag: boolean;
        onClose?: void;
        onConfirm?: Promise<void>;
      }
      integrationConfirmationOpen: {
        message: string;
        title: string;
        flag: boolean;
      };
      connectionConfirmationOpen: {
        message: string;
        title: string;
        flag: boolean;
      };
      setIntegrationConfirmationOpen: React.Dispatch<
        React.SetStateAction<{
          message: string;
          title: string;
          flag: boolean;
        }>
      >;
      setConnectionConfirmationOpen: React.Dispatch<
        React.SetStateAction<{
          message: string;
          title: string;
          flag: boolean;
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

const initialConfirmationValues = {
  message: "",
  title: "",
  flag: false,
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
  const { records, integrationFlow, selectedIntegration, connectionFlow } =
    state;

  const navigate = useNavigate();

  // Data fetching status tracking
  const [dataFetchStatus, setDataFetchStatus] = useState({
    isFetched: false,
    isFetching: false,
    lastFetched: null as number | null,
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
        const [integrations, connectionsList, company] = await Promise.all([
          fetchIntegrationsList(),
          fetchConnectionsList(),
          fetchCompany(),
        ]);

        // console.log("Fetching done in unified context");

        dispatch({ type: "SET_INTEGRATIONS_LIST", payload: integrations.data });
        dispatch({
          type: "SET_CONNECTIONS_LIST",
          payload: connectionsList.data,
        });
        dispatch({ type: "SET_COMPANY", payload: company });

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

  useEffect(() => {
    console.log(state.connectionForm)
  }, [state.connectionForm])

//   useEffect(()=>{
//     console.log(state.company);
// },[state.company])

  // useEffect(() => {
  //   console.log(state.selectedIntegration)
  // }, [state.selectedIntegration])

  // useEffect(()=>{
  //   console.log("in useEffect")
  //   if(state.selectedIntegration && state.connectionsList){
  //     console.log("in if case")
  //     dispatch({
  //       type: "SET_SELECTED_INTEGRATION_CONNECTIONS",
  //       payload: state.connectionsList?.filter(
  //         (connection) => connection.integrationId === state.selectedIntegration?.id
  //       ) || null,
  //     });
  //   }
  //   else if(state.selectedIntegration && !state.connectionsList){
  //     console.log("in else if case")
  //     fetchIntegrationConnections(state.selectedIntegration?.id).then((connections)=>{
  //       dispatch({
  //         type: "SET_SELECTED_INTEGRATION_CONNECTIONS",
  //         payload: connections,
  //       });
  //     });
  //   }
  // }, [state.selectedIntegration]);

  // Handle different flows
  useEffect(() => {
    switch (integrationFlow) {
      case "create":
      case "edit":
        // setIsIntegrationDrawerOpen(true);
        if (state.selectedIntegration) {
          // Additional side effects for different flows
          // ...
        }
        break;
      case "duplicate":
        HandleDuplicateIntegration()
        break;
      case "activation":
        // Handle activation flow
        HandleStatus();
        break;
      case "deactivation":
        // Handle activation flow
        HandleStatus();
        break;
      case "delete":
        // setDeleteIntegrationOpen(true);
        HandleDelete();
        break;
      default:
        break;
    }
  }, [integrationFlow, state.selectedIntegration]);

  // Handle connection flow changes
  useEffect(() => {
    switch (connectionFlow) {
      case "create":
      case "edit":
      case "duplicate":
        setIsConnectionDrawerOpen(true);
        break;
      case "activation":
        // Handle activation flow
        break;
      case "delete":
        // Handle delete flow
        break;
      default:
        break;
    }
  }, [connectionFlow]);

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
      message: "You have unsaved changes. Are you sure you want to close?",
      title: "Discard Changes?",
      flag: true,
    });
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
      message: "You have unsaved changes. Are you sure you want to close?",
      title: "Discard Changes?",
      flag: true,
    });
  };

  // Integration confirmation handlers
  const onIntegrationConfirmHandler = async () => {
    setIntegrationConfirmationOpen({ ...initialConfirmationValues });
    setIsIntegrationDrawerOpen(false);
    dispatch({ type: "RESET_INTEGRATION_FORM" });
    dispatch({ type: "SET_INTEGRATION_FLOW", payload: null });
  };

  const onIntegrationCancelHandler = () => {
    setIntegrationConfirmationOpen({ ...initialConfirmationValues });
  };

  // Connection confirmation handlers
  const onConnectionConfirmHandler = async () => {
    setConnectionConfirmationOpen({ ...initialConfirmationValues });
    setIsConnectionDrawerOpen(false);
    dispatch({ type: "RESET_CONNECTION_FORM" });
    dispatch({ type: "SET_CONNECTION_FLOW", payload: null });
  };

  const onConnectionCancelHandler = () => {
    setConnectionConfirmationOpen({ ...initialConfirmationValues });
  };

  const HandleDelete = () =>{
    console.log('In Handle Delete')
    // setDeleteIntegrationOpen(true);
    setDeleteIntegrationOpen({
      message: "Are you sure want to delete this Integration?",
      title: "Delete Integration",
      flag: true,
    });
  }

  const HandleStatus = () =>{
    console.log('In Handle status')
    const changingStatus =  selectedIntegration?.status === 'Active'?'DeActivate':'Activate';
    // setDeleteIntegrationOpen(true);
    setIntegrationTaskState({
      message: `Are you sure want to ${changingStatus} this Integration?`,
      title: `${changingStatus} Integration`,
      flag: true,
    });
  }

  const HandleDuplicateIntegration = () =>{
    console.log('In HandleDuplicateIntegration')
    const changingStatus =  selectedIntegration?.status === 'Active'?'DeActivate':'Activate';
    // setDeleteIntegrationOpen(true);
    setIntegrationTaskStateDuplicate({
      message: 'Are you sure want to duplicate this Integration?',
      title: 'Duplicate Integration',
      flag: true,
    });
  }
  


  const onDeleteIntegrtionHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) =>{
    e.stopPropagation();
    console.log('on DeleteIntegrationHandler', selectedIntegration);
    
    try {
      var userId = '2e8f113c-f772-4afb-b24b-f27d0af681ad';
      const deletedTime = new Date().toISOString();
      const deletedBy = userId
      const integrationId = selectedIntegration?.id; 

      console.log('on DeleteIntegrationHandler try', deletedTime, deletedBy);
      await updateIntegrationFn(integrationId!, {
        deletedAt: deletedTime,
        deletedBy: userId
      } as any);

      toast.success(
        `${selectedIntegration?.integrationName} deleted successfully`
      );

      await refreshIntegrationsAction({}, dispatch);
    } catch (error) {
      console.error("Failed to delete integration", error);
      toast.error("Failed to delete integration");
    } finally {
      setDeleteIntegrationOpen({ ...initialConfirmationValues });
    }
    
  }

  const onDeleteCancelHandler = () =>{
    setDeleteIntegrationOpen({ ...initialConfirmationValues });
  }

  const onDeActivateIntegrtionHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) =>{
    e.stopPropagation();
    try {
      const newStatus =  selectedIntegration?.status === 'Active'? 'Inactive':'Active';
      const integrationId  = selectedIntegration?.id;

      await updateIntegrationFn(integrationId!, {
        status: String(newStatus)
      } as any);

      toast.success(
        `${selectedIntegration?.integrationName} status updated successfully`
      );

      await refreshIntegrationsAction({}, dispatch);
    } catch (error) {
      console.error("Failed to update integration status", error);
      toast.error("Failed to update integration status");
    } finally {
      setIntegrationTaskState({ ...initialConfirmationValues });
    }
    
  }

  const onDeActivateCancelHandler = () =>{
    setIntegrationTaskState({ ...initialConfirmationValues });
  } 

  const onDuplicateIntegrtionHandler: React.MouseEventHandler<HTMLButtonElement> = async (e) =>{
    e.stopPropagation();
    console.log('onDuplicateIntegrationHandleer', selectedIntegration);
    try {
      if(!selectedIntegration) return;
      const copyIntegrationName =  `Copy Of ${selectedIntegration?.integrationName}`;
      const updatedData = {
        ...selectedIntegration,
        integrationName: copyIntegrationName,
        integrationCode: `CP-${selectedIntegration?.integrationCode!}`,
      }
      const cpIntegrationType = selectedIntegration.integrationType.replace(/_/g, " ");
      console.log('In duplicate', updatedData);
      // await createIntegrationFn({})
      // await createIntegrationExample()
      await createIntegrationFn({

        logo: selectedIntegration?.logo,
        isFavorite: selectedIntegration?.isFavorite,
        integrationName: copyIntegrationName,
        integrationCode: `CP-${selectedIntegration?.integrationCode!}`,
        applicationName: selectedIntegration?.applicationName!,
        // applicationName: ApplicationName.Azure_DevOps,
        description: selectedIntegration?.description,
        integrationType: cpIntegrationType!,
        integrationCategory: selectedIntegration?.integrationCategory!.replace(/_/g, " "),
        connectionType: selectedIntegration?.connectionType!,
        authType: selectedIntegration?.authType!,
        connectionLimit: selectedIntegration?.connectionLimit!,
        status: selectedIntegration?.status!,
        companyIds: selectedIntegration?.companyIds!,
        tags: ["Project Management", "Azure DevOps", "Project Management"],
      });

      toast.success(
        `${selectedIntegration?.integrationName} duplicated successfully`
      );

      dispatch({ type: "RESET_INTEGRATION_FORM" });
      dispatch({ type: "CLEAR_INTEGRATION_ERRORS" });
    } catch (error) {
      console.error("Failed to duplicate integration", error);
      toast.error("Failed to duplicate integration");
    } finally {
      setIntegrationTaskStateDuplicate({ ...initialConfirmationValues });
    }
    
  }

  const onDuplicateCancelHandler = () =>{
    setIntegrationTaskStateDuplicate({ ...initialConfirmationValues });
  }

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
          isOpen={integrationConfirmationOpen.flag}
          message={integrationConfirmationOpen.message}
          title={integrationConfirmationOpen.title}
          onClose={onIntegrationCancelHandler}
          onConfirm={onIntegrationConfirmHandler}
        />
      )}

      {DeleteIntegrationOpen.flag && (
        <ConfirmationModal
          isOpen={DeleteIntegrationOpen.flag}
          message={DeleteIntegrationOpen.message}
          title={DeleteIntegrationOpen.title}
          onClose={onDeleteCancelHandler}
          onConfirm={onDeleteIntegrtionHandler}
        />
      )}

      {integrationTaskState.flag && (
        <ConfirmationModal
          isOpen={integrationTaskState.flag}
          message={integrationTaskState.message}
          title={integrationTaskState.title}
          onClose={onDeActivateCancelHandler}
          onConfirm={onDeActivateIntegrtionHandler}
        />
      )}

      {integrationTaskStateDuplicate.flag && (
        <ConfirmationModal
          isOpen={integrationTaskStateDuplicate.flag}
          message={integrationTaskStateDuplicate.message}
          title={integrationTaskStateDuplicate.title}
          onClose={onDuplicateCancelHandler}
          onConfirm={onDuplicateIntegrtionHandler}
        />
      )}

      {/* Connection UI components */}
      {connectionConfirmationOpen.flag && (
        <ConfirmationModal
          isOpen={connectionConfirmationOpen.flag}
          message={connectionConfirmationOpen.message}
          title={connectionConfirmationOpen.title}
          onClose={onConnectionCancelHandler}
          onConfirm={onConnectionConfirmHandler}
        />
      )}

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
