import React from "react";
import { withKnobs, object, boolean } from "@storybook/addon-knobs";
import { HeightMap } from "./HeightMap";
import { action } from "@storybook/addon-actions";

export default {
  title: "HeightMap",
  component: HeightMap,
  decorators: [withKnobs],
};

export const heightMap = (): JSX.Element => (
  <HeightMap
    cells={object("cells", [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])}
    showOnlyMax={boolean("showOnlyMax", false)}
    selectedCell={object("selectedCell", { x: 1, y: 2 })}
    onClick={action("onClick")}
  />
);
