"use client";

import CardWrapper from "@/components/main-card-wrapper";
import PostCard from "@repo/ui/PostCard";
import InteractiveCardContainer from "@repo/ui/InteractiveCardContainer";

import CustomButton from "@repo/ui/CustomButton";
import { useState } from "react";
import { posts } from "@repo/ui/mock";
import { CardData } from "../../../packages/ui/src/components/interactive-card";
export default function Page(): JSX.Element {
  const [isWelcomeClicked, setIsWelcomeClicked] = useState(false);


  // interactive card data
  const interactiveCardData: CardData[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1631552009879-7e8a3c1b8b7a",
      title: "Title",
      description: "Description",
      width: 300,
      height: 400,
      href: "https://www.google.com",
      tags: "tags"

    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1631552009879-7e8a3c1b8b7a",
      title: "Title 2",
      description: "Description 2",
      width: 300,
      height: 400,
      href: "https://www.google.com",
      tags: "tags 2"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1631552009879-7e8a3c1b8b7a",
      title: "Title 3",
      description: "Description 3",
      width: 300,
      height: 400,
      href: "https://www.google.com",
      tags: "tags 3"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1631552009879-7e8a3c1b8b7a",
      title: "Title 4",
      description: "Description 4",
      width: 300,
      height: 400,
      href: "https://www.google.com",
      tags: "tags 4"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1631552009879-7e8a3c1b8b7a",
      title: "Title 5",
      description: "Description 5",
      width: 300,
      height: 400,
      href: "https://www.google.com",
      tags: "tags 5"
    }
  ]

  return (
    <>
      {
        !isWelcomeClicked &&
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-10">
            <CustomButton
              className={"dark:bg-slate-50 dark:text-slate-900 dark:hover:text-slate-900 dark:hover:after:opacity-60 dark:hover:after:scale-110 dark:hover:after:transition dark:hover:after:duration-500 dark:hover:after:z-[-1] dark:hover:after:rounded-full dark:hover:after:absolute dark:hover:after:inset-0 dark:hover:after:content-['']"}
              onClick={() => setIsWelcomeClicked(!isWelcomeClicked)}
            >
              Welcome!
            </CustomButton>
          </div>
        </div>
      }
      {
        isWelcomeClicked &&
        <>
        {/* <CardWrapper as={PostCard} items={posts} /> */}
          <InteractiveCardContainer cardData={interactiveCardData} />
          <button className={"dark:bg-slate-50 dark:text-slate-900 dark:hover:text-slate-900 dark:hover:after:opacity-60 dark:hover:after:scale-110 dark:hover:after:transition dark:hover:after:duration-500 dark:hover:after:z-[-1] dark:hover:after:rounded-full dark:hover:after:absolute dark:hover:after:inset-0 dark:hover:after:content-['']"}
            onClick={() => setIsWelcomeClicked(!isWelcomeClicked)}>Back</button>
        </>
      }
    </>
  );
}
