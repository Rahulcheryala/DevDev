import React from 'react'
import { MasterListPageHeader, MasterListTabs, LeftPanel } from '~/modules/masterlist';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireAuthSession } from '~/services/session.server';
import { getSupabase } from '~/lib/supabase';
import { requirePermissions } from '~/services/auth/auth.server';




export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken, companyId, expiresAt, expiresIn, userId, } =
    await requireAuthSession(request, { verify: false });

  const supabase = getSupabase(accessToken);

  const { data: systemDefinedMasterLists, error } = await supabase
    .from('masterList')
    .select('*')


  return json({
    message: "Master lists fetched successfully",
    userId,
    systemDefinedMasterLists,
  });

}


export default function MasterLists() {
  const { userId, systemDefinedMasterLists } = useLoaderData<typeof loader>();

  return (
    <div className="bg-[#F0F4FD]">

      <div>
        <details>
          <summary>
            System Defined Master Lists
          </summary>
          <div>
            {JSON.stringify(systemDefinedMasterLists)}
          </div>
        </details>
      </div>
      <div className="flex w-full gap-4">
        <LeftPanel userId={userId} />
        <div className="w-full">
          <MasterListPageHeader />
          <MasterListTabs />
        </div>
      </div>
    </div>
  )
}
