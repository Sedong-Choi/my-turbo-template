"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardBody, Link, Button } from "@nextui-org/react";
import GoogleButton from "./social-login-buttons/google-button";
import FacebookButton from "./social-login-buttons/facebook-button";
import NextLink from "next/link";
import { CustomInput } from "./inputs";
import useValidateForm from "../../hooks/useValidateForm";
import { focusOnFirstErrorField } from "../../utils/focus";
interface LoginCardProps {
  className?: string;
}
const LoginCard = ({ className }: LoginCardProps) => {
  const { values, errors, handleChange, validateForm, isValid } =
    useValidateForm("login");
  const refs = {
    emailRef: useRef<HTMLInputElement>(),
    passwordRef: useRef<HTMLInputElement>(),
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    focusOnFirstErrorField(refs, errors);
    if (isValid) {
      console.log("Login successful");
    }
  };
  return (
    <div className={`flex h-full items-center justify-center  ${className}`}>
      <Card className="min-w-96 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
        <CardHeader className="text-2xl font-bold mb-6">Login</CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4 pb-4" onSubmit={onSubmitHandler}>
            <CustomInput
              ref={refs.emailRef}
              value={values.email}
              inputType="email"
              errorMessage={errors.email?.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("email", e.target.value)
              }
              labelPlacement="outside"
            />
            <CustomInput
              ref={refs.passwordRef}
              value={values.password}
              errorMessage={errors.password?.text}
              inputType="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("password", e.target.value)
              }
              labelPlacement="outside"
            />
            <p className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600">
              Forgot password?
            </p>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
              >
                Login
              </Button>
              <GoogleButton handleClick={() => {}} type="login" />
              <FacebookButton handleClick={() => {}} type="login" />
            </div>
          </form>
          <div className="min-w-[270px]">
            <div className="mt-4 text-center dark:text-gray-200">
              New user?&nbsp;
              <Link
                as={NextLink}
                className="text-blue-500 underline hover:text-blue-600"
                href="/sign-up"
              >
                Create account here
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginCard;
