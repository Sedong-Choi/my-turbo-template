"use client";
interface Props {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
  className?: string;
}

export const Button = ({
  primary = false,
  label = "Boop",
  size = "small",
  className = "px-4 py-2 rounded-full",
}: Props) => {
  return (
    <button
      className={className}
      style={{
        backgroundColor : primary ? "blue": "gray" ,
        fontSize: size === "large" ? "24px" : "14px",
        color: "white"
      }}
    >
      
      {label}
    </button>
  );
};
