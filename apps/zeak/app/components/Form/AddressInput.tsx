import { useRef, forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  type InputProps,
} from "@zeak/react";
import { useField } from "@zeak/remix-validated-form";
import GoogleAddressAutocomplete from "../GoogleAddressInput";
import { RiErrorWarningLine } from "react-icons/ri";

type FormAddressInputProps = InputProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  hideClose?: boolean;
  isReadOnly?: boolean;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  googleMapsApiKey: string;
};

const AddressInput = forwardRef<HTMLInputElement, FormAddressInputProps>(
  (
    { name, label, isRequired, onPlaceSelect, googleMapsApiKey, ...rest },
    addrRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { getInputProps, error } = useField(name);
    const autoCompleteRef: any = addrRef || inputRef;

    const inputProps = getInputProps({
      id: name,
      placeholder: rest.placeholder || "",
      value: rest.value,
      hideClose: rest.hideClose,
      isReadOnly: rest.isReadOnly,
      ...rest,
    });

    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && (
          <FormLabel
            className="text-[14px] leading-[20px] text-accent mb-[12px]"
            htmlFor={name}
          >
            {label}
          </FormLabel>
        )}
        <GoogleAddressAutocomplete
          ref={autoCompleteRef}
          inputProps={inputProps}
          name={name}
          onPlaceSelect={onPlaceSelect}
          googleMapsApiKey={googleMapsApiKey}
          clearInput={() => inputProps?.onChange?.({ target: { value: "" } })}
        />
        {error && (
          <FormErrorMessage className="mt-[12px] flex">
            <RiErrorWarningLine size={20} className="mr-2" />
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  },
);

AddressInput.displayName = "AddressInput";

export default AddressInput;
