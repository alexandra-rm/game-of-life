import React, { FC } from "react";
import { CellButton } from "./CellButton";

export interface CellProps {
  x: number;
  y: number;
  isFilled?: boolean;
  onClick: (x: number, y: number) => void;
}

export const Cell: FC<CellProps> = ({ x, y, isFilled, onClick }) => {
  const onClickHandler = React.useCallback(() => {
    onClick(x, y);
  }, [x, y, onClick]);
  return <CellButton isFilled={isFilled} onClick={onClickHandler} />;
};

Cell.defaultProps = { isFilled: false };
