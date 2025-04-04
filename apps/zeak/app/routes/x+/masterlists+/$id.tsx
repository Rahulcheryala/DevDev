import React, { useEffect } from 'react'
import { LeftPanel, DetailsPageHeader, DetailsTabs, CreateMasterList, useMasterlistStore } from "~/modules/masterlist"
import { requireAuthSession } from '~/services/session.server';
import { getSupabase } from '~/lib/supabase';
import { json } from '@remix-run/node';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useParams, useBeforeUnload, useNavigate } from '@remix-run/react';
import { getUser } from '~/modules/users/users.server';
import { ScrollArea, ui } from '@zeak/react';
export async function loader({ request }: LoaderFunctionArgs) {
    const { accessToken, companyId, expiresAt, expiresIn, userId, } =
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
        companies
    });

}

export default function MasterList() {
    const { userId, companies, systemDefinedMasterLists } = useLoaderData<typeof loader>();
    const { isEditing, setIsEditing } = useMasterlistStore();
    const [showAlert, setShowAlert] = React.useState(false);
    const navigate = useNavigate();

    // Show alert when user tries to navigate away while editing
    useBeforeUnload(
        React.useCallback(
            (event) => {
                if (isEditing) {
                    event.preventDefault();
                    return "You have unsaved changes. Are you sure you want to leave?";
                }
            },
            [isEditing]
        )
    );

    // Handle internal navigation attempts
    useEffect(() => {
        const handleBeforeNavigate = (e: MouseEvent) => {
            if (!isEditing) return;

            const target = e.target as HTMLElement;
            const closestLink = target.closest('a');

            if (closestLink && closestLink.href && !closestLink.href.includes('#')) {
                e.preventDefault();
                e.stopPropagation();
                setShowAlert(true);
            }
        };

        document.addEventListener('click', handleBeforeNavigate, true);

        return () => {
            document.removeEventListener('click', handleBeforeNavigate, true);
        };
    }, [isEditing]);

    return (
        <div className='flex gap-4 bg-[#F0F4FD]'>
            <ui.Warning
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                onConfirm={() => {
                    setIsEditing(false);
                    setShowAlert(false);
                }}
                title="Attention"

            />
            <LeftPanel systemDefinedMasterLists={systemDefinedMasterLists} />
            <ScrollArea className="h-[calc(100vh-120px)] w-full">
                <div className="w-full">
                    <DetailsPageHeader userId={userId} />
                    <DetailsTabs userId={userId} />
                </div>
                <CreateMasterList companies={companies} userId={userId} />
            </ScrollArea>
        </div>
    )
}