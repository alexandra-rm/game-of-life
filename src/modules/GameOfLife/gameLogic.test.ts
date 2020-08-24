import { nextEpoch } from "./gameLogic";

describe("Check nextEpoch function", () => {
  it("nextEpoch for fields with all clean cells", () => {
    const fields: boolean[][] = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual(fields);
  });

  it("nextEpoch for fields with one live cells", () => {
    const fields: boolean[][] = [
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with three neighboring live cells (V1)", () => {
    const fields: boolean[][] = [
      [true, false, false],
      [true, false, false],
      [true, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, false, false],
      [true, true, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with three neighboring live cells (V2)", () => {
    const fields: boolean[][] = [
      [false, true, false],
      [false, true, false],
      [false, true, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with three neighboring live cells (V3)", () => {
    const fields: boolean[][] = [
      [true, true, false],
      [true, false, false],
      [false, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [true, true, false],
      [true, true, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with random live cells (V1)", () => {
    const fields: boolean[][] = [
      [true, false, true],
      [false, false, false],
      [true, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with random live cells (V2)", () => {
    const fields: boolean[][] = [
      [true, false, true],
      [false, false, false],
      [true, false, true],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with random live cells (V3)", () => {
    const fields: boolean[][] = [
      [true, false, true],
      [false, false, true],
      [true, false, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [false, true, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it("nextEpoch for fields with random live cells (V4)", () => {
    const fields: boolean[][] = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];

    const next = nextEpoch(fields);
    expect(next).toEqual([
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ]);
  });
});
