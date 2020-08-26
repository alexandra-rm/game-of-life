import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";

const mapStateToProps = ({ statistics }: RootState) => ({
  generation: statistics.generation,
});

export type Props = ReturnType<typeof mapStateToProps>;

const StatisticsComponent = ({ generation }: Props) => (
  <div>{`Поколение №${generation}`}</div>
);

export const Statistics = connect(mapStateToProps)(StatisticsComponent);
