import React from "react";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Cell } from "./Cell";

export default {
  title: "Cell",
  component: Cell,
  decorators: [withKnobs],
};

export const cell = () => (
  <Cell
    x={number("x", 1)}
    y={number("y", 3)}
    isFilled={boolean("isFilled", false)}
    onClick={action("onClick")}
  />
);
