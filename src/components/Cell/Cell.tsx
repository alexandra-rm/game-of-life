import React, { FC } from "react";
import { CellButton } from "./CellButton";

export interface CellProps {
  x: number;
  y: number;
  borderColor?: string;
  backgroundColor?: string;
  onClick: (x: number, y: number) => void;
}

export const Cell: FC<CellProps> = ({
  x,
  y,
  borderColor,
  backgroundColor,
  onClick,
}) => {
  const onClickHandler = React.useCallback(() => {
    onClick(x, y);
  }, [x, y, onClick]);
  return (
    <CellButton
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      onClick={onClickHandler}
    />
  );
};
