import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { FaCoins } from "react-icons/fa";
import { RootState } from "@/store";
import { WidgetBase, Badge } from "@/components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

const mapStateToProps = ({ money }: RootState) => ({
  cash: money.cash,
});

export type Props = ReturnType<typeof mapStateToProps>;

const BalanceWidgetComponent = ({ cash }: Props) => (
  <WidgetBase color="white">
    <Wrapper>
      <Badge text={<FaCoins />} color="green" />
      {cash.toFixed(2)}
    </Wrapper>
  </WidgetBase>
);

export const BalanceWidget = connect(mapStateToProps)(BalanceWidgetComponent);
