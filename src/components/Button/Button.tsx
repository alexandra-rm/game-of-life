import styled from "@emotion/styled";

export interface ButtonProps {
  fullWidth?: boolean;
  rounded?: boolean;
}

export const Button = styled("button")<ButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  padding: 7px 12px;
  border-radius: ${({ rounded }) => (rounded ? "10" : "5")}px;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  background-color: #323a52;
  color: white;
  border: none;
`;
