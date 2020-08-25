import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameSlice } from "./modules/GameOfLife/reducer";
import { widgetsSlice } from "./modules/Widgets/reducer";
import { statisticsSaga } from "./modules/Statistics";
import { statisticsSlice } from "./modules/Statistics/reducer";

const reducer = combineReducers({
  game: gameSlice.reducer,
  statistics: statisticsSlice.reducer,
  widgets: widgetsSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export type GOLGameState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(statisticsSaga);
