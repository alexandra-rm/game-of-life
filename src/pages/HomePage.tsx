import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import {
  PageHeader,
  StyledNavLink,
  H1,
  AbsoluteCenter,
  RelativeWrapper,
} from "./styled";
import { AccessChecker } from "@/modules/Account";

export const HomePage = () => (
  <AccessChecker>
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
  </AccessChecker>
);
