import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const H3 = styled.h3`
  margin: 0 0 10px;
`;

export const CloseButton = styled.button`
  width: fit-content;
  height: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
`;

export const Input = styled.input`
  padding: 10px 20px;
  color: #8847da;
  background-color: #f6f7ff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
`;

export const Table = styled.table`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
`;
