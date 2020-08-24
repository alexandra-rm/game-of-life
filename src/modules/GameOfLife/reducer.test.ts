import { actions, reducer, initialState } from "./reducer";
import { nextEpoch } from "./gameLogic";

describe("Game's reducer", () => {
  it("rebuild action", () => {
    const field = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    expect(
      reducer({ ...initialState, field: field }, actions.click({ x: 1, y: 2 }))
    ).toEqual({
      ...initialState,
      field: [
        [false, false, false],
        [false, false, false],
        [false, true, false],
      ],
    });
  });

  it("update action", () => {
    const field = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];
    expect(
      reducer({ ...initialState, field: field }, actions.update())
    ).toEqual({
      ...initialState,
      field: nextEpoch(field),
    });
  });
});
