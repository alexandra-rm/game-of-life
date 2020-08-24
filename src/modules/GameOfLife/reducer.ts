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
    update: (state) => {
      return {
        ...state,
        field: nextEpoch(state.field),
      };
    },
    click: (state, { payload }) => {
      return {
        ...state,
        field: toggleCellState(state.field, payload.x, payload.y),
      };
    },
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
    setInitialPercent: (state, { payload }) => {
      return {
        ...state,
        field: generateField(state.height, state.width, payload),
        initialPercent: payload,
      };
    },
    setSpeed: (state, { payload }) => {
      return {
        ...state,
        speed: payload,
      };
    },
    switchGameStatus: (state) => {
      return {
        ...state,
        isRunning: !state.isRunning,
      };
    },
    reset: (state) => {
      return {
        ...state,
        initialPercent: initialState.initialPercent,
        field: initFields(state.height, state.width),
      };
    },
  },
});

export const { reducer, actions } = gameSlice;
