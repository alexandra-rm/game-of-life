import React from "react";
import { actions, reducer, initialState } from "./reducer";

const widgetConfig = {
  id: "someWidget",
  component: () => <div>SomeWidget</div>,
};

const widgetConfig2 = {
  id: "someSecondWidget",
  component: () => <div>someSecondWidget</div>,
};

describe("Widgets reducer", () => {
  [
    { addActionName: "addCommonWidget", arrName: "commonWidgets" },
    { addActionName: "addCurrentPageWidget", arrName: "currentPageWidgets" },
  ].forEach((x) => {
    it(`${x.addActionName} action`, () => {
      expect(
        reducer(initialState, actions[x.addActionName](widgetConfig))
      ).toEqual({
        ...initialState,
        [x.arrName]: [widgetConfig],
      });
    });

    it(`${x.addActionName} disable adding two widgets with same id`, () => {
      expect(
        reducer(
          {
            ...initialState,
            [x.arrName]: [widgetConfig],
          },
          actions[x.addActionName](widgetConfig)
        )
      ).toEqual({
        ...initialState,
        [x.arrName]: [widgetConfig],
      });
    });

    it(`${x.addActionName} able adding few widgets with different id`, () => {
      expect(
        reducer(
          {
            ...initialState,
            [x.arrName]: [widgetConfig],
          },
          actions[x.addActionName](widgetConfig2)
        )
      ).toEqual({
        ...initialState,
        [x.arrName]: [widgetConfig, widgetConfig2],
      });
    });
  });

  it("removeCommonWidget remove required widget if exists", () => {
    expect(
      reducer(
        {
          ...initialState,
          commonWidgets: [widgetConfig, widgetConfig2],
        },
        actions.removeCommonWidget(widgetConfig.id)
      )
    ).toEqual({
      ...initialState,
      commonWidgets: [widgetConfig2],
    });
  });

  it("clearPageWidgets remove required widget if exists", () => {
    expect(
      reducer(
        {
          ...initialState,
          currentPageWidgets: [widgetConfig, widgetConfig2],
        },
        actions.clearPageWidgets()
      )
    ).toEqual({
      ...initialState,
      currentPageWidgets: [],
    });
  });
});
