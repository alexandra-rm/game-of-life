import styled from "@emotion/styled";
import { css } from "@emotion/core";

const CommonCell = css`
  width: 25px;
  border: 1px solid;
  padding: 1px;
  margin: 0;
  cursor: pointer;

  :before {
    content: "";
    float: left;
    padding-top: 100%; /* initial ratio of 1:1*/
  }
`;

interface CellButtonProps {
  backgroundColor?: string;
  borderColor?: string;
}

export const CellButton = styled("button")<CellButtonProps>`
  ${CommonCell};
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor}`};
  ${({ borderColor }) => borderColor && `border-color: ${borderColor}`};
`;
