import React, { FC } from "react";
import { Cell, CellsRow, CellsGridWrapper } from "../Cell";
import { maxValue, getCellColor } from "./helpers";

export interface HeightMapProps {
  cells: number[][];
  showOnlyMax?: boolean;
  onClick: (x: number, y: number) => void;
}

export const HeightMap: FC<HeightMapProps> = ({
  cells,
  showOnlyMax,
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
                    borderColor={showOnlyMax ? "black" : cell}
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
