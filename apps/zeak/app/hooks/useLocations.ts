import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export function useLocations(countryCode?: string) {
    const countryFetcher = useFetcher();
    const stateFetcher = useFetcher();

    useEffect(() => {
        // Fetch countries on mount
        countryFetcher.load("/api/locations");
    }, []);

    useEffect(() => {
        // Fetch states when country changes
        if (countryCode) {
            const formData = new FormData();
            formData.append("countryCode", countryCode);
            stateFetcher.submit(formData, {
                method: "POST",
                action: "/api/locations"
            });
        }
    }, [countryCode]);
    return {
        countries: countryFetcher.data && typeof countryFetcher.data === 'object' && 'countries' in countryFetcher.data ? countryFetcher.data.countries : [],
        states: stateFetcher.data && typeof stateFetcher.data === 'object' && 'states' in stateFetcher.data ? stateFetcher.data.states : [],
        isLoading: countryFetcher.state === "loading" || stateFetcher.state === "loading"
    }
}