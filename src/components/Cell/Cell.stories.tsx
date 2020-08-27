import React from "react";
import { withKnobs, number, text } from "@storybook/addon-knobs";
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
    onClick={action("onClick")}
    backgroundColor={text("backgroundColor", "")}
    borderColor={text("borderColor", "")}
  />
);
