import { put, takeEvery } from "redux-saga/effects";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "./reducer";

function* incrementWorker(arg) {
  console.log("worker", arg);
  yield put(statisticsActions.incrementGen());
}

function* discardWorker(arg) {
  console.log("worker", arg);
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
