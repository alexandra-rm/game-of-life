import { put, takeEvery, select } from "redux-saga/effects";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions } from "./reducer";

const getInitialPercent = (state) => state.game.initialPercent;

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
}

export { betsSaga };
