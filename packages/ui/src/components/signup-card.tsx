"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { EmailInput, PasswordInput } from "./inputs";
import useValidateForm from "../../hooks/useValidateForm";
import { focusOnFirstErrorField } from "../../utils/focus";

interface SignUpCardProps {
  onSignUp: () => void;
  className?: string;
}

const SignupCard = ({ onSignUp, className }: SignUpCardProps) => {
  const { values, errors, handleChange, validateForm, isValid } =
    useValidateForm("signup");

  const refs = {
    emailRef: useRef<HTMLInputElement>(),
    passwordRef: useRef<HTMLInputElement>(),
    confirmPasswordRef: useRef<HTMLInputElement>(),
    userNameRef: useRef<HTMLInputElement>(),
  };

  const onSubmitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    validateForm();
    focusOnFirstErrorField(refs, errors);
    if (isValid) {
      console.log("Sign up successful");
    }
  };

  return (
    <div className={`flex h-full items-center justify-center  ${className}`}>
      <Card className="min-w-96 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
        <CardHeader className="text-2xl font-bold mb-6">Sign Up</CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4 pb-4">
            <EmailInput
              ref={refs.emailRef}
              email={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              errorMessage={errors.email?.text}
              page="signup"
            />
            <PasswordInput
              ref={refs.passwordRef}
              password={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              errorMessage={errors.password?.text}
              type="current-password"
              page="signup"
            />
            <PasswordInput
              ref={refs.confirmPasswordRef}
              password={values.password}
              confirmPassword={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              errorMessage={errors.confirmPassword?.text}
              type="confirm-password"
              page="signup"
            />
            <Input
              ref={refs.userNameRef}
              type="text"
              label="User name"
              value={values.userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("userName", e.target.value)
              }
              isInvalid={!!errors.userName}
              errorMessage={errors.userName?.text}
              isRequired
              labelPlacement="outside"
              placeholder="Enter your username"
              color={!!errors.userName ? "danger" : "primary"}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  onSubmitHandler(e)
                }
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignupCard;
