import React, { FC } from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { WidgetsCollection } from "./reducer";
import { WidgetsGroup } from "./WidgetsGroup";

const mapStateToProps = ({ widgets }: RootState) => ({
  currentPageWidgets: widgets.currentPageWidgets,
  commonWidgets: widgets.commonWidgets,
});

const WidgetsView: FC<WidgetsCollection> = ({
  currentPageWidgets,
  commonWidgets,
}) => {
  return (
    <div>
      <WidgetsGroup widgets={currentPageWidgets} />
      <WidgetsGroup widgets={commonWidgets} />
    </div>
  );
};

export const Widgets = connect(mapStateToProps)(WidgetsView);
