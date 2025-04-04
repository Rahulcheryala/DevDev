import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalTitle,
} from "@zeak/react";
import { Form } from "@remix-run/react";

type ConfirmDeleteProps = {
  hasAction?: boolean;
  action?: string;
  isOpen?: boolean;
  name: string;
  text: string;
  onCancel: () => void;
  onSubmit?: (e: any) => void;
};

const ConfirmDelete = ({
  hasAction = true,
  action,
  isOpen = true,
  name,
  text,
  onCancel,
  onSubmit,
}: ConfirmDeleteProps) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <ModalOverlay />
      <ModalContent size="small" hideCloseBtn>
        <ModalBody className="px-8 pt-8 pb-4 text-center">
          <ModalTitle className="text-2xl text-accent leading-8 mb-2">
            Delete {name}
          </ModalTitle>
          <p className="text-sm text-tertiary">{text}</p>
        </ModalBody>

        <ModalFooter className="px-8 pt-4 pb-8 flex flex-row">
          <Button
            variant="ghost"
            className="min-w-[188px] text-secondary text-base h-auto py-[12px] rounded-full mr-[40px]"
            onClick={onCancel}
          >
            Cancel
          </Button>
          {hasAction ? (
            <Form method="post" action={action} onSubmit={onSubmit}>
              <Button
                variant="primary"
                type="submit"
                className="min-w-[188px] text-base h-auto py-[12px] rounded-full focus-visible:none"
              >
                Delete
              </Button>
            </Form>
          ) : (
            <Button
              variant="primary"
              type="button"
              className="min-w-[188px] text-base h-auto py-[12px] rounded-full"
              onClick={onSubmit}
            >
              Delete
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDelete;
