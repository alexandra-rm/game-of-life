import styled from "@emotion/styled";

export interface ButtonProps {
  fullWidth?: boolean;
  rounded?: boolean;
}

export const Button = styled("button")<ButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  padding: 5px 12px;
  ${({ rounded }) => rounded && "border-radius: 10px;"}
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
`;
