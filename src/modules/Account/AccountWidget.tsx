import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { FaUser } from "react-icons/fa";
import { RootState } from "@/store";
import { WidgetBase, Badge, Button } from "@/components";
import { actions } from "./reducer";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > *:not(:last-item) {
    margin-right: 20px;
  }
`;

export const LogoutButton = styled.button`
  width: fit-content;
  height: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: red;
`;

const mapStateToProps = ({ account }: RootState) => ({
  username: account.username,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const AccountWidgetComponent = ({ username, logout }: Props) => (
  <WidgetBase color="white">
    <Wrapper>
      <Badge color="yellow" circle>
        <FaUser />
      </Badge>
      <span>{username}</span>
      <Button onClick={logout}>Выйти</Button>
    </Wrapper>
  </WidgetBase>
);

export const AccountWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountWidgetComponent);
