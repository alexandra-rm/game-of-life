import React from "react";
import { PercentChart } from "./PercentChart";
import { withKnobs, number } from "@storybook/addon-knobs";

export default {
  title: "PercentChart",
  component: PercentChart,
  decorators: [withKnobs],
};

export const percentChart = () => (
  <PercentChart
    percent={number("percent", 0.2)}
    resolution={number("resolution", 720)}
    lineWidth={number("lineWidth", 20)}
    fontSize={number("fontSize", 80)}
    speed={number("speed", 400)}
  />
);
