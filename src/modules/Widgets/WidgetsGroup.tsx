import React, { FC } from "react";
import { config } from "./config";
import { Widget } from "./reducer";

export interface WidgetsGroupProps {
  widgets: Widget[];
}

export const WidgetsGroup: FC<WidgetsGroupProps> = ({ widgets }) => {
  return (
    <div>
      {widgets.map((widget) => {
        const { widget: widgetName, id } = widget;
        const Component = config[widgetName];
        return (
          <div key={id}>
            <Component id={id} />
          </div>
        );
      })}
    </div>
  );
};
