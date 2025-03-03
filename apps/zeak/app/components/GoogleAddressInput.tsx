import type { MutableRefObject } from "react";
import React, { useRef, forwardRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import {
  IconButton,
  Input,
  InputRightElement,
  type InputProps,
} from "@zeak/react";
import { GoogleMapsLibraries } from "~/modules/shared";
import { TfiClose } from "react-icons/tfi";

interface ExtendedInputProps extends InputProps {
  hideClose?: boolean;
}

type GoogleAddressAutocompleteProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
  inputProps: ExtendedInputProps;
  googleMapsApiKey: string;
  clearInput: () => void;
};

const GoogleAddressAutocomplete = forwardRef<
  HTMLInputElement,
  GoogleAddressAutocompleteProps
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: props.googleMapsApiKey,
    libraries: GoogleMapsLibraries,
  });

  React.useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: [],
      fields: ["address_components", "formatted_address"],
    });

    const handlePlacesSelect = () => {
      const place = autocomplete.getPlace();
      props?.onPlaceSelect && props?.onPlaceSelect(place);
    };

    autocomplete.addListener("place_changed", handlePlacesSelect);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    const container = document.getElementById(
      "main-layout",
    ) as HTMLElement | null;

    const handleScroll = () => {
      if (container && container.scrollTop) {
        const pacContainers = document.querySelectorAll(
          ".pac-container.pac-logo.hdpi",
        ) as NodeListOf<HTMLElement>;
        pacContainers.forEach((item) => {
          item.style.display = "none";
          inputRef.current?.blur();
        });
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const clearInput = (
    inputElementRef: MutableRefObject<HTMLInputElement | null>,
  ) => {
    if (inputElementRef.current) {
      inputElementRef.current.value = "";
    }
    props.clearInput();
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        name={props?.inputProps?.name || "address-input"}
        {...props.inputProps}
        // showErrors={false}
      />

      {!props?.inputProps?.hideClose && !!props?.inputProps?.value && (
        <InputRightElement className="w-[2.75rem] h-full absolute right-0 -top-1/2 translate-y-1/2">
          <IconButton
            aria-label={"clear"}
            icon={<TfiClose size={20} />}
            variant="ghost"
            tabIndex={-1}
            onClick={() => clearInput(inputRef)}
            className="hover:bg-transparent hover:text-destructive text-[#D11149]"
          />
        </InputRightElement>
      )}
    </div>
  );
});

GoogleAddressAutocomplete.displayName = "GoogleAddressAutocomplete";

export default GoogleAddressAutocomplete;
