import { actions, reducer, initialState } from "./reducer";

describe("Moneys's reducer", () => {
  it("addCash action", () => {
    expect(reducer({ ...initialState }, actions.addCash(5))).toEqual({
      ...initialState,
      cash: 5,
    });
  });

  it("minusCash action", () => {
    expect(
      reducer({ ...initialState, cash: 14 }, actions.minusCash(11))
    ).toEqual({
      ...initialState,
      cash: 3,
    });
  });
});
