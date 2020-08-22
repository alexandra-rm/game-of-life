import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/core";

const CommonCell = css`
  width: 25px;
  height: 25px;
  border: 1px solid;
  padding: 1px;
  margin: 0;
`;

const FilledCell = css`
  background-color: #e74c3c;
  border-color: #c0392b;
`;

const EmptyCell = css`
  background-color: #ecf0f1;
  border-color: #bdc3c7;
`;

interface CellButtonProps {
  isFilled?: boolean;
}

const CellButton = styled.button`
  ${CommonCell};
  ${({ isFilled }: CellButtonProps): SerializedStyles =>
    isFilled ? FilledCell : EmptyCell}
`;

export { CellButton };
