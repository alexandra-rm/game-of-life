import React, { FC } from "react";
import { Cell, CellsRow, CellsGridWrapper } from "../Cell";
import { maxValue, getCellColor } from "./helpers";

export interface HeightMapProps {
  cells: number[][];
  showOnlyMax?: boolean;
  selectedCell?: { x: number; y: number };
  onClick: (x: number, y: number) => void;
}

const getBorderColor = (
  x: number,
  y: number,
  color: string,
  selectedCell?: { x: number; y: number },
  showOnlyMax?: boolean
) => {
  if (x === selectedCell?.x && y === selectedCell?.y) {
    return "red";
  }
  if (showOnlyMax) {
    return "black";
  }
  return color;
};

export const HeightMap: FC<HeightMapProps> = ({
  cells,
  showOnlyMax,
  selectedCell,
  onClick,
}) => {
  const max = maxValue(cells);

  let heightMap: string[][] = [[]];
  if (!showOnlyMax) {
    heightMap = cells.map((row) => row.map((cell) => getCellColor(cell, max)));
  } else {
    heightMap = cells.map((row) =>
      row.map((cell) => (cell === max ? "black" : "white"))
    );
  }

  return (
    <CellsGridWrapper>
      {heightMap.map((row, y) => {
        return (
          <CellsRow cellsCount={row.length} key={`${y}_row`}>
            {[
              row.map((cell, x) => {
                return (
                  <Cell
                    key={`${y}_${x}`}
                    x={x}
                    y={y}
                    borderColor={getBorderColor(
                      x,
                      y,
                      cell,
                      selectedCell,
                      showOnlyMax
                    )}
                    backgroundColor={cell}
                    onClick={onClick}
                  />
                );
              }),
            ]}
          </CellsRow>
        );
      })}
    </CellsGridWrapper>
  );
};
