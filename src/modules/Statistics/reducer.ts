import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  generation: 0,
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
  },
});

export const { reducer, actions } = statisticsSlice;
