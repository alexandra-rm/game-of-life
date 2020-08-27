import { put, takeEvery, select } from "redux-saga/effects";
import { RootState } from "@/store";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "./reducer";

export const getGameField = (state: RootState) => state.game.field;
export const getInitialPercent = (state: RootState) =>
  state.game.initialPercent;

export function* incrementWorker() {
  const field = yield select(getGameField);
  yield put(statisticsActions.addCounters(field));
  yield put(statisticsActions.incrementGen());
  yield put(statisticsActions.updateFilledPercent(field));
}

export function* discardWorker(arg) {
  const field = yield select(getGameField);
  yield put(statisticsActions.initCounters(field));
  yield put(statisticsActions.discardGen());
  if (arg.type === gameActions.setInitialPercent.type) {
    const percent = yield select(getInitialPercent);
    yield put(statisticsActions.setFilledPercent(percent / 100));
  } else if (arg.type !== gameActions.generate.type) {
    yield put(statisticsActions.discardFilledPercent());
  }
}

export function* statisticsSaga() {
  yield takeEvery(gameActions.update.type, incrementWorker);
  yield takeEvery(
    [
      gameActions.reset.type,
      gameActions.generate.type,
      gameActions.setInitialPercent.type,
    ],
    discardWorker
  );
}
