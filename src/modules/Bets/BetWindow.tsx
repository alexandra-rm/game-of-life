import React from "react";
import { connect } from "react-redux";
import { actions } from "./reducer";
import { RootState } from "@/store";
import { ActionWindow } from "@/components";

const mapStateToProps = ({ bets }: RootState) => ({
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

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

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
}: Props) => {
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
        onChange={(event) => setBet(Number.parseInt(event.target.value))}
      />
      <input
        name="bet"
        value={maxError}
        placeholder="Погрешность"
        type="number"
        min={0}
        max={100}
        step={0.01}
        onChange={(event) => setMaxError(Number.parseFloat(event.target.value))}
      />
      <input
        name="betGeneration"
        value={betGeneration}
        placeholder="Поколение"
        type="number"
        min={10}
        onChange={(event) =>
          setBetGeneration(Number.parseInt(event.target.value || "0"))
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
