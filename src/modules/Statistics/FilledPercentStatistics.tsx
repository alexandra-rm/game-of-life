import React from "react";
import { connect } from "react-redux";
import { PercentChart, Card } from "@/components";
import { RootState } from "@/store";

const mapStateToProps = ({ statistics }: RootState) => ({
  percent: statistics.filledPercent,
});

export type Props = ReturnType<typeof mapStateToProps>;

const FilledPercentComponent = ({ percent }: Props) => (
  <Card>
    <PercentChart percent={percent} speed={400} lineWidth={40} />
  </Card>
);

export const FilledPercentStatistics = connect(mapStateToProps)(
  FilledPercentComponent
);
