import { lerpColor } from "./lerpColors";

describe("lerpColor", () => {
  it("lerp white and black with 0.5 coefficient", () => {
    const white = "#ffffff";
    const black = "#000000";
    const gray = "#7f7f7f";

    expect(lerpColor(white, black, 0.5)).toEqual(gray);
  });
});
