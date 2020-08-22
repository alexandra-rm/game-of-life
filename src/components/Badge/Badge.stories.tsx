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
    size={number("size", 50, undefined, "View settings")}
    color={select("color", badgeColors, "green", "View settings")}
    bold={boolean("bold", false, "View settings")}
    circle={boolean("circle", false, "View settings")}
    text={text("text", "АК")}
  />
);
