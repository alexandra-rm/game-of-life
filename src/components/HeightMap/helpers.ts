import { lerpColors } from "@/utils/lerpColors";

export const cellColors = ["#ffffff", "#000000"];

export const maxValue = (cells: number[][]): number => {
  let maxVal = 0;
  cells.forEach((row) =>
    row.forEach((cell) => {
      if (cell > maxVal) {
        maxVal = cell;
      }
    })
  );
  return maxVal;
};

const colorsCache: { [key: string]: string } = {};

export const getCellColor = (cellValue: number, maxValue: number): string => {
  if (maxValue === 0) {
    return cellColors[0];
  }

  const ratio = cellValue / maxValue;
  const ratioStr = ratio.toFixed(3);

  if (!colorsCache[ratioStr]) {
    colorsCache[ratioStr] = lerpColors(cellColors, ratio);
  }

  return colorsCache[ratioStr];
};
