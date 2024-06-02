"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Link,
  Button,
} from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from "./icons";
import GoogleButton from "./social-login-buttons/google-button";
import FacebookButton from "./social-login-buttons/facebook-button";
import NextLink from "next/link";
interface LoginCardProps {
  className?: string;
}
const LoginCard = ({ className }: LoginCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`flex h-full items-center justify-center  ${className}`}>
      <Card className="min-w-96 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
        <CardHeader className="text-2xl font-bold mb-6">Login</CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4 pb-4">
            <Input
              type="email"
              label="Email"
              required
              labelPlacement="outside"
              placeholder="Enter your username"
            />
            <Input
              label="Password"
              required
              labelPlacement="outside"
              placeholder="Enter your password"
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
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
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
