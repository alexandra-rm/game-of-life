import React from "react";
import styled from "@emotion/styled";

const FullWidthInput = styled.input`
  width: 100%;
`;

export default interface RangeRowProps {
  label: string;
  value: number;
  valueEnding?: string;
}

export const RangeRow: React.FC<
  RangeRowProps &
    React.HTMLProps<HTMLInputElement> &
    React.HTMLAttributes<HTMLInputElement>
> = ({ label, value, valueEnding, ...inputProps }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{`${value}${valueEnding}`}</td>
      <td>
        <FullWidthInput {...inputProps} type="range" value={value} />
      </td>
    </tr>
  );
};

RangeRow.defaultProps = {
  valueEnding: "",
};
