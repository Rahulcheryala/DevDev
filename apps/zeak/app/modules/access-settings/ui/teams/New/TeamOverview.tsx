import { useEffect, useState, forwardRef } from "react";
import {
  Select,
  TextArea,
  ClearableInput,
  Hidden,
  Radios,
} from "~/components/Form";
import type { z } from "zod";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { teamValidator } from "../../../access-settings.model";
import { path } from "~/utils/path";
import type { Company } from "~/modules/settings";
import { useRouteData } from "~/hooks";

type TeamOverviewFormProps = {
  initialValues: z.infer<typeof teamValidator>;
};

const TeamOverview = forwardRef(
  ({ initialValues }: TeamOverviewFormProps, ref: any) => {
    const [companies, setCompanies] = useState<
      { label: string; value: string }[]
    >([]);
    const routeData = useRouteData<{ company: Company; companies: Company[] }>(
      path.to.authenticatedRoot,
    );

    useEffect(() => {
      if (routeData?.companies?.length) {
        const list = routeData?.companies.map((company: Company) => {
          return { label: `${company.name}`, value: `${company.id}` };
        });
        setCompanies(list);
      }
    }, [routeData?.companies]);

    return (
      <>
        <ValidatedForm
          id={"team-permission-form"}
          validator={teamValidator}
          method="POST"
          action={
            initialValues.id
              ? path.to.teamsEdit(initialValues.id)
              : path.to.teamsNew
          }
          defaultValues={initialValues}
        >
          <div className="flex flex-wrap mx-[-20px]">
            <div className="px-[20px] w-1/2 mt-[40px]">
              <ClearableInput name="name" label="Team Name" />
            </div>
            <div className={"px-[20px] w-1/2 mt-[40px]"}>
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Company Name
              </label>
              <Select
                name="companyId"
                className={true ? "bg-[#F4F4F4] rounded-lg" : ""}
                options={companies}
                selectedValue={initialValues.companyId}
                disabled={true}
              />
            </div>
            <div className="px-[20px] w-full mt-[40px]">
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Description
              </label>
              <TextArea name="description" className="min-h-[104px]" />
            </div>
            <div className="px-[20px] w-1/2 mt-[40px] w-full">
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Status
              </label>
              <Radios
                name="status"
                options={[
                  {
                    label: "Active",
                    value: "Active",
                  },
                  {
                    label: "Inactive",
                    value: "Inactive",
                  },
                ]}
              />
            </div>
            <Hidden name="id" />
          </div>
          <button className="hidden" ref={ref}>
            teamoverviewform
          </button>
        </ValidatedForm>
      </>
    );
  },
);

TeamOverview.displayName = "TeamOverview";
export default TeamOverview;
