import React from "react";
import { Meta } from "@storybook/react";
import Navbar from "@repo/ui/CustomNavbar";
import Lorem from "react-lorem-component";

import { navItems, profileMenuItems, userInfo } from "@repo/ui/mock";

import type {
  CustomNavbarProps,
  ProfileMenuItem,
  LinkItem,
} from "@repo/ui/types";

export default {
  title: "Components/Navbar",
  component: Navbar,
  argTypes: {
    position: {
      control: {
        type: "select",
      },
      options: ["static", "fixed"],
    },
    maxWidth: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    isBlurred: {
      control: {
        type: "boolean",
      },
    },
    // TODO remove this after auth is implemented
    // isLoggedIn: {
    //   control: {
    //     type: "boolean",
    //   },
    // },
    userInfo: {
      control: {
        type: "object",
      },
    },
    navItems: {
      control: {
        type: "object",
      },
    },
    menuItems: {
      control: {
        type: "object",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Navbar>;

const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const App = React.forwardRef(({ children }: any, ref: any) => {
  return (
    <div
      ref={ref}
      className="max-w-[90%] sm:max-w-[80%] max-h-[90vh] overflow-x-hidden overflow-y-scroll shadow-md relative border border-default"
    >
      {children}
      <div className="max-w-5xl flex flex-col gap-4 px-10 mt-8">
        <h1>Lorem ipsum dolor sit ame</h1>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Lorem
            key={i}
            className="mb-5 text-lg"
            count={1}
            sentenceUpperBound={40}
          />
        ))}
      </div>
    </div>
  );
});

App.displayName = "App";

const Template = (args: CustomNavbarProps) => {
  // for hide on scroll cases
  const parentRef = React.useRef(null);
  return (
    <App ref={parentRef}>
      <Navbar
        navItems={args.navItems}
        menuItems={args.menuItems}
        position={args.position}
        isBlurred={args.isBlurred}
        // TODO remove this after auth is implemented
        // isLoggedIn={args.isLoggedIn}
        maxWidth={args.maxWidth}
        userInfo={args.userInfo}
      />
    </App>
  );
};

export const CustomNavbar = {
  render: Template,
  args: {
    position: "static",
    maxWidth: "sm",
    userInfo,
    navItems,
    menuItems: profileMenuItems,
    isBlurred: false,
    // TODO remove this after auth is implemented
    // isLoggedIn: false,
  },
};
