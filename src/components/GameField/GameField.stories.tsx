import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import { GameField } from "./GameField";
import { action } from "@storybook/addon-actions";

export default {
  title: "GameField",
  component: GameField,
  decorators: [withKnobs],
};

export const CommonGameField = (): JSX.Element => (
  <GameField
    cells={object(
      "field",
      Array.from({ length: 10 }).map(() =>
        Array.from({ length: 10 }).fill(false)
      ) as boolean[][]
    )}
    onClick={action("onClick")}
  />
);

export const FieldWithSomeFilledCells = (): JSX.Element => (
  <GameField
    cells={object("field", [
      [false, false, true],
      [true, false, false],
      [false, false, false],
    ])}
    onClick={action("onClick")}
  />
);
