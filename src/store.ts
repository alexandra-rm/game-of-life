import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { gameSlice, gameSaga } from "./modules/GameOfLife";
import { statisticsSaga, statisticsSlice } from "./modules/Statistics";
import { betsSlice, betsSaga } from "./modules/Bets";
import { accountSlice, accountSaga } from "./modules/Account";
import { widgetsSlice } from "./modules/Widgets";
import { moneySlice, moneySaga } from "./modules/Money";

const reducer = combineReducers({
  game: gameSlice.reducer,
  statistics: statisticsSlice.reducer,
  bets: betsSlice.reducer,
  widgets: widgetsSlice.reducer,
  money: moneySlice.reducer,
  account: accountSlice.reducer,
});

const sagaMiddleware = createSagaMiddleware();

export type RootState = ReturnType<typeof reducer>;

export const store = configureStore({ reducer, middleware: [sagaMiddleware] });

sagaMiddleware.run(statisticsSaga);
sagaMiddleware.run(gameSaga);
sagaMiddleware.run(betsSaga);
sagaMiddleware.run(accountSaga);
sagaMiddleware.run(moneySaga);
