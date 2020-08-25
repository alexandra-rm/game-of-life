import React from "react";
import { connect } from "react-redux";
import { PercentChart, Card } from "@/components";

const mapStateToProps = ({ statistics }) => ({
  percent: statistics.filledPercent,
});

const FilledPercentComponent = ({ percent }) => (
  <Card>
    <PercentChart percent={percent} speed={400} lineWidth={40} />
  </Card>
);

export const FilledPercentStatistics = connect(mapStateToProps)(
  FilledPercentComponent
);
