import React, { FC } from "react";
import styled from "@emotion/styled";
import { Card } from "../Card";
import { Color } from "../Card/Card";

const Title = styled.h4`
  margin: 0;
`;

export interface WidgetBaseProps {
  title?: string;
  color?: Color;
}

export const WidgetBase: FC<WidgetBaseProps> = ({ title, children, color }) => {
  return (
    <Card bgColor={color} thin style={{ margin: "20px 0" }}>
      {title && <Title>{title}</Title>}
      {children}
    </Card>
  );
};
