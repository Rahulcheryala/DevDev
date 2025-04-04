import type z from "zod";
import type { companyValidatorV2 } from "../access-settings.model";
import CreateCompanySidebar from "./CreateCompanySidebar";
import CreateCompanyForm from "./CreateCompanyForm";

type CompanyEditModalProps = {
  newCompany?: boolean;
  googleMapsApiKey: string;
  company?: z.infer<typeof companyValidatorV2>;
};

const CompanyModal = ({
  newCompany = true,
  googleMapsApiKey,
  company,
}: CompanyEditModalProps) => {
  return (
    <>
      <div className="flex gap-4 min-h-screen bg-[#F0F4FD]">
        <CreateCompanySidebar />
        <CreateCompanyForm company={company} />
      </div>
    </>
  );
};

export default CompanyModal;
