import CardWrapper from "@/components/main-card-wrapper";
import CustomButton from "@repo/ui/CustomButton";
import PostCard from "@repo/ui/PostCard";
import { posts } from "@repo/ui/mock";
export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center h-10">
        <CustomButton
          className={[
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
          ]}
        >
          Confetti
        </CustomButton>
      </div>
      <CardWrapper as={PostCard} items={posts} />
    </div>
  );
}
