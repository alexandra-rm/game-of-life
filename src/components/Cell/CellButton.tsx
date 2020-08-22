import styled from "@emotion/styled";
import { css, SerializedStyles } from "@emotion/core";

const CommonCell = css`
  width: 25px;
  border: 1px solid;
  padding: 1px;
  margin: 0;

  :before {
    content: "";
    float: left;
    padding-top: 100%; /* initial ratio of 1:1*/
  }
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

export const CellButton = styled.button`
  ${CommonCell};
  ${({ isFilled }: CellButtonProps): SerializedStyles =>
    isFilled ? FilledCell : EmptyCell}
`;
