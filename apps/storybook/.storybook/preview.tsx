
import React from 'react';
import {themes} from "@storybook/theming";
import type { Preview } from "@storybook/react";
import {NextUIProvider} from "@nextui-org/react";
import "./globals.css"

const decorators: Preview["decorators"] = [
  (Story) => {
    return (
      <NextUIProvider >
        <div className="bg-dark">
          <Story />
        </div>
      </NextUIProvider>
    );
  },
];

const commonTheme = {
  brandTitle: "NextUI",
  brandUrl: "https://nextui.org",
  brandTarget: "_self",
};
const parameters: Preview["parameters"] = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      ...commonTheme,
      appBg: "#161616",
      barBg: "black",
      background: "black",
      appContentBg: "black",
      appBorderRadius: 14,
      brandImage: "/dark-logo.svg",
    },
    light: {
      ...themes.light,
      ...commonTheme,
      appBorderRadius: 14,
      brandImage: "/light-logo.svg",
    },
  },
};


const globalTypes: Preview["globalTypes"] = {
  disableAnimation: {
    name: "Disable Animation",
    description: "Disable all animations in the stories",
    toolbar: {
      icon: "photodrag",
      items: [
        {value: true, title: "True"},
        {value: false, title: "False"},
      ],
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
};
export default preview;




