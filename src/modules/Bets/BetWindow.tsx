import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { actions } from "./reducer";

// TODO: вынести в отдельный компонент
const ActionWindow = styled.div`
  display: inline-block;
  width: 40%;
  height: 40vh;
  position: fixed;
  bottom: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-1000")}px;
  transition: 0.2s;
  background-color: green;
`;

const mapStateToProps = ({ bets }) => ({
  isOpen: bets.isOpenBetWindow,
  bet: bets.bet,
  betGeneration: bets.betGeneration,
  betCell: bets.betCell,
  setIsOpen: bets.isOpenBetWindow,
});

const mapDispatchToProps = {
  setIsOpen: actions.setIsOpenBetWindow,
  setBet: actions.setBet,
  setBetGeneration: actions.setBetGeneration,
  confirm: actions.confirmBet,
};

const BetWindowComponent = ({
  isOpen,
  betCell,
  bet,
  betGeneration,
  setIsOpen,
  setBet,
  setBetGeneration,
  confirm,
}) => {
  const x = (betCell || {}).x;
  const y = (betCell || {}).y;

  const close = React.useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <ActionWindow isOpen={isOpen}>
      {`X: ${x}`}
      <br />
      {`Y: ${y}`}
      <br />
      <input
        name="bet"
        value={bet}
        placeholder="Ставка"
        onChange={(event) => setBet(event.target.value)}
      />
      <input
        name="betGeneration"
        value={betGeneration}
        placeholder="Поколение"
        onChange={(event) => setBetGeneration(event.target.value)}
      />
      <button onClick={confirm}>Подтвердить</button>
      <button onClick={close}>Закрыть</button>
    </ActionWindow>
  );
};

export const BetWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetWindowComponent);
