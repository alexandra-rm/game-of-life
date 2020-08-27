export const getMaxCell = (arr: number[][]) => {
  let maxCell = { x: 0, y: 0 };
  let maxVal = 0;

  arr.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell > maxVal) {
        maxVal = cell;
        maxCell = { x, y };
      }
    })
  );

  return maxCell;
};

export const getMaxValue = (arr: number[][]) => {
  const { x, y } = getMaxCell(arr);
  return arr[y][x];
};

export const computeGain = (
  bet: number,
  betGeneration: number,
  maxError: number
) => (bet * betGeneration) / (maxError + 1) / 50;
