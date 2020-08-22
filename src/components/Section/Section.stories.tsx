import React, { FC } from "react";
import { Section } from "./Section";
import { withKnobs, text } from "@storybook/addon-knobs";

export default {
  title: "Section",
  component: Section,
  decorators: [withKnobs],
};

export const section: FC = () => (
  <Section title={text("title", "")}>Some section content</Section>
);
