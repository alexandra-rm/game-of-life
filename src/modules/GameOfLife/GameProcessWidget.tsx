import React, { FC } from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";
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
      <button name="startStop" color="blue" onClick={switchGameStatus}>
        {isRunning ? "Stop" : "Start"}
      </button>
    </FormFooter>
  );
};

export const GameProcessWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameProcessComponent);
