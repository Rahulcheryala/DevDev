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
// import { toast } from "@zeak/react";
// import { useNavigate } from "@remix-run/react";
import { ConfirmationModal } from "../../../components/Layout/Screen";
import IntegrationAddFlow from "../components/CreateFlow";
import { ConnectionProvider } from "./connection";

// temporary data
import { integrations, Integration } from "../models/constants";

// Define flow types for integrations
export type IntegrationFlow =
  | "create"
  | "edit"
  | "connection"
  | "activation"
  | "duplicate"
  | "delete"
  | null;

const integrationObject: IIntegrationModel = {
  id: "550e8400-e29b-41d4-a716-446655440000", // UUID
  integrationName: "Salesforce Integration",
  purpose: "CRM data synchronization",
  application: "salesforce",
  connectionType: "OData", // UUID for connection type
  integrationCategory: "ERP", // UUID for category
  authenticationType: "OAuth 2.0", // UUID for auth type
  status: "Active", // UUID for status
  connectionLimit: 100,
  createdAt: "2024-03-19T10:30:00Z", // ISO timestamp
  createdBy: "user123-4567-89ab-cdef-123456789abc", // UUID for user
  updatedAt: "2024-03-19T11:45:00Z", // ISO timestamp
  lastUpdatedBy: "user123-4567-89ab-cdef-123456789abc", // UUID for user
  deletedAt: null,
  deletedBy: null,
  syncToken: "sync123-4567-89ab-cdef-123456789abc", // UUID for sync token
};

// Define the state interface
export type IntegrationState = {
  records: Integration[];
  selectedIntegration: Integration | null;
  integrationForm: IntegrationForm;
  currentFlow: IntegrationFlow;
  isLoading: boolean;
  error: Error | null;
  errors: { [key: string]: string | null };
  isFormDirty: boolean;
  connectionsList: any[];
  selectedConnection: any;
  viewType: "list" | "grid";
};

// Define action types
export type IntegrationAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null }
  | { type: "SET_RECORDS"; payload: Integration[] }
  // | { type: "ADD_RECORDS"; payload: IIntegrationModel[] }
  | { type: "SET_SELECTED_INTEGRATION"; payload: Integration | null }
  | { type: "SET_SELECTED_CONNECTION"; payload: any }
  | {
      type: "UPDATE_FORM";
      payload: Partial<IntegrationForm>;
      setFormDirty?: boolean;
    }
  | { type: "RESET_FORM" }
  | { type: "SET_FLOW"; payload: IntegrationFlow }
  | { type: "UPDATE_ERROR"; payload: { [key: string]: string | null } }
  | { type: "CLEAR_ERRORS" }
  | { type: "SET_VIEW_TYPE"; payload: "list" | "grid" };

// Initial state
const initialState: IntegrationState = {
  records: integrations,
  selectedIntegration: null,
  integrationForm: initialIntegrationForm,
  currentFlow: null,
  isLoading: true,
  error: null,
  errors: {},
  isFormDirty: false,
  connectionsList: integrations.flatMap(integration => integration.connections),
  selectedConnection: null,
  viewType: "grid",
};

// Reducer function
function integrationReducer(
  state: IntegrationState,
  action: IntegrationAction
): IntegrationState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_VIEW_TYPE":
      return { ...state, viewType: action.payload };
    case "SET_RECORDS":
      return { ...state, records: action.payload };
    // case "ADD_RECORDS":
    //   return { ...state, records: [...state.records, ...action.payload] };
    case "SET_SELECTED_INTEGRATION":
      return { 
        ...state, 
        selectedIntegration: action.payload,
        connectionsList: action.payload?.connections!,
        selectedConnection: null 
      };
    case "SET_SELECTED_CONNECTION":
      return { 
        ...state, 
        selectedConnection: state.connectionsList.find(
          connection => connection.id === action.payload
        )
      };
    case "UPDATE_FORM":
      return {
        ...state,
        integrationForm: { ...state.integrationForm, ...action.payload },
        isFormDirty:
          action.setFormDirty !== undefined ? action.setFormDirty : true,
      };
    case "RESET_FORM":
      return {
        ...state,
        integrationForm: initialIntegrationForm,
        isFormDirty: false,
      };
    case "SET_FLOW":
      return { ...state, currentFlow: action.payload };
    case "UPDATE_ERROR":
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
}

// Create context
const IntegrationContext = createContext<
  | {
      state: IntegrationState;
      dispatch: React.Dispatch<IntegrationAction>;
    }
  | undefined
>(undefined);

const initialConfirmationValues = {
  message: "",
  title: "",
  flag: false,
};

// Provider component
export const IntegrationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(integrationReducer, initialState);
  const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState({
    ...initialConfirmationValues,
  });
  const { currentFlow } = state;

  // Fetch initial data
  // const fetchData = useCallback(async () => {
  //   try {
  //     dispatch({ type: "SET_LOADING", payload: true });
  //     dispatch({ type: "SET_ERROR", payload: null });

  //     // TODO: Replace with actual API calls
  //     const [integrations] = await Promise.all([
  //       // fetchIntegrationList()
  //       Promise.resolve([]),
  //     ]);

  //     dispatch({ type: "SET_RECORDS", payload: integrations });
  //   } catch (error) {
  //     dispatch({
  //       type: "SET_ERROR",
  //       payload:
  //         error instanceof Error ? error : new Error("An error occurred"),
  //     });
  //   } finally {
  //     dispatch({ type: "SET_LOADING", payload: false });
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  // Handle different flows
  useEffect(() => {
    switch (currentFlow) {
      case "create":
        setIsCreateFlowOpen(true);
        break;
      default:
        break;
    }
  }, [currentFlow]);

  const closeCreateDrawer = (ignoreCheck?: boolean) => {
    if (state.isFormDirty && !ignoreCheck) {
      setConfirmationOpen({
        flag: true,
        title: "Cancel Edit?",
        message:
          "Do you want to leave without saving? You will lose all the progress.",
      });
      return;
    }
    setIsCreateFlowOpen(false);
    dispatch({ type: "RESET_FORM" });
    dispatch({ type: "SET_FLOW", payload: null });
    dispatch({ type: "CLEAR_ERRORS" });
  };

  const onConfirmHandler = async () => {
    setConfirmationOpen({ ...initialConfirmationValues });
    if (currentFlow === "create") {
      closeCreateDrawer(true);
    }
    dispatch({ type: "SET_FLOW", payload: null });
  };

  const onCancelHandler = () => {
    setConfirmationOpen({ ...initialConfirmationValues });
    if (currentFlow === "create") return;
    dispatch({ type: "SET_FLOW", payload: null });
  };

  return (
    <IntegrationContext.Provider
      value={{ state, dispatch }}
    >
      {children}
      <ConnectionProvider>
        <IntegrationAddFlow
          isOpen={isCreateFlowOpen}
          closeDrawer={closeCreateDrawer}
        />
      </ConnectionProvider>
      <ConfirmationModal
        isOpen={confirmationOpen.flag}
        message={confirmationOpen.message}
        title={confirmationOpen.title}
        onClose={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    </IntegrationContext.Provider>
  );
};

// Custom hook for using the context
export const useIntegrationContext = () => {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error(
      "useIntegrationContext must be used within an IntegrationProvider"
    );
  }
  return context;
};
