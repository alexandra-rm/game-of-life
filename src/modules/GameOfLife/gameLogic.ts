import { initFields } from "./helpers";

const neighborsCount = 8;
const deltaX: number[] = [-1, 0, 1, 1, 1, 0, -1, -1];
const deltaY: number[] = [-1, -1, -1, 0, 1, 1, 1, 0];

const isValidCoords = (
  x: number,
  y: number,
  width: number,
  height: number
): boolean => {
  const isValidX: boolean = 0 <= x && x < width;
  const isValidY: boolean = 0 <= y && y < height;

  return isValidX && isValidY;
};

const getCountOfActiveNeighbors = (
  fields: boolean[][],
  x: number,
  y: number
): number => {
  const height = fields.length;
  const width = height > 0 ? fields[0].length : 0;

  let result = 0;
  for (let i = 0; i < neighborsCount; i++) {
    const newX = x + deltaX[i];
    const newY = y + deltaY[i];

    if (isValidCoords(newX, newY, width, height) && fields[newY][newX]) {
      result++;
    }
  }
  return result;
};

const minNeighbors = 2;
const maxNeighbors = 3;
const neighborsForNewCell = 3;

const isCellLive = (currState: boolean, activeNeighbors: number): boolean => {
  let result: boolean;
  if (currState) {
    result = minNeighbors <= activeNeighbors && activeNeighbors <= maxNeighbors;
  } else {
    result = activeNeighbors === neighborsForNewCell;
  }
  return result;
};

export const nextEpoch = (fields: boolean[][]): boolean[][] => {
  const newFields = initFields(fields.length, fields[0].length, false);

  for (let y = 0; y < fields.length; y++) {
    const row = fields[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];

      const activeNeighbors = getCountOfActiveNeighbors(fields, x, y);
      newFields[y][x] = isCellLive(cell, activeNeighbors);
    }
  }
  return newFields;
};
