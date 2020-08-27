import React from "react";
import { Button } from "./Button";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs],
};

export const button = () => (
  <Button
    rounded={boolean("rounded", false)}
    disabled={boolean("disabled", false)}
    fullWidth={boolean("fullWidth", false)}
  >
    Кнопка
  </Button>
);
