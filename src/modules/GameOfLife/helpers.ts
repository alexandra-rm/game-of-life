export const initFields = (
  height: number,
  width: number,
  initialValue = false
): boolean[][] => {
  return Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(initialValue)
  ) as boolean[][];
};

export const toggleCellState = (
  fields: boolean[][],
  x: number,
  y: number
): boolean[][] => {
  const fieldsCopy = [...fields];
  fieldsCopy[y] = [...fieldsCopy[y]];
  fieldsCopy[y][x] = !fieldsCopy[y][x];
  return fieldsCopy;
};

export const resize = (
  fields: boolean[][],
  newHeight: number,
  newWidth: number
): boolean[][] => {
  const newFields = initFields(newHeight, newWidth);
  const minWidth = Math.min(newWidth, (!!fields[0] && fields[0].length) || 0);
  const minHeight = Math.min(newHeight, fields.length);

  for (let y = 0; y < minHeight; y++) {
    for (let x = 0; x < minWidth; x++) {
      newFields[y][x] = fields[y][x];
    }
  }
  return newFields;
};

export const calcInterval = (speed: number): number => {
  if (speed <= 0) return 0;
  return 1000 / speed;
};

export const generateField = (
  height: number,
  width: number,
  filledPercent: number
): boolean[][] => {
  const field = initFields(height, width);

  if (filledPercent > 0) {
    const percent = filledPercent / 100;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (Math.random() < percent) {
          field[y][x] = true;
        }
      }
    }
  }

  return field;
};
