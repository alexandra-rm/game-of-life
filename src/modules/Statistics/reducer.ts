import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cellToNum, isEqualSize, filledCount } from "./helpers";

export type StatisticsState = {
  generation: number;
  filledPercent: number;
  counters: number[][];
  seletedCell?: { x: number; y: number };
};

export const initialState: StatisticsState = {
  generation: 0,
  filledPercent: 0,
  counters: [[]],
  seletedCell: undefined,
};

export type CountersActionType = PayloadAction<boolean[][]>;
export type SetFilledPercentActionType = PayloadAction<number>;
export type StatisticsOnClickActionType = PayloadAction<{
  x: number;
  y: number;
}>;

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
    initCounters: (state, { payload }: CountersActionType) => ({
      ...state,
      counters: payload.map((row) => row.map(cellToNum)),
    }),
    addCounters: (state, { payload }: CountersActionType) => {
      let newCounters: number[][] = [[]];
      if (!isEqualSize(payload, state.counters)) {
        newCounters = payload.map((row) => row.map(cellToNum));
      } else {
        newCounters = state.counters.map((row, y) =>
          row.map((cell, x) => cell + cellToNum(payload[y][x]))
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
    updateFilledPercent: (state, { payload }: CountersActionType) => {
      const cellsCount = payload.length * payload[0].length;
      const newPercent = filledCount(payload) / cellsCount;

      return {
        ...state,
        filledPercent: newPercent,
      };
    },
    setFilledPercent: (state, { payload }: SetFilledPercentActionType) => ({
      ...state,
      filledPercent: payload,
    }),
    onClick: (state, { payload }: StatisticsOnClickActionType) => ({
      ...state,
      seletedCell: payload,
    }),
  },
});

export const { reducer, actions } = statisticsSlice;
