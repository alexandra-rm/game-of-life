import { select } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  getGameField,
  getInitialPercent,
  discardWorker,
  incrementWorker,
  statisticsSaga,
} from "./saga";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions } from "./reducer";

describe("Statistics saga", () => {
  it("incrementWorker test", () => {
    return expectSaga(incrementWorker)
      .withState({
        game: { field: [[false]] },
        statisitcs: { counters: [[0]], generation: 3, filledPercent: 0.3 },
      })
      .select(getGameField)
      .put(actions.addCounters([[false]]))
      .put(actions.incrementGen())
      .put(actions.updateFilledPercent([[false]]))
      .run();
  });

  it("discardWorker test 1", () => {
    return expectSaga(discardWorker, { type: gameActions.reset.type })
      .provide([[select(getGameField), [[false]]]])
      .select(getGameField)
      .put(actions.initCounters([[false]]))
      .put(actions.discardGen())
      .put(actions.discardFilledPercent())
      .run();
  });

  it("discardWorker test 2", () => {
    const filledPercent = 10;

    return expectSaga(discardWorker, {
      type: gameActions.setInitialPercent.type,
    })
      .withState({
        game: { field: [[false]], initialPercent: filledPercent },
      })
      .select(getGameField)
      .put(actions.initCounters([[false]]))
      .put(actions.discardGen())
      .select(getInitialPercent)
      .put(actions.setFilledPercent(filledPercent / 100))
      .run();
  });

  it("statisticsSaga", () => {
    const saga = testSaga(statisticsSaga);
    saga
      .next()
      .takeEvery(gameActions.update.type, incrementWorker)
      .next()
      .takeEvery(
        [
          gameActions.reset.type,
          gameActions.generate.type,
          gameActions.setInitialPercent.type,
        ],
        discardWorker
      )
      .finish();
  });
});
