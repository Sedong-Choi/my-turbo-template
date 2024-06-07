"use client";
import SignupCard from "@repo/ui/SignupCard";
import { apiRequest } from "@repo/ui/Utils";
import { SignUpFormProps } from "@repo/ui/types";

export default function SignUp(): JSX.Element {
  const onSignUp = async (
    options: SignUpFormProps
  ): Promise<any> => {
    let url = "/api/auth/register";
    return apiRequest(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
      });
  };
  return <SignupCard onSignUp={onSignUp} className="py-20" />;
}
