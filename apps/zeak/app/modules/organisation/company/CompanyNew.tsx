import CompanyModal from "./components/CompanyModal";

const CompanyNewModule = ({ newCompany, googleMapsApiKey, company }: { newCompany: boolean, googleMapsApiKey: string, company: any }) => {
    return <CompanyModal newCompany={newCompany} googleMapsApiKey={googleMapsApiKey} company={company} />
}

export default CompanyNewModule;