import React from "react";
import { Link } from "react-router-dom";
import { PageHeader, StyledNavLink, H1, Links } from "./styled";

export const HomePage = () => (
  <div>
    <PageHeader>
      <H1>HomePage</H1>
      <Links>
        <StyledNavLink exact to="/game">
          Играть
        </StyledNavLink>
      </Links>
    </PageHeader>
  </div>
);
