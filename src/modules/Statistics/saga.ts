import { put, takeEvery, select } from "redux-saga/effects";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "./reducer";

const getGameField = (state) => state.game.field;

function* incrementWorker(arg) {
  const field = yield select(getGameField);
  yield put(statisticsActions.addCounters(field));
  yield put(statisticsActions.incrementGen());
}

function* discardWorker(arg) {
  const field = yield select(getGameField);
  yield put(statisticsActions.initCounters(field));
  yield put(statisticsActions.discardGen());
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
