import { useNavigate } from "@remix-run/react";
import { PageHeader } from "@zeak/ui";

import { breadcrumbs } from "../../constants";

interface CompanyMenubarProps {

}

export default function CompanyMenubar() {
    const navigate = useNavigate();

    return <PageHeader
        title="Companies"
        breadcrumbs={breadcrumbs}
        onGoBack={() => navigate(-1)}
        onEdit={() => console.log('Edit clicked')}
        onMore={() => console.log('More clicked')}
        onClose={() => navigate(-1)}
        showEdit={true}
        showMore={true}
        showClose={true}
        className="custom-menubar h-auto"
    />;
}
