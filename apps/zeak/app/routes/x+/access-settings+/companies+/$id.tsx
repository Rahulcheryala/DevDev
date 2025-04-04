import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { requirePermissions } from "~/services/auth/auth.server";
import { getCompanyByCompanyIdAndUserId, updateCompany } from "~/modules/settings";
import CompanyDetails from "~/modules/organisation/company/components/common/CompanyDetails";
import { flash } from "~/services/session.server";
import { success, error } from "~/utils/result";
import { useCompanyEditStore } from "~/shared/companyEditStore";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const { client, userId } = await requirePermissions(request, {
        view: "users",
        role: "employee",
    });

    const company = await getCompanyByCompanyIdAndUserId(
        client,
        params.id,
        userId
    );

    if (!company) {
        throw new Error("Company not found");
    }

    return json({ company });
}

export async function action({ request, params }: ActionFunctionArgs) {
    const { client, userId } = await requirePermissions(request, {
        update: ["settings", "users"],
    });

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await updateCompany(client, params.id, {
            ...data,
            updatedBy: userId
        });

        return json(
            {},
            await flash(request, success("Updated successfully"))
        );
    } catch (err: any) {
        return json(
            {},
            await flash(request, error(err, "Failed to update company"))
        );
    }
}

export default function CompanyDetailsPage() {
    const { company } = useLoaderData<typeof loader>();
    const submit = useSubmit();
    const { setCompanies } = useCompanyEditStore();

    const handleSave = (data: any) => {
        console.log(data, 'data****')

        try {
            submit(data, { method: "post" });
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return <CompanyDetails company={company} onSave={handleSave} />;
} 