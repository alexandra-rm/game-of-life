import { createSlice } from "@reduxjs/toolkit";
import { initFields, toggleCellState, resize, generateField } from "./helpers";
import { nextEpoch } from "./gameLogic";

export const initialState = {
  width: 5,
  height: 5,
  field: initFields(5, 5),
  speed: 1,
  initialPercent: 0,
  isRunning: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    update: (state) => ({
      ...state,
      field: nextEpoch(state.field),
    }),
    click: (state, { payload }) => ({
      ...state,
      field: toggleCellState(state.field, payload.x, payload.y),
    }),
    resize: (state, { payload }) => {
      const { width, height } = payload;
      return {
        ...state,
        width: width,
        height: height,
        field: resize(state.field, height, width),
      };
    },
    generate: (state) => {
      const { height, width, initialPercent } = state;
      const field = generateField(height, width, initialPercent);

      return {
        ...state,
        field,
      };
    },
    setInitialPercent: (state, { payload }) => ({
      ...state,
      field: generateField(state.height, state.width, payload),
      initialPercent: payload,
    }),
    setSpeed: (state, { payload }) => ({
      ...state,
      speed: payload,
    }),
    switchGameStatus: (state) => ({
      ...state,
      isRunning: !state.isRunning,
    }),
    reset: (state) => ({
      ...state,
      initialPercent: initialState.initialPercent,
      field: initFields(state.height, state.width),
    }),
  },
});

export const { reducer, actions } = gameSlice;
