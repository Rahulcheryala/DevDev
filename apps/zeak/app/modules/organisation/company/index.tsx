import { GoArrowLeft } from "react-icons/go";
import { Button } from "@zeak/react";
import { Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { HiPlus } from "react-icons/hi";
import { Breadcrumbs } from "~/components";
import CompanyList from "~/modules/organisation/company/components/CompanyList";
import { path } from "~/utils/path";
import { PageHeader } from "~/components/Shared";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@zeak/react";
import { tabsLinks } from "./utils/constants";
import AllCompaniesTable from "./components/AllCompaniesTable";
import CompaniesCharts from "./components/CompaniesCharts";
import CreateCompany from "./components/CreateNewCompany";


export default function CompanyModule({ data, count }: { data: any, count: number }) {
  const navigate = useNavigate();

  const breadcrumbs = [
    {
      label: "Settings",
      to: "/"
    },
    {
      label: "Company"
    }
  ];

  return (
    <>
     <div className="bg-[#F0F4FD]">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Company"
        onEdit={() => {}}
        onMore={() => {}}
        onClose={() => {}}
        showDropdown={true}
      />

      <Tabs defaultValue={tabsLinks[1].value} className="w-full h-full">
        <TabsList aria-label="List of tabs" className="px-6 bg-white rounded-b-[12px]">
          {tabsLinks?.map((tab) => (
            <TabsTrigger
              className={`flex flex-col relative px-2 items-center data-[state=active]:border-0 group ${tab.value === 'dashboard' ? 'pointer-events-none opacity-50' : ''}`}
              key={tab?.id}
              value={tab?.value}
            >
              <div className="px-[14px] h-[60px] group-hover:font-semibold group-hover:text-[#0D0C22] flex items-center pt-[10px] pb-1 leading-[20px]">
                {tab?.title}
              </div>
              <div className="w-full h-[6px] absolute bottom-0 right-0 left-0 bg-[#ACBBD6] rounded-t-[3px] hidden group-hover:block group-data-[state=active]:block"></div>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="h-full" value={tabsLinks?.[0]?.value}>
          {/* Dashboard content here */}
        </TabsContent>
        <TabsContent className="h-full" value={tabsLinks?.[1]?.value}>
          <CompaniesCharts />
          {/* <AllCompaniesTable companiesData={data} /> */}
          {/* <CreateCompany /> */}
          <CompanyList data={data} count={count} />
        </TabsContent>
      </Tabs>

        
       
        </div>
      
    </>
  );
}