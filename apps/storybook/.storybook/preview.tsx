import React from 'react';
import type { Preview } from "@storybook/react";
import {NextUIProvider} from "@nextui-org/react";
import "@repo/ui/globals.css"

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
const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;




