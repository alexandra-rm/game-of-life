import { put, takeEvery, select } from "redux-saga/effects";
import { RootState } from "@/store";
import { actions as gameActions } from "../GameOfLife/reducer";
import {
  actions as statisticsActions,
  StatisticsOnClickActionType,
} from "../Statistics/reducer";
import { actions as moneyActions } from "../Money/reducer";
import { actions, BetsState } from "./reducer";
import { getMaxValue } from "./helpers";

const getInitialPercent = (state: RootState) => state.game.initialPercent;
const getGeneration = (state: RootState) => state.statistics.generation;
const getCounters = (state: RootState) => state.statistics.counters;
const getBetData = (state: RootState) => state.bets;

function* discardWorker() {
  const percent = yield select(getInitialPercent);

  if (percent > 0) {
    yield put(actions.setAllowBet(true));
  } else {
    yield put(actions.setAllowBet(false));
  }
}

function* disableBet() {
  yield put(actions.setAllowBet(false));
}

function* banBet() {
  yield put(actions.setAllowBet(false));
  yield put(actions.setBet(0));
  yield put(actions.setBetCell(undefined));
  yield put(actions.setIsOpenBetWindow(false));
}

function* checkBet() {
  const generation = yield select(getGeneration);
  const bet: BetsState = yield select(getBetData);
  if (bet.betGeneration == generation) {
    const counters = yield select(getCounters);

    const maxVal = getMaxValue(counters);
    const betCellValue = counters[bet.betCell.y][bet.betCell.x];
    const delta = (maxVal - betCellValue) / maxVal;

    if (delta <= bet.maxError) {
      yield put(moneyActions.addCash(bet.bet));
    } else {
      yield put(moneyActions.minusCash(bet.bet));
    }
  }
}

function* clickListener(action: StatisticsOnClickActionType) {
  const bet: BetsState = yield select(getBetData);
  if (bet.allowBet) {
    yield put(actions.setBetCell(action.payload));
    yield put(actions.setIsOpenBetWindow(true));
  }
}

function* betsSaga() {
  yield takeEvery(
    [
      gameActions.reset.type,
      gameActions.generate.type,
      gameActions.setInitialPercent.type,
    ],
    discardWorker
  );

  yield takeEvery(gameActions.switchGameStatus, disableBet);
  yield takeEvery(gameActions.click, banBet);
  yield takeEvery(statisticsActions.incrementGen, checkBet);
  yield takeEvery(statisticsActions.onClick, clickListener);
}

export { betsSaga };
