import React from "react";
import { connect } from "react-redux";
import { RangeRow } from "./components/RangeRow";
import { TableForm } from "./components/TableForm";
import { actions } from "./reducer";

const mapStateToProps = ({ game }) => ({
  height: game.height,
  width: game.width,
  isRunning: game.isRunning,
});

const mapDispatchToProps = {
  resize: actions.resize,
};

export type SizeSettingsProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const SizeSettings: React.FC<SizeSettingsProps> = ({
  width,
  height,
  isRunning,
  resize,
}) => {
  const onChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "height") {
        resize({ height: value, width: width });
      } else if (name === "width") {
        resize({ height: height, width: value });
      }
    },
    [resize, width, height]
  );

  return (
    <div>
      <h4>Size settings</h4>
      <TableForm>
        <RangeRow
          label="Width"
          name="width"
          value={width}
          max={45}
          min="3"
          onChange={onChange}
          disabled={isRunning}
        />
        <RangeRow
          label="Height"
          name="height"
          value={height}
          max={45}
          min={3}
          onChange={onChange}
          disabled={isRunning}
        />
      </TableForm>
    </div>
  );
};

export const SizeWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(SizeSettings);
