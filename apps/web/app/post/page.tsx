import CardWrapper from "@/components/main-card-wrapper"; // Import the CardWrapper component
import PostCard from "@repo/ui/PostCard";
import { posts } from "@repo/ui/mock";

export default function Test(){

    return (
        <div className="flex flex-col items-center gap-4">
            <CardWrapper as={PostCard} items={posts} />
      </div>
    )
}