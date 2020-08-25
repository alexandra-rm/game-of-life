import React from "react";
import { connect } from "react-redux";

const mapStateToProps = ({ statistics }) => ({
  generation: statistics.generation,
});

const StatisticsComponent = ({ generation }) => {
  return <div>{`Поколение №${generation}`}</div>;
};

export const Statistics = connect(mapStateToProps)(StatisticsComponent);
