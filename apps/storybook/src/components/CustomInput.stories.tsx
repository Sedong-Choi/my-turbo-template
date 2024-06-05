import React from "react";
import { Meta } from "@storybook/react";

import { CustomInput, CustomInputProps } from "@repo/ui/CustomInput";

export default {
  title: "Components/CustomInput",
  component: CustomInput,
  argTypes: {
    inputType: {
      control: {
        type: "select",
      },
      options: ["email", "password", "confirm-password", "text"],
    },
    label:{
      control: {
        type: "text",
      },
    },
    placeholder:{
      control: {
        type: "text",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "faded", "bordered", "underlined"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    labelPlacement: {
      control: {
        type: "select",
      },
      options: ["inside", "outside", "outside-left"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    errorMessage: {
      control: {
        type: "text",
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
} as Meta<typeof CustomInput>;

export const Template = (args: CustomInputProps) => {
  return (
    <div className="max-w-lg">
      <CustomInput {...args} />
    </div>
  );
};
