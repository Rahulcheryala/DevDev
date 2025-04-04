import React from 'react'
import { MasterListPageHeader, MasterListTabs, CreateMasterList } from '~/modules/masterlist';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireAuthSession } from '~/services/session.server';
import { getSupabase } from '~/lib/supabase';
import { getUser } from '~/modules/users/users.server';




export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken, userId, } =
    await requireAuthSession(request, { verify: false });

  const supabase = getSupabase(accessToken);

  const { data: systemDefinedMasterLists, error } = await supabase
    .from('masterList')
    .select('*')
  const { data: user, error: userError } = await getUser(supabase, userId);
  if (userError) {
    throw new Error(userError.message);
  }
  const { data: tenant, error: tenantError } = await supabase
    .from("tenantMaster")
    .select("*")
    .eq("createdBy", user?.id)
    .single();
  if (tenantError) {
    throw new Error(tenantError.message);
  }
  const { data: companies, error: companiesError } = await supabase
    .from('companyMaster')
    .select('*')
    .eq('tenantId', tenant?.id)

  return json({
    message: "Master lists fetched successfully",
    userId,
    systemDefinedMasterLists,
    companies,
  });

}


export default function MasterLists() {
  const { userId, systemDefinedMasterLists, companies } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#F0F4FD]">

      <div className="flex w-full gap-4">

        <div className="w-full">
          <MasterListPageHeader />
          <MasterListTabs userId={userId} />
          <CreateMasterList companies={companies} userId={userId} />
        </div>
      </div>
    </div>
  )
}
