import React, { FC } from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components";
import { actions } from "../GameOfLife/reducer";
import { FormFooter } from "./components/FormFooter";

const mapStateToProps = ({ game }: RootState) => ({
  isRunning: game.isRunning,
});

const mapDispatchToProps = {
  switchGameStatus: actions.switchGameStatus,
};

export type GameProcessProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const GameProcessComponent: FC<GameProcessProps> = ({
  isRunning,
  switchGameStatus,
}) => {
  return (
    <FormFooter>
      <Button name="startStop" onClick={switchGameStatus} fullWidth>
        {isRunning ? "Stop" : "Start"}
      </Button>
    </FormFooter>
  );
};

export const GameProcessWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameProcessComponent);
