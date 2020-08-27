import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  banBet,
  checkBet,
  betsSaga,
  clickListener,
  disableBet,
  discardWorker,
  getBetData,
  getGeneration,
} from "./saga";
import { actions } from "./reducer";
import { actions as gameActions } from "../GameOfLife/reducer";
import { actions as statisticsActions } from "../Statistics/reducer";
import { actions as moneyActions } from "../Money/reducer";
import { computeGain } from "./helpers";

describe("Bets saga", () => {
  it("disableBet test", () => {
    return expectSaga(disableBet).put(actions.setAllowBet(false)).run();
  });

  it("banBet test", () => {
    return expectSaga(banBet)
      .withState({
        bets: {
          bet: 10,
          allowBet: true,
          betCell: { x: 1, y: 2 },
          isOpenBetWindow: false,
        },
      })
      .put(actions.setAllowBet(false))
      .put(actions.setBet(0))
      .put(actions.setBetCell(undefined))
      .put(actions.setIsOpenBetWindow(false))
      .run();
  });

  it("discardWorker test 1", () => {
    return expectSaga(discardWorker)
      .withState({
        game: { initialPercent: 0.8 },
      })
      .put(actions.setAllowBet(true))
      .run();
  });

  it("discardWorker test 2", () => {
    return expectSaga(discardWorker)
      .withState({
        game: { initialPercent: 0 },
      })
      .put(actions.setAllowBet(false))
      .run();
  });

  it("clickListener test", () => {
    const cell = { x: 1, y: 2 };
    return expectSaga(clickListener, { type: "", payload: cell })
      .withState({
        bets: {
          bet: 10,
          allowBet: true,
          betCell: { x: 1, y: 2 },
          isOpenBetWindow: false,
        },
      })
      .put(actions.setBetCell(cell))
      .put(actions.setIsOpenBetWindow(true))
      .run();
  });

  it("clickListener test 2", () => {
    const cell = { x: 1, y: 2 };
    return expectSaga(clickListener, { type: "", payload: cell })
      .withState({
        bets: {
          bet: 10,
          allowBet: false,
          betCell: { x: 1, y: 2 },
          isOpenBetWindow: false,
        },
      })
      .run();
  });

  it("checkBet test (not needed generation yet)", () => {
    return expectSaga(checkBet)
      .withState({
        statistics: { generation: 10 },
        bets: { betGeneration: 15 },
      })
      .select(getGeneration)
      .select(getBetData)
      .run();
  });

  it("checkBet test win flow", () => {
    return expectSaga(checkBet)
      .withState({
        statistics: { generation: 15, counters: [[1]] },
        bets: {
          betGeneration: 15,
          bet: 10,
          maxError: 1,
          betCell: { x: 0, y: 0 },
        },
      })
      .put(moneyActions.addCash(computeGain(10, 15, 1)))
      .put(gameActions.switchGameStatus())
      .run();
  });

  it("checkBet test lose flow", () => {
    return expectSaga(checkBet)
      .withState({
        statistics: { generation: 15, counters: [[1, 10]] },
        bets: {
          betGeneration: 15,
          bet: 10,
          maxError: 0,
          betCell: { x: 0, y: 0 },
        },
      })
      .put(moneyActions.minusCash(10))
      .put(gameActions.switchGameStatus())
      .run();
  });

  it("betsSaga test", () => {
    const saga = testSaga(betsSaga);
    saga
      .next()
      .takeEvery(
        [
          gameActions.reset.type,
          gameActions.generate.type,
          gameActions.setInitialPercent.type,
        ],
        discardWorker
      )
      .next()
      .takeEvery(gameActions.switchGameStatus, disableBet)
      .next()
      .takeEvery(gameActions.click, banBet)
      .next()
      .takeEvery(statisticsActions.incrementGen, checkBet)
      .next()
      .takeEvery(statisticsActions.onClick, clickListener)
      .finish();
  });
});
