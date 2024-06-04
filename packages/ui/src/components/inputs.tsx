import { Input, InputProps } from "@nextui-org/react";
import { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";
import { forwardRef } from "@nextui-org/react";
interface EmailInputProps extends InputProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  page?: string;
}
export const EmailInput = forwardRef<"input", EmailInputProps>((props, ref) => {
  const defaultInputPropsForEmail: InputProps = {
    ...props,
    ref,
    type: "email",
    label: "Email",
    value: props.email,
    labelPlacement: "outside",
    placeholder: "Enter your Email",
    onChange: props.onChange,
    color: !!props.errorMessage ? "danger" : "primary",
    variant: "bordered",
    errorMessage: props.errorMessage,
    isInvalid: !!props.errorMessage,
    isRequired: true,
  };
  return <Input {...defaultInputPropsForEmail} />;
});

interface PasswordInputProps extends InputProps {
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPassword?: string;
  errorMessage?: string;
  passwordType?: string;
  page?: string;
}
export const PasswordInput = forwardRef<"input", PasswordInputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const defaultInputPropsForPassword: InputProps = {
      ...props,
      ref,
      variant: "bordered",
      label:
        props.passwordType === "current-password"
          ? "Password"
          : "Confirm Password",
      value:
        props.passwordType === "current-password"
          ? props.password
          : props.confirmPassword,
      labelPlacement: "outside",
      placeholder:
        props.type === "current-password"
          ? "Enter your password"
          : "Confirm your password",
      onChange: props.onChange,
      type: isVisible ? "text" : "password",
      className: "max-w-xs",
      autoComplete: props.type,
      isRequired: true,
      isInvalid: !!props.errorMessage,
      color: !!props.errorMessage ? "danger" : "primary",
      errorMessage: props.errorMessage,
    };
    switch (props.page) {
      case "login":
        break;
      case "signup":
        defaultInputPropsForPassword.isRequired = true;
        defaultInputPropsForPassword.isInvalid = !!props.errorMessage;
        defaultInputPropsForPassword.color = !!props.errorMessage
          ? "danger"
          : "primary";
        defaultInputPropsForPassword.errorMessage = props.errorMessage;
        break;
      default:
        console.log("Default page");
    }
    return (
      <Input
        endContent={
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
        }
        {...defaultInputPropsForPassword}
      />
    );
  }
);
