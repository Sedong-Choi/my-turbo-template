import CustomButton from "@repo/ui/CustomButton";

export default function Page(): JSX.Element {
  return (
    <div className="relative w-full h-full">
    <div className="fixed flex justify-center items-center">

      <CustomButton className={
        [
          "dark:bg-slate-50",
          "dark:text-slate-900",
          "dark:hover:text-slate-900",
          "dark:hover:after:opacity-60",
          "dark:hover:after:scale-110",
          "dark:hover:after:transition",
          "dark:hover:after:duration-500",
          "dark:hover:after:z-[-1]",
          "dark:hover:after:rounded-full",
          "dark:hover:after:absolute",
          "dark:hover:after:inset-0",
          "dark:hover:after:content-['']",
        ]
      }>Confetti</CustomButton>
      </div>
    </div>
  );
}
