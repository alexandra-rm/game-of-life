import { take, call, put, fork } from "redux-saga/effects";
import { getUserSession, login, logout } from "./helpers";
import { actions as widgetsActions } from "../Widgets/reducer";
import { actions } from "./reducer";

export function* clearUserSession() {
  yield call(logout);
  yield put(widgetsActions.removeCommonWidget("userInfo"));
}

export function* checkUserSession() {
  const userSession: string = yield call(getUserSession);
  if (!!userSession) {
    yield put(actions.login(userSession));
  } else {
    yield put(actions.logout());
    yield* clearUserSession();
  }
}

export function* saveUserSession({
  payload,
}: ReturnType<typeof actions.login>) {
  const username = String(payload);
  if (!!username) {
    yield call(login, username);
    yield put(
      widgetsActions.addCommonWidget({
        id: "userInfo",
        widget: "AccountWidget",
      })
    );
  }
}

export function* accountSaga() {
  yield fork(checkUserSession);
  while (true) {
    const action = yield take(actions.login.type);
    yield* saveUserSession(action);
    yield take(actions.logout.type);
    yield* clearUserSession();
  }
}
