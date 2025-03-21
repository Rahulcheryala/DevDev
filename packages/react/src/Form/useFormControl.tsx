import { ariaAttr } from "../utils/dom";
import { callAllHandlers } from "../utils/function";
import type { FormControlOptions } from "./FormControl";
import { useFormControlContext } from "./FormControl";

export interface UseFormControlProps<T extends HTMLElement>
  extends FormControlOptions {
  id?: string;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
}

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 *
 * @internal
 */
export function useFormControl<T extends HTMLElement>(
  props: UseFormControlProps<T>,
) {
  const { isDisabled, isInvalid, isReadOnly, isRequired, ...rest } =
    useFormControlProps(props);

  return {
    ...rest,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly),
  };
}

/**
 * @internal
 */
export function useFormControlProps<T extends HTMLElement>(
  props: UseFormControlProps<T>,
) {
  const field = useFormControlContext();

  const {
    id,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const labelIds: string[] = props["aria-describedby"]
    ? [props["aria-describedby"]]
    : [];

  // Error message must be described first in all scenarios.
  if (field?.hasFeedbackText && field?.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field?.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return {
    ...rest,
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id ?? field?.id,
    isDisabled: disabled ?? isDisabled ?? field?.isDisabled,
    isReadOnly: readOnly ?? isReadOnly ?? field?.isReadOnly,
    isRequired: required ?? isRequired ?? field?.isRequired,
    isInvalid: isInvalid ?? field?.isInvalid,
    onFocus: callAllHandlers(field?.onFocus, onFocus),
    onBlur: callAllHandlers(field?.onBlur, onBlur),
  };
}
