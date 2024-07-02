import { FormErrors } from "../hooks/useValidateForm";

export function focusOnFirstErrorField(refs: any, errors: FormErrors) {
  if (Object.keys(errors).length > 0) {
    const sortedErrors = Object.entries(errors).sort(([, a], [, b]) => a.order - b.order);
    const firstError = sortedErrors[0]?.[0]; 
    const ref = refs[`${firstError}Ref`];
    if (ref && ref.current) {
      ref.current.focus();
    }
  }
}