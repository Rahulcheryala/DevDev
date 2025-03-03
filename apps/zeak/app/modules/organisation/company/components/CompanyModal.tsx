import { useRef, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zeak/react";
import { PiPencilSimpleLine } from "react-icons/pi";
import * as Accordion from "@radix-ui/react-accordion";
import { IndeterminateCheckbox } from "~/components/Table/components";
import { LuChevronDown } from "react-icons/lu";
import CompanyProfileForm from "./CompanyProfileForm";
import { useNavigate } from "@remix-run/react";
import { path } from "~/utils/path";
import type z from "zod";
import { companyValidatorV2 } from "../access-settings.model";
import CreateCompanySidebar from "./CreateCompanySidebar";
import CreateCompanyForm from "./CreateCompanyForm";

type CompanyEditModalProps = {
  newCompany?: boolean;
  googleMapsApiKey: string;
  companyDetails?: z.infer<typeof companyValidatorV2>;
  company?: any;
};

const CompanyModal = ({
  newCompany = true,
  googleMapsApiKey,
  companyDetails,
  company,
}: CompanyEditModalProps) => {
  return (
    <>
      <div className="flex w-full gap-4 min-h-screen bg-[#F0F4FD]">
        <CreateCompanySidebar />
        <CreateCompanyForm company={company} />
      </div>
    </>
  );
};

export default CompanyModal;
