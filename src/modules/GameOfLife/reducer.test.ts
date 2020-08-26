import { actions, reducer, initialState } from "./reducer";
import { nextEpoch } from "./gameLogic";
import { initFields } from "./helpers";

describe("Game's reducer", () => {
  it("generate action", () => {
    const field = initFields(100, 100);
    expect(
      reducer(
        { ...initialState, field, initialPercent: 30 },
        actions.generate()
      ).field
    ).not.toEqual(field);
  });

  it("resize action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(
      reducer(
        { ...initialState, field, width: 3, height: 3 },
        actions.resize({ width: 2, height: 2 })
      )
    ).toEqual({
      ...initialState,
      width: 2,
      height: 2,
      field: [
        [false, true],
        [false, true],
      ],
    });
  });

  it("update action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(reducer({ ...initialState, field }, actions.update())).toEqual({
      ...initialState,
      field: nextEpoch(field),
    });
  });

  it("click action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(
      reducer({ ...initialState, field }, actions.click({ x: 1, y: 1 }))
    ).toEqual({
      ...initialState,
      field: [
        [false, true, false],
        [false, false, false],
        [false, true, false],
      ],
    });
  });

  it("setInitialPercent action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(
      reducer(
        { ...initialState, width: 3, height: 3, initialPercent: 33, field },
        actions.setInitialPercent(0)
      )
    ).toEqual({
      ...initialState,
      width: 3,
      height: 3,
      initialPercent: 0,
      field: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    });
  });

  it("setSpeed action", () => {
    expect(
      reducer({ ...initialState, speed: 1 }, actions.setSpeed(10))
    ).toEqual({
      ...initialState,
      speed: 10,
    });
  });

  it("switchGameStatus action", () => {
    expect(
      reducer({ ...initialState, isRunning: false }, actions.switchGameStatus())
    ).toEqual({
      ...initialState,
      isRunning: true,
    });
  });

  it("reset action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(
      reducer(
        { ...initialState, width: 3, height: 3, initialPercent: 10, field },
        actions.reset()
      )
    ).toEqual({
      ...initialState,
      width: 3,
      height: 3,
      field: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ],
    });
  });
});
