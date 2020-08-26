import React from "react";
import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { actions } from "./reducer";
import { RootState } from "@/store";
import { ActionWindow, Button } from "@/components";
import { Header, H3, CloseButton, Table, Input } from "./styled";
import { computeGain } from "./helpers";

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
      <Header>
        <H3>Сделать ставку</H3>
        <CloseButton onClick={close}>
          <FaTimes />
        </CloseButton>
      </Header>
      <div>{`Выбрана ячейка с координатой (${x}, ${y})`}</div>
      <Table>
        <tbody>
          <tr>
            <td>Сумма</td>
            <td>
              <Input
                name="bet"
                value={bet}
                placeholder="Ставка"
                type="number"
                min={1}
                onChange={(event) =>
                  setBet(Number.parseInt(event.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Погрешность</td>
            <td>
              <Input
                name="bet"
                value={maxError * 100}
                placeholder="Погрешность"
                type="number"
                min={0}
                max={100}
                step={1}
                onChange={(event) =>
                  setMaxError(Number.parseFloat(event.target.value))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Поколение</td>
            <td>
              <Input
                name="betGeneration"
                value={betGeneration}
                placeholder="Поколение"
                type="number"
                min={10}
                onChange={(event) =>
                  setBetGeneration(Number.parseInt(event.target.value || "0"))
                }
              />
            </td>
          </tr>
          <tr>
            <td>Возможный выигрыш:</td>
            <td>{computeGain(bet, betGeneration, maxError).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button onClick={confirm} fullWidth>
                Подтвердить
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </ActionWindow>
  );
};

export const BetWindow = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetWindowComponent);
