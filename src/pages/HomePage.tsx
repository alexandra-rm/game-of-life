import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import {
  PageHeader,
  StyledNavLink,
  H1,
  AbsoluteCenter,
  RelativeWrapper,
} from "./styled";

export const HomePage = () => (
  <div>
    <PageHeader>
      <H1>HomePage</H1>
      <RelativeWrapper>
        <AbsoluteCenter>
          <StyledNavLink exact to="/game">
            <FaPlayCircle />
          </StyledNavLink>
        </AbsoluteCenter>
      </RelativeWrapper>
    </PageHeader>
  </div>
);
