"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { CustomInput } from "./inputs";
import useValidateForm from "../../hooks/useValidateForm";
import { focusOnFirstErrorField } from "../../utils/focus";
import { SignUpFormProps } from "../types";
import { ToastContainer, toast } from "react-toastify";

interface SignUpCardProps {
  onSignUp: (options: SignUpFormProps) => Promise<any>;
  className?: string;
}

const SignupCard = ({ onSignUp, className }: SignUpCardProps) => {
  const { values, errors, handleChange, validateForm } =
    useValidateForm("signup");
  const refs = {
    emailRef: useRef<HTMLInputElement>(),
    passwordRef: useRef<HTMLInputElement>(),
    confirmPasswordRef: useRef<HTMLInputElement>(),
    userNameRef: useRef<HTMLInputElement>(),
  };

  const onSubmitHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const isValid = await validateForm();
    focusOnFirstErrorField(refs, errors);
    if (isValid) {
      toast
        .promise(
          onSignUp({
            email: values.email,
            password: values.password,
            name: values.userName ?? "",
          }),
          {
            pending: "Signing Up...",
            success: "Successfully SignUp",
            error: "User already exists",
          }
        )
        .then((res: any) => {
          console.log(res);
          if(res.message === "success"){
            window.location.href = "/login";
          }
        }).catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={`flex h-full items-center justify-center  ${className}`}>
      <Card className="min-w-96 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
        <CardHeader className="text-2xl font-bold mb-6">Sign Up</CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4 pb-4">
            <CustomInput
              ref={refs.emailRef}
              value={values.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("email", e.target.value)
              }
              errorMessage={errors.email?.text}
              inputType="email"
              labelPlacement="outside"
            />
            <CustomInput
              ref={refs.passwordRef}
              value={values.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("password", e.target.value)
              }
              errorMessage={errors.password?.text}
              inputType="password"
              labelPlacement="outside"
            />
            <CustomInput
              ref={refs.confirmPasswordRef}
              value={values.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("confirmPassword", e.target.value)
              }
              errorMessage={errors.confirmPassword?.text}
              inputType="confirm-password"
              labelPlacement="outside"
            />
            <CustomInput
              ref={refs.userNameRef}
              label="User name"
              value={values.userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("userName", e.target.value)
              }
              isInvalid={!!errors.userName}
              errorMessage={errors.userName?.text}
              inputType="text"
              color={!!errors.userName ? "danger" : "primary"}
              placeholder="Enter your username"
              labelPlacement="outside"
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
