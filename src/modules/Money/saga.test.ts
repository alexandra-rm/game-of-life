import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {
  updateCashWorker,
  getUserCashWorker,
  discardUserCashWorker,
  moneySaga,
  getActiveUser,
  getCash,
} from "./saga";
import { actions, reducer } from "./reducer";
import { actions as accountActions } from "../Account/reducer";
import { saveCash, getUserCash } from "./helpers";

describe("Money saga", () => {
  it("discardUserCashWorker test", () => {
    return expectSaga(discardUserCashWorker)
      .withReducer(reducer)
      .put(actions.setCash(0))
      .hasFinalState({
        cash: 0,
      })
      .run();
  });

  it("updateCashWorker test", () => {
    return expectSaga(updateCashWorker)
      .withState({
        account: { username: "someusername" },
        money: { cash: 12 },
      })
      .select(getActiveUser)
      .select(getCash)
      .call(saveCash, "someusername", 12)
      .run();
  });

  it("getUserCashWorker test", () => {
    return expectSaga(getUserCashWorker)
      .provide([[matchers.call.fn(getUserCash), 10]])
      .withState({
        account: { username: "someusername" },
      })
      .select(getActiveUser)
      .call(getUserCash, "someusername")
      .put(actions.setCash(10))
      .run();
  });

  it("moneySaga", () => {
    const saga = testSaga(moneySaga);
    saga
      .next()
      .takeEvery(
        [actions.addCash.type, actions.minusCash.type],
        updateCashWorker
      )
      .next()
      .takeEvery(accountActions.login, getUserCashWorker)
      .next()
      .takeEvery(accountActions.logout, discardUserCashWorker)
      .finish();
  });
});
