import React from "react";

interface FacebookButtonProps {
  handleClick: () => void;
  type: "sing-up" | "login";
}
const FacebookButton: React.FC<FacebookButtonProps> = ({
  handleClick,
  type,
}: FacebookButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className="transition-colors focus:ring-2 p-0.5 disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg "
    >
      <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
        </svg>
        Sign in with Facebook
      </span>
    </button>
  );
};

export default FacebookButton;
