import React, { FC } from "react";
import { Widget } from "./reducer";

export interface WidgetsGroupProps {
  widgets: Widget[];
}

export const WidgetsGroup: FC<WidgetsGroupProps> = ({ widgets }) => {
  return (
    <div>
      {widgets.map((widget) => {
        const { component: Component, id, props } = widget;
        return (
          <div>
            <Component {...props} id={id} />
          </div>
        );
      })}
    </div>
  );
};
