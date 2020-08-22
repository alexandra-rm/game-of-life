import React, { FC } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import { Card, cardColors } from "./Card";

export default {
  title: "Card",
  component: Card,
  decorators: [withKnobs],
};

export const card: FC = () => (
  <Card bgColor={select("bgColor", cardColors, "White", "BG_COLORS")}>
    SomeCard
  </Card>
);
