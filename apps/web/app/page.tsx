"use client";

import CardWrapper from "@/components/main-card-wrapper";
import PostCard from "@repo/ui/PostCard";
import InteractiveCardContainer from "@repo/ui/InteractiveCardContainer";

import CustomButton from "@repo/ui/CustomButton";
import { useState } from "react";
import { posts } from "@repo/ui/mock";
import { InteractiveCardData } from "@repo/ui/types";
import { mockInteractiveCard } from "@repo/ui/mock";
import AnimationContainer from "@/components/background/animation-container";
import { useTheme } from "next-themes";
export default function Page(): JSX.Element {
  const [isWelcomeClicked, setIsWelcomeClicked] = useState(false);
  const { theme } = useTheme();

  // interactive card data
  const interactiveCardData: InteractiveCardData[] = mockInteractiveCard;

  return (
    <>
      {
        !isWelcomeClicked &&
        <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">

          <CustomButton
            className={"dark:bg-slate-50 dark:text-slate-900 dark:hover:text-slate-900 dark:hover:after:opacity-60 dark:hover:after:scale-110 dark:hover:after:transition dark:hover:after:duration-500 dark:hover:after:z-[-1] dark:hover:after:rounded-full dark:hover:after:absolute dark:hover:after:inset-0 dark:hover:after:content-['']"}
            onClick={() => setIsWelcomeClicked(!isWelcomeClicked)}
          >
            Welcome!
          </CustomButton>
        </div>

      }
      {
        isWelcomeClicked &&
        <>
          <section className="flex flex-col gap-4 w-full">
            <h2 className="text-foreground my-10">
              Animation!!
            </h2>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 w-full">
              <AnimationContainer
                height="400px"
                options={{
                  global:{
                    theme:theme,
                    objects:['sun','moon']
                  },
                  snow: {
                    maxParticle: 500,
                  },
                  cloud: {
                    createDuration: 1000,
                    maxCloud: 10,
                    color: "#fff"
                  }
                }} />
              <div className="controller ">
                TODO Controller section
              </div>
            </div>
          </section>

          <h2 className="text-foreground my-10">
            Interactive Card!!
          </h2>
          <InteractiveCardContainer cardData={interactiveCardData} cols={3} />
          <h2 className="text-foreground my-10">
            Post Card!!
          </h2>
          <CardWrapper as={PostCard} items={posts} />
          {/* 처음화면으로 돌아가기 */}
          <CustomButton className={"dark:bg-slate-50 dark:text-slate-900 dark:hover:text-slate-900 dark:hover:after:opacity-60 dark:hover:after:scale-110 dark:hover:after:transition dark:hover:after:duration-500 dark:hover:after:z-[-1] dark:hover:after:rounded-full dark:hover:after:absolute dark:hover:after:inset-0 dark:hover:after:content-[''] fixed bottom-5 right-5 z-10"}
            onClick={() => setIsWelcomeClicked(!isWelcomeClicked)}>Home</CustomButton>
        </>
      }
    </>
  );
}