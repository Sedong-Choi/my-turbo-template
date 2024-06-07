"use client";
import React from "react";

interface SocialButtonProps {
  page: "sing-up" | "login";
  provider: string;
  socialIcon: React.ReactNode;
  onClick: (provider: string, options: { callbackUrl: string }) => void;
}
const SocialButton: React.FC<SocialButtonProps> = ({
  page,
  provider,
  socialIcon,
  onClick,
}: SocialButtonProps) => {
  return (
    <button
      id={`social-button-${provider}`}
      onClick={() => onClick(provider, { callbackUrl: "/" })}
      className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
    >
      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
        {socialIcon}
        {page === "login" ? "Sign in" : "Sign up"} with{" "}
        {`${provider.charAt(0).toUpperCase()}${provider.slice(1)}`}
      </span>
    </button>
  );
};
SocialButton.displayName = "SocialButton";
export default SocialButton;
