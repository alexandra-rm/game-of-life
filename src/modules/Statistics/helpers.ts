export const cellToNum = (cell: boolean) => (cell ? 1 : 0);

export const isEqualSize = (a: any[][], b: any[][]) =>
  a.length === b.length && a[0].length === b[0].length;

const rowReducer = (acc: number, cell: boolean) => acc + cellToNum(cell);

const columnReducer = (acc: number, row: boolean[]) =>
  acc + row.reduce(rowReducer, 0);

export const filledCount = (field: boolean[][]) =>
  field.reduce(columnReducer, 0);
