import React from "react";
import { connect } from "react-redux";
import { HeightMap } from "@/components";
import { RootState } from "@/store";
import { actions } from "../Bets/reducer";

const mapStateToProps = ({ statistics, bets }: RootState) => ({
  cells: statistics.counters,
  allowBet: bets.allowBet,
});

const mapDispatchToProps = {
  setIsOpenBetWindow: actions.setIsOpenBetWindow,
  setBetCell: actions.setBetCell,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const HeightStatisticsComponent = ({
  cells,
  setIsOpenBetWindow,
  setBetCell, // TODO: вынести в сагу модуля Bets
  allowBet, // TODO: вынести в сагу модуля Bets
}: Props) => (
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

export const HeightStatistics = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeightStatisticsComponent);
