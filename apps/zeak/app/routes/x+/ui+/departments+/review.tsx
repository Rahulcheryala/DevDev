import { Button } from "@zeak/react";
import { Link, useNavigate } from "@remix-run/react";
import { RxSlash } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { BottomControls, StepperItem } from "~/modules/access-settings";
import SettingsList from "~/modules/shared/ui/SettingsList/SettingsList";

export default function ReviewDepartment() {
  const navigate = useNavigate();
  const stepsList = [
    {
      id: 1,
      title: "General",
      isActive: false,
      isCompleted: true,
      label: "1",
    },
    {
      id: 2,
      title: "Summary",
      isActive: true,
      isCompleted: false,
      label: "2",
    },
  ];
  const handleReview = () => {
    navigate("/x/ui/departments/add-users");
  };

  return (
    <div className="pt-[25px] px-[60px] w-full">
      {/* New Breadcumbs */}
      <ul className="grid grid-flow-col auto-cols-max gap-1">
        <li>
          <Link
            to={"/"}
            className="text-textLink text-sm leading-[20px] tracking-wider"
          >
            Settings
          </Link>
        </li>
        <li>
          <span className="text-secondary text-base leading-[20px] h-[24px] flex items-center justify-center">
            <RxSlash />
          </span>
        </li>
        <li>
          <span className="text-accent text-sm leading-[20px] tracking-wider">
            Departments
          </span>
        </li>
      </ul>
      {/* New Breadcumbs */}
      <SettingsList isSelectable={false} title="Product Research" />
      <div className="mx-auto max-w-[1240px] pb-4">
        <div className="flex items-center">
          {stepsList.map((step, index) => (
            <>
              <StepperItem
                stepItem={step}
                listLength={stepsList.length}
                index={index}
              />
            </>
          ))}
        </div>
      </div>
      <div className="pt-10 -mx-[60px] px-[60px] border-t border-stroke">
        <div className="mx-auto max-w-[1240px] pb-[60px]">
          <div
            className="flex justify-between items-start p-6 rounded-sm mb-10 relative"
            style={{ backgroundColor: "hsl(177.27deg 56.12% 61.57% / 20%)" }}
          >
            <div className="max-w-[600px]">
              <h3 className="text-[20px] leading-[28px] text-accent-dark font-medium mb-2">
                Next Steps
              </h3>
              <p className="text-secondary font-normal text-sm">
                Your Department has been successfully created. You can close the
                record or use the{" "}
                <span className="font-semibold">next steps</span> shown on right
                to add users and manage your department details.
              </p>
            </div>
            <div>
              <Button
                variant="secondary"
                className="min-w-[268px] items-center font-normal h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark"
              >
                <FiUser size={24} className="mr-2" />
                Add Users
              </Button>
            </div>
          </div>
          <div className="bg-card p-8 rounded-sm border border-stroke">
            <div>
              <h3 className="text-2xl font-semibold mb-3 pb-3 border-b border-stroke">
                Summary{" "}
              </h3>
            </div>
            <div className="bg-table p-8 mb-6 rounded-sm">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Department Name
                  </h4>
                  <h4 className="text-base text-tertiary">Catalog</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Department Code
                  </h4>
                  <h4 className="text-base text-tertiary">PFS</h4>
                </div>
                <div></div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Company
                  </h4>
                  <h4 className="text-base text-tertiary">PFIZER SALES</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Description
                  </h4>
                  <h4 className="text-base text-tertiary">
                    Conducts research and development
                  </h4>
                </div>
                <div></div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Supervisor Name
                  </h4>
                  <h4 className="text-base text-tertiary">Ryan Pazos</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Supervisor Email
                  </h4>
                  <h4 className="text-base text-tertiary">Admin@email.com</h4>
                </div>
                <div></div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Save Status
                  </h4>
                  <h4 className="text-base text-tertiary">Active</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Effective From
                  </h4>
                  <h4 className="text-base text-tertiary">08/19/2024</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Effective To
                  </h4>
                  <h4 className="text-base text-tertiary">--</h4>
                </div>
              </div>
            </div>
            <div className="bg-table p-8 mb-6 rounded-sm">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Created By
                  </h4>
                  <h4 className="text-base text-tertiary">Ryan Pazos</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Created on
                  </h4>
                  <h4 className="text-base text-tertiary">08/19/2024</h4>
                </div>
                <div></div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Last Updated By
                  </h4>
                  <h4 className="text-base text-tertiary">Ryan Pazos</h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark font-medium mb-1">
                    Updated on
                  </h4>
                  <h4 className="text-base text-tertiary">08/19/2024</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomControls
        handleReview={handleReview}
        isReviewPage={true}
        handleBackClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleAddUsersClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleDuplicateClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
