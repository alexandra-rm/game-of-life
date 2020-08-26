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
  background-color: #8847da;
`;

const mapStateToProps = ({ bets }) => ({
  isOpen: bets.isOpenBetWindow,
  bet: bets.bet,
  betGeneration: bets.betGeneration,
  betCell: bets.betCell,
  setIsOpen: bets.isOpenBetWindow,
  maxError: bets.maxError,
});

const mapDispatchToProps = {
  setIsOpen: actions.setIsOpenBetWindow,
  setBet: actions.setBet,
  setMaxError: actions.setMaxError,
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
  maxError,
  setMaxError,
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
        type="number"
        min={1}
        onChange={(event) => setBet(event.target.value)}
      />
      <input
        name="bet"
        value={maxError}
        placeholder="Погрешность"
        type="number"
        min={0}
        max={100}
        onChange={(event) => setMaxError(event.target.value)}
      />
      <input
        name="betGeneration"
        value={betGeneration}
        placeholder="Поколение"
        type="number"
        min={10}
        onChange={(event) =>
          setBetGeneration(Number.parseInt(event.target.value || 0))
        }
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
