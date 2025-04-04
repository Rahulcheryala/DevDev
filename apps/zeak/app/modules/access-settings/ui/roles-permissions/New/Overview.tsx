import { useEffect, useState, forwardRef } from "react";
import {
  Select,
  TextArea,
  ClearableInput,
  DatePicker,
  Hidden,
} from "~/components/Form";
import type { z } from "zod";
import { ValidatedForm } from "@zeak/remix-validated-form";
import { roleValidator } from "~/modules/access-settings";
import { path } from "~/utils/path";
import type { Company } from "~/modules/settings";
import { useRouteData } from "~/hooks";

type OverviewFormProps = {
  initialValues: z.infer<typeof roleValidator>;
};

const Overview = forwardRef(
  ({ initialValues }: OverviewFormProps, ref: any) => {
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
        {/* <Alert className="[&>svg]:top-[18px]" variant="warning">
          <IoInformationCircleSharp size={20} />
          <AlertDescription>
            Only Tenant Admins can create a Custom Role. Custom Roles are
            available for any company under the primary account.
          </AlertDescription>
        </Alert> */}
        <ValidatedForm
          id={"role-permission-form"}
          validator={roleValidator}
          method="POST"
          action={
            initialValues.id
              ? path.to.rolesPermissionsEdit(initialValues.id)
              : path.to.rolesPermissionsNew
          }
          defaultValues={initialValues}
        >
          <div className="grid grid-cols-2 gap-10">
            <div className="col-span-2">
              <ClearableInput
                name="name"
                label="Role name"
                placeholder="Enter Role Name"
              />
            </div>
          </div>

          <div className="flex flex-wrap mx-[-20px]">
            <div className="px-[20px] w-full sm:w-1/2 mt-[40px]">
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Category
              </label>
              <Select name="category" disabled={true} options={[]} />
            </div>
            <div className="px-[20px] w-full sm:w-1/2 mt-[40px]">
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Company
              </label>
              <Select name="companyId" options={companies} />
            </div>
            <div className="px-[20px] w-full sm:w-1/2 mt-[40px]">
              <DatePicker name="effectiveDate" label="Effectivity date" />
            </div>
            <div className="px-[20px] w-full mt-[40px]">
              <label className="text-[14px] leading-[20px] text-accent mb-[12px] block">
                Description
              </label>
              <TextArea
                name="description"
                // placeholder="Managing admin role for North America locations"
                className="min-h-[104px]"
              />
            </div>
            <Hidden name="type" />
            <Hidden name="id" />
          </div>
          <button className="hidden" ref={ref}>
            ss
          </button>
        </ValidatedForm>
      </>
    );
  },
);

Overview.displayName = "Overview";
export default Overview;
