import styled from "@emotion/styled";

export const cardColors = ["Red", "White", "Yellow", "Violet"] as const;
type Color = typeof cardColors[number];

type ColorsMap = {
  [key in Color]: string;
};

const colorsMap: ColorsMap = {
  Red: "#FF4C60",
  White: "#FFF",
  Yellow: "#FAAA1E",
  Violet: "#6C6CE5",
};

export interface CardProps {
  bgColor?: Color;
  thin?: boolean;
}

export const Card = styled("div")<CardProps>`
  border-radius: 10px;
  padding: ${({ thin }) => (thin ? "10px" : "15px")} 20px;
  transition: 0.1s;
  background-color: ${({ bgColor }) => colorsMap[bgColor]};

  :hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  }
`;

Card.defaultProps = {
  bgColor: "White",
  thin: false,
};
