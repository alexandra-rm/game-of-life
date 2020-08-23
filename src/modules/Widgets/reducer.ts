import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Widget {
  id: string;
  component: () => JSX.Element;
  props?: object; // TODO: perhaps it is worth removing this field
}

export interface WidgetsCollection {
  currentPageWidgets: Widget[];
  commonWidgets: Widget[];
}

export type AddWidgetActionType = PayloadAction<Widget>;
export type RemoveCommonWidgetActionType = PayloadAction<string>;

export const initialState: WidgetsCollection = {
  currentPageWidgets: [],
  commonWidgets: [],
};

export const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addCommonWidget: (state, { payload }: AddWidgetActionType) => {
      const hasSameId = state.commonWidgets.some((x) => x.id === payload.id);
      if (hasSameId) {
        return state;
      }

      const widgets = [...state.commonWidgets];
      widgets.push(payload);

      return {
        ...state,
        commonWidgets: widgets,
      };
    },
    addCurrentPageWidget: (state, { payload }: AddWidgetActionType) => {
      const hasSameId = state.currentPageWidgets.some(
        (x) => x.id === payload.id
      );
      if (hasSameId) {
        return state;
      }

      const widgets = [...state.currentPageWidgets];
      widgets.push(payload);

      return {
        ...state,
        currentPageWidgets: widgets,
      };
    },
    removeCommonWidget: (state, { payload }: RemoveCommonWidgetActionType) => {
      const widgets = [...state.commonWidgets];

      const index = widgets.findIndex((x) => x.id === payload);
      if (index < 0) {
        return state;
      }

      widgets.splice(index, 1);

      return {
        ...state,
        commonWidgets: widgets,
      };
    },
    clearPageWidgets: (state) => ({
      ...state,
      currentPageWidgets: [],
    }),
  },
});

export const { reducer, actions } = widgetsSlice;
