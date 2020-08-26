import styled from "@emotion/styled";

export interface ActinoWindowProps {
  isOpen: boolean;
}

export const ActionWindow = styled("div")<ActinoWindowProps>`
  display: inline-block;
  width: 40%;
  height: 40vh;
  position: fixed;
  bottom: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-1000")}px;
  transition: 0.2s;
  background-color: #8847da;
`;
