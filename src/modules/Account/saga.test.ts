import * as matchers from "redux-saga-test-plan/matchers";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  clearUserSession,
  checkUserSession,
  saveUserSession,
  accountSaga,
} from "./saga";
import { actions as widgetsActions } from "../Widgets/reducer";
import { actions } from "./reducer";
import { logout, login, getUserSession } from "./helpers";

describe("Account saga", () => {
  it("clearUserSession test", () => {
    return expectSaga(clearUserSession)
      .call(logout)
      .put(widgetsActions.removeCommonWidget("userInfo"))
      .run();
  });

  it("saveUserSession test", () => {
    const username = "randomUsername";
    return expectSaga(saveUserSession, { payload: username, type: "" })
      .call(login, username)
      .put(
        widgetsActions.addCommonWidget({
          id: "userInfo",
          widget: "AccountWidget",
        })
      )
      .run();
  });

  it("checkUserSession test", () => {
    const username = "randomUsername";
    return expectSaga(checkUserSession)
      .provide([[matchers.call.fn(getUserSession), username]])
      .call(getUserSession)
      .put(actions.login(username))
      .run();
  });

  it("checkUserSession test 2", () => {
    const username = "";
    return expectSaga(checkUserSession)
      .provide([[matchers.call.fn(getUserSession), username]])
      .call(getUserSession)
      .put(actions.logout())
      .run();
  });

  it("loginSaga default login flow success", () => {
    const userSession = "Username";
    const saga = testSaga(accountSaga);
    saga
      .next()
      .fork(checkUserSession)
      .next(userSession)
      .take(actions.login.type)
      .next(actions.login(userSession))
      .call(login, userSession)
      .finish();
  });
});
