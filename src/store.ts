import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameSlice } from "./modules/GameOfLife/reducer";
import { widgetsSlice } from "./modules/Widgets/reducer";
import { statisticsSaga } from "./modules/Statistics";
import { statisticsSlice } from "./modules/Statistics/reducer";
import { gameSaga } from "./modules/GameOfLife/saga";
import { betsSlice } from "./modules/Bets/reducer";
import { betsSaga } from "./modules/Bets/saga";

const reducer = combineReducers({
  game: gameSlice.reducer,
  statistics: statisticsSlice.reducer,
  bets: betsSlice.reducer,
  widgets: widgetsSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export type GOLGameState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(statisticsSaga);
sagaMiddleware.run(gameSaga);
sagaMiddleware.run(betsSaga);
