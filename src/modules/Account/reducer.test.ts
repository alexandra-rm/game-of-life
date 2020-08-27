import { actions, reducer, initialState, CheckState } from "./reducer";

describe("Account's reducer", () => {
  it("login action", () => {
    expect(reducer({ ...initialState }, actions.login("user"))).toEqual({
      ...initialState,
      username: "user",
      status: CheckState.succeed,
    });
  });

  it("logout action", () => {
    expect(reducer({ ...initialState }, actions.logout())).toEqual({
      ...initialState,
      status: CheckState.failed,
    });
  });
});
