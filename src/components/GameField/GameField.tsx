import React, { FC } from "react";
import styled from "@emotion/styled";
import { Cell } from "../Cell";
import { CellsRow } from "./CellsRow";

const GameFieldWrapper = styled.div`
  line-height: 0;
`;

export interface GameFieldProps {
  cells: boolean[][];
  onClick: (x: number, y: number) => void;
}

export const GameField: FC<GameFieldProps> = ({ cells, onClick }) => (
  <GameFieldWrapper>
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
                  isFilled={cell}
                  onClick={onClick}
                />
              );
            }),
          ]}
        </CellsRow>
      );
    })}
  </GameFieldWrapper>
);
