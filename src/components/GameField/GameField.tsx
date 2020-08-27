import React, { FC } from "react";
import { Cell, CellsRow, CellsGridWrapper } from "../Cell";

export interface GameFieldProps {
  cells: boolean[][];
  onClick: (x: number, y: number) => void;
}

export const GameField: FC<GameFieldProps> = ({ cells, onClick }) => (
  <CellsGridWrapper>
    {cells.map((row, y) => {
      return (
        <CellsRow cellsCount={row.length} key={`${y}_row`}>
          {[
            row.map((cell, x) => {
              return (
                <Cell
                  key={`${y}_${x}`}
                  x={x}
                  y={y}
                  borderColor={cell ? "#c0392b" : "#bdc3c7"}
                  backgroundColor={cell ? "#ff4c60" : "#f6f7ff"}
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
