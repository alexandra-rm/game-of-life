import React from "react";
import { connect } from "react-redux";
import { HeightMap } from "@/components";
import { RootState } from "@/store";
import { actions } from "./reducer";

const mapStateToProps = ({ statistics }: RootState) => ({
  cells: statistics.counters,
});

const mapDispatchToProps = {
  onClick: actions.onClick,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const HeightStatisticsComponent = ({ cells, onClick }: Props) => (
  <HeightMap
    cells={cells}
    onClick={(x, y) => {
      onClick({ x, y });
    }}
  />
);

export const HeightStatistics = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeightStatisticsComponent);
