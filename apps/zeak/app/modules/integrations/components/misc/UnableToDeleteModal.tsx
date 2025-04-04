import { ConfirmationModal } from "@zeak/ui";
import { LuFolderOpen } from "react-icons/lu";

interface Dependency {
  count: number;
  label: string;
  action?: () => void;
}

interface UnableToDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityType?: "integration" | "connection";
  dependencies: Dependency[];
}

const UnableToDeleteModal = ({
  isOpen,
  onClose,
  entityType = "connection",
  dependencies,
}: UnableToDeleteModalProps) => {
  const dependenciesContent = (
    <div className="space-y-3 mt-4">
      {dependencies.map((dep, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-zeak">
          <div className="flex items-center gap-3">
            <span className="text-secondary text-sm">{dep.count}</span>
            <span className="text-secondary text-sm">{dep.label}</span>
          </div>
          {dep.action && (
            <button
              onClick={dep.action}
              className="text-primary-bright text-sm flex items-center gap-1"
            >
              Open
              <LuFolderOpen className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Unable to Delete"
      type="danger"
      message={[`You're unable to delete this ${entityType} due to the following:`]}
      rightButtonText="Ok"
      // leftButtonText=""
      leftButtonClassName="hidden"
      rightButtonClassName="col-span-2"
      onRightButtonClick={onClose}
      children={dependenciesContent}
    />
  );
};

export default UnableToDeleteModal; 