"use client";
import SignupCard from "@repo/ui/SignupCard";

export default function Signup(): JSX.Element {
  const onSignUp = () => {};
  return (
    <SignupCard
      onSignUp={onSignUp}
      className="py-20"
    />
  );
}
