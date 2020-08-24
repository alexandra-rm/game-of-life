import React from "react";
import styled from "@emotion/styled";

const Table = styled.table`
  width: 100%;
  text-align: left;
  padding: 10px 0;

  th {
    color: #595a8a;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  td {
    padding-top: 10px;
  }
`;

interface TableFormProps {
  children: React.ReactNode;
}

export const TableForm: React.FC<TableFormProps> = ({ children }) => {
  return (
    <Table>
      <tbody>{children}</tbody>
    </Table>
  );
};

export const ThreeColumnsHeader: React.FC = () => {
  return (
    <tr>
      <th width="30%">Parameter</th>
      <th width="20%">Value</th>
      <th width="50%">Input</th>
    </tr>
  );
};
