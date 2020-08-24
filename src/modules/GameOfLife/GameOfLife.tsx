import React from "react";
import { connect } from "react-redux";
import { GameField } from "@/components";
import { calcInterval } from "./helpers";
import { actions } from "./reducer";

const mapStateToProps = ({ game }) => ({
  speed: game.speed,
  isRunning: game.isRunning,
  field: game.field,
});

const mapDispatchToProps = {
  update: actions.update,
  click: actions.click,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class GameOfLifeComponent extends React.Component<Props, {}> {
  intervalId?: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
    this.setupInterval = this.setupInterval.bind(this);
  }

  componentDidMount(): void {
    this.setupInterval();
  }

  componentWillUnmount(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  componentDidUpdate(prevProps: Props): void {
    const { isRunning, speed } = this.props;
    if (prevProps.isRunning !== isRunning || prevProps.speed !== speed) {
      this.setupInterval();
    }
  }

  onClickHandler(x: number, y: number): void {
    this.props.click({ x, y });
  }

  setupInterval(): void {
    const { speed, isRunning, update } = this.props;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    if (speed > 0 && isRunning) {
      this.intervalId = setInterval(update, calcInterval(speed));
    }
  }

  render(): JSX.Element {
    return <GameField cells={this.props.field} onClick={this.onClickHandler} />;
  }
}

export const GameOfLife = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOfLifeComponent);
