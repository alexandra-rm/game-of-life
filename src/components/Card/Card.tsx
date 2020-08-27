import styled from "@emotion/styled";

export const cardColors = [
  "red",
  "white",
  "yellow",
  "violet",
  "black",
] as const;
export type Color = typeof cardColors[number];

type ColorsMap = {
  [key in Color]: { bg: string; font: string };
};

const colorsMap: ColorsMap = {
  red: { bg: "#FF4C60", font: "white" },
  white: { bg: "#FFF", font: "black" },
  yellow: { bg: "#FAAA1E", font: "white" },
  violet: { bg: "#6C6CE5", font: "white" },
  black: { bg: "#292B31", font: "white" },
};

export interface CardProps {
  bgColor?: Color;
  thin?: boolean;
}

export const Card = styled("div")<CardProps>`
  border-radius: 10px;
  padding: ${({ thin }) => (thin ? "10px" : "15px")} 20px;
  transition: 0.1s;
  ${({ bgColor }) => `
    background-color: ${colorsMap[bgColor].bg};
    color: ${colorsMap[bgColor].font};
  `}
  :hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  }
`;

Card.defaultProps = {
  bgColor: "white",
  thin: false,
};
