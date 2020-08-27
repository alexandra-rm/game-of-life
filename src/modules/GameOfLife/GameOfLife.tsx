import React from "react";
import { connect } from "react-redux";
import { GameField } from "@/components";
import { RootState } from "@/store";
import { actions } from "./reducer";

const mapStateToProps = ({ game }: RootState) => ({
  field: game.field,
});

const mapDispatchToProps = {
  click: actions.click,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const GameOfLifeComponent = ({ field, click }: Props) => {
  const onClickHandler = React.useCallback(
    (x: number, y: number) => {
      click({ x, y });
    },
    [click]
  );

  return <GameField cells={field} onClick={onClickHandler} />;
};

export const GameOfLife = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLifeComponent);
