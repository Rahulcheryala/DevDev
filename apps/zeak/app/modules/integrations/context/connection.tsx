import { createContext, useContext, useReducer, ReactNode, useState, useEffect } from "react";
import { IConnectionModel } from "../models/connection.model";
import { ConnectionForm, initialConnectionFormData } from "../models/connection-form.model";
import ConnectionAddFlow from "../components/CreateFlow/Connection";
import { ConfirmationModal } from "~/components/Layout/Screen";

export type ConnectionFlow =
  | "create"
  | "edit"
  | "delete"
  | "activation"
  | "duplicate"
  | null;

interface ConnectionState {
  records: IConnectionModel[];
  selectedConnection: IConnectionModel | null;
  connectionForm: ConnectionForm;
  currentFlow: ConnectionFlow;
  isLoading: boolean;
  error: Error | null;
  errors: { [key: string]: string | null };
  isFormDirty: boolean;
}

type ConnectionAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null }
  | { type: "SET_RECORDS"; payload: IConnectionModel[] }
  | { type: "SET_SELECTED_CONNECTION"; payload: IConnectionModel | null }
  | { type: "UPDATE_FORM"; payload: Partial<ConnectionForm> }
  | { type: "RESET_FORM" }
  | { type: "SET_FLOW"; payload: ConnectionFlow }
  | { type: "UPDATE_ERROR"; payload: { [key: string]: string | null } }
  | { type: "CLEAR_ERRORS" };

const initialConnectionForm: ConnectionForm = {
  ...initialConnectionFormData,
};

const initialState: ConnectionState = {
  records: [],
  selectedConnection: null,
  connectionForm: initialConnectionForm,
  currentFlow: null,
  isLoading: true,
  error: null,
  errors: {},
  isFormDirty: false,
};

const connectionReducer = (
  state: ConnectionState,
  action: ConnectionAction
): ConnectionState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_RECORDS":
      return {
        ...state,
        records: action.payload,
      };
    case "SET_SELECTED_CONNECTION":
      return {
        ...state,
        selectedConnection: action.payload,
      };
    case "UPDATE_FORM":
      return {
        ...state,
        connectionForm: {
          ...state.connectionForm,
          ...action.payload,
        },
      };
    case "RESET_FORM":
      return {
        ...state,
        connectionForm: initialConnectionForm,
        isFormDirty: false,
      };
    case "SET_FLOW":
      return {
        ...state,
        currentFlow: action.payload,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

const ConnectionContext = createContext<{
  state: ConnectionState;
  dispatch: React.Dispatch<ConnectionAction>;
} | null>(null);

const initialConfirmationValues = {
  message: "",
  title: "",
  flag: false,
};

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(connectionReducer, initialState);
  const [isCreateFlowOpen, setIsCreateFlowOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState({
    ...initialConfirmationValues,
  });
  const { currentFlow } = state;

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
        message: "Do you want to leave without saving? You will lose all the progress.",
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
    <ConnectionContext.Provider value={{ state, dispatch }}>
      {children}
      <ConnectionAddFlow
        isOpen={isCreateFlowOpen}
        closeDrawer={closeCreateDrawer}
      />
      <ConfirmationModal
        isOpen={confirmationOpen.flag}
        message={confirmationOpen.message}
        title={confirmationOpen.title}
        onClose={onCancelHandler}
        onConfirm={onConfirmHandler}
      />
    </ConnectionContext.Provider>
  );
};

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionContext must be used within a ConnectionProvider"
    );
  }
  return context;
};
