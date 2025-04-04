import { Button } from "@zeak/react";
import type {
  DepartmentType,
  DepartmentValidatorWithLogoFileType,
} from "~/modules/access-settings/types";
import { FiUser } from "react-icons/fi";
import { type Company } from "~/modules/settings";

type Supervisor = { id: string; fullName: string; email: string };

type DepartmentReviewAndSubmitProps = {
  departmentDetails: DepartmentValidatorWithLogoFileType | DepartmentType;
  selectedCompany: Company;
  selectedSupervisor: Supervisor | null;
  onAddUsersClick: () => void;
};

const DepartmentReviewAndSubmit = ({
  departmentDetails,
  selectedCompany,
  selectedSupervisor,
  onAddUsersClick,
}: DepartmentReviewAndSubmitProps) => {
  return (
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
              className="min-w-[268px] items-center h-[56px] rounded-sm bg-white text-base hover:bg-white hover:text-accent-dark"
              onClick={onAddUsersClick}
            >
              <FiUser size={24} className="mr-2" />
              Add Users
            </Button>
          </div>
        </div>
        <div className="bg-card p-8 rounded-sm border border-stroke">
          <div>
            <h3 className="font-xl font-semibold mb-3 pb-3 border-b border-stroke">
              Summary
            </h3>
          </div>
          <div className="bg-table p-8 mb-6 rounded-sm">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm text-accent-dark mb-1">
                  Department Name
                </h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.name}
                </h4>
              </div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">
                  Department Code
                </h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.departmentCode}
                </h4>
              </div>
              <div></div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">Company</h4>
                <h4 className="text-base text-tertiary">
                  {selectedCompany.name}
                </h4>
              </div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">Description</h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.description || "--"}
                </h4>
              </div>
              <div></div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">
                  Supervisor Name
                </h4>
                <h4 className="text-base text-tertiary">
                  {selectedSupervisor?.fullName || "--"}
                </h4>
              </div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">
                  Supervisor Email
                </h4>
                <h4 className="text-base text-tertiary">
                  {selectedSupervisor?.email || "--"}
                </h4>
              </div>
              <div></div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">Save Status</h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.status}
                </h4>
              </div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">
                  Effective From
                </h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.effectiveStartDate || "--"}
                </h4>
              </div>
              <div>
                <h4 className="text-sm text-accent-dark mb-1">Effective To</h4>
                <h4 className="text-base text-tertiary">
                  {departmentDetails?.effectiveEndDate || "--"}
                </h4>
              </div>
            </div>
          </div>
          {departmentDetails?.id && (
            <div className="bg-table p-8 mb-6 rounded-sm">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm text-accent-dark mb-1">Created By</h4>
                  <h4 className="text-base text-tertiary">
                    {(departmentDetails as DepartmentType)?.createdBy}
                  </h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark mb-1">Created on</h4>
                  <h4 className="text-base text-tertiary">
                    {(departmentDetails as DepartmentType)?.createdOn}
                  </h4>
                </div>
                <div></div>
                <div>
                  <h4 className="text-sm text-accent-dark mb-1">
                    Last Updated By
                  </h4>
                  <h4 className="text-base text-tertiary">
                    {(departmentDetails as DepartmentType)?.modifiedBy || "--"}
                  </h4>
                </div>
                <div>
                  <h4 className="text-sm text-accent-dark mb-1">Updated on</h4>
                  <h4 className="text-base text-tertiary">
                    {(departmentDetails as DepartmentType)?.modifiedOn || "--"}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentReviewAndSubmit;
