import React from 'react'
import PageHeader from '~/components/Globals/PageHeader'

const PageHeaderDemo = () => {
    return (
        <PageHeader
            organization="Organization / Users"
            title="Chemical Synthesis"
            status="active"
            metadata={{
                since: "AUGUST 2024",
                departments: ["PFIZER EU", "PFIZER SALES"],
                email: "OLIVIA.HILLS@ZEAK.IO",
                phone: "522-799-0171"
            }}
            navigationTabs={["Text", "Text", "Text", "Text", "Text", "Text", "Text", "Text"]}
            currentPage={5}
            totalPages={32}
        />
    )
}

export default PageHeaderDemo;