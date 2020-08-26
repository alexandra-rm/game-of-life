import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Coord = { x: number; y: number };

export type BetsState = {
  allowBet: boolean;
  betCell: Coord | undefined;
  bet: number;
  betGeneration: number;
  isOpenBetWindow: boolean;
  maxError: number;
};

export const initialState: BetsState = {
  allowBet: false,
  betCell: undefined,
  bet: 0,
  betGeneration: 0,
  isOpenBetWindow: false,
  maxError: 0,
};

export const betsSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setAllowBet: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      allowBet: payload,
    }),
    setBetCell: (state, { payload }: PayloadAction<Coord | undefined>) => ({
      ...state,
      betCell: payload,
    }),
    setBet: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      bet: payload,
    }),
    setBetGeneration: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      betGeneration: payload,
    }),
    setIsOpenBetWindow: (state, { payload }: PayloadAction<boolean>) => ({
      ...state,
      isOpenBetWindow: payload,
    }),
    confirmBet: (state) => ({
      ...state,
      allowBet: false,
      isOpenBetWindow: false,
    }),
    setMaxError: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      maxError: payload,
    }),
  },
});

export const { reducer, actions } = betsSlice;
