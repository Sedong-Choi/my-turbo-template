import LoginCard from "@repo/ui/LoginCard";
import { GoogleIcon, GithubIcon } from "@repo/ui/Icons";
import { signIn } from "next-auth/react";
import SocialButton from "@repo/ui/SocialButton";

export default async function Login() {
  return (
    <LoginCard className="py-20">
      <SocialButton
        provider="google"
        socialIcon={<GoogleIcon />}
        page="login"
        signIn={signIn}
      />
      <SocialButton
        provider="github"
        socialIcon={<GithubIcon />}
        page="login"
        signIn={signIn}
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
