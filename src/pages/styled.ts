import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 5px 20px;
  border-radius: 20px;
  color: #bebec2;
  text-decoration: none;

  &.active {
    background-color: #323a52;
    color: white;
  }
`;

export const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
`;

export const Links = styled.div`
  ${StyledNavLink} {
    margin-right: 10px;
  }
`;

export const PageHeader = styled.header`
  margin-bottom: 40px;
`;
