import ListCard from "./ListCard";
import { useAllMasterlist } from "../../hooks";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";

export default function ListView() {
    const { data: masterLists, isPending, isError } = useAllMasterlist();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (masterLists && masterLists.data.length > 0 && !searchParams.get("id")) {
    //         navigate(`/x/masterlists?id=${masterLists.data[0].id}`, { replace: true });
    //     }
    // }, [masterLists, searchParams, navigate]);

    if (isPending) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error fetching master lists</div>;
    }
    if (!masterLists || masterLists.data.length === 0) {
        return <div>No master lists available</div>;
    }

    return (
        <div className="space-y-[2px]">
            {masterLists.data.map((masterList: any) => (
                <ListCard
                    name={masterList.name}
                    id={masterList.id}
                    key={masterList.id}
                    systemDefined={true}
                    isActive={true}
                    updatedBy="test"
                    updatedAt={new Date()}
                />
            ))}
        </div>
    );
}
