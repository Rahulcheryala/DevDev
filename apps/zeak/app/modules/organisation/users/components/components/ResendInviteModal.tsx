import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { useFetcher } from "@remix-run/react";
import { UserSelect } from "~/components/Selectors";
import { resendInviteValidator } from "~/modules/users";
import { path } from "~/utils/path";

type ResendInviteModalProps = {
  userIds: string[];
  isOpen: boolean;
  onClose: () => void;
};

const ResendInviteModal = ({
  userIds,
  isOpen,
  onClose,
}: ResendInviteModalProps) => {
  const fetcher = useFetcher();
  const isSingleUser = userIds.length === 1;

  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <ModalContent className="max-w-lg mx-auto">
        <ModalHeader className="border-b border-gray-200 px-6 py-4">
          <ModalTitle className="text-xl font-semibold">
            {isSingleUser ? "Resend Invite" : "Resend Invites"}
          </ModalTitle>
        </ModalHeader>

        <ModalBody className="p-6 space-y-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to resend an invite to
            {isSingleUser ? " this user" : " these users"}?
          </p>
        </ModalBody>

        <ModalFooter className="border-t border-gray-200 px-6 py-4">
          <HStack className="justify-end space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <ValidatedForm
              method="post"
              action={path.to.resendInvite}
              validator={resendInviteValidator}
              onSubmit={onClose}
              fetcher={fetcher}
            >
              {userIds.map((id, index) => (
                <input
                  key={id}
                  type="hidden"
                  name={`users[${index}]`}
                  value={id}
                />
              ))}
              <Button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
              >
                Send Invite{!isSingleUser && 's'}
              </Button>
            </ValidatedForm>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResendInviteModal;
