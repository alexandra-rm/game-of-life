import { put, takeEvery, select } from "redux-saga/effects";
import { RootState } from "@/store";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "./reducer";

const getGameField = (state: RootState) => state.game.field;
const getInitialPercent = (state: RootState) => state.game.initialPercent;

function* incrementWorker() {
  const field = yield select(getGameField);
  yield put(statisticsActions.addCounters(field));
  yield put(statisticsActions.incrementGen());
  yield put(statisticsActions.updateFilledPercent(field));
}

function* discardWorker() {
  const field = yield select(getGameField);
  yield put(statisticsActions.initCounters(field));
  yield put(statisticsActions.discardGen());
  if (arg.type === gameActions.setInitialPercent.type) {
    const percent = yield select(getInitialPercent);
    yield put(statisticsActions.setFilledPercent(percent / 100));
  } else {
    yield put(statisticsActions.discardFilledPercent());
  }
}

function* statisticsSaga() {
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

export { statisticsSaga };
