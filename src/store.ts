import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./modules/GameOfLife/reducer";

const reducer = combineReducers({
  game: gameSlice.reducer,
});

export type GOLGameState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer });
