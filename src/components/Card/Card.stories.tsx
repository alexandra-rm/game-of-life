import React, { FC } from "react";
import { withKnobs, select, boolean } from "@storybook/addon-knobs";
import { Card, cardColors } from "./Card";

export default {
  title: "Card",
  component: Card,
  decorators: [withKnobs],
};

export const card: FC = () => (
  <Card
    bgColor={select("bgColor", cardColors, "white")}
    thin={boolean("thin", false)}
  >
    SomeCard
  </Card>
);
