import {
  Button,
  HStack,
  Label,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  VStack,
  useMount,
} from "@zeak/react";
import { useControlField, useField, ValidatedForm } from "@zeak/remix-validated-form";
import { useFetcher, useNavigate } from "@remix-run/react";
import { Boolean, Input, Select, Submit } from "~/components/Form";
import type { getEmployeeTypes } from "~/modules/users";
import { createEmployeeValidator } from "~/modules/users";
import type { Result } from "~/types";
import { path } from "~/utils/path";
import { useState } from "react";

const CreateEmployeeModal = () => {
  const navigate = useNavigate();
  const formFetcher = useFetcher<Result>();
  const employeeTypeFetcher = useFetcher<Awaited<ReturnType<typeof getEmployeeTypes>>>();

  const [sendInvite, setSendInvite] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);


  useMount(() => {
    employeeTypeFetcher.load(path.to.api.employeeTypes);
  });

  const employeeTypeOptions =
    employeeTypeFetcher.data?.data?.map((et) => ({
      value: et.id,
      label: et.name,
    })) ?? [];

  return (
    <Modal
      open
      onOpenChange={(open) => {
        if (!open) navigate(-1);
      }}
    >
      <ModalOverlay />
      <ModalContent className="max-w-xl mx-auto">
        <ValidatedForm
          method="post"
          action={path.to.newEmployee}
          validator={createEmployeeValidator}
          id="createUser"
          fetcher={formFetcher}
          className="flex flex-col h-full"
        >
          <ModalHeader className="border-b border-gray-200 px-6 py-4">
            <ModalTitle className="text-xl font-semibold">Create an account</ModalTitle>
          </ModalHeader>

          <ModalBody className="p-6">
            <VStack spacing={4}>
              <Input
                name="email"
                label="Email"
                className="w-full"
              />

              <div className="grid grid-cols-2 gap-4 w-full">
                <Input
                  name="firstName"
                  label="First Name"
                  className="w-full"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  className="w-full"
                />
              </div>

              <Select
                name="employeeType"
                label="Employee Type"
                options={employeeTypeOptions}
                placeholder="Select Employee Type"
                className="w-full"
              />

              <div className="space-y-2 w-full">
                {/* <FormControl> */}
                <HStack className="justify-between items-center bg-gray-50 rounded-lg p-4">
                  <div className="space-y-1">
                    <Label htmlFor="inviteUser" className="font-medium">
                      Send Invitation Email
                    </Label>
                    <p className="text-sm text-gray-500">
                      User will receive an email invitation to set up their account
                    </p>
                  </div>
                  <Boolean
                    // key={field.id}
                    name="inviteUser"
                    label='inviteUser'
                  />
                </HStack>
                {/* </FormControl> */}
              </div>

              {!sendInvite && (
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  className="w-full"
                />
              )}

              <div className="space-y-2 w-full">
                <HStack className="justify-between items-center bg-gray-50 rounded-lg p-4">
                  <div className="space-y-1">
                    <Label htmlFor="enable2FA" className="font-medium">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-gray-500">
                      Require 2FA for additional security
                    </p>
                  </div>
                  <Boolean
                    name="enable2FA"
                    label='enable2FA'
                  />
                </HStack>
              </div>
            </VStack>
          </ModalBody>

          <ModalFooter className="border-t border-gray-200 px-6 py-4">
            <HStack className="justify-end space-x-3">
              <Button
                variant="outline-primary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Submit className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                Create User
              </Submit>
            </HStack>
          </ModalFooter>
        </ValidatedForm>
      </ModalContent>
    </Modal>
  );
};

export default CreateEmployeeModal;