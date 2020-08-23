import { maxValue, getCellColor, cellColors } from "./helpers";

describe("HeightMap helpers", () => {
  it("maxValue in array of arrays of numbers", () => {
    const arr = [
      [1, 2, 0, 3],
      [2, 1, 0, 8],
      [4, 2, -1, 9],
      [6, 7, 30, 1],
    ];
    expect(maxValue(arr)).toEqual(30);
  });

  it("maxValue in array of arrays of negative numbers is = 0", () => {
    const arr = [
      [-1, -2, -20, -3],
      [-2, -1, -40, -8],
      [-4, -2, -1, -9],
      [-6, -7, -30, -1],
    ];
    expect(maxValue(arr)).toEqual(0);
  });

  it("getCellColor return black on max cell value", () => {
    expect(getCellColor(1, 1)).toEqual(cellColors[1]);
  });

  it("getCellColor return black on min non-negative cell value", () => {
    expect(getCellColor(0, 1)).toEqual(cellColors[0]);
  });

  it("getCellColor return white if maxValue equal to 0", () => {
    expect(getCellColor(10, 0)).toEqual(cellColors[0]);
  });
});
