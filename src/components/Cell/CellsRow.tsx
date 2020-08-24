import styled from "@emotion/styled";
import { CellButton } from "./CellButton";

interface CellsRowProps {
  cellsCount: number;
}

export const CellsRow = styled("div")<CellsRowProps>`
  ${CellButton} {
    width: ${({ cellsCount }) => 100 / Math.max(cellsCount, 1)}%;
  }
`;
