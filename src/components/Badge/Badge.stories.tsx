import React from "react";
import {
  withKnobs,
  number,
  select,
  boolean,
  text,
} from "@storybook/addon-knobs";
import { Badge, badgeColors } from "./Badge";

export default {
  title: "Badge",
  component: Badge,
  decorators: [withKnobs],
};

export const badge = () => (
  <Badge
    size={number("size", 50)}
    color={select("color", badgeColors, "green")}
    bold={boolean("bold", false)}
    circle={boolean("circle", false)}
    text={text("text", "АК")}
  />
);
