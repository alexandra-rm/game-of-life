import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  allowBet: false,
  betCell: undefined,
  bet: 0,
  betGeneration: 0,
  isOpenBetWindow: false,
};

export const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setAllowBet: (state, { payload }) => ({
      ...state,
      allowBet: payload,
    }),
    setBetCell: (state, { payload }) => ({
      ...state,
      betCell: payload,
    }),
    setBet: (state, { payload }) => ({
      ...state,
      bet: payload,
    }),
    setBetGeneration: (state, { payload }) => ({
      ...state,
      betGeneration: payload,
    }),
    setIsOpenBetWindow: (state, { payload }) => ({
      ...state,
      isOpenBetWindow: payload,
    }),
    confirmBet: (state) => ({
      ...state,
      allowBet: false,
      isOpenBetWindow: false,
    }),
  },
});

export const { reducer, actions } = betsSlice;
