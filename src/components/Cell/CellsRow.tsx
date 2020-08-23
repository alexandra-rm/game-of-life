import styled from "@emotion/styled";
import { CellButton } from "./CellButton";

interface CellsRowProps {
  cellsCount: number;
}

export const CellsRow = styled("div")<CellsRowProps>`
  background-color: cyan;

  ${CellButton} {
    width: ${({ cellsCount }) => 100 / Math.max(cellsCount, 1)}%;
  }
`;
