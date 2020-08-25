import React from "react";
import { HeightMap } from "@/components";
import { connect } from "react-redux";

const mapStateToProps = ({ statistics }) => ({
  cells: statistics.counters,
});

const HeightStatisticsComponent = ({ cells }) => {
  return (
    <HeightMap cells={cells} onClick={(x, y) => console.log(cells[y][x])} />
  );
};

export const HeightStatistics = connect(mapStateToProps)(
  HeightStatisticsComponent
);
