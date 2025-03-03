import { Button, IconButton } from "@zeak/react";
import { Link, useLocation } from "@remix-run/react";
import { GoArrowLeft } from "react-icons/go";
import { IoIosCheckbox } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import {
  BlueYellowBadge,
  LightGradientBadge,
} from "~/modules/pricing/ui/badge";

export interface IProps {
  innerView: JSX.Element;
}

export default function PricingLayout({ innerView }: IProps) {
  const stepsList = [
    { id: 1, title: "Choose Products", isActive: true, label: "1" },
    { id: 2, title: "Summary", isActive: false, label: "2" },
    { id: 3, title: "Checkout", isActive: false, label: "3" },
  ];
  const platformSolutionsList = [
    {
      id: 1,
      title: "Bundle with all Products",
      isActive: true,
      label: "",
      to: "/pricing",
    },
    {
      id: 2,
      title: "Create a Bundle",
      isActive: false,
      label: "",
      to: "/create-bundle",
    },
    {
      id: 1,
      title: "Select a Bundle",
      isActive: false,
      label: "",
      to: "/select-bundle",
    },
  ];
  const productsList = [
    {
      id: 1,
      title: "Automations",
      isActive: false,
      label: <LightGradientBadge label="AI" />,
      to: "/automations",
    },
    {
      id: 2,
      title: "Labels and Forms",
      isActive: false,
      label: "",
      to: "/labels-reports",
    },
    {
      id: 3,
      title: "Customer Service Automation",
      isActive: false,
      label: "",
    },
    {
      id: 4,
      title: "Quality Management",
      isActive: false,
      label: <BlueYellowBadge label="Beta" />,
    },
    { id: 5, title: "Electronic Batch Records", isActive: false, label: "" },
    { id: 6, title: "Master Data", isActive: false, label: "" },
  ];

  return (
    <div className="pt-[140px] px-[60px] pb-2 bg-white min-h-screen max-h-screen overflow-auto">
      {/* Header */}
      <div className="flex items-center fixed top-0 left-0 bg-white w-full px-[60px] py-10 z-[1]">
        <div className="w-[300px] flex items-center">
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<GoArrowLeft className="text-secondary" />}
            size="md"
            className="mr-6"
          />
          <Link to="#" className="inline-block">
            <img src="/images/project-xblack-logo.png" alt="Project X" />
          </Link>
        </div>
        <div className="flex items-center justify-between w-[calc(100%_-_300px)]">
          <div className="px-[40px] flex items-center">
            {stepsList.map((step, index) => (
              <div className="flex items-center" key={step.id}>
                {index != 0 && <hr className="min-w-[240px]" />}
                <Button variant="ghost" className="h-auto flex-col">
                  {true ? (
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                           ${
                             step.isActive
                               ? "bg-accent text-white"
                               : "text-tertiary border border-stroke-primary bg-table"
                           }`}
                    >
                      {step.label}
                    </span>
                  ) : (
                    <IoIosCheckbox className="text-accent-green w-10 h-10" />
                  )}
                  <span className={step.isActive ? "" : "text-tertiary"}>
                    {step.title}
                  </span>
                </Button>
              </div>
            ))}
          </div>
          <IconButton
            variant="ghost"
            aria-label="Clear"
            icon={<TfiClose className="text-secondary" />}
            size="md"
          />
        </div>
      </div>
      {/* Header */}
      <div className="flex">
        {/* Sidenav */}
        <div className="w-[300px] fixed top-[140px] left-[60px] bg-white h-[calc(100vh_-_140px)] overflow-y-auto z-[1]">
          {true ? (
            <>
              <div className="pb-10">
                <h3 className="mb-2 py-[10px] text-md font-semibold">
                  Platform Solutions
                </h3>
                <SidenavList list={platformSolutionsList} />
              </div>
              <div className="pb-10">
                <h3 className="mb-2 py-[10px] text-md font-semibold">
                  Products
                </h3>
                <SidenavList list={productsList} />
              </div>
            </>
          ) : (
            <div className="p-8 border border-stroke mb-4">
              <div className="grid gap-y-[48px]">
                <h3 className="text-2xl font-semibold">Details</h3>
                <div>
                  <h5 className="text-sm text-secondary mb-2">Company Name</h5>
                  <p className="text-lg font-medium">Xcelpros Technologies</p>
                </div>
                <div>
                  <h5 className="text-sm text-secondary mb-2">Company Name</h5>
                  <p className="text-lg font-medium">Xcelpros Technologies</p>
                </div>
                <div>
                  <h5 className="text-sm text-secondary mb-2">Company Name</h5>
                  <p className="text-lg font-medium">Xcelpros Technologies</p>
                </div>
                <Button
                  variant="link"
                  className="text-accent-primary hover:text-accent-primary text-left w-[fit-content] h-auto p-0"
                >
                  Edit details
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* Sidenav */}
        <div className="w-full pl-[360px]">
          {/* <BundleWithProductsContent /> */}
          {innerView}
          {/* <CreateBundleContent /> */}
        </div>
      </div>
      <div className="pb-10 pt-2 text-center sticky z-[1] left-0 -bottom-2 bg-white">
        <Link to="#" className="text-accent-primary text-sm font-normal">
          Need help?
        </Link>
      </div>
    </div>
  );
}

const SidenavList = (props: any) => {
  const { list } = props;
  const location = useLocation();

  return (
    <>
      <ul>
        {list.map((item: any) => (
          <li
            key={item.id}
            className={`py-3 my-2 px-2 hover:bg-accent-bgHoverNew rounded-md 
               ${location.pathname === item.to ? "bg-accent-bgHoverNew" : ""}`}
          >
            <Link
              to={item.to}
              className={`py-1 px-4 ${
                location.pathname === item.to
                  ? "border-l-[3px] border-accent-primary text-accent-primary font-semibold"
                  : ""
              }`}
            >
              {item.title}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
