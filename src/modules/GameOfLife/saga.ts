import { take, put, fork, cancel, delay, select } from "redux-saga/effects";
import { actions } from "./reducer";

const getGameProcessState = (state) => ({
  isRunning: state.game.isRunning,
  speed: state.game.speed,
});

let game = undefined;

function* backgroundGame() {
  const { speed } = yield select(getGameProcessState);
  let seconds = speed <= 0 ? 0 : 1000 / speed;
  while (seconds > 0) {
    yield put(actions.update());
    const gameProcessState = yield select(getGameProcessState);
    seconds = gameProcessState.speed <= 0 ? 0 : 1000 / gameProcessState.speed;
    yield delay(seconds);
  }
}

function* gameSaga() {
  while (yield take(actions.switchGameStatus.type)) {
    game = yield fork(backgroundGame);
    yield take(actions.switchGameStatus.type);
    yield cancel(game);
  }
}

export { gameSaga };
