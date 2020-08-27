import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MoneyState = {
  cash: number;
};

export const initialState: MoneyState = {
  cash: 0,
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    addCash: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      cash: state.cash + payload,
    }),
    minusCash: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      cash: state.cash - payload,
    }),
    setCash: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      cash: payload,
    }),
  },
});

export const { reducer, actions } = moneySlice;
