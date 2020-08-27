import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum CheckState {
  initiated,
  succeed,
  failed,
}

export const MIN_USERNAME_LENGTH = 3;

export type AccountState = {
  username?: string;
  status: CheckState;
};

export const initialState: AccountState = {
  username: undefined,
  status: CheckState.initiated,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      status: CheckState.succeed,
      username: payload,
    }),
    logout: (state) => ({
      ...state,
      status: CheckState.failed,
      username: undefined,
    }),
  },
});

export const { reducer, actions } = accountSlice;
