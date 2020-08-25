import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  generation: 0,
  filledPercent: 0,
  counters: [[]] as number[][],
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    incrementGen: (state) => ({
      ...state,
      generation: state.generation + 1,
    }),
    discardGen: (state) => ({
      ...state,
      generation: 0,
    }),
    clearCounters: (state) => ({
      ...state,
      counters: [[]],
    }),
    initCounters: (state, { payload }) => ({
      ...state,
      counters: payload.map((row) => row.map((cell) => (cell ? 1 : 0))),
    }),
    addCounters: (state, { payload }) => {
      let newCounters: number[][] = [[]];

      if (
        payload.length !== state.counters.length ||
        payload[0].length !== state.counters[0].length
      ) {
        newCounters = payload.map((row) => row.map((cell) => (cell ? 1 : 0)));
      } else {
        newCounters = state.counters.map((row, y) =>
          row.map((cell, x) => cell + (payload[y][x] ? 1 : 0))
        );
      }

      return {
        ...state,
        counters: newCounters,
      };
    },
    discardFilledPercent: (state) => ({
      ...state,
      filledPercent: 0,
    }),
    updateFilledPercent: (state, { payload }) => {
      const newPercent =
        payload.reduce((sum, arr) => {
          const temp = arr.reduce((acc, cell) => acc + (cell ? 1 : 0), 0);
          return sum + temp;
        }, 0) /
        (payload.length * payload[0].length);

      return {
        ...state,
        filledPercent: newPercent,
      };
    },
    setFilledPercent: (state, { payload }) => ({
      ...state,
      filledPercent: payload,
    }),
  },
});

export const { reducer, actions } = statisticsSlice;
