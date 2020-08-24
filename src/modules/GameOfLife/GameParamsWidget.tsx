import React from "react";
import { connect } from "react-redux";
import { RangeRow } from "./components/RangeRow";
import { TableForm } from "./components/TableForm";
import { actions } from "./reducer";

const mapStateToProps = ({ game }) => ({
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
    <div>
      <h4>Game settings</h4>
      <TableForm>
        <RangeRow
          label="Init percent"
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
          <td colSpan={3}>
            <button
              name="regenerate"
              color="blue"
              disabled={
                isRunning || initialPercent === 0 || initialPercent === 100
              }
              onClick={generate}
            >
              Regenerate
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <button
              name="reset"
              color="red"
              disabled={isRunning}
              onClick={reset}
            >
              Reset
            </button>
          </td>
        </tr>
      </TableForm>
    </div>
  );
};

export const GameParamsWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameParams);
