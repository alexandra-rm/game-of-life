import { take, put, fork, cancel, delay, select } from "redux-saga/effects";
import { RootState } from "@/store";
import { actions } from "./reducer";

export const getGameProcessState = (state: RootState) => ({
  isRunning: state.game.isRunning,
  speed: state.game.speed,
});

let game = undefined;

export function* backgroundGame() {
  const { speed } = yield select(getGameProcessState);
  const seconds = speed <= 0 ? 0 : 1000 / speed;
  while (seconds > 0) {
    yield put(actions.update());
    yield delay(seconds);
  }
}

export function* gameSaga() {
  while (yield take(actions.switchGameStatus.type)) {
    game = yield fork(backgroundGame);
    let action;
    while (
      (action = yield take([
        actions.switchGameStatus.type,
        actions.setSpeed.type,
      ]))
    ) {
      yield cancel(game);
      if (action.type === actions.setSpeed.type) {
        game = yield fork(backgroundGame);
      } else {
        break;
      }
    }
  }
}
