import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./modules/GameOfLife/reducer";
import { widgetsSlice } from "./modules/Widgets/reducer";

const reducer = combineReducers({
  game: gameSlice.reducer,
  widgets: widgetsSlice.reducer,
});

export type GOLGameState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer });
