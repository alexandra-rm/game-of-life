import { put, takeEvery, select, call } from "redux-saga/effects";
import { RootState } from "@/store";
import { actions as accountActions } from "../Account/reducer";
import { actions } from "./reducer";
import { getUserCash, saveCash } from "./helpers";

export const getActiveUser = (state: RootState) => state.account.username;
export const getCash = (state: RootState) => state.money.cash;

export function* updateCashWorker() {
  const username = yield select(getActiveUser);
  const cash = yield select(getCash);

  yield call(saveCash, username, cash);
}

export function* getUserCashWorker() {
  const username = yield select(getActiveUser);
  const userCash = yield call(getUserCash, username);

  yield put(actions.setCash(userCash));
}

export function* discardUserCashWorker() {
  yield put(actions.setCash(0));
}

export function* moneySaga() {
  yield takeEvery(
    [actions.addCash.type, actions.minusCash.type],
    updateCashWorker
  );

  yield takeEvery(accountActions.login, getUserCashWorker);
  yield takeEvery(accountActions.logout, discardUserCashWorker);
}
