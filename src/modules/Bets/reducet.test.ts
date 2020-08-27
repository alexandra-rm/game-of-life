import { actions, reducer, initialState } from "./reducer";

describe("Bets's reducer", () => {
  it("setBet action", () => {
    expect(reducer({ ...initialState }, actions.setBet(100))).toEqual({
      ...initialState,
      bet: 100,
    });
  });

  it("setBetCell action", () => {
    const cell = { x: 10, y: 11 };
    expect(reducer({ ...initialState }, actions.setBetCell(cell))).toEqual({
      ...initialState,
      betCell: cell,
    });
  });

  it("setBetGeneration action", () => {
    expect(reducer({ ...initialState }, actions.setBetGeneration(50))).toEqual({
      ...initialState,
      betGeneration: 50,
    });
  });

  it("setIsOpenBetWindow action", () => {
    expect(
      reducer({ ...initialState }, actions.setIsOpenBetWindow(true))
    ).toEqual({
      ...initialState,
      isOpenBetWindow: true,
    });
  });

  it("setMaxError action", () => {
    expect(reducer({ ...initialState }, actions.setMaxError(32))).toEqual({
      ...initialState,
      maxError: 0.32,
    });
  });

  it("setMaxError action with arg > 100", () => {
    expect(reducer({ ...initialState }, actions.setMaxError(132))).toEqual({
      ...initialState,
      maxError: 1,
    });
  });

  it("setAllowBet action", () => {
    expect(reducer({ ...initialState }, actions.setAllowBet(false))).toEqual({
      ...initialState,
      allowBet: false,
    });
  });

  it("setMaxError action", () => {
    expect(reducer({ ...initialState }, actions.confirmBet())).toEqual({
      ...initialState,
      allowBet: false,
      isOpenBetWindow: false,
    });
  });
});
