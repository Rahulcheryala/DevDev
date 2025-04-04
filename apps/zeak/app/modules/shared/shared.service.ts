import type { Database } from "@zeak/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import axios from "axios";
import { path } from "~/utils/path";


export function getModuleConfig(
  client: SupabaseClient<Database>,
  name: string,
) {
  return client
    .from("moduleConfiguration")
    .select("*")
    .eq("name", name)
    .single();
}

export interface AddressComponents {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export const extractAddressComponents = (
  place: google.maps.places.PlaceResult,
): AddressComponents => {
  let address1: Array<string> = [],
    address2: Array<string> = [],
    city = "",
    state = "",
    zipCode = "",
    country = "";

  if (place.address_components) {
    const formattedAddress = place.formatted_address;
    place.address_components.forEach((component) => {
      const types = component.types;
      const isSubLocalityAddress =
        types.includes("sublocality_level_2") ||
        types.includes("sublocality_level_3") ||
        types.includes("sublocality_level_4") ||
        types.includes("sublocality_level_5");
      if (
        types.includes("premise") ||
        types.includes("subpremise") ||
        types.includes("plus_code") ||
        types.includes("street_number") ||
        types.includes("route")
      ) {
        address1.push(component.long_name);
      }
      if (
        types.includes("sublocality") ||
        types.includes("sublocality_level_1")
      ) {
        address2.push(component.long_name);
      }
      if (
        types.includes("sublocality") ||
        types.includes("sublocality_level_1") ||
        (isSubLocalityAddress &&
          formattedAddress?.includes(component.long_name))
      ) {
        address2.push(component.long_name);
      }
      if (types.includes("locality")) {
        city = component.long_name;
      }
      if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
      if (types.includes("postal_code")) {
        zipCode = component.long_name;
      }
      if (types.includes("country")) {
        country = component.long_name;
      }
    });
  }
  return {
    address1: address1.join(", "),
    address2: address2.join(", "),
    city,
    state,
    zipCode,
    country,
  };
};

export const uploadImageToS3FromClient = async (
  imageData: File,
  folderName: string,
) => {
  if (imageData) {
    const newFileName = encodeURI(imageData.name);
    const newFile = new File([imageData], newFileName, {
      type: imageData.type,
    });

    const formData = new FormData();
    formData.append("folder", folderName);
    formData.append("files", newFile);
    const result = await axios({
      method: "post",
      url: path.to.api.s3Upload,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (result?.data?.files?.length) {
      return result?.data?.files[0];
    }
    return null;
  }
};

export async function getTableColDetails(
  client: SupabaseClient<Database>,
  tableName: string,
) {
  return client.rpc("get_types", { tname: tableName });
}
