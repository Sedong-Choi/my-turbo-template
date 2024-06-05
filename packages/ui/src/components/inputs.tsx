import { Input, InputProps } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";
import { forwardRef } from "@nextui-org/react";
export interface CustomInputProps extends InputProps {
  inputType: "email" | "password" | "confirm-password" | string;
  password?: string;
}
export const CustomInput = forwardRef<"input", CustomInputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const defaultInputProps: InputProps = {
      ...props,
      ref
    };

    switch (props.inputType) {
      case "email":
        defaultInputProps.label = "Email";
        defaultInputProps.placeholder = "Enter your Email";
        defaultInputProps.isInvalid = !!props.errorMessage;
        defaultInputProps.color = !!props.errorMessage ? "danger" : "primary";
        break;
      case "password":
        defaultInputProps.label = "Password";
        defaultInputProps.placeholder = "Enter your password";
        defaultInputProps.color = !!props.errorMessage ? "danger" : "primary";
        defaultInputProps.isInvalid = !!props.errorMessage;
        defaultInputProps.type = isVisible ? "text" : "password";
        defaultInputProps.autoComplete = "current-password";
        break;
      case "confirm-password":
        defaultInputProps.label = "Confirm Password";
        defaultInputProps.placeholder = "Enter your password";
        defaultInputProps.color = !!props.errorMessage ? "danger" : "primary";
        defaultInputProps.isInvalid = !!props.errorMessage;
        defaultInputProps.type = isVisible ? "text" : "password";
        defaultInputProps.autoComplete = "current-password";
        break;
    }
    return (
      <Input
        endContent={
          ["password", "confirm-password"].includes(props.inputType) && (
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          )
        }
        {...defaultInputProps}
      />
    );
  }
);
