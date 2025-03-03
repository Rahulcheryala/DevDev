import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  HStack,
  VStack,
} from "@zeak/react";

import { ValidatedForm } from "@zeak/remix-validated-form";
import { useLocation, useNavigate } from "@remix-run/react";
import type { z } from "zod";
import {
  CustomFormFields,
  Hidden,
  Input,
  Number,
  Select,
  Submit,
} from "~/components/Form";
import { usePermissions } from "~/hooks";
import { path } from "~/utils/path";
import { labelValidator } from "../../labelsreports.model";

type LabelFormProps = {
  initialValues: z.infer<typeof labelValidator>;
};

const LabelForm = ({ initialValues }: LabelFormProps) => {
  const permissions = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();
  const onClose = () => navigate(-1);

  const isEditing = !location.pathname.includes("new");
  const isDisabled = isEditing
    ? !permissions.can("update", "labelsreports")
    : !permissions.can("create", "labelsreports");

  const sizes = [
    {
      label: "px",
      value: "px",
    },
    {
      label: "cm",
      value: "cm",
    },
    {
      label: "in",
      value: "in",
    },
  ];

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <ValidatedForm
          validator={labelValidator}
          method="post"
          action={
            initialValues.id
              ? path.to.labelsreportsLabelEdit(initialValues.id)
              : path.to.labelsreportsLabelNew
          }
          defaultValues={initialValues}
          className="flex flex-col h-full"
        >
          <DrawerHeader>
            <DrawerTitle>{isEditing ? "Edit" : "New"} Label</DrawerTitle>
            <DrawerDescription>
              {isEditing ? "Edit the label" : "Create a new label"}{" "}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <Hidden name="id" />
            <Hidden
              name="configuration"
              value={
                initialValues.configuration
                  ? JSON.stringify(initialValues.configuration)
                  : undefined
              }
            />

            <VStack spacing={4}>
              <Input name="name" label="Name" />
              <Number
                name="width"
                label="Width"
                minValue={0}
                maxValue={10000}
              />
              <Number
                name="height"
                label="Height"
                minValue={0}
                maxValue={10000}
              />
              <Select name="size" label="Size" options={sizes} />
              <CustomFormFields table="labelsreports" />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              <Submit isDisabled={isDisabled}>Save</Submit>
              <Button size="md" variant="solid" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </DrawerFooter>
        </ValidatedForm>
      </DrawerContent>
    </Drawer>
  );
};

export default LabelForm;
