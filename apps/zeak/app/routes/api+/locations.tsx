import { ActionFunctionArgs, json } from "@remix-run/node";
import { Country, State } from "country-state-city";

export async function loader() {
    const countries = Country.getAllCountries().map(country => ({
        value: country.isoCode,
        label: country.name,
        dialCode: country.phonecode,
        flag: country.flag
    }));

    return json({ countries });
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const countryCode = formData.get("countryCode") as string;

    if (!countryCode) {
        return json({ states: [] });
    }

    const states = State.getStatesOfCountry(countryCode).map(state => ({
        value: state.isoCode,
        label: state.name
    }));

    return json({ states });
} 