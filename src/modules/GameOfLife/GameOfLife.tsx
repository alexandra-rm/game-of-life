import React from "react";
import { connect } from "react-redux";
import { GameField } from "@/components";
import { RootState } from "@/store";
import { actions } from "./reducer";

const mapStateToProps = ({ game }: RootState) => ({
  speed: game.speed,
  isRunning: game.isRunning,
  field: game.field,
});

const mapDispatchToProps = {
  click: actions.click,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class GameOfLifeComponent extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(x: number, y: number): void {
    this.props.click({ x, y });
  }

  render(): JSX.Element {
    return <GameField cells={this.props.field} onClick={this.onClickHandler} />;
  }
}

export const GameOfLife = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLifeComponent);
