"use client";
import LoginCard from "@repo/ui/LoginCard";
import { Google, Github } from "@repo/ui/Icons";
import { signIn } from "next-auth/react";
import SocialButton from "@repo/ui/SocialButton";

export default function Login(): JSX.Element {
  return (
    <LoginCard className="py-20" onSignIn={signIn}>
      <SocialButton
        provider="google"
        socialIcon={<Google />}
        page="login"
        onClick={signIn}
      />
      <SocialButton
        provider="github"
        socialIcon={<Github />}
        page="login"
        onClick={signIn}
      />
      {/* <SocialButton
        provider="facebook"
        socialIcon={<Facebook />}
        page="login"
        onClick={signIn}
      /> */}
    </LoginCard>
  );
}
