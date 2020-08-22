import React, { FC } from "react";
import styled from "@emotion/styled";

const SectionWrapper = styled.section`
  margin-bottom: 20px;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
`;

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export const Section: FC<SectionProps> = ({ title, children, action }) => {
  return (
    <SectionWrapper>
      {title && (
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          {action && <span>{action}</span>}
        </SectionHeader>
      )}
      {children}
    </SectionWrapper>
  );
};
