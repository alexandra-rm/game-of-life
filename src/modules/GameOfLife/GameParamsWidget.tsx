import React from "react";
import { connect } from "react-redux";
import { RootState } from "@/store";
import { RangeRow } from "./components/RangeRow";
import { TableForm } from "./components/TableForm";
import { actions } from "./reducer";
import { WidgetBase, Button } from "@/components";

const mapStateToProps = ({ game }: RootState) => ({
  speed: game.speed,
  initialPercent: game.initialPercent,
  isRunning: game.isRunning,
});

const mapDispatchToProps = {
  setSpeed: actions.setSpeed,
  generate: actions.generate,
  reset: actions.reset,
  setInitialPercent: actions.setInitialPercent,
};

export type GameParamsProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const GameParams: React.FC<GameParamsProps> = ({
  speed,
  initialPercent,
  isRunning,
  setSpeed,
  generate,
  reset,
  setInitialPercent,
}) => {
  const onChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "speed") {
        setSpeed(value);
      } else if (name === "initialPercent") {
        setInitialPercent(value);
      }
    },
    [setSpeed, setInitialPercent]
  );

  return (
    <WidgetBase title="Game settings" color="red">
      <TableForm>
        <RangeRow
          label="Init %"
          name="initialPercent"
          value={initialPercent}
          valueEnding="%"
          max={100}
          min="0"
          onChange={onChange}
          disabled={isRunning}
        />
        <RangeRow
          label="Speed"
          name="speed"
          value={speed}
          valueEnding="x"
          min={0.1}
          max={10}
          step={0.1}
          onChange={onChange}
        />
        <tr>
          <td colSpan={2}>
            <Button
              name="regenerate"
              color="blue"
              disabled={
                isRunning || initialPercent === 0 || initialPercent === 100
              }
              fullWidth
              onClick={generate}
            >
              Regenerate
            </Button>
          </td>
          <td colSpan={1}>
            <Button
              name="reset"
              color="red"
              fullWidth
              disabled={isRunning}
              onClick={reset}
            >
              Reset
            </Button>
          </td>
        </tr>
      </TableForm>
    </WidgetBase>
  );
};

export const GameParamsWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameParams);
