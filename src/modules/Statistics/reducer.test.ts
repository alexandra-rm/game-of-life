import { actions, reducer, initialState } from "./reducer";

describe("Statistics reducer", () => {
  it("incrementGen action", () => {
    expect(reducer({ ...initialState }, actions.incrementGen())).toEqual({
      ...initialState,
      generation: 1,
    });

    expect(
      reducer({ ...initialState, generation: 10 }, actions.incrementGen())
    ).toEqual({
      ...initialState,
      generation: 11,
    });
  });

  it("discardGen action", () => {
    expect(
      reducer({ ...initialState, generation: 14 }, actions.discardGen())
    ).toEqual({
      ...initialState,
    });
  });

  it("clearCounters action", () => {
    expect(
      reducer(
        {
          ...initialState,
          counters: [
            [1, 2],
            [2, 1],
          ],
        },
        actions.clearCounters()
      )
    ).toEqual({
      ...initialState,
    });
  });

  it("addCounters action", () => {
    expect(
      reducer(
        {
          ...initialState,
          counters: [
            [1, 2],
            [2, 1],
          ],
        },
        actions.addCounters([
          [true, true],
          [true, false],
        ])
      )
    ).toEqual({
      ...initialState,
      counters: [
        [2, 3],
        [3, 1],
      ],
    });
  });

  it("addCounters action (test 2)", () => {
    expect(
      reducer(
        {
          ...initialState,
          counters: [
            [1, 2],
            [2, 1],
          ],
        },
        actions.addCounters([[true]])
      )
    ).toEqual({
      ...initialState,
      counters: [[1]],
    });
  });

  it("initCounters action", () => {
    expect(
      reducer(
        { ...initialState },
        actions.initCounters([
          [true, true],
          [true, false],
        ])
      )
    ).toEqual({
      ...initialState,
      counters: [
        [1, 1],
        [1, 0],
      ],
    });
  });

  it("discardFilledPercent action", () => {
    expect(
      reducer(
        { ...initialState, filledPercent: 0.98 },
        actions.discardFilledPercent()
      )
    ).toEqual({
      ...initialState,
    });
  });

  it("updateFilledPercent action", () => {
    expect(
      reducer(
        { ...initialState, filledPercent: 0.5 },
        actions.updateFilledPercent([
          [true, false],
          [false, false],
        ])
      )
    ).toEqual({
      ...initialState,
      filledPercent: 0.25,
    });
  });

  it("setFilledPercent action", () => {
    expect(
      reducer(
        { ...initialState, filledPercent: 0.2 },
        actions.setFilledPercent(0.9)
      )
    ).toEqual({
      ...initialState,
      filledPercent: 0.9,
    });
  });

  it("onClick action", () => {
    expect(
      reducer(
        { ...initialState, seletedCell: undefined },
        actions.onClick({ x: 0, y: 1 })
      )
    ).toEqual({
      ...initialState,
      seletedCell: { x: 0, y: 1 },
    });
  });
});
