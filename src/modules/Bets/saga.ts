import { put, takeEvery, select } from "redux-saga/effects";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "../Statistics/reducer";
import { actions } from "./reducer";

const getInitialPercent = (state) => state.game.initialPercent;
const getGeneration = (state) => state.statistics.generation;
const getCounters = (state) => state.statistics.counters;
const getBetData = (state) => state.bets;

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
  console.log("checkBet");
  const generation = yield select(getGeneration);
  const bet = yield select(getBetData);
  console.log("bet.betGeneration", bet.betGeneration, "generation", generation);
  if (bet.betGeneration == generation) {
    const counters = yield select(getCounters);
    let maxCell = { x: 0, y: 0 };
    let maxVal = 0;

    counters.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell > maxVal) {
          maxVal = cell;
          maxCell = { x, y };
        }
      })
    );

    const betCellValue = counters[bet.betCell.y][bet.betCell.x];
    const delta = (maxVal - betCellValue) / maxVal;
    if (delta <= bet.maxError) {
      console.log("Вы выиграли");
    } else {
      console.log("Вы проиграли");
    }
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
}

export { betsSaga };
