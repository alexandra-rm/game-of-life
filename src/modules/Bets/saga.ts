import { put, takeEvery, select } from "redux-saga/effects";
import { store as notifications } from "react-notifications-component";
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
  notifications.addNotification({
    title: "Предупреждение",
    message: `Ваша ставка аннулирована`,
    type: "warning",
    insert: "top",
    container: "top-center",
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

function* checkBet() {
  const generation = yield select(getGeneration);
  const bet: BetsState = yield select(getBetData);
  if (bet && bet.bet && bet.betGeneration == generation) {
    const counters = yield select(getCounters);

    const maxVal = getMaxValue(counters);
    const betCellValue = counters[bet.betCell.y || 0][bet.betCell.x];
    const delta = (maxVal - betCellValue) / maxVal;

    const deltaCash = (bet.bet * bet.betGeneration) / (bet.maxError + 1) / 100;

    if (delta <= bet.maxError) {
      yield put(moneyActions.addCash(deltaCash));
      notifications.addNotification({
        title: "You win!",
        message: `+${deltaCash.toFixed(2)}`,
        type: "success",
        insert: "top",
        container: "top-center",
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } else {
      yield put(moneyActions.minusCash(deltaCash));
      notifications.addNotification({
        title: "You lose!",
        message: `-${deltaCash.toFixed(2)}`,
        type: "danger",
        insert: "top",
        container: "top-center",
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }

    yield put(gameActions.switchGameStatus());
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
