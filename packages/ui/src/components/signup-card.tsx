"use client";
import { useState } from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";

interface SignUpCardProps {
  onSignUp: () => void;
  className?: string;
}

const SignupCard = ({ onSignUp, className }: SignUpCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className={`flex h-full items-center justify-center  ${className}`}>
      <Card className="min-w-96 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
        <CardHeader className="text-2xl font-bold mb-6">Sign Up</CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4 pb-4">
            <Input
              type="email"
              label="Email"
              required
              labelPlacement="outside"
              placeholder="Enter your email"
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
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="border transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed border-transparent bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
                onClick={onSignUp}
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
