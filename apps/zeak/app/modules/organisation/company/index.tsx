import { CompanyMenubar, CompanyTabsRenderer } from "./components/common";

export default function CompanyModule({ data, count }: { data: any, count: number }) {
  return (
    <>
      <CompanyMenubar />
      <CompanyTabsRenderer companiesData={data} companiesCount={count} />
    </>
  );
}