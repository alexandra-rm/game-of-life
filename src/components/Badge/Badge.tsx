import React, { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

export const badgeColors = ["red", "yellow", "green"] as const;
type Color = typeof badgeColors[number];

type ColorsMap = {
  [key in Color]: { color: string; backgroundColor: string };
};

const colorsMap: ColorsMap = {
  red: {
    color: "#FD4D5F",
    backgroundColor: "#FFD1D5",
  },
  yellow: {
    color: "#FAAA1F",
    backgroundColor: "#FEE9C5",
  },
  green: {
    color: "#40c527",
    backgroundColor: "#c5fec5",
  },
};

interface BadgeWrapperProps {
  size?: number;
  color?: Color;
  circle?: boolean;
  bold?: boolean;
}

interface BadgeProps {
  text: string | React.ReactElement;
}

const BadgeWrapper = styled("span")<BadgeWrapperProps>`
  display: inline-flex;
  width: ${({ size }) => size}px;
  border-radius: ${({ circle, size }) => (circle ? size : "10")}px;
  align-items: center;
  justify-content: center;
  ${({ color }) => css(colorsMap[color])}};
  ${({ bold }) => bold && "font-weight: bold;"}

  :before {
    content: "";
    float: left;
    padding-top: 100%; /* initial ratio of 1:1*/
  }
`;

BadgeWrapper.defaultProps = {
  circle: false,
  bold: false,
  color: "red",
  size: 40,
};

export const Badge: FC<BadgeProps & BadgeWrapperProps> = ({
  text,
  ...rest
}) => <BadgeWrapper {...rest}>{text}</BadgeWrapper>;
