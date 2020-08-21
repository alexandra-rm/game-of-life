import React, { FC } from "react";

export interface SampleComponentProps {
  name: string;
}

export const SampleComponent: FC<SampleComponentProps> = ({ name }) => (
  <h1>Hello, {name}</h1>
);
