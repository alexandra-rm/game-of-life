import React from "react";
import { connect } from "react-redux";
import { HeightMap } from "@/components";
import { actions } from "../Bets/reducer";

// TODO: подумать над структурой

const mapStateToProps = ({ statistics, bets }) => ({
  cells: statistics.counters,
  allowBet: bets.allowBet,
});

const mapDispatchToProps = {
  setIsOpenBetWindow: actions.setIsOpenBetWindow,
  setBetCell: actions.setBetCell,
};

const HeightStatisticsComponent = ({
  cells,
  setIsOpenBetWindow,
  setBetCell,
  allowBet,
}) => {
  return (
    <HeightMap
      cells={cells}
      onClick={(x, y) => {
        console.log(cells[y][x]);
        if (allowBet) {
          setIsOpenBetWindow(true);
          setBetCell({ x, y });
        }
      }}
    />
  );
};

export const HeightStatistics = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeightStatisticsComponent);
